// pages/submit/submit.js
const ERequest = require('../../utils/util.js').ERequest;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'ChickenDinner8！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), 
    order:[],
    totalPrice: '',
    customer_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let menu = wx.getStorageSync('data')
    this.setData({
      //order: menu
      order: menu.filter( (res) => res.num > 0)
    })
    let totalPrice = wx.getStorageSync('totalPrice')
    this.setData({
      totalPrice: totalPrice
    })
    let customer_id = wx.getStorageSync('customer_id')
    this.setData({
      customer_id: customer_id
    })
    let totalNum = wx.getStorageSync('totalNum')
    this.setData({
      totalNum: totalNum
    })
    console.log('load data', this.data)
    //wx.clearStorageSync('data')
  },

  submitOrder: function () {
    var that = this
    wx.showToast({
      title: '订单提交中',
      icon: 'loading',
      duration: 300000
    })

    let tableInfo = wx.getStorageSync('tableInfo')
    this.setData({
      tableInfo: tableInfo
    })
    console.log('load tableInfo', this.data.tableInfo)
    let postBody = {}
    postBody = {foods: that.data.order}
    console.log('postBody', postBody);
    ERequest({
      url: getApp().globalData.baseUrl + '/restaurant/orders/'+this.data.tableInfo.restaurantId.toString()+'/'+this.data.tableInfo.tableId.toString(),
      method: 'POST',
      data: postBody,
      success: res => {
        wx.hideToast();
        console.log('submit success', res);
        wx.navigateTo({
          url: '../payment/payment',
          success: function (res) {
            console.log('succeed to payment page')
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})