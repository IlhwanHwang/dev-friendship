import * as express from "express"
import * as cors from "cors"
import * as uuidv1 from "uuid/v1"
import {DAO} from "./DAO"
import * as _ from "lodash"
import {QNA} from "../common/QNA"

interface SubmitQNAPayload {
  userId: string,
  userName: string,
  qnas: { questionId: string, choiceId: string }[]
}

const asyncWrapper = <T> (handler: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<T>) => 
  async (req: express.Request, res: express.Response, next: express.NextFunction) =>
  await handler(req, res, next).catch(next)

const submitQNAPayloadCaster = (obj: any) => {
  const body = obj as SubmitQNAPayload
  if (body.userId === undefined || body.userName === undefined || body.qnas === undefined) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to SubmitQNAPayload`)
  }
  if (body.qnas.filter(qna => qna.choiceId === undefined || qna.questionId === undefined).length > 0) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to SubmitQNAPayload`)
  }
  return body
}

const getUserInformationPayloadCaster = (obj: any) => {
  const body = obj as { userId: string }
  if (body.userId === undefined) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to GetUserInformation`)
  }
  return body
}

const getQNAPayloadCaster = (obj: any) => {
  const body = obj as { userId: string }
  if (body.userId === undefined) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to GetQNAPayload`)
  }
  return body
}

interface SubmitAnswersPayload {
  sourceUserId: string,
  solverUserId: string,
  solverUserName: string,
  answers: string[]
}

const submitAnswersPayloadCaster = (obj: any) => {
  const body = obj as SubmitAnswersPayload
  if (body.sourceUserId === undefined || body.solverUserId === undefined || body.solverUserName === undefined) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to SubmitAnswersPayload`)
  }
  if (body.answers.filter(answer => !answer).length > 0) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to SubmitAnswersPayload`)
  }
  return body
}

const getScoreBoardPayloadCaster = (obj: any) => {
  const body = obj as { userId: string }
  if (body.userId === undefined) {
    throw TypeError(`${JSON.stringify(obj)} cannot be cast to GetScoreBoardPayloadCaster`)
  }
  return body
}

class Server {
  public app: express.Application
  public dao = DAO.bootstrap()

  public static bootstrap(): Server {
    return new Server()
  }

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())

    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`home ${req.ip}`)
      res.send("Zimzalabim!")
    })

    this.app.post("/get-user-id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`get-user-id ${req.ip}`)
      const uuid = uuidv1()
      res.send(JSON.stringify({
        success: true,
        payload: {
          userId: uuid
        }
      }))
    })

    this.app.post("/get-user-information", asyncWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`get-user-information ${req.ip}`)
      const userId = getUserInformationPayloadCaster(req.body).userId
      const information = await this.dao.getUserInformation(userId).catch(next)
      const payload = information
      res.send(JSON.stringify({ success: true, payload: payload }))
    }))

    this.app.post("/get-qnas", asyncWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`get-qnas ${req.ip}`)
      const userId = getQNAPayloadCaster(req.body).userId
      const questions = userId !== "" ? 
        (await this.dao.getUserQuestions(userId)).map(row => row['question_id']) :
        (await this.dao.getNewQuestions(10)).map(row => row['question_id'])

      const questionInfos = await Promise.all(questions.map(questionId => this.dao.getQuestionInformation(questionId)))
      const choices = await Promise.all(questions.map(questionId => this.dao.getChoices(questionId)))

      const answers = userId !== "" ? 
        await Promise.all(questions.map(questionId => this.dao.getAnswer(userId, questionId))) :
        questions.map(question => { return { choice_id: "" } })

      const payload: QNA[] = _.zip(questions, questionInfos, choices, answers)
        .map(([questionId, questionInfo, choices, answer]) => { return {
          id: questionId!,
          question: questionInfo!['contents'],
          choices: choices!.map(choice => { return { id: choice['choice_id'], text: choice['contents'] } }),
          answer: answer!['choice_id']
        }})
      res.send(JSON.stringify({ success: true, payload: payload }))
    }))

    this.app.post("/submit-qnas", asyncWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`submit-qnas ${req.ip}`)
      const body = submitQNAPayloadCaster(req.body)
      await this.dao.addUserInfomation(body.userId, body.userName)
      await Promise.all(body.qnas.map(qna => this.dao.addAnswer(body.userId, qna.questionId, qna.choiceId)))
      res.send(JSON.stringify({
        success: true
      }))
    }))

    this.app.post("/submit-answers", asyncWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`submit-answers ${req.ip}`)
      const body = submitAnswersPayloadCaster(req.body)
      await this.dao.addUserInfomation(body.solverUserId, body.solverUserName)
      const questions = (await this.dao.getUserQuestions(body.sourceUserId)).map(row => row['question_id'])
      const answers = (await Promise.all(questions.map(questionId => this.dao.getAnswer(body.sourceUserId, questionId)))).map(answer => answer.choice_id)
      const score = _.zip(answers, body.answers).filter((pair) => pair[0] === pair[1]).length
      console.log(JSON.stringify(_.zip(answers, body.answers)))
      await this.dao.addScore(body.sourceUserId, body.solverUserId, score)
      res.send(JSON.stringify({
        success: true
      }))
    }))

    this.app.post("/get-score-board", asyncWrapper(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`get-score-board ${req.ip}`)
      const body = getScoreBoardPayloadCaster(req.body)
      const results = await this.dao.getScoreBoard(body.userId)
      const names = (await Promise.all(results.map(result => this.dao.getUserInformation(result.userId)))).map(row => row.userName)
      res.send(JSON.stringify({
        success: true,
        payload: {
          scoreBoard: _.zip(results, names).map(([result, name]) => { return { userId: result!.userId, name: name!, score: result!.score, created: result!.created } })
        }
      }))
    }))
  }
}


class Client {
  public app: express.Application

  public static bootstrap(): Client {
    return new Client()
  }

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.static('dist'))
    this.app.use(express.static('static'))
    this.app.use(cors())

    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`home ${req.ip}`)
      res.render('dist/index.html')
    })
  }
}

const appServer = new Server().app
const portServer = 37123
const appClient = new Client().app
const portClient = 80

if (process.argv.indexOf("--dev") >= 0) {
  appServer
    .listen(portServer, () => console.log(`Express server (server) listening at ${portServer}`))
    .on('error', err => console.error(err));
}
else {
  appServer
    .listen(portServer, () => console.log(`Express server (server) listening at ${portServer}`))
    .on('error', err => console.error(err));

  appClient
    .listen(portClient, () => console.log(`Express server (client) listening at ${portClient}`))
    .on('error', err => console.error(err));
}