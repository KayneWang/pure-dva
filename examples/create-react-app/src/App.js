import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import dva, { connect } from './pure-dva/index';

const app = dva();

app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    ['count/add'](count) { return count + 1 },
    ['count/minus'](count) { return count - 1 },
  },
});

const Count = ({ count, dispatch }) =>
  <div>
    <h2>{ count }</h2>
    <button key="add" onClick={() => { dispatch({type: 'count/add'})}}>+</button>
    <button key="minus" onClick={() => { dispatch({type: 'count/minus'})}}>-</button>
  </div>
const HomePage = connect(({ count }) => ({ count }))(Count);

app.children(
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Count</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  </Router>
);

function App() {
  return app.start()
}

export default App;
