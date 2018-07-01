// comment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment_count: '0',
    comment: [{
      img: '../../images/comment_img1.jpg',
      userImg: '../../images/userimg1.png',
      userName: '一叶知秋',
      date: '2018-05-28',
      desc: '好吃的菜，可爱的人，有趣的心灵，还会再来的。',
      likeCount: 31,
      unlikeCount: 5,
      canlike: 'true',
      index: 0
    }, {
      img: '../../images/comment_img3.jpg',
      userImg: '../../images/userimg3.png',
      userName: '就是不说名字的人',
      date: '2018-04-25',
      desc: '恭喜爱我们总是帮我们debug的zj爸爸又成熟一岁，今天吃的很开心，喜欢这家餐厅，喜欢704在一起的每一天',
      likeCount: 101,
      unlikeCount: 0,
      canlike: 'true',
      index: 1
    }]
  }, 

  onLoad: function () {
    this.setData({
      comment_count: this.data.comment.length.toString()
    });
    console.log('comment_count', this.data.comment_count)
  },

  toCommit: function() {
    wx.showToast({
      title: '功能正在开发中',
      icon: 'loading',
      duration: 1000
    })
  },

  addLike: function(event) {
    var index = event.target.id
    if (this.data.comment[index].canlike === 'true') {
      console.log('comment data ', this.data)
      var param = {}
      var string = 'comment[' + index + '].canlike'
      var string2 = 'comment[' + index + '].likeCount'
      param[string] = 'false'
      this.setData(param)
      param[string2] = this.data.comment[index].likeCount + 1
      this.setData(param)
      console.log('param', param)
      console.log('after setData', this.data.comment)
    } else {
      wx.showModal({
        content: '你已经表态过了哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('再次点击like/unlike')
          }
        }
      })
    }
  },

  addUnlike: function(event) {
    console.log('comment data ', this.data)
    var index = event.target.id
    console.log('unlike touch index', index)
    if (this.data.comment[index].canlike == 'true') {
      var param = {}
      var string = 'comment[' + index + '].canlike'
      var string2 = 'comment[' + index + '].unlikeCount'
      param[string] = 'false'
      this.setData(param)
      param[string2] = this.data.comment[index].unlikeCount + 1
      this.setData(param)
    } else {
      wx.showModal({
        content: '你已经表态过了哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('再次点击like/unlike')
          }
        }
      })
    }
  }
});