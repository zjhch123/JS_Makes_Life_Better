const path = require('path')
const paths = require('../paths')
const mime = require('mime')
const fs = require('mz/fs')

module.exports = (url) => async (ctx, next) => {
  if (ctx.request.url.startsWith(url)) {
    const file = path.join(paths.appStatic, ctx.request.url.substring(url.length))
    if (await fs.exists(file)) {
      ctx.body = await fs.readFile(file)
      ctx.type = mime.getType(file)
    } else {
      ctx.body = 404
      ctx.type = 'text/html'
    }
  } else {
    await next();
  }
}