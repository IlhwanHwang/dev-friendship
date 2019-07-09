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
      return <div>질문 받아오는 중...</div>
    }
    else if (this.state.page === "name") {
      return (
        <form>
          <input name='' onChange={this.onChangeName}></input>
          <input type='submit' disabled={!this.checkName(this.state.name)} onClick={this.onSubmitName}></input>
        </form>
      )
    }
    else if (this.state.page === "qnas") {
      const portionPlan = (() => {
        const length = this.getCurrentQNA().choices.length
        if (length % 3 === 0) {
          return [...Array(length).fill(3)]
        }
        else if (length % 3 === 1) {
          return [...Array(length - 4).fill(3), 2, 2, 2, 2]
        }
        else {
          return [...Array(length - 2).fill(3), 2, 2]
        }
      })()
      return (
        <div>
          <div className="row">
            <div className="col">
              <h1>{this.state.name}{utils.alignPostposition(this.state.name, this.getCurrentQNA().question)}</h1>
            </div>
          </div>
          <div className="row">
            {
              _.zip(this.getCurrentQNA().choices, portionPlan).map(([choice, portion]) => {
                console.log(portion)
                return <ChoiceCell
                  text={choice.text}
                  imageUrl="/images/yeri-1.jpg"
                  onClick={() => this.chooseAnswer(choice.id)}
                  portion={portion}
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
        <div>
          <div>완료! 친구들에게 링크를 공유하세요.</div>
          <a href={`/solve/?user_id=${this.userId}`}>
            {`${Config.HostName}/solve/?user_id=${this.userId}`}
          </a>
        </div>
      )
    }
    else {
      return <Redirect to="/exception"></Redirect>
    }
  }
}