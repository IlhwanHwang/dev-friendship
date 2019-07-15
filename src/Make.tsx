import * as React from 'react'
import { QNA } from '../common/QNA'
import * as api from './api'
import { Redirect } from 'react-router'
import * as Config from './Config'
import * as utils from './utils'
import ChoiceCell from './ChoiceCell'
import * as _ from 'lodash'

export default class Make extends React.Component {
  state = {
    page: "load",
    qnaIndex: 0,
    name: ""
  }

  userId = null
  qnas: QNA[] = []
  answers = []

  constructor(props) {
    super(props)
    this.load()
  }

  load = async () => {
    const response1 = await api.postRequest("get-user-id", {})
    if (!response1['success']) {
      this.setState({ page: "exception" })
      return
    }
    this.userId = response1['payload']['userId']

    const response2 = await api.postRequest("get-qnas", { userId: "" })
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
    this.qnas[this.state.qnaIndex].answer = id

    if (this.state.qnaIndex >= this.qnas.length - 1) {
      this.setState({ page: "submit" })
      const response1 = await api.postRequest("submit-qnas", {
        userId: this.userId,
        userName: this.state.name,
        qnas: this.qnas.map(qna => { return { questionId: qna.id, choiceId: qna.answer }})
      })
      if (!response1['success']) {
        this.setState({ page: "exception" })
        return
      }
  
      this.setState({ page: "done" })
    }
    else {
      this.setState({ qnaIndex: this.state.qnaIndex + 1 })
    }
  }

  render = () => {
    if (this.state.page === "load") {
      return (
        <div className="row h-100 d-flex align-items-center">
          <div className="col text-center">
            <div>질문 받아오는 중...</div>
          </div>
        </div>
      )
    }
    else if (this.state.page === "name") {
      return (
        <div className="row h-100 d-flex align-items-center">
          <div className="col text-center">
            <h2>
              이름을 입력하세요
            </h2>
            <form>
              <input style={{ fontSize: "1.3rem" }} name='' onChange={this.onChangeName}></input>
              <br></br>
              <input className="btn btn-primary mt-2" type='submit' disabled={!this.checkName(this.state.name)} onClick={this.onSubmitName}></input>
            </form>
          </div>
        </div>
      )
    }
    else if (this.state.page === "qnas") {
      const portionPlan = utils.getPortionPlan(this.getCurrentQNA().choices.length)
      return (
        <div>
          <div className="row pt-4">
            <div className="col">
              <h2>{this.state.name}{utils.alignPostposition(this.state.name, this.getCurrentQNA().question)}</h2>
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
                return <ChoiceCell
                  title={choice.title}
                  subtitle={choice.subtitle}
                  imageUrl={choice.imageUrl}
                  onClick={() => this.chooseAnswer(choice.id)}
                  portion={portion}
                  cellStyle="normal"
                  enable={true}
                  key={choice.id}
                />
              })
            }
          </div>
        </div>
      );
    }
    else if (this.state.page === "submit") {
      return <div>문답 등록하는 중...</div>
    }
    else if (this.state.page === "done") {
      return (
        <div className="row h-100 d-flex align-items-center">
          <div className="col text-center">
            <div>
              <h2>완료!</h2>
              <p>친구들에게 링크를 공유하세요.</p>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.25rem",
                  border: "1px solid #f0f2f4"
                }}
              >
                <a href={`/solve/?user_id=${this.userId}`}>
                  {`${Config.HostName}/solve/?user_id=${this.userId}`}
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return <Redirect to="/exception"></Redirect>
    }
  }
}