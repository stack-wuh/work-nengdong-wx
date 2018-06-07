// pages/schoolfellow/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInput: false,
    name: '',
    list: [],
    page: 1,
    showMore: true,
    remind: '正在加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
  },

  /**
   * 获取数据
   */
  fetchData: function(){
    let data = {

    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  bindblur() {
    this.setData({
      showInput: false
    })
  },
  saveInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  showInput() {
    this.setData({
      showInput: true
    })
  },

})