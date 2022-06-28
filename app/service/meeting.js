'use strict';

const Service = require('egg').Service;

class MeetingService extends Service {
  // 根据user_no查询会议信息
  async getMeetingInfoByUserNo(user_no) {
    let sql = `SELECT * FROM data_collection_meeting AS e, data_collection_user AS u WHERE e.user_no=u.user_no AND e.user_no=${user_no}`;
    let result = await this.app.mysql.query(sql);
    return result;
  }
  // 查询所有会议信息
  async getMeetingInfoAll() {
    let sql = `SELECT * FROM data_collection_meeting AS e, data_collection_user AS u WHERE e.user_no=u.user_no`;
    let result = await this.app.mysql.query(sql);
    return result
  }
  // 添加会议信息
  async createMeetingInfo(meeting) {
    let result = await this.app.mysql.insert('data_collection_meeting', meeting);
    return result;
  }
  // 更新会议信息
  async updateMeetingInfo(meetingId, meetingInfo) {
    let result = await this.app.mysql.update('data_collection_meeting',{ ...meetingInfo, id: meetingId });
    return result;
  }
  // 删除会议信息
  async deleteMeetingInfo(meetingId) {
    let result = await this.app.mysql.delete('data_collection_meeting', { id: meetingId });
    return result;
  }
}
module.exports = MeetingService;