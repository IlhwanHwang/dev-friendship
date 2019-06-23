import * as express from "express"
import * as sqlite3 from "sqlite3"


interface RegisterQNAPayload {
  userId: string,
  userName: string,
  qnas: { questionId: string, choiceId: string }[]
}

const registerQNAPayloadCaster = (obj: any) => {
  const body = obj as RegisterQNAPayload
  if (body.userId === undefined || body.userName === undefined || body.qnas === undefined) {
    throw TypeError(`${obj} cannot be cast to RegisterQNAPayload`)
  }
  if (body.qnas.filter(qna => qna.choiceId === undefined || qna.questionId === undefined).length > 0) {
    throw TypeError(`${obj} cannot be cast to RegisterQNAPayload`)
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

class App {
  public app: express.Application
  public db = new sqlite3.Database("dev-friendship.db")

  public static bootstrap(): App {
    return new App()
  }

  constructor() {
    this.app = express()
    this.app.use(express.json())

    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      res.send("{}")
    })

    this.app.post("/register-qna", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)

      try {
        const payload = registerQNAPayloadCaster(JSON.parse(req.body['payload']))
        const query = `INSERT INTO user_information VALUES (?, ?);\n` + 
          payload.qnas
            .map((qna: any) => `INSERT INTO answers VALUES (?, ?, ?);`)
            .join("\n")
        const params = [payload.userName, payload.userName]
          .concat(...payload.qnas.map((qna: any) => [payload.qnas, qna.questionId, qna.choiceId]))
        this.db.run(query, params, (err) => {
          if (err) {
            throw err;
          }
          res.send(JSON.stringify({ status: "success" }))
        })
      }
      catch (e) {
        if (e instanceof TypeError) {
          res.send(JSON.stringify({ status: "falied", reason: "payload is not valid" }))
        }
        else {
          throw e
        }
      }
    })

    this.app.get("/get-questions", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)

      this.db.all(`
        SELECT
          questions.question_id
        FROM
          questions
        ORDER BY
          RANDOM()
        LIMIT
          20
      `, [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.send(JSON.stringify({
          status: "success",
          payload: rows.map(row => row['question_id'])
        }))
      })
    })

    this.app.post("/get-choices", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      try {
        const questionId = getChoicesPayloadCaster(req.body).questionId
        this.db.all(`
          SELECT
            choices.choice_id,
            choices.contents
          FROM
            choices
          WHERE
            choices.question_id = ?
        `, [questionId], (err, rows) => {
          if (err) {
            throw err
          }
          if (rows.length === 0) {
            res.send(JSON.stringify({ status: "falied", reason: `no such question '${questionId}'` }))
          }
          else {
            res.send(JSON.stringify({
              status: "success",
              payload: rows.map(row => { return { id: row['choice_id'], text: row['contents'] } })
            }))
          }
        })
      }
      catch (e) {
        if (e instanceof TypeError) {
          console.log(req.body['payload'])
          res.send(JSON.stringify({ status: "falied", reason: "payload is not valid" }))
        }
        else {
          throw e
        }
      }
    })
  }
}

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = new App().app;

app.listen(port, () => console.log(`Express server listening at ${port}`))
.on('error', err => console.error(err));