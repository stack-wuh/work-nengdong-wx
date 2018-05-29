// pages/other/help/common.js
var app = getApp()
var id
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.argus
    this.fetchData(options.argus)
  },

  // 跳转到编辑
  jumpToEdit(){
    wx.navigateTo({
      url:"/pages/other/help/publish?type=edit"
    })
  },

  handleClickPraise(e){
    app.apiPost('UpdateMutual_Help_Praise',{id:this.id}).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        this.fetchData()
      }
    })
  },

  fetchData(id){
    app.apiPost('getMutual_Help').then(res=>{
     let arr = res.find(item=>{
        return item.id == id
      })
      arr.time = format.formatTime(new Date(arr.time))
      this.setData({
        list:arr
      })
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