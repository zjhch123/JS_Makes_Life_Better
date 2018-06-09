const fn_index = async (ctx, next) => {
  await next()
  ctx.body = {
    code: 200,
    msg: 'Hello, World!'
  }
}

module.exports = {
  "GET /": fn_index
}