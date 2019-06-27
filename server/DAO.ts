import * as sqlite3 from "sqlite3"


export class DAO {
  public db = new sqlite3.Database("dev-friendship.db")

  public static bootstrap = () => new DAO()

  getNewQuestions = (num: number) => {
    return new Promise<{ question_id: string }[]>((resolve, reject) => {
      this.db.all(`
        SELECT
          questions.question_id
        FROM
          questions
        ORDER BY
          RANDOM()
        LIMIT
          ?
      `, [num], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows)
      })
    })
  }

  getUserQuestions = (userId: string) => {
    return new Promise<{ question_id: string }[]>((resolve, reject) => {
      this.db.all(`
        SELECT
          answers.question_id
        FROM
          answers
        WHERE
          answers.user_id = ?
      `, [userId], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows)
      })
    })
  }

  getChoices = (questionId: string) => {
    return new Promise<{ choice_id: string, contents: string }[]>((resolve, reject) => {
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
          reject(err);
        }
        resolve(rows)
      })
    })
  }

  getQuestionInformation = (questionId: string) => {
    return new Promise<{ contents: string }>((resolve, reject) => {
      this.db.all(`
        SELECT
          questions.contents
        FROM
          questions
        WHERE
          questions.question_id = ?
      `, [questionId], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows[0])
      })
    })
  }

  getAnswer = (userId: string, questionId: string) => {
    return new Promise<{ choice_id: string }>((resolve, reject) => {
      this.db.all(`
        SELECT
          answers.choice_id
        FROM
          answers
        WHERE
          answers.user_id = ? AND answers.question_id = ?
      `, [userId, questionId], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows[0])
      })
    })
  }

  addAnswer = (userId: string, questionId: string, answer: string) => {
    return new Promise<{ choice_id: string }>((resolve, reject) => {
      this.db.run(`
        INSERT INTO answers
          VALUES (
            ?,
            ?,
            ?
          )
      `, [userId, questionId, answer], (err) => {
        if (err) {
          reject(err);
        }
        resolve()
      })
    })
  }

  getUserInformation = (userId: string) => {
    return new Promise<{ userName: string }>((resolve, reject) => {
      this.db.all(`
        SELECT
          *
        FROM
          user_information
        WHERE
          user_information.user_id = ?
      `, [userId], (err, rows) => {
        if (err) {
          reject(err);
        }
        if (rows.length === 0) {
          reject(Error(`No such user ${userId}`))
        }
        resolve({ userName: rows[0]['user_name'] })
      })
    })
  }

  addUserInfomation = (userId: string, userName: string) => {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO user_information
          VALUES (
            ?,
            ?
          )
      `, [userId, userName], (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  addScore = (sourceUserId: string, solverUserId: string, score: number) => {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO user_information
          VALUES (
            ?,
            ?,
            ?,
            ?
          )
      `, [sourceUserId, solverUserId, score, Date.now()], (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}