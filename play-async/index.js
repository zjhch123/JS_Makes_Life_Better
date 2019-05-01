const fetch = require('node-fetch')

const to = (promise) => {
  return promise.then(data => {
    return [null, data]
  }).catch(err => {
    return [err]
  })
}

;(async () => {
  const fetch1 = to(fetch('https://api.github.com/users/zjhch123'))
  const fetch2 = to(fetch('https://api.github.com/users/mqyqingfeng'))

  const [err1, sec1] = await fetch1
  const [err2, sec2] = await fetch2

  const [j1, j2] = await Promise.all([sec1.json(), sec2.json()])

  console.log(j1, j2)
})()