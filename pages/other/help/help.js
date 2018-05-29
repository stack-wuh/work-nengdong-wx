// pages/other/help/help.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    typeList:[
      '全部',
      '需求帮助',
      '提供帮助'
    ],
    type:'',
    title:'',
    showInput:false,
    isPraise:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  showInput(){
    this.setData({
      showInput:true
    })
  },
  saveInput(e){
    this.setData({
      title:e.detail.value
    })
  },

  pickerChange(e){
    this.setData({
      type:this.data.typeList[e.detail.value]
    })
    this.fetchData()
  },

  handleClickPraise(e){
    app.apiPost('UpdateMutual_Help_Praise',{id:e.currentTarget.dataset.id}).then(res=>{
      let error = res.error == 0 ? 'success' : 'error' 
      app.toastMsg(error,res.msg)
      this.fetchData()
    })
  },

  fetchData(){
    let data = {
      type:this.data.type === '全部' ? '' : this.data.type,
      title:this.data.title
    }
    app.apiPost('getMutual_Help',data).then(res=>{
      res.map(item=>{
        let date = new Date(item.time)
        item.time = date.getFullYear() + '-' + (date.getMonth() +1) +'-'+ date.getDate()
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