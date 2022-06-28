'use strict';

const Service = require('egg').Service;

class PaperService extends Service {
  // 根据user_no查询论文信息
  async getPaperInfoByUserNo(user_no) {
    let sql = `SELECT * FROM data_collection_paper AS e, data_collection_user AS u WHERE e.user_no=u.user_no AND e.user_no=${user_no}`;
    let result = await this.app.mysql.query(sql);
    return result;
  }
  // 查询所有论文信息
  async getPaperInfoAll() {
    let sql = `SELECT * FROM data_collection_paper AS e, data_collection_user AS u WHERE e.user_no=u.user_no`;
    let result = await this.app.mysql.query(sql);
    return result
  }
  // 添加论文信息
  async createPaperInfo(paper) {
    let result = await this.app.mysql.insert('data_collection_paper', paper);
    return result;
  }
  // 更新论文信息
  async updatePaperInfo(paperId, paperInfo) {
    let result = await this.app.mysql.update('data_collection_paper', { ...paperInfo, id: paperId });
    return result;
  }
  // 删除论文信息
  async deletePaperInfo(paperId) {
    let result = await this.app.mysql.delete('data_collection_paper', { id: paperId });
    return result;
  }
}
module.exports = PaperService;