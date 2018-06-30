//menu.js
//获取应用实例
//const app = getApp()

Page({
  data: {
    /*motto: 'ChickenDinner8！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), */
    menu: [],
    shopping: [],
    latestPrice: '0',
    totalPrice: '0',
    totalNum: '0'
  },
  //事件处理函数
  /*bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function () {
    /*if (app.globalData.userInfo) {
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
    }*/

    wx.showToast({
      title: '正在全力加载中',
      icon: 'loading',
      duration: 3000000
    })
    // request 
    var that = this
    wx.request({
      url: 'http://206.189.223.252/api/menu/4',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideToast();
        //console.log('get menu', res.data.foods)
        that.setData({
          menu: res.data.foods
        })
        for (var i = 0; i < that.data.menu.length; i++) {
          //that.data.menu[i].index = i.toString();
          var param = {}
          var string = 'menu[' + i + '].index'
          param[string] = i
          that.setData(param)
          string = 'menu[' + i + '].num'
          param[string] = 0
          that.setData(param)
        }
        //console.log('set menu', that.data.menu)
      },

      /*fail: function(res) {
        console.log('failed to load!')
      }*/
    })
  },
  /*getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },*/

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
    if (this.data.totalNum != '0') {
      wx.setStorageSync('data', this.data.menu)
      wx.setStorageSync('totalPrice', this.data.totalPrice)
      wx.setStorageSync('totalNum', this.data.totalNum)

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
    } else {
      wx.showModal({
        content: '小主还没点餐呢',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('去点餐')
          }
        }
      });
    }
    
  },

  // 将菜品加入购物车
  addDish: function(event) {
    //console.log('set menu', this.data.menu)
    //console.log('click event', event.target)
    var obj = this.data.menu[event.target.dataset.index]
    this.setData({ latestPrice: parseFloat(this.data.latestPrice) + parseFloat(obj.price) })
    this.setData({ totalPrice: this.data.latestPrice})
    this.setData({ totalNum: parseInt(this.data.totalNum) + 1 })
    obj.num++
    console.log('add food ', obj.index)
  },

})
