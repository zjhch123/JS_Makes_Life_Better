import userService from '../services/UserService'
export default {
  namespace: 'user',
  state: {
    isLogin: ~~window.localStorage['isLogin'] === 1,
    isPending: false,
    errorMsg: ''
  },
  effects: {
    *login (action, {put, call}) {
      console.log(action)
      yield put({ type: 'setup', payload: { isLogin: false, isPending: true } })
      try {
        yield call(userService.login, action.payload)
      } catch (ex) {
        yield put({ type: 'error', payload: { errorMsg: ex.message } })
        yield put({ type: 'setup', payload: { isLogin: false, isPending: false } })
        return
      }
      yield put({ type: 'setup', payload: { isLogin: true, isPending: false } })
      yield put({ type: 'error', payload: { errorMsg: '' } })
    },
    *registe(action, {put, call}) {
      console.log(action)
      yield put({ type: 'setup', payload: { isLogin: false, isPending: true } })
      try {
        yield call(userService.registe, action.payload)
      } catch (ex) {
        yield put({ type: 'error', payload: { errorMsg: ex.message } })
        return
      } finally {
        yield put({ type: 'setup', payload: { isLogin: false, isPending: false } })
      }
      yield put({ type: 'error', payload: { errorMsg: 'registe success! please login' } })
    },
    *logout(action, {put, call}) {
      console.log(action)
      yield call(userService.logout)
      yield put({ type: 'setup', payload: { isLogin: false, isPending: false } })
      yield put({ type: 'error', payload: { errorMsg: '' } })
    }
  },
  reducers: {
    setup (state, action) {
      return {
        ...state,
        isLogin: action.payload.isLogin,
        isPending: action.payload.isPending
      }
    },
    error (state, action) {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
  }
}
