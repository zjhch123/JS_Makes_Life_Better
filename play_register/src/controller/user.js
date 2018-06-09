const { User } = require('../model');
const uuid = require('node-uuid');

const fn_addUser = async (ctx, next) => {
  await next()
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  const user = await User.create({
    username,
    password,
    token: uuid.v4(),
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    isNewRecord: true
  })
  ctx.cookies.set('user_login', user.token, {
    expires: user.expire,
    signed: true
  })
  ctx.body = {
    code: 200,
    result: {
    }
  }
}

const fn_getInfo = async (ctx, next) => {
  await next()
  const user = ctx.user
  ctx.body = {
    code: 200,
    result: {
      username: user.username,
      token: user.token
    }
  }
}

const fn_login = async (ctx, next) => {
  await next()
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  const user = await User.findOne({where: {username, password}})
  if (user == null) {
    ctx.body = {
      code: 400,
      result: {}
    }
  } else {
    user.update({
      expire: Date.now() + 7 * 24 * 60 * 60 * 1000
    })
    ctx.cookies.set('user_login', user.token, {
      expires: user.expire,
      signed: true
    })
    ctx.body = {
      code: 200,
      result: {token: user.token, username: user.username}
    }
  }
}

module.exports = {
  'POST /register': fn_addUser,
  'POST /login': fn_login,
  'GET /user/getInfo': fn_getInfo
}
