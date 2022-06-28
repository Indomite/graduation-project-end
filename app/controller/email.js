'use strict';

const Controller = require('egg').Controller;
const { sendEmail } = require('../utils/sendEmail')
const { SuccessModel, ErrorModel } = require('../model/resModel')

class SendEmailController extends Controller {
  async sentCode() {
    const { ctx } = this
    try {
      let { email } = ctx.request.body;
      let verifyCode = (Math.random() * 9).toString().slice(3,9)
      await sendEmail(email, verifyCode)
      ctx.session.email = email
      ctx.session.verifyCode = verifyCode
      ctx.body = new SuccessModel('发送成功')
    } catch (err) {
      ctx.body = new ErrorModel(err)
    }
  }
}

module.exports = SendEmailController;