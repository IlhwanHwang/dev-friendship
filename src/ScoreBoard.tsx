import * as React from 'react'
import * as api from './api'

export default class ScoreBoard extends React.Component {
  props: {
    userId: string,
    highlight: string
  }

  state = {
    page: "load"
  }

  scoreBoard: { userId: string, name: string, score: number, created: number }[] = undefined

  constructor (props) {
    super(props)
    this.load()
  }

  load = async () => {
    const response1 = await api.postRequest("get-score-board", { userId: this.props.userId })
    if (!response1['success']) {
      this.setState({ page: "exception" })
      return
    }
    this.scoreBoard = (response1['payload']['scoreBoard'] as { userId: string, name: string, score: number, created: number }[])
      .sort((a, b) => a.score === b.score ? (a.created - b.created) : (b.score - a.score))
    this.setState({ page: "done" })
  }

  render = () => {
    if (this.state.page === "load") {
      return <div>점수 불러오는 중...</div>
    }
    else if (this.state.page === "done") {
      return (
        <div>
          {
            this.scoreBoard.map(entry => {
              if (this.props.highlight === entry.userId) {
                return (
                  <strong key={entry.userId}>{entry.name}: {entry.score}<br></br></strong>
                )
              }
              else {
                return (
                  <span key={entry.userId}>{entry.name}: {entry.score}<br></br></span>
                )
              }
            })
          }
        </div>
      )
    }
    else {
      <div>엥 뭔가 잘못됐어요</div>
    }
  }
}