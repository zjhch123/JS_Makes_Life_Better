function *main() {
  const ret1 = yield fetch(`https://api.github.com/users/zjhch123`);
  const j1 = yield ret1.json();
  console.log(j1)
}

function co(func) {
  const gen = func()

  function next(data) {
    const result = gen.next(data)

    if (result.done) {
      return
    }

    result.value.then(data => {
      next(data)
    })
  }

  next()
}

co(main)