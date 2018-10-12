import { EventEmitter } from 'events'

class Store extends EventEmitter {
  constructor(reducer) {
    super()
    this.reducer = reducer
    this.getState = this.getState.bind(this)
    this.dispatch = this.dispatch.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    
    this.dispatch({
      type: '@@INIT'
    })
  }

  getState() {
    return this.state
  }

  dispatch(action) {
    if (typeof action !== 'object') {
      throw new Error(`Action must be a plain object, received: ${typeof action}`)
    }
    console.log('Action')
    console.log(' - before action state:')
    console.log(' - ', JSON.parse(JSON.stringify(this.state || {})))
    console.log(' - action:')
    console.log(' - ', action)
    this.state = this.reducer(this.state, action)
    console.log(' - after action state:')
    console.log(' - ', JSON.parse(JSON.stringify(this.state)))
    this.emit('change')
  }

  unsubscribe(callback) {
    this.removeListener('change', callback)
  }

  subscribe(callback) {
    this.addListener('change', callback)
  }
}

export function createStore(reducer, enhancer) {
  if (typeof enhancer === 'undefined') {
    return new Store(reducer)
  }
  return enhancer(createStore)(reducer)
}

export function combineReducers(reducers) {
  return (state = {}, action) => {
    Object.keys(reducers).forEach((key) => {
      const reducer = reducers[key]
      state[key] = reducer(state[key], action)
    })
    return state
  }
}

export function applyMiddleware (middleware) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer)

    let dispatch = store.dispatch.bind(store)

    const middleApi = {
      getState: store.getState.bind(store),
      dispatch: (action) => dispatch(action)
    }

    dispatch = middleware(middleApi)(dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
