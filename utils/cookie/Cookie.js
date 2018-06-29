class Cookie {
  constructor(storageKey) {
    this._cookie = {};
    this._storageKey = storageKey;
    this.setCookieFromStorage(storageKey);
  }
  setRawCookie(str) {
    let cookie = this.parseRawCookie(str);
    let expires = parseInt(cookie['Max-Age']) + parseInt(Date.now());
    this.setCookie(cookie.key, cookie.value, expires);
    this.setCookieToStorage(this._storageKey)
  }
  setCookie(key, value, expires) {
    // console.log('cookie', this._cookie)
    this._cookie[key] = {
      value: value,
      expires: expires
    }
  }
  getCookie(key) {
    if (this._cookie[key] && this.isValid(this._cookie[key])) {
      return this._cookie[key].value;
    } else {
      return null;
    }
  }
  isValid(CookieProp) {
    let expires = CookieProp.expires;
    if (expires > Date.now()) {
      return true;
    } else {
      return false;
    }
  }
  parseRawCookie(str) {
    let props = str.split(/;\s*/);
    let cookie = {};
    props.forEach(function(item, index) {
      let pair = item.split('=');
      if (index === 0) {
        cookie.key = pair[0];
        cookie.value = pair[1];
      } else {
        cookie[pair[0]] = pair[1];
      }
    })
    // console.log(cookie)
    return cookie;
  }
  setCookieFromStorage(storageKey) {
    this._cookie = wx.getStorageSync(storageKey);
    if (this._cookie === '') {
      this._cookie = {}
      wx.setStorageSync(storageKey, {})
    }
  }
  setCookieToStorage(storageKey) {
    // console.log(this._cookie)
    wx.setStorage({
      key: storageKey,
      data: this._cookie
    })
  }
  toString() {
    let keys = Object.keys(this._cookie);
    let key = keys[0];
    let value = this.getCookie(key);
    if (value === null) {
      return ''
    } else {
      return `${key}=${value}`
    }
  }
}

module.exports = {
  cookie: new Cookie('cookie')
}