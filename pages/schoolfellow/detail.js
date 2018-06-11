// pages/schoolfellow/detail.js
const app = getApp()
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
    this.fetchData()
  },

  /**
   * 获取数据
   */
  fetchData: function(){
    
  }
})