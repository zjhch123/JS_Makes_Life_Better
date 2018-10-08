const isFunc = (func) => Object.prototype.toString.call(func) === '[object Function]'

class AppDispatcher {
  constructor() {
    this.callbacks = []
  }

  register(callback) {
    if (!isFunc(callback)) return
    this.callbacks.push(callback)
  }

  dispatch(action) {
    this.callbacks.forEach(func => {
      func(action)
    })
  }
}

export default new AppDispatcher()