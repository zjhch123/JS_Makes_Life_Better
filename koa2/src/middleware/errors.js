const Sequelize = require('sequelize')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (exception) {
    if (process.env.NODE_ENV != 'production') {
      console.error(exception)
    }
    ctx.body = {}
    if (exception instanceof Sequelize.ValidationError) {
      ctx.body.msg = exception.errors[0].message
      ctx.body.code = 401;
    } else {
      ctx.body.code = 500;
    }
  }
}