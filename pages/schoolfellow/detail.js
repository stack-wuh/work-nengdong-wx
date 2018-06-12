// pages/schoolfellow/detail.js
const app = getApp()
const WxParse = require('../../utils/wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    let index = options.index
    let pages = getCurrentPages()
    let prevPages = pages[pages.length - 2]
    this.setData({
      info:prevPages.data.list[index]
    })
    var article = prevPages.data.list[index].content
    WxParse.wxParse('article','html',article,this,10)
  },

  /**
   * 获取数据
   */
  fetchData: function(){
    
  }
})