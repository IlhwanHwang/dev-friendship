import * as express from "express"
import * as sqlite3 from "sqlite3"

class App {
  public app: express.Application

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
      req.param
      res.send("{}")
    })
  }
}

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = new App().app;

app.listen(port, () => console.log(`Express server listening at ${port}`))
.on('error', err => console.error(err));