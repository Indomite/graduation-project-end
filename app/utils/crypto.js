const crypto = require('crypto');

function genPassword(data) {
  let res = crypto.createHash('md5').update(data).digest('hex');
  return res
}

module.exports = {
  genPassword
}