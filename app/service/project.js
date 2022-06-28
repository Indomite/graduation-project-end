'use strict';

const Service = require('egg').Service;

class ProjectService extends Service {
  // 根据user_no查询项目信息
  async getProjectInfoByUserNo(user_no) {
    let sql = `SELECT * FROM data_collection_project AS e, data_collection_user AS u WHERE e.user_no=u.user_no AND e.user_no=${user_no}`;
    let result = await this.app.mysql.query(sql);
    return result;
  }
  // 查询所有项目信息
  async getProjectInfoAll() {
    let sql = `SELECT * FROM data_collection_project AS e, data_collection_user AS u WHERE e.user_no=u.user_no`;
    let result = await this.app.mysql.query(sql);
    return result;
  }
  // 添加项目信息
  async createProjectInfo(projectInfo) {
    let result = await this.app.mysql.insert('data_collection_project', projectInfo);
    return result;
  }
  // 更新项目信息
  async updateProjectInfo(projectId, projectInfo) {
    let result = await this.app.mysql.update('data_collection_project', { ...projectInfo, id: projectId });
    return result;
  }
  // 删除项目信息
  async deleteProjectInfo(projectId) {
    let result = await this.app.mysql.delete('data_collection_project', { id: projectId });
    return result;
  }
}

module.exports = ProjectService;