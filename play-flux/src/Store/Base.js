import { EventEmitter } from 'events'

class BaseStore extends EventEmitter {

  constructor(initialState) {
    super()
    this.data = initialState
  }

  getData() {
    return this.data
  }

  setData(data) {
    this.data = data
  }

  emitChange() {
    this.emit('change')
  }

  addChangeListener(callback) {
    this.on('change', callback)
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback)
  }
}

export default BaseStore