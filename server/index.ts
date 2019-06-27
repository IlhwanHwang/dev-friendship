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

const submitQNAPayloadCaster = (obj: any) => {
  const body = obj as SubmitQNAPayload
  if (body.userId === undefined || body.userName === undefined || body.qnas === undefined) {
    throw TypeError(`${obj} cannot be cast to SubmitQNAPayload`)
  }
  if (body.qnas.filter(qna => qna.choiceId === undefined || qna.questionId === undefined).length > 0) {
    throw TypeError(`${obj} cannot be cast to SubmitQNAPayload`)
  }
  return body
}

const getChoicesPayloadCaster = (obj: any) => {
  const body = obj as { questionId: string }
  if (body.questionId === undefined) {
    throw TypeError(`${obj} cannot be cast to GetChoicesPayload`)
  }
  return body
}

const getQNAPayloadCaster = (obj: any) => {
  const body = obj as { userId: string }
  if (body.userId === undefined) {
    throw TypeError(`${obj} cannot be cast to GetQNAPayload`)
  }
  return body
}


class App {
  public app: express.Application
  public dao = DAO.bootstrap()

  public static bootstrap(): App {
    return new App()
  }

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())

    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      res.send("Zimzalabim!")
    })

    this.app.post("/get-user-id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      const uuid = uuidv1()
      res.send(JSON.stringify({
        success: true,
        payload: {
          userId: uuid
        }
      }))
    })

    this.app.post("/get-qnas", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      const userId = getQNAPayloadCaster(req.body).userId
      const questions = userId !== "" ? 
        (await this.dao.getUserQuestions(userId)).map(row => row['question_id']) :
        (await this.dao.getNewQuestions()).map(row => row['question_id'])

      const questionInfos = await Promise.all(questions.map(questionId => this.dao.getQuestionInfo(questionId)))
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
    })

    this.app.post("/submit-qnas", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      const body = submitQNAPayloadCaster(req.body)
      await this.dao.addUserInfo(body.userId, body.userName)
      await Promise.all(body.qnas.map(qna => this.dao.addAnswer(body.userId, qna.questionId, qna.choiceId)))
      res.send(JSON.stringify({
        success: true
      }))
    })
  }
}

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = new App().app;

app
  .listen(port, () => console.log(`Express server listening at ${port}`))
  .on('error', err => console.error(err));