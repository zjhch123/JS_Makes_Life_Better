;(() => {
  function myFetch(url) {
    return function(cb) {
      setTimeout(() => {
        cb({ code: 200, status: 'success', url })
      }, 2000)
    }
  }
  
  function *main() {
    const result = yield myFetch('http://api.github.com/users/zjhch123')
    const result2 = yield myFetch('http://api.github.com/users/zjhch123')
    const ret1 = yield fetch(`https://api.github.com/users/zjhch123`)
    const json1 = yield ret1.json()
    console.log(result, result2, json1)
  }
  
  function isPromise(func) {
    return 'then' in func && typeof func.then === 'function'
  }
  
  function co(func) {
    const gen = func()
  
    function next(data) {
      const result = gen.next(data)
  
      if (result.done) {
        return
      }
  
      if (isPromise(result.value)) {
        result.value.then(data => {
          next(data)
        })
      } else {
        result.value(next)
      }
    }
  
    next()
  }
  
  co(main)
})()