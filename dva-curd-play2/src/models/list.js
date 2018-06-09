import ListService from '../services/ListService'
export default {
  namespace: 'list',
  state: {
    list: [],
    total: 0,
    page: 1
  },
  effects: {
    *get(action, { put, call }) {
      const { data } = yield call(ListService.getList, action.payload.page)
      yield put({ type: 'save', payload: { list: data, total: 10, page: action.payload.page } })
    },
    *delete(action, { put, call, select }) {
      yield call(ListService.deleteItem, action.payload.id)
      const page = yield select((state) => state.list.page)
      yield put({ type: 'get', payload: { page } })
    }
  },
  reducers: {
    save (state, action) {
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
        page: action.payload.page
      }
    }
  }
}