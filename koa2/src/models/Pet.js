const db = require('../db')

module.exports = db.defineModel('Pet', {
  name: db.STRING(100),
  gender: db.BOOLEAN
})