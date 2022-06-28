'use strict';

const Controller = require('egg').Controller;
const { SuccessModel, ErrorModel } = require('../model/resModel')

class MeetingController extends Controller {
  // 根据id查询会议信息
  async getMeetingInfoById() {
    const ctx = this.ctx;
    let meetingId = ctx.params.id;
    let result = await ctx.service.meeting.getMeetingInfoById(meetingId);
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前会议~');
    }
  }
  // 查询所有会议信息
  async getMeetingInfoAll() {
    const ctx = this.ctx;
    let result = await ctx.service.meeting.getMeetingInfoAll();
    if (result) {
      ctx.body = new SuccessModel(result, '获取成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前会议~');
    }
  }
  // 添加会议信息
  async createMeetingInfo() {
    const ctx = this.ctx;
    let meeting = ctx.request.body;
    let result = await ctx.service.meeting.createMeetingInfo(meeting);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('会议添加成功~');
    } else {
      ctx.body = new ErrorModel('会议添加失败~');
    }
  }
  // 更新会议信息
  async updateMeetingInfo() {
    const ctx = this.ctx;
    const meetingId = ctx.params.id;
    let meetingInfo = ctx.request.body;
    let result = await ctx.service.meeting.updateMeetingInfo(meetingId, meetingInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('会议更新成功~');
    } else {
      ctx.body = new ErrorModel('会议更新失败~');
    }
  }
  // 删除会议信息
  async deleteMeetingInfo() {
    const ctx = this.ctx;
    let meetingId = ctx.params.id;
    let result = await ctx.service.meeting.deleteMeetingInfo(meetingId);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('会议删除成功~');
    } else {
      ctx.body = new ErrorModel('会议删除失败~');
    }
  }
}

module.exports = MeetingController;