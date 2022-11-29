import path from 'path'

export default {
  // 端口号
  port: 7700,
  staticPath: path.resolve(__dirname, '../../public'),
  // mysql
  mysql: {
    host: '42.193.120.138',
    port: 3306,
    username: 'laiwan',
    password: 'zRMYjfKdKcW7bcxb',
    database: 'laiwan',
  }
}