// pages/map/alumni/alumni.js
var app = getApp()
const format = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    typeList:[],
    type:'',
    title:'',
    isShowInput:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
    this.getTypeList()
  },

  collected(e){
    app.apiPost('addAlumni_Pages_Collect',{alumni_pages_id:e.currentTarget.dataset.id}).then(res=>{
      let error = res.error == 0? 'suceess' :'error'
      app.taostMsg(error,res.msg)

    })
  },
  parised(e){
    app.apiPost('UpdateAlumni_praise',{id:e.currentTarget.dataset.id}).then(res=>{
      let error = res == 1? 'success' : 'error'
      app.taostMsg(error,error)
    })
  },
  bindblur(){
    this.setData({
      isShowInput:false
    })
  },
  changeActive(){
    this.setData({
      isShowInput:true
    })
  },
  saveInput(e){
    this.setData({
      title:e.detail.value
    })
  },
  pickerChange(e){
    this.setData({
      type:this.data.typeList[e.detail.value].name
    })
    this.fetchData()
  },
  getTypeList(){
    app.apiPost('getAlumni_Pages_TypeService').then(res=>{
      this.setData({
        typeList:res
      })
    })
  },

  fetchData(){
    let data = {
      title:this.data.title,
      type:this.data.type,
    }
    app.apiPost('getAlumni_Pages',data).then(res=>{
      res.map(item=>{
        item.time = format.formatTime(new Date(item.time))
      })
      this.setData({
        list:res,
        title:'',
        type:''
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