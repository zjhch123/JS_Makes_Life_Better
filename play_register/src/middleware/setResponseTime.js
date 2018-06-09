module.exports = () => async (ctx, next) => {
  const startTime = Date.now()
  await next()
  const ms = Date.now() - startTime;
  ctx.set('X-Response-Time', ms + 'ms')
}