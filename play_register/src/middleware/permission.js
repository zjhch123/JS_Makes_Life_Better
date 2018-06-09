/*
* @Author: zhangjiahao
* @Date:   2017-12-15 16:49:56
* @Last Modified time: 2017-12-15 17:35:21
*/
const { User } = require('../model')
module.exports = (urls) => async (ctx, next) => {
  let isPermissioned = false
  urls.forEach(url => {
    if (ctx.url.startsWith(url)) {
      isPermissioned = true
      return false
    }
  })
  let user, userToken
  if (isPermissioned) {
    userToken = ctx.cookies.get('user_login', {
      signed: true
    })
    if (!userToken) {
      ctx.body = {
        code: 402,
        msg: 'token error'
      }
      return
    }
    user = await User.findOne({where: { token: userToken }});
    if (user == null || user.expire.getTime() - Date.now() < 0) {
      ctx.body = {
        code: 402,
        msg: 'token error'
      }
      return
    }
  }
  ctx.user = user
  ctx.userToken = userToken
  await next()  
}