import * as React from 'react'
import { QNA } from '../common/QNA'
import * as api from './api'
import { Redirect } from 'react-router'
import { Link, RouteComponentProps } from 'react-router-dom'
import * as queryString from 'query-string'
import ScoreBoard from './ScoreBoard'
import * as utils from './utils'
import * as _ from 'lodash'
import ChoiceCell from './ChoiceCell';

export default class Solve extends React.Component<RouteComponentProps> {
  state = {
    page: "pre-load",
    qnaIndex: 0,
    name: "",
    choice: null
  }

  userId = null
  sourceUserId = null
  sourceUserName = null
  qnas: QNA[] = []
  answers = []

  constructor (props) {
    super(props)
    this.load()
  }

  load = async () => {
    const query = queryString.parse(this.props.location.search)
    this.sourceUserId = query['user_id']
    const response1 = await api.postRequest("get-user-information", { userId: this.sourceUserId })
    if (!response1['success']) {
      this.setState({ page: "exception" })
      return
    }
    const userInformation = response1['payload']
    this.sourceUserName = userInformation['userName']

    this.setState({ page: "main" })
  }

  onStartSolve = async () => {
    this.setState({ page: "load" })

    const response1 = await api.postRequest("get-user-id", {})
    if (!response1['success']) {
      this.setState({ page: "exception" })
      return
    }
    this.userId = response1['payload']['userId']

    const response2 = await api.postRequest("get-qnas", { userId: this.sourceUserId })
    if (!response2['success']) {
      this.setState({ page: "exception" })
      return
    }
    this.qnas = response2['payload']

    this.setState({ page: "name" })
  }

  checkName = (name: string) => {
    if (name.length === 0) {
      return false
    }
    else if (name.length > 40) {
      return false
    }
    return true
  }

  onSubmitName = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    if (this.checkName(this.state.name)) {
      this.setState({ page: "qnas" })
    }
  }

  onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value })
  }
  
  getCurrentQNA = () => {
    return this.qnas[this.state.qnaIndex]
  }

  chooseAnswer = async (id: string) => {
    this.answers[this.state.qnaIndex] = id
    this.setState({ page: "qnas-pause", choice: id })
    await new Promise((resolve, reject) => setTimeout(() => { resolve() }, 1000))

    if (this.state.qnaIndex >= this.qnas.length - 1) {
      this.setState({ page: "submit" })
      const response1 = await api.postRequest("submit-answers", {
        sourceUserId: this.sourceUserId,
        solverUserId: this.userId,
        solverUserName: this.state.name,
        answers: this.answers
      })
      if (!response1['success']) {
        this.setState({ page: "exception" })
        return
      }

      this.setState({ page: "main", qnaIndex: 0 })
    }
    else {
      this.setState({ page: "qnas", qnaIndex: this.state.qnaIndex + 1 })
    }
  }

  render = () => {
    if (this.state.page === "pre-load") {
      return <div>정보 가져오는 중...</div>
    }
    else if (this.state.page === "main") {
      return (
      <div className="row h-100 d-flex align-items-center overflow-auto">
        <div className="col text-center mt-5 mb-5">
          <div>
            <h2>{this.sourceUserName}의 개발자 우정테스트를 풀어보세요</h2>
            <br></br>
            <button className="btn btn-primary" onClick={this.onStartSolve}>우정테스트 시작</button>
            <br></br>
            <Link className="btn btn-dark mt-3" to="/make">내 우정 테스트 만들기</Link>
            <ScoreBoard userId={this.sourceUserId} highlight={this.userId}></ScoreBoard>
          </div>
        </div>
      </div>
      )
    }
    else if (this.state.page === "load") {
      return (
        <div className="row">
          <div className="col text-center">
            <div>질문 받아오는 중...</div>
          </div>
        </div>
      )
    }
    else if (this.state.page === "name") {
      return (
        <div className="row h-100 d-flex align-items-center">
          <div className="col text-center pt-5 pb-5">
            <h2>
              이름을 입력하세요
            </h2>
            <form>
              <input style={{ fontSize: "1.3rem" }}name='' onChange={this.onChangeName}></input>
              <br></br>
              <input className="btn btn-primary mt-2" type='submit' disabled={!this.checkName(this.state.name)} onClick={this.onSubmitName}></input>
            </form>
          </div>
        </div>
      )
    }
    else if (this.state.page === "qnas" || this.state.page === "qnas-pause") {
      const portionPlan = utils.getPortionPlan(this.getCurrentQNA().choices.length)
      return (
        <div>
          <div className="row pt-4">
            <div className="col">
              <h1>{this.sourceUserName}{utils.alignPostposition(this.sourceUserName, this.getCurrentQNA().question)}</h1>
            </div>
          </div>
          <div className="row">
            <div
              className="col text-center text-secondary"
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.5rem"
              }}
            >
            {
              this.qnas.map((qna, index) => {
                return <span>{index > this.state.qnaIndex ? "○" : "●"}</span>
              })
            }
            </div>
          </div>
          <div className="row">
            {
              _.zip(this.getCurrentQNA().choices, portionPlan).map(([choice, portion]) => {
                const style = (() => {
                  if (this.state.page === "qnas-pause") {
                    if (this.getCurrentQNA().answer === choice.id) {
                      return "correct"
                    }
                    else if (this.state.choice === choice.id) {
                      return "incorrect"
                    }
                    else {
                      return "normal"
                    }
                  }
                  else {
                    return "normal"
                  }
                })()
                return (
                  <ChoiceCell
                    title={choice.title}
                    subtitle={choice.subtitle}
                    imageUrl={choice.imageUrl}
                    onClick={() => this.chooseAnswer(choice.id)}
                    portion={portion}
                    cellStyle={style}
                    enable={this.state.page !== "qnas-pause"}
                    key={choice.id}
                  />
                )
              })
            }
          </div>
        </div>
      );
    }
    else if (this.state.page === "submit") {
      return <div>점수 매기는 중...</div>
    }
    else {
      return <Redirect to="/exception"></Redirect>
    }
  }
}