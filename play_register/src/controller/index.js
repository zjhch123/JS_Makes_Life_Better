const model = require('../model');
const fs = require('fs')


const fn_index = async (ctx, next) => {
  await next()
  ctx.body = {
    code: 200,
    msg: 'Hello, World!'
  }
}

module.exports = {
  "POST /index/": fn_index
}

if (process.env.NODE_ENV === 'develop') {
  const fn_drop = async (ctx, next) => {
    await next()
    await model.sync();
    ctx.body = {
      code: 200,
      msg: 'drop ok'
    }
  }
  module.exports["GET /index/drop"] = fn_drop
}
