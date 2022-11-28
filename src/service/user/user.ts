import { UserModel } from '../../models'

export default {
  list: async () => {
    const list = await UserModel.userList()
    return list
  }
}