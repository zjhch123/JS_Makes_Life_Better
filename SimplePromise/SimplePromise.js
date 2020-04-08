const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'

const resolvePromise = (promise2, value, resolve, reject) => {
  if (promise2 === value) {
    return reject(new TypeError('The promise and the return value are the same'))
  }
  if (value instanceof SimplePromise) {
    if (value.status === PENDING) {
      value.then((newValue) => resolvePromise(promise2, newValue, resolve, reject), reject)
    } else if (value.status === FULFILLED) {
      resolve(value.value)
    } else if (value.status === REJECTED) {
      reject(value.reason)
    }
  } else if (typeof value === 'object' || isFunction(value)) {
    if (value === null) {
      return resolve(value)
    }
    let then
    try {
      then = value.then
    } catch (error) {
      return reject(error)
    }

    if (isFunction(then)) {
      let called = false

      try {
        then.call(value, (newValue) => {
          if (called) { return }
          called = true
          resolvePromise(promise2, newValue, resolve, reject)
        }, (newReason) => {
          if (called) { return }
          called = true
          reject(newReason)
        })
      } catch (error) {
        if (called) { return }
        called = true
        reject(error)
      }
    } else {
      resolve(value)
    }
  } else {
    resolve(value)
  }
}

class SimplePromise {
  constructor (fn) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((onFulfilled) => {
          onFulfilled.call(this, this.value)
        })
      }
    })
  }

  reject (reason) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
  
        this.onRejectedCallbacks.forEach((onRejected) => {
          onRejected.call(this, this.reason)
        })
      }
    })
  }

  then (onFulfilled, onRejected) {
    let onFulfilledHandler = onFulfilled
    if (!isFunction(onFulfilledHandler)) {
      onFulfilledHandler = (value) => value
    }

    let onRejectedHandler = onRejected
    if (!isFunction(onRejectedHandler)) {
      onRejectedHandler = (reason) => {
        if(reason instanceof Error) {
          throw reason;
        } else {
          throw new Error(reason)
        }
      }
    }

    if (this.status === PENDING) {
      const retPromise = new SimplePromise((resolve, reject) => {
        this.onFulfilledCallbacks.push(() => {
          try {
            if (!isFunction(onFulfilled)) {
              resolve(this.value)
            } else {
              const newValue = onFulfilledHandler(this.value)
              resolvePromise(retPromise, newValue, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            if (!isFunction(onRejected)) {
              reject(this.reason)
            } else {
              const newValue = onRejectedHandler(this.reason)
              resolvePromise(retPromise, newValue, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
      return retPromise
    }

    if (this.status === FULFILLED) {
      const retPromise = new SimplePromise((resolve, reject) => {
        setTimeout(() => {
          try {
            if (!isFunction(onFulfilled)) {
              resolve(this.value)
            } else {
              const value = onFulfilledHandler(this.value)
              resolvePromise(retPromise, value, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
      return retPromise
    }

    if (this.status === REJECTED) {
      const retPromise = new SimplePromise((resolve, reject) => {
        setTimeout(() => {
          try {
            if (!isFunction(onRejected)) {
              reject(this.reason)
            } else {
              const newValue = onRejectedHandler(this.reason)
              resolvePromise(retPromise, newValue, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
      return retPromise
    }
  }
}

SimplePromise.deferred = () => {
  const result = {}

  result.promise = new SimplePromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = SimplePromise
