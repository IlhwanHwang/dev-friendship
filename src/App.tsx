import * as React from 'react'
import { render } from 'react-dom'
import * as api from './api'

import Selector from './Selector'
import Make from './Make'

class Main extends React.Component {
  state = {
    page: "main"
  }

  makeResponse = null

  mainOnClickMake = async () => {
    this.setState({ page: "make-load" })
    this.makeResponse = await api.postRequest("get-qnas", { userId: "" })
    this.setState({ page: "make" })
  }

  render () {
    if (this.state.page === "main") {
      return (
        <div>
          <button onClick={this.mainOnClickMake}>
            새 우정테스트 만들기
          </button>
        </div>
      )
    }
    else if (this.state.page === "make-load") {
      return <div>질문 받아오는 중...</div>
    }
    else if (this.state.page === "make") {
      return (
        <Make qnas={this.makeResponse}/>
      )
    }
  }
}

render(<Main/>, document.getElementById('main'));