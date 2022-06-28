const moment = require('moment')

module.exports = {
  formatTime(date, format = 'YYYY-MM-DD') {
    return moment(date).format(format)
  }
};