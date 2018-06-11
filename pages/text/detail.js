// pages/text/detail.js
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    let pages = getCurrentPages()
    let prevPage = pages[pages.length-2]
    this.setData({
      info: prevPage.data.list[index]
    })
    wx.setNavigationBarTitle({
      title: this.data.info.title
    })
    var article = prevPage.data.list[index].proclaim
    WxParse.wxParse('article', 'html', article, this, 10)
  },

  
})