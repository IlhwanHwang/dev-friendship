import * as React from 'react'
import * as api from './api'

class ScoreBoardElem extends React.Component {
  props: {
    name: string,
    score: number,
    rank: number,
    highlit: boolean
  }

  render = () => {
    return (
      <div className="col-12 p-0 text-left">
        <div
          className="w-100 h-100 pb-0 pl-3 pr-3 pt-3 d-flex"
          style={{ height: "4rem" }}
        >
          <div
            className="flex-grow-1 d-flex overflow-hidden"
            style={{ boxShadow: "0rem 0.125rem 0.5rem #0002" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                zIndex: 0,
                width: "4rem",
                height: "4rem",
                backgroundColor: this.props.rank === 1 ? "gold" : (this.props.rank === 2 ? "silver" : (this.props.rank === 3 ? "#cd7f32" : ""))
              }}
            >
              <span style={{
                fontSize: "2rem"
              }}>
                {this.props.score}
              </span>
            </div>
            <div
              className="flex-grow-1 pl-2 pt-1 overflow-hidden"
              style={{
                backgroundColor: "#fff"
              }}
            >
              <span
                className="pl-2 pr-2 bg-dark text-white overflow-hidden"
                style={{
                  fontSize: "1.3rem",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {this.props.name}
              </span>
              <br></br>
              <span className="text-secondary">
                {this.props.rank}등
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

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
            this.scoreBoard.map((entry, index) => {
              return (
                <ScoreBoardElem
                  name={entry.name}
                  score={entry.score}
                  rank={index + 1}
                  highlit={entry.userId === this.props.userId}
                />
              )
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