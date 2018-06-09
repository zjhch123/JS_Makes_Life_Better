const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const paths = require('../paths')

const addControllers = (router) => {
  fs.readdirSync(paths.appControllers)
    .filter(f => f.endsWith('.js'))
    .map(f => require(path.join(paths.appControllers, f)))
    .forEach(mapping => addMapping(router, mapping))
}

const addMapping = (router, mapping) => {
  for (let key in mapping) {
    if (!mapping.hasOwnProperty(key)) continue;
    let type, url, method
    try {
      type = key.split(' ')[0].toLowerCase()
      url = key.split(' ')[1]
    } catch (e) {
      console.error(`Invalid url at ${key}`)
      console.error('error message: ', e)
    }
    method = mapping[key]
    try {
      router[type](url, method)
      console.log(`binding type: ${type}, url: ${url} to method: ${method.name}`)
    } catch (e) {
      console.error(`binding type: ${type}, url: ${url} to method: ${method} failed!`)
      console.error('error message: ', e)
    }
  }
}

module.exports = () => {
  addControllers(router);
  return router.routes();
}
