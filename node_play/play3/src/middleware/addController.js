const path = require('path')
const fs = require('fs')
const paths = require('../paths')

const setControllers = (router) => {
  fs.readdirSync(paths.appController)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(paths.appController, f))
    .map(f => require(f))
    .forEach(controller => mappingController(router, controller))
}

const mappingController = (router, controller) => {
  for (const key in controller) {
    if (!controller.hasOwnProperty(key)) continue
    let method, path, func
    try {
      method = key.split(' ')[0].toLowerCase()
      path = key.split(' ')[1]
    } catch (e) {
      console.error(`Invalid type for mapping key: ${key}`)
      continue
    }
    func = controller[key]
    try {
      router[method](path, func)
    } catch (e) {
      console.error(`Error occured from ${path} mapping to ${func.name}`)
      continue
    }
    console.log(`${method}: ${path} - ${func.name}`)
  }
}

module.exports = (router) => {
  setControllers(router)
  return router.routes()
};

