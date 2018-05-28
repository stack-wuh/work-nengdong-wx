// pages/other/help/detail.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    check_text:'待审核'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  delSubmit(e){
    let id = e.currentTargte.dataset.id
    app.apiPost('delMutual_HelpByMe',{id:id}).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        this.fetchData()
      }
    })
  },
  changeActive(e){
    this.setData({
      check_text:e.currentTarget.dataset.check
    })
    this.fetchData()
  },
  fetchData(){
    app.apiPost("getMutual_HelpByMe",{check_text:this.data.check_text}).then(res=>{
      res.map(item=>{
        item.time = format.formatTime(new Date(item.time))
      })
      this.setData({
        list:res
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