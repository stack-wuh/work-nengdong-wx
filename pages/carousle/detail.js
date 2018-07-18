// pages/carousle/detail.js
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = getCurrentPages()
    const prevPage = page[page.length - 2]
    this.data.info = prevPage.data.carousle[options.index]
    wx.setNavigationBarTitle({
      title: this.data.info.title
    })
    this.setData({
      info:this.data.info
    })
    var article = prevPage.data.carousle[options.index].content
    WxParse.wxParse('article', 'html', article, this, 10)
  },
})