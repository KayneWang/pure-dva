import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { handleActions } from 'redux-actions';
import { fork, takeLatest } from 'redux-saga/effects';
import { is, check } from './utils';

function pureDva() {
  let _children = null;
  const _models = [];
  const app = {
    model,
    children,
    start
  }
  return app;

  function model(model) {
    check(model.namespace, is.notUndef, 'Namespace must be defined with model');
    _models.push(model);
  }

  function children(children) {
    check(children, is.jsx, 'Children must be react elements.');
    _children = children;
  }

  function start() {
    check(_children, is.notUndef, 'Children is not defined');
    let sagas = {};
    const rootReducer = {};

    _models.forEach(m => {
      rootReducer[m.namespace] = handleActions(m.reducers || {}, m.state);
      sagas = { ...sagas, ...m.effects };
    });

    const sagaMiddleware = createSagaMiddleware();
    const enhancer = compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
    const store = createStore(
      combineReducers({ ...rootReducer }), {}, enhancer
    );

    sagaMiddleware.run(rootSaga);

    function getWatcher(k, saga) {
      return function *() {
        yield takeLatest(k, saga);
      }
    }

    function *rootSaga() {
      for (var k in sagas) {
        if (sagas.hasOwnProperty(k)) {
          const watcher = getWatcher(k, sagas[k]);
          yield fork(watcher);
        }
      }
    }

    return (
      <Provider store={store}>
        {_children}
      </Provider>
    )
  }
}

export default pureDva;
export { connect } from 'react-redux';
export { call, put } from 'redux-saga/effects';