const fetch = require('node-fetch')
const fs = require('fs')
const run = require('./run')

function readFile(path) {
  return function(cb) {
    fs.readFile(path, { encoding: 'utf-8' }, cb)
  }
}

function *main() {
  const result = yield readFile('./run.js')
  const ret1 = yield fetch(`https://api.github.com/users/zjhch123`)
  const json1 = yield ret1.json()
  return [result, json1]
}

run(main).then(data => {
  console.log(data)
}).catch(e => {
  console.log(e)
})