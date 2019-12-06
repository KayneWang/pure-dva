import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import dva from 'pure-dva';
import HomePage from './pages/Count';
import MainView from './pages/Products';
import countModel from './model/count';
import productsModel from './model/products';

const app = dva();

app.model(countModel);
app.model(productsModel);

app.children(
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Count</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/products">
          <MainView />
        </Route>
      </Switch>
    </div>
  </Router>
);

const App = () => app.start();

export default App;
