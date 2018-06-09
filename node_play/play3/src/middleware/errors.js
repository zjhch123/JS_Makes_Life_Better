module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (exception) {
    console.error(ctx, exception)
    ctx.body = {
      code: 500,
      msg: 'Server Error'
    }
  }
}