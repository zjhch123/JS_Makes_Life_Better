const Sequelize = require('sequelize')
const config = require('./config')
const uuid = require('node-uuid')

console.log('init sequelize')

const generateId = () => uuid.v4()

const sequelize = new Sequelize(config.db_name, config.db_username, config.db_password, {
  host: config.db_host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false
})

const defineModel = (name, attributes) => {
  let attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }
  attrs.id = {
    type: Sequelize.STRING(100),
    primaryKey: true,
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    version: true,
    hooks: {
      beforeValidate: function(obj) {
        const now = Date.now()
        if (obj.isNewRecord) {
          obj.id = generateId()
          obj.createdAt = now
          obj.updatedAt = now
        } else {
          obj.updatedAt = now
        }
      }
    }
  })
}

const TYPES = [
  'STRING',
  'INTEGER',
  'BIGINT',
  'TEXT',
  'DOUBLE',
  'DATEONLY',
  'BOOLEAN'
]

let exp = {
  defineModel: defineModel,
  sync: () => {
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({force: true})
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to "production"')
    }
  }
}

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

module.exports = exp