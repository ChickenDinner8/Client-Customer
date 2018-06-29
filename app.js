//app.js
const ERequest = require('./utils/util.js').ERequest;

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let postBody = {}
    
    let login = function() {
      return new Promise(function(resolve, reject){
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            postBody.code = res.code;
            console.log(res);
            resolve();
          }
        })
      })
    }

    // 获取用户信息
    let getSetting = function() {
      return new Promise(function(resolve, reject){
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  getApp().globalData.userInfo = res.userInfo
                  console.log(res);
                  postBody.nickname = res.userInfo.nickName;
                  postBody.avatar = res.userInfo.avatarUrl;
                  resolve();

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (getApp().userInfoReadyCallback) {
                    getApp().userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      })
    }
    Promise
      .all([login(), getSetting()])
      .then(function() {
        console.log(postBody);
        ERequest({
          url: getApp().globalData.baseUrl + '/buyer/session',
          method: 'POST',
          data: postBody,
          success: res => {
            console.log(res);
          }
        })
      })
    
  },
  globalData: {
    userInfo: null,
    baseUrl: "http://206.189.223.252/api"
  }
})