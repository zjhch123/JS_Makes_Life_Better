const path = require('path')
const ROOT = __dirname
const app = path.join(ROOT, 'app.js')
const appController = path.join(ROOT, 'controller')
const appMiddleware = path.join(ROOT, 'middleware')
const appConfig = path.join(ROOT, 'config.js')
const appModel = path.join(ROOT, 'models')
const appStatic = path.join(ROOT, 'public')

module.exports = {
  ROOT, app, appController, appMiddleware, appConfig, appModel, appStatic
}
