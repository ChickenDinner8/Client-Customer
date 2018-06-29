// comment.js
Page({
  /**
   * 页面的初始数据
   */
  onLoad: function () {
    this.setData({
      //icon20: base64.icon20,
      //icon60: base64.icon60
    });
  },
  data: {
    comment: [{
      img: '../../images/comment_img1.jpg',
      userImg: '../../images/userimg1.png',
      userName: '一叶知秋',
      date: '2018-04-01',
      desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。吧啦吧啦吧啦吧啦……',
      likeCount: '10',
      unlikeCount: '99'
    }, {
      img: '../../images/comment_img2.jpg',
      userImg: '../../images/userimg2.png',
      userName: '就是不说名字的人',
      date: '2018-02-11',
      desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。吧啦吧啦吧啦吧啦……',
      likeCount: '100',
      unlikeCount: '50'
    }]
  },  
<<<<<<< HEAD
  //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
  to_newcomment: function () {
    wx.navigateTo({
      url: '../newcomment/newcomment',
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
=======
>>>>>>> master
});