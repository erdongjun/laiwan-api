import { Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'user' })
class UserModel extends Model<UserModel> {
  static async userList(): Promise<any> {
    const sql = `SELECT * FROM user `
    const [rows] = await UserModel.sequelize?.query(sql,{raw: true})
    return rows
  }
}

export default UserModel
