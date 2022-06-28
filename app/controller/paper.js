'use strict';

const Controller = require('egg').Controller;
const { SuccessModel, ErrorModel } = require('../model/resModel')

class PaperController extends Controller {
  // 根据id查询论文信息
  async getPaperInfoByUserNo() {
    const ctx = this.ctx;
    let user_no = ctx.params.user_no;
    let result = await ctx.service.paper.getPaperInfoByUserNo(user_no);
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前论文~');
    }
  }
  // 查询所有论文信息
  async getPaperInfoAll() {
    const ctx = this.ctx;
    let result = await ctx.service.paper.getPaperInfoAll();
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前论文~');
    }
  }
  // 添加论文信息
  async createPaperInfo() {
    const ctx = this.ctx;
    let paper = ctx.request.body;
    let result = await ctx.service.paper.createPaperInfo(paper);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('论文添加成功~');
    } else {
      ctx.body = new ErrorModel('论文添加失败~');
    }
  }
  // 更新论文信息
  async updatePaperInfo() {
    const ctx = this.ctx;
    const paperId = ctx.params.id;
    let paperInfo = ctx.request.body;
    let result = await ctx.service.paper.updatePaperInfo(paperId, paperInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('论文更新成功~');
    } else {
      ctx.body = new ErrorModel('论文更新失败~');
    }
  }
  // 删除论文信息
  async deletePaperInfo() {
    const ctx = this.ctx;
    let paperId = ctx.params.id;
    let result = await ctx.service.paper.deletePaperInfo(paperId);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('论文删除成功~');
    } else {
      ctx.body = new ErrorModel('论文删除失败~');
    }
  }
}

module.exports = PaperController;