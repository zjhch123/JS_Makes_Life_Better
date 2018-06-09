module.exports = () => async (ctx, next) => {
  ctx.type = 'application/json'
  await next()
}