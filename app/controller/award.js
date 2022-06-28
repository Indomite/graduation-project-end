'use strict';

const Controller = require('egg').Controller;
const { SuccessModel, ErrorModel } = require('../model/resModel')

class AwardController extends Controller {
  // 根据id查询获奖信息
  async getAwardInfoById() {
    const ctx = this.ctx;
    let awardId = ctx.params.id;
    let result = await ctx.service.award.getAwardInfoById(awardId);
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前获奖~');
    }
  }
  // 查询所有获奖信息
  async getAwardInfoAll() {
    const ctx = this.ctx;
    let result = await ctx.service.award.getAwardInfoAll();
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前获奖~');
    }
  }
  // 添加获奖信息
  async createAwardInfo() {
    const ctx = this.ctx;
    let award = ctx.request.body;
    let result = await ctx.service.award.createAwardInfo(award);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('获奖添加成功~');
    } else {
      ctx.body = new ErrorModel('获奖添加失败~');
    }
  }
  // 更新获奖信息
  async updateAwardInfo() {
    const ctx = this.ctx;
    const awardId = ctx.params.id;
    let awardInfo = ctx.request.body;
    let result = await ctx.service.award.updateAwardInfo(awardId, awardInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('获奖更新成功~');
    } else {
      ctx.body = new ErrorModel('获奖更新失败~');
    }
  }
  // 删除获奖信息
  async deleteAwardInfo() {
    const ctx = this.ctx;
    let awardId = ctx.params.id;
    let result = await ctx.service.award.deleteAwardInfo(awardId);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('获奖删除成功~');
    } else {
      ctx.body = new ErrorModel('获奖删除失败~');
    }
  }
}

module.exports = AwardController;