/*
* @Author: zjhch123
* @Date:   2017-12-08 10:16:54
* @Last Modified by:   zjhch123
* @Last Modified time: 2017-12-08 10:32:56
*/
const Koa = require('koa')  
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const staticServer = require('koa-static')

const setResponseTime = require('./middleware/setResponseTime')
const setContentType = require('./middleware/setContentType')
const logger = require('./middleware/logger')
const addController = require('./middleware/addController')
const setCORS = require('./middleware/setCORS')
const errors = require('./middleware/errors')

const paths = require('./paths')


const router = Router()
const app = new Koa()
 
// 响应时间
app.use(setResponseTime())

// 静态资源
app.use(staticServer(paths.appStatic))

// RESTFul
app.use(logger())
app.use(setContentType())
app.use(errors())
app.use(bodyParser())
app.use(addController(router))
app.use(setCORS())

app.listen(3000)

console.log('app started at http://127.0.0.1:3000/')