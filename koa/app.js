const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const app = new Koa()
const paths = require('./paths')
const addControllerMiddleware = require('./middleware/addControllers')
const staticFiles = require('./middleware/static-files')
const templating = require('./middleware/templating')

const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const left = new Date().getTime() - start;
  console.log(`Process ${ctx.request.method} ${ctx.request.url} - ${left}ms`);
})
app.use(staticFiles('/static/', paths.appStatic))
app.use(bodyParser())
app.use(templating('public', {
  noCache: !isProduction,
  watch: !isProduction
}))
app.use(addControllerMiddleware())
app.listen(3000)