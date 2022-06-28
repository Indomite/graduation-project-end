'use strict';

const Controller = require('egg').Controller;

const path = require('path');
const fs = require('fs');

class UploadController extends Controller {
  // 上传文件
  async uploadFile() {
    const ctx = this.ctx;
    const file = ctx.request.files[0];
    const fileData = fs.readFileSync(file.filepath);
    const fileName = `${new Date().getMonth()+1}${new Date().getDate()}-${file.filename}`
    const dirName = ctx.helper.formatTime(new Date())
    const basePath = path.join(this.config.baseDir, 'app/public/upload/')
    let dirPath = path.join(basePath, `${dirName}`);
    let filePath = ctx.request.host + '/public/upload/' + `${dirName}/${fileName}`
    // 判断是否存在该文件夹，不存在则创建。
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    };
    const targetPath = path.join(basePath, `${dirName}/${fileName}`);
    try {
      await fs.writeFileSync(targetPath, fileData);
      ctx.status = 200;
      ctx.body = {
        filePath
      };
    } catch (e) {
      ctx.status = 500;
      ctx.body = { msg: '上传文件失败' };
    }
  }
}

module.exports = UploadController;