import path from 'path'
import { Sequelize } from 'sequelize-typescript'

import { config } from '../config'
const { mysql } = config

const poolList: { [key: string]: Sequelize } = {}

const mapModel = (key: string) => {
  if (poolList[key]) {
    return poolList[key]
  }

  const modelPaths = [path.resolve(__dirname, `../models/${key}`)]
  console.log({modelPaths})
  const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    dialect: 'mysql',
    host: mysql.host,
    port: mysql.port,
    modelPaths,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      timestamps: false,
      freezeTableName: false,
      underscored: true,
    },
    timezone: '+08:00',
    logging: console.log,
  })

  poolList[key] = sequelize

  return sequelize
}

export default (key: string) => mapModel(key)
