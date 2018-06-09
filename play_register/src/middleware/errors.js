const Sequelize = require('sequelize')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (exception) {
    if (exception instanceof Sequelize.ValidationError) {
      ctx.body = {
        code: 400,
        msg: exception.errors[0].message
      }
    } else {
      console.error(ctx, exception)
      ctx.body = {
        code: 500,
        msg: 'Server Error'
      }
    }
  }
}