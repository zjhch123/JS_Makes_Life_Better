function isPromise(func) {
  return 'then' in func && typeof func.then === 'function'
}

function thunkToPromise(fn) {
  return new Promise((resolve, reject) => {
    fn((err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

function toPromise(obj) {
  if (isPromise(obj)) return obj
  if ('function' === typeof obj) return thunkToPromise(obj)
  return obj
}

function run(gen) {
  return new Promise((resolve, reject) => {
    if (typeof gen === 'function') gen = gen()

    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled();

    function onFulfilled(res) {
      let ret = null
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function onRejected(err) {
      let ret = null
      try {
        ret = gen.throw(err)
      } catch (e) {
        return reject(e)
      }

      next(ret)
    }

    function next(ret) {
      if (ret.done) {
        return resolve(ret.value)
      }

      const value = toPromise(ret.value)

      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)

      return onRejected(new TypeError('You may only yield a function, promise ' +
      'but the following object was passed: "' + String(ret.value) + '"'))
    }
  })
}

module.exports = run