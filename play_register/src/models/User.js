const db = require('../db')

module.exports = db.defineModel('User', {
  username: {
    type: db.STRING(100),
    unique: true
  },
  password: db.STRING(100),
  token: db.STRING(100),
  expire: db.DATE
})