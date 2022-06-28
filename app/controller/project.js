'use strict';

const Controller = require('egg').Controller;
const { SuccessModel, ErrorModel } = require('../model/resModel')

class ProjectController extends Controller {
  // 根据user_no查询项目信息
  async getProjectInfoByUserNo() {
    const ctx = this.ctx;
    const user_no = ctx.params.user_no;
    let result = await ctx.service.project.getProjectInfoByUserNo(user_no);
    if (result) {
      ctx.body = new SuccessModel(result, '查询成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前项目~');
    }
  }
  // 查询所有项目信息
  async getProjectInfoAll() {
    const ctx = this.ctx;
    let result = await ctx.service.project.getProjectInfoAll();
    if (result) {
      ctx.body = new SuccessModel(result, '查询成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前项目~');
    }
  }
  // 添加项目信息
  async createProjectInfo() {
    const ctx = this.ctx;
    let projectInfo = ctx.request.body;
    let result = await ctx.service.project.createProjectInfo(projectInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('项目添加成功~');
    } else {
      ctx.body = new ErrorModel('项目添加失败~');
    }
  }
  // 更新项目信息
  async updateProjectInfo() {
    const ctx = this.ctx;
    const projectId = ctx.params.id;
    let projectInfo = ctx.request.body;
    let result = await ctx.service.project.updateProjectInfo(projectId, projectInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('项目更新成功~');
    } else {
      ctx.body = new ErrorModel('项目更新失败~');
    }
  }
  // 删除项目信息
  async deleteProjectInfo() {
    const ctx = this.ctx;
    const projectId = ctx.params.id;
    let result = await ctx.service.project.deleteProjectInfo(projectId);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('项目删除成功~');
    } else {
      ctx.body = new ErrorModel('项目删除失败~');
    }
  }
}

module.exports = ProjectController;