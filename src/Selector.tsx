import * as React from 'react';
import { QNA, Choice } from '../common/QNA';
import * as request from 'request';

const ServerName = "localhost:3000"

export default class Selector extends React.Component {
  props: { questionIds: string[], make: boolean }

  state = {
    qnaIndex: 0,
    chosen: false,
    chosenAnswer: null,
    currentQNA: {
      id: undefined,
      question: undefined,
      choices: undefined,
      answer: undefined
    }
  };

  chooseAnswer = (id: string) => {
    this.setState({ chosen: true, chosenAnswer: id })
    setTimeout(this.nextAnswer, 1000)
  }
  
  nextAnswer = () => {
    this.setState({ chosen: false, qnaIndex: (this.state.qnaIndex + 1) })
  }

  getCurrentQNA = () => {
    return this.props.qnas[this.state.qnaIndex]
  }

  getChoiceColor = (choice: Choice) => {
    if (!this.state.chosen) {
      return ""
    }
    if (choice.id === this.state.chosenAnswer) {
      if (choice.id === this.getCurrentQNA().answer) {
        return "green"
      }
      else {
        return "red"
      }
    }
    else if (choice.id === this.getCurrentQNA().answer) {
      return "green"
    }
    else {
      return ""
    }
  }

  render () {
    return (
      <div>
        <h1>{this.getCurrentQNA().question}</h1>
        {
          this.getCurrentQNA().choices.map(choice => {
            return (
              <button
                onClick={() => this.chooseAnswer(choice.id)}
                disabled={this.state.chosen}
                style={{ backgroundColor: this.getChoiceColor(choice) }}
              >
                {choice.text}
              </button>
            )
          })
        }
      </div>
    );
  }
}
