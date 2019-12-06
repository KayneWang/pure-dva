import { call, put } from 'pure-dva';
export default {
  namespace: 'products',
  state: {
    list: [],
    loading: false,
  },
  effects: {
    productsQuery: function *() {
      yield call(delay(800));
      yield put({
        type: 'productsQuerySuccess',
        payload: ['ant-tool', 'roof'],
      });
    },
  },
  reducers: {
    productsQuery(state) {
      return { ...state, loading: true, };
    },
    productsQuerySuccess(state, { payload }) {
      return { ...state, loading: false, list: payload };
    },
  },
}

function delay(timeout) {
  return () => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
}