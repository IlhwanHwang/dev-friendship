import * as sqlite3 from "sqlite3"


export class DAO {
  public db = new sqlite3.Database("dev-friendship.db")

  public static bootstrap = () => new DAO()

  getNewQuestions = () => {
    return new Promise<{ question_id: string }[]>((resolve, reject) => {
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

  getQuestionInfo = (questionId: string) => {
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
}