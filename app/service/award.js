'use strict';

const Service = require('egg').Service;

class AwardService extends Service {
  // 根据user_no查询获奖信息
  async getAwardInfoByUserNo(user_no) {
    let sql = `SELECT * FROM data_collection_award AS e, data_collection_user AS u WHERE e.user_no=u.user_no AND e.user_no=${user_no}`;
    let result = await this.app.mysql.query(sql);
    return result;
  }
  // 查询所有获奖信息
  async getAwardInfoAll() {
    let sql = `SELECT * FROM data_collection_award AS e, data_collection_user AS u WHERE e.user_no=u.user_no`;
    let result = await this.app.mysql.query(sql);
    return result
  }
  // 添加获奖信息
  async createAwardInfo(award) {
    let result = await this.app.mysql.insert('data_collection_award', award);
    return result;
  }
  // 更新获奖信息
  async updateAwardInfo(awardId, awardInfo) {
    let result = await this.app.mysql.update('data_collection_award', { ...awardInfo, id: awardId });
    return result;
  }
  // 删除获奖信息
  async deleteAwardInfo(awardId) {
    let result = await this.app.mysql.delete('data_collection_award', { id: awardId });
    return result;
  }
}
module.exports = AwardService;