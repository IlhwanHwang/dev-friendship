import * as React from 'react';
import { QNA } from '../common/QNA';
import * as api from './api'
import { Redirect } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';

export default class Solve extends React.Component<RouteComponentProps> {
  state = {
    page: "pre-load",
    qnaIndex: 0,
    name: ""
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
    this.sourceUserId = this.props.match.params['user_id']
    const response1 = await api.postRequest("get-user-information", { userId: this.sourceUserId })
    if (!response1['success']) {
      this.setState({ page: "exception" })
      return
    }
    const userInformation = response1['payload']
    this.sourceUserName = userInformation['user_name']

    this.setState({ page: "main" })
  }

  onStartSolve = async () => {
    this.setState({ page: "load" })

    const response1 = await api.postRequest("get-user-id", {})
    if (!response1['success']) {
      this.setState({ page: "exception" })
      return
    }
    this.userId = response1['payload']

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
    if (this.state.qnaIndex >= this.qnas.length) {
      this.setState({ page: "submit" })
      const response1 = await api.postRequest("submit-qnas", {
        userId: this.userId,
        userName: this.state.name,
        qnas: this.qnas.map(qna => { return { questionId: qna.question, choiceId: qna.answer }})
      })
      if (!response1['success']) {
        this.setState({ page: "exception" })
        return
      }
  
      this.setState({ page: "done" })
    }
    else {
      this.qnas[this.state.qnaIndex].answer = id
      this.setState({ qnaIndex: this.state.qnaIndex + 1 })
    }
  }

  render = () => {
    if (this.state.page === "exception") {
      return <Redirect to="/exception"></Redirect>
    }
    else if (this.state.page === "pre-load") {
      return <div>정보 가져오는 중...</div>
    }
    else if (this.state.page === "main") {
      return (
      <div>
        <span>{this.sourceUserName}의 개발자 우정테스트를 풀어보세요</span>
        <button onClick={this.onStartSolve}>우정테스트 시작</button>
      </div>
      )
    }
    else if (this.state.page === "load") {
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
      return (
        <div>
          <h1>{this.getCurrentQNA().question}</h1>
          {
            this.getCurrentQNA().choices.map(choice => {
              return (
                <button onClick={() => this.chooseAnswer(choice.id)}>
                  {choice.text}
                </button>
              )
            })
          }
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
          <Link to={`/solve/:${this.userId}`}></Link>
        </div>
      )
    }
  }
}