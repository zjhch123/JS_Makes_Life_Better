const fn_hello = async (ctx, next) => {
  await next();
  const username = ctx.params.username;
  ctx.response.body = `
    <h1>Hello, ${username}!</h1>
  `
}

module.exports = {
  'GET /hello/:username': fn_hello
}