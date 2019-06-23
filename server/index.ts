import * as express from "express"
import * as sqlite3 from "sqlite3"


interface RegisterQNAPayload {
  userId: string,
  userName: string,
  qnas: { questionId: string, choiceId: string }[]
}

const registerQNAPayloadCaster = (obj: any) => {
  const payload = obj as RegisterQNAPayload
  if (payload.userId === undefined || payload.userName === undefined || payload.qnas === undefined) {
    throw TypeError(`${obj} cannot be cast to RegisterQNAPayload`)
  }
  if (payload.qnas.filter(qna => qna.choiceId === undefined || qna.questionId === undefined).length > 0) {
    throw TypeError(`${obj} cannot be cast to RegisterQNAPayload`)
  }
  return payload
}

class App {
  public app: express.Application
  public db = new sqlite3.Database("dev-friendship.db")

  public static bootstrap(): App {
    return new App()
  }

  constructor() {
    this.app = express()

    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)
      res.send("{}")
    })

    this.app.get("/register-qna", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(req.ip)

      try {
        const payload = registerQNAPayloadCaster(JSON.parse(req.param("payload")))
        const query = `INSERT INTO user_information VALUES (${payload.userId}, ${payload.userName});\n` + 
          payload.qnas
            .map((qna: any) => `INSERT INTO answers VALUES (${payload.userId}, ${qna.questionId}, ${qna.choiceId});`)
            .join("\n")
        this.db.run(query)
        res.send(JSON.stringify({ status: "success" }))
        return 200
      }
      catch (e) {
        if (e instanceof TypeError) {
          res.send(JSON.stringify({ status: "falied", reason: "payload is not valid" }))
          return 400
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