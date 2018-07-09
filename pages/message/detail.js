


// pages/message/detail.js
var app = getApp()
const format = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    imgUrls:[],
    isShowForm:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(options.id)
  },
  handleCollect(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('getMobileTidingsById',{id:id}).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        this.data.info.isCollect = !this.data.info.isCollect
        this.setData({
          info:this.data.info
        })
      }
    })
  },
  fetchData(id){
    app.apiPost('getMobileTidingsById',{id:id}).then(res=>{
      if(res.data.collect_name){
        res.data.isCollect = true
      }else{
        res.data.isCollect = false
      }
      res.data.imageName = res.data.imageName && res.data.imageName.split(',')
      res.data.imageName && res.data.imageName.length > 0 ? res.data.imageName : ['/images/logo.png']
      res.data.form_title = res.data.tidings_form && res.data.tidings_form.form_title
      res.data.form_content = res.data.tidings_form && res.data.tidings_form.form_content.split(',')
      this.setData({
        info:res.data,
        imgUrls:res.data.imageName
      })
    })
  },
  handleClickShowForm(){
    this.setData({
      isShowForm:true
    })
  },
  handleCancel(){
    this.setData({
      isShowForm:false
    })
  },
  handleSubmit(e){
    console.log(e)
  },
  openDocument(){
    var self = this
    wx.downloadFile({
      url:self.data.info.accessoryName.toString(),
      success:function(res){
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath:filePath,
          success:function(res){
            console.log('打开文档成功')
          }
        })
      }
    })
  },

})