'use strict';

const Controller = require('egg').Controller;
const { genPassword } = require('../utils/crypto')
const { SuccessModel, ErrorModel } = require('../model/resModel')

class UserController extends Controller {

  // 用户登录
  async login() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      const userDetail = await ctx.service.user.getUserInfoByNo(data.user_no);
      if (!userDetail) {
        ctx.body = new ErrorModel('用户不存在~')
        ctx.body.status = 403;
        return
      }
      if (genPassword(data.password) === userDetail.password) {
        const token = this.app.jwt.sign({ user_no: data.user_no, role: userDetail.role }, this.app.config.jwt.secret);
        ctx.body = new SuccessModel(userDetail, '登录成功~');
        ctx.body.token = token
      } else {
        ctx.body = new ErrorModel('密码错误~')
        ctx.body.status = 401;
      }
    } catch (error) {
      ctx.body = new ErrorModel('网络错误~');
    }
  }
  // 用户注册
  async register() {
    const { ctx } = this;
    const { username, user_no, password, email, unit, code } = ctx.request.body;
    if (email !== ctx.session.email) {
      ctx.body = new ErrorModel('邮箱已修改')
      return
    }
    if (code !== ctx.session.verifyCode) {
      ctx.body = new ErrorModel('验证码错误')
      return
    }
    let params = { username, user_no, password, email, unit }
    const userDetail = await ctx.service.user.getUserInfoByNo(params.user_no);
    if (userDetail) {
      ctx.body = new ErrorModel('用户已存在');
      ctx.body.status = 403
    } else {
      params.password = genPassword(params.password);
      let result = await ctx.service.user.createUserInfo(params)
      if (result.affectedRows === 1) {
        ctx.body = new SuccessModel(userDetail, '注册成功~');
      } else {
        ctx.body = new ErrorModel('注册失败~');
      }
    }
  }
  // 根据token获取用户信息
  async getUserInfoByToken() {
    const { ctx } = this;
    let authorization = ctx.request.headers["authorization"];
    let token = authorization.split(" ")[1] || '';
    let result = this.app.jwt.verify(token, this.app.config.jwt.secret);
    if (result) {
      ctx.body = JSON.stringify(result)
    }
  }
  // 查询所有用户信息
  async getUserInfoAll() {
    const ctx = this.ctx;
    let result = await ctx.service.user.getUserInfoAll();
    if (result) {
      ctx.body = new SuccessModel(result, '查询成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前用户~');
    }
  }
  // 根据id查询用户信息
  async getUserInfoByNo() {
    const ctx = this.ctx;
    let userNo = ctx.params.id;
    let result = await ctx.service.user.getUserInfoByNo(userNo);
    if (result) {
      ctx.body = new SuccessModel(result, '查询成功~');
    } else {
      ctx.body = new ErrorModel('不存在当前用户~');
    }
  }
  // 添加用户信息
  async createUserInfo() {
    const ctx = this.ctx;
    let user = ctx.request.body;
    let result = await ctx.service.user.createUserInfo(user);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('用户添加成功~');
    } else {
      ctx.body = new ErrorModel('用户添加失败~');
    }
  }
  // 更新用户信息
  async updateUserInfo() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    let userInfo = ctx.request.body;
    let result = await ctx.service.user.updateUserInfo(userId, userInfo);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('用户更新成功~');
    } else {
      ctx.body = new ErrorModel('用户更新失败~');
    }
  }
  // 删除用户信息
  async deleteUserInfo() {
    const ctx = this.ctx;
    let userId = ctx.params.id;
    let result = await ctx.service.user.deleteUserInfo(userId);
    if (result.affectedRows === 1) {
      ctx.body = result;
      ctx.body = new SuccessModel('用户删除成功~');
    } else {
      ctx.body = new ErrorModel('用户删除失败~');
    }
  }
}

module.exports = UserController;