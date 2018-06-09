const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const setResponseTime = require('./middleware/setResponseTime')
const setContentType = require('./middleware/setContentType')
const logger = require('./middleware/logger')
const addController = require('./middleware/addController')
const setCORS = require('./middleware/setCORS')
const errors = require('./middleware/errors')
const setStaticResource = require('./middleware/setStaticResource')
const Router = require('koa-router')
const model = require('./model')

// model.sync();

const router = Router()
const app = new Koa()

// 响应时间
app.use(setResponseTime())

// 静态资源
app.use(setStaticResource('/static'))

// RESTFul
app.use(logger())
app.use(errors())
app.use(bodyParser())
app.use(addController(router))
app.use(setContentType())
app.use(setCORS())
app.listen(3000)


console.log('app started at http://127.0.0.1:3000/')