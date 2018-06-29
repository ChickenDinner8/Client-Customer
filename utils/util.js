const cookie = require('./cookie/Cookie.js').cookie;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function ERequest(param) {
  const header = cookie.toString();
  if (header !== '') {
    if (param.header) {
      param.header.cookie = header;
    } else {
      param.header = {
        cookie: header,
      };
    }
  }

  const success = param.success;
  param.success = successWrap;
  wx.request(param);
  function successWrap(res) {
    if (res.header && res.header['Set-Cookie']) {
      cookie.setRawCookie(res.header['Set-Cookie']);
    }
    if (success) {
      success(res);
    }
  }
}

module.exports = {
  formatTime: formatTime,
  ERequest : ERequest
}
