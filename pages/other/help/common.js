// pages/other/help/common.js
var app = getApp()
var id , type
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.argus
    this.type = options.type
    this.fetchData(options.argus,options.type)
  },

  // 跳转到编辑
  jumpToEdit(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:"/pages/other/help/publish?type=edit&id="+id
    })
    wx.setStorageSync('helpEditInfo',this.data.list)
  },

  handleClickPraise(e){
    app.apiPost('UpdateMutual_Help_Praise',{id:this.id}).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      this.data.list.mutual_help_praise.praise_or = !this.data.list.mutual_help_praise.praise_or
      this.setData({
        list:this.data.list
      })
    })
  },

  fetchData(id,type){
    let data = [] , obj = {}
    if(type){
      data = wx.getStorageSync('MutualByMe')
    }else if(type == undefined || type == null){
      data = wx.getStorageSync('MutualList')
    }
    obj = data.find(item=>{
      return item.id == id
    })
    this.setData({
      list:obj
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
  onShareAppMessage: function (res) {
    if(res.form === 'button'){
      // console.log('is ok')
    }
    return{
      title:'我的互助详情',
      path:'/pages/other/help/common?id=' + this.id
    }
  }
})