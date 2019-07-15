import * as React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Make from './Make'
import Exception from './Exception';
import Home from './Home';
import Solve from './Solve';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/exception" component={Exception}/>
            <Route path="/make" component={Make}/>
            <Route path="/solve" component={Solve}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
        <div
          className="text-center w-100 text-secondary"
          style={{
            position: "fixed",
            bottom: "0"
          }}
        >
          <p
            style={{
              fontSize: "0.4rem"
            }}
          >
            <span
              className="bg-light p-1"
              style={{
                borderRadius: "0.25rem",
                boxShadow: "0px "
              }}
            >
              Ilhwan Hwang 2019
            </span>
          </p>
        </div>
      </BrowserRouter>
    )
  }
}

render(<App/>, document.getElementById('main'));