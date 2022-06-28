'use strict';

const Service = require('egg').Service;

class PatentService extends Service {
  // 根据user_no查询专利信息
  async getPatentInfoByUserNo(user_no) {
    let sql = `SELECT * FROM data_collection_patent AS e, data_collection_user AS u WHERE e.user_no=u.user_no AND e.user_no=${user_no}`;
    let result = await this.app.mysql.query(sql);
    return result;
  }
  // 查询所有专利信息
  async getPatentInfoAll() {
    let sql = `SELECT * FROM data_collection_patent AS e, data_collection_user AS u WHERE e.user_no=u.user_no`;
    let result = await this.app.mysql.query(sql);
    return result
  }
  // 添加专利信息
  async createPatentInfo(patent) {
    let result = await this.app.mysql.insert('data_collection_patent', patent);
    return result;
  }
  // 更新专利信息
  async updatePatentInfo(patentId, patentInfo) {
    let result = await this.app.mysql.update('data_collection_patent', { ...patentInfo, id: patentId });
    return result;
  }
  // 删除专利信息
  async deletePatentInfo(patentId) {
    let result = await this.app.mysql.delete('data_collection_patent', { id: patentId });
    return result;
  }
}
module.exports = PatentService;