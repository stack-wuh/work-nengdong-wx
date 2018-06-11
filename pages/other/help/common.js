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
      if(!res.error){
        this.data.list.praise_or = !this.data.list.praise_or
        this.data.list.praise += res.data? -1: 1
        this.setData({
          list: this.data.list
        })
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        prevPage.data.list.forEach(item=>{
          if(item.id == this.id){
            item.praise_or = this.data.list.praise_or
            item.praise = this.data.list.praise
          }
        })
        prevPage.setData({
          list: prevPage.data.list
        })
      }
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
    obj.is_self = obj.student_info_id == wx.getStorageSync('number')
    this.setData({
      list:obj
    })
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