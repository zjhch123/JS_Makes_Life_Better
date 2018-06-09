/*
  autowire models from project/models/** /*.js
*/
const fs = require('fs')
const db = require('./db')
const path = require('path')
const paths = require('./paths')

let files = fs.readdirSync(paths.appModel).filter(f => f.endsWith('.js'))

module.exports = {}

for (let file of files) {
  console.log(`import model from file ${file}...`);
  let name = file.substring(0, file.length - 3)
  module.exports[name] = require(path.join(paths.appModel, file))
}

module.exports.sync = () => db.sync();
