const fn_index = async (ctx, next) => {
  await next()
  ctx.render('index.html', {
    title: 'Welcome'
  })
}

const fn_signin = async (ctx, next) => {
  await next();
  const username = ctx.request.body.username || '',
        password = ctx.request.body.password || ''
  if (username == 'koa') {
    ctx.render('signin_ok.html', {
      title: 'Sign In Ok!',
      name: username
    })
  } else {
    ctx.render('signin_failed.html', {
      title: 'Sign In Failed'
    })
  }
}

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
}