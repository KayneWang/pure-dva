import React from 'react';
import { connect } from 'pure-dva';

const Count = ({ count, dispatch }) =>
  <div>
    <h2>{ count }</h2>
    <button key="add" onClick={() => { dispatch({type: 'countAdd'})}}>+</button>
    <button key="minus" onClick={() => { dispatch({type: 'countMinus'})}}>-</button>
  </div>
const HomePage = connect(({ count }) => ({ count }))(Count);

export default HomePage;