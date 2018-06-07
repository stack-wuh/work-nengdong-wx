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
    animation:'',
    isBack:false,
    isbtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
    this.getTypeList()
  },

  showImgBtn(e){
    let isBack = e.currentTarget.dataset.back
    this.setData({
      isBack:!this.data.isBack
    })
    if(!isBack){
      this.setData({
        animation:app.animation(this.data.animation),
        isbtn:true
      })
    }else{
      setTimeout(()=>{
        this.setData({
          animation:app.animation(this.data.animation,30,0),
          isbtn:false
        })
      },1000)
    }
  },
 jumpToOther(){
   if(this.data.isbtn){
     wx.navigateTo({
       url:'/pages/map/alumni/action'
     })
   }
 },

  collected(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('addAlumni_Pages_Collect',{alumni_pages_id:e.currentTarget.dataset.id}).then(res=>{
      let error = res.error == 0? 'suceess' :'error'
      app.toastMsg(error,res.msg)
      this.data.list.map(item=>{
        if(item.id === id){
          item.alumni_pages_collect.or_name = !item.alumni_pages_collect.or_name
        }
      })
      this.setData({
        list:this.data.list
      })
    })
  },
  parised(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('UpdateAlumni_praise',{id:e.currentTarget.dataset.id}).then(res=>{
      let error = res.error == 0? 'success' : 'error'
      app.toastMsg(error,res.msg)
      this.data.list.map(item=>{
        if(item.id === id){
          item.alumni_praise.praise_or = !item.alumni_praise.praise_or
        }
      })
      this.setData({
        list:this.data.list
      })
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
      res.unshift({id:'-1',name:'全部'})
      this.setData({
        typeList:res
      })
    })
  },

  fetchData(){
    let data = {
      title:this.data.title,
      type:this.data.type == '全部' ? '' : this.data.type,
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