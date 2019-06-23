import * as React from 'react';
import { QNA } from '../common/QNA';

export default class Make extends React.Component {
  props: { qnas: QNA[] }
  
  state = {
    qnaIndex: -1,
    name: ""
  }

  answers = []

  getCurrentQNA = () => {
    return this.props.qnas[this.state.qnaIndex]
  }

  chooseAnswer = (id: string) => {
    this.answers.push(id)
    this.setState({ qnaIndex: this.state.qnaIndex + 1 })
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
      this.setState({ qnaIndex: 0 })
    }
  }

  onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value })
  }

  render = () => {
    if (this.state.qnaIndex === -1) {
      return (
        <form>
          <input name='' onChange={this.onChangeName}></input>
          <input type='submit' disabled={!this.checkName(this.state.name)} onClick={this.onSubmitName}></input>
        </form>
      )
    }
    else {
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
  }
}