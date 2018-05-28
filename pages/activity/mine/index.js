// pages/activity/mine/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    check:'待审核',
    list:[],
    showInput:false,
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  bindblur(){
    this.setData({
      showInput:false
    })
  },
  saveInput(e){
    console.log(e)
    this.setData({
      title:e.detail.value
    })
  },
  showInput(){
    this.setData({
      showInput:true
    })
  },
  changeActive(e){
    this.setData({
      type:e.currentTarget.dataset.type,
      check:e.currentTarget.dataset.title
    })
    this.fetchData()
  },
  fetchData(){
    app.apiPost('getMyActivity',{check:this.data.check,title:this.data.title}).then(res=>{
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