import * as React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom';
import Make from './Make'
import Exception from './Exception';
import Home from './Home';

class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/exception" component={Exception}/>
          <Route path="/make" component={Make}/>
          {/* <Route path="/solve" component={Solve}/> */}
        </Switch>
      </div>
    )
  }
}

render(<App/>, document.getElementById('main'));