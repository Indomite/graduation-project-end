'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户登录、注册
  router.post('/api/login', controller.user.login);
  router.post('/api/register', controller.user.register);
  // 用户信息管理
  router.post('/api/user', controller.user.createUserInfo);
  router.get('/api/user', controller.user.getUserInfoAll);
  router.get('/api/user/:id', controller.user.getUserInfoByNo);
  router.get('/api/queryCurrentUser', controller.user.getUserInfoByToken);
  router.put('/api/user/:id', controller.user.updateUserInfo);
  router.delete('/api/user/:id', controller.user.deleteUserInfo);

  // 项目信息管理
  router.post('/api/project', controller.project.createProjectInfo);
  router.get('/api/project', controller.project.getProjectInfoAll);
  router.get('/api/project/:user_no', controller.project.getProjectInfoByUserNo);
  router.put('/api/project/:id', controller.project.updateProjectInfo);
  router.delete('/api/project/:id', controller.project.deleteProjectInfo);

  // 论文信息管理
  router.post('/api/paper', controller.paper.createPaperInfo);
  router.get('/api/paper', controller.paper.getPaperInfoAll);
  router.get('/api/paper/:user_no', controller.paper.getPaperInfoByUserNo);
  router.put('/api/paper/:id', controller.paper.updatePaperInfo);
  router.delete('/api/paper/:id', controller.paper.deletePaperInfo);

  // 专利信息管理
  router.post('/api/patent', controller.patent.createPatentInfo);
  router.get('/api/patent', controller.patent.getPatentInfoAll);
  router.get('/api/patent/:user_no', controller.patent.getPatentInfoByUserNo);
  router.put('/api/patent/:id', controller.patent.updatePatentInfo);
  router.delete('/api/patent/:id', controller.patent.deletePatentInfo);

  // 获奖信息管理
  router.post('/api/award', controller.award.createAwardInfo);
  router.get('/api/award', controller.award.getAwardInfoAll);
  router.get('/api/award/:id', controller.award.getAwardInfoById);
  router.put('/api/award/:id', controller.award.updateAwardInfo);
  router.delete('/api/award/:id', controller.award.deleteAwardInfo);

  // 会议信息管理
  router.post('/api/meeting', controller.meeting.createMeetingInfo);
  router.get('/api/meeting', controller.meeting.getMeetingInfoAll);
  router.get('/api/meeting/:id', controller.meeting.getMeetingInfoById);
  router.put('/api/meeting/:id', controller.meeting.updateMeetingInfo);
  router.delete('/api/meeting/:id', controller.meeting.deleteMeetingInfo);

  // 上传文件
  router.post('/api/upload', controller.upload.uploadFile);

  // 发送邮件
  router.post('/api/sendEmail', controller.email.sentCode);
};
