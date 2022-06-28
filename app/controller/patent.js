'use strict';

const Controller = require('egg').Controller;
const { SuccessModel, ErrorModel } = require('../model/resModel')

class PatentController extends Controller {
  // 根据user_no查询专利信息
  async getPatentInfoByUserNo() {
    const ctx = this.ctx;
    let user_no = ctx.params.user_no;
    let result = await ctx.service.patent.getPatentInfoByUserNo(user_no);
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前专利~');
    }
  }
  // 查询所有专利信息
  async getPatentInfoAll() {
    const ctx = this.ctx;
    let result = await ctx.service.patent.getPatentInfoAll();
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前专利~');
    }
  }
  // 添加专利信息
  async createPatentInfo() {
    const ctx = this.ctx;
    let patent = ctx.request.body;
    let result = await ctx.service.patent.createPatentInfo(patent);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('专利添加成功~');
    } else {
      ctx.body = new ErrorModel('专利添加失败~');
    }
  }
  // 更新专利信息
  async updatePatentInfo() {
    const ctx = this.ctx;
    const patentId = ctx.params.id;
    let patentInfo = ctx.request.body;
    let result = await ctx.service.patent.updatePatentInfo(patentId, patentInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('专利更新成功~');
    } else {
      ctx.body = new ErrorModel('专利更新失败~');
    }
  }
  // 删除专利信息
  async deletePatentInfo() {
    const ctx = this.ctx;
    let patentId = ctx.params.id;
    let result = await ctx.service.patent.deletePatentInfo(patentId);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('专利删除成功~');
    } else {
      ctx.body = new ErrorModel('专利删除失败~');
    }
  }
}

module.exports = PatentController;