// pages/activity/chosetime/chosetime.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:{
      time:'',
      date:''
    },
    end:{
      time:'',
      date:''
    }
  },

  timeChange(e){
    let type = e.currentTarget.dataset.type
    switch(type){
      case 1 : this.setData({start:{date:e.detail.value,time:this.data.start.time}})
                break;
      case 2 : this.setData({start:{time:e.detail.value,date:this.data.start.date}})
                break;
      case 3 : this.setData({end:{date:e.detail.value,time:this.data.end.time}})
                break;
      case 4 : this.setData({end:{time:e.detail.value,date:this.data.end.date}})
               break;
    }
  },
  jumpToOther(){
    wx.setStorageSync('start',this.data.start)
    wx.setStorageSync('end',this.data.end)
    wx.navigateBack({ 
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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