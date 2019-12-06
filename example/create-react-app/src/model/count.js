export default {
  namespace: 'count',
  state: 0,
  reducers: {
    countAdd(count) { return count + 1 },
    countMinus(count) { return count - 1 },
  },
}