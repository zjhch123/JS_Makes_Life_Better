import { EventEmitter } from 'events'

class Store extends EventEmitter {

  constructor(reducer) {
    super()
    this.reducer = reducer
    this.listener = []
    this.dispatch({ type: '@@INIT' })
  }

  getState() {
    return this.state
  }

  dispatch(action) {
    console.log('Action')
    console.log(' - before action state:')
    console.log(' - ', this.state)
    console.log(' - action:')
    console.log(' - ', action)
    this.state = this.reducer(this.state, action)
    console.log(' - after action state:')
    console.log(' - ', this.state)
    this.emit('change')
  }

  unsubscribe(callback) {
    this.removeListener('change', callback)
  }

  subscribe(callback) {
    this.addListener('change', callback)
  }
}

export function createStore(reducer) {
  return new Store(reducer)
}