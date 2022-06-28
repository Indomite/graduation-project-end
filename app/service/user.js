'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 查询所有用户信息
  async getUserInfoAll() {
    let result = await this.app.mysql.select('data_collection_user');
    return result
  }
  // 根据user_no查询用户信息
  async getUserInfoByNo(userNo) {
    let result = await this.app.mysql.get('data_collection_user', { user_no: userNo });
    return result
  }
  // 添加用户信息
  async createUserInfo(user) {
    let result = await this.app.mysql.insert('data_collection_user', user);
    return result;
  }
  // 更新用户信息
  async updateUserInfo(userId, userInfo) {
    let result = await this.app.mysql.update('data_collection_user', { ...userInfo, id: userId });
    return result;
  }
  // 删除用户信息
  async deleteUserInfo(userId) {
    let result = await this.app.mysql.delete('data_collection_user', { id: userId });
    return result;
  }
}
module.exports = UserService;