const { User } = require('../model');

const fn_addUser = async (ctx, next) => {
  await next()
  const email = ctx.request.body.email
  const pwd = ctx.request.body.password
  const name = ctx.request.body.name
  const user = await User.create({
    email: email,
    password: pwd,
    name: name,
    gender: true,
    isNewRecord: true
  })
  ctx.body = {
    code: 200
  }
}

const fn_getAllUser = async (ctx, next) => {
  await next()
  const user = await User.findAll({
    attributes: ['id', 'email', 'name', 'gender'],
    order: ['createdAt']
  })
  ctx.body = {
    code: 200,
    result: {
      users: user
    }
  }
}

const fn_getUserByEmail = async (ctx, next) => {
  await next()
  const email = ctx.params.email
  const user = await User.find({
    attributes: ['id', 'email', 'name', 'gender'],
    where: {
      email: email
    }
  })
  ctx.body = {
    code: 200,
    result: {
      users: user
    }
  }
}

const fn_updateUserById = async (ctx, next) => {
  await next()
  const id = ctx.params.id
  const updateParam = ctx.request.body
  await User.update(updateParam, {
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 200
  }
}

const fn_deleteUserById = async (ctx, next) => {
  await next()
  const id = ctx.params.id
  await User.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 200
  }
}

module.exports = {
  'GET /users': fn_getAllUser,
  'GET /user/:email': fn_getUserByEmail,
  'POST /user': fn_addUser,
  'PUT /user/:id': fn_updateUserById,
  'DELETE /user/:id': fn_deleteUserById,
}
