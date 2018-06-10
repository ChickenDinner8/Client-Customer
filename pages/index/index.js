//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'ChickenDinner8！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), 
    menu:[{
      index: '0',
      name: '板烧鸡腿堡',
      price: '5',
      dsp: '香嫩多汁',
      pic: '../../images/汉堡.png'
    }, {
      index: '1',
      name: '薯条',
      price: '10',
      dsp: '新鲜出炉',
      pic: '../../images/薯条.png'
    }],
    totalPrice: '0',
    latestPrice: '0'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
  to_comment:function() {
    wx.navigateTo({
      url: '../comment/comment',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  to_submit: function () {
    wx.navigateTo({
      url: '../submit/submit',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 将菜品加入购物车
  /*addDish: function() {
    this.setData({total: "2"})
  },*/
  addDish: function(event) {
    console.log(event)
    //this.setData({latestPrice: this.data.latestPrice + this.data.menu[0].price})
    this.setData({ latestPrice: parseFloat(this.data.latestPrice) + parseFloat(this.data.menu[event.target.dataset.index].price) })
    this.setData({ totalPrice: this.data.latestPrice})
  },

})
