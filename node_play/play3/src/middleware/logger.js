module.exports = () => async (ctx, next) => {
  const method = ctx.request.method
  const url = ctx.request.url
  const startTime = new Date().getTime()
  await next()
  const ms = new Date().getTime() - startTime
  console.log(`Process ${method} - ${url} - ${ms}ms - res: ${JSON.stringify(ctx.body)}`);
}