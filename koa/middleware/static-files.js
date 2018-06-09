const path = require('path')
const paths = require('../paths')
const mime = require('mime')
const fs = require('mz/fs')

const staticFiles = (url, dir) => async (ctx, next) => {
  let rpath = ctx.request.path
  if (rpath.startsWith(url)) {
    let fp = path.join(dir, rpath.substring(url.length))
    if (await fs.exits(fp)) {
      ctx.response.type = mime.lookup(rpath)
      ctx.response.body = await fs.readFile(fp)
    } else {
      ctx.response.status = 404
    }
  } else {
    await next()
  }
}

module.exports = staticFiles