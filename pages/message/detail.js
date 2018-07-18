


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
    app.apiPost('addTidings_Collect',{tidings_id:id}).then(res=>{
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
      res.data.form_substance = (res.data.tidings_form && res.data.tidings_form.form_substance && res.data.tidings_form.form_substance.split(',')) || []
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
    if(e.detail.value){
      for(var k in e.detail.value){
        if(e.detail.value[k] == ''){
          app.toastMsg('error','请编辑必填项!')
          return
        }
      }
    }
    var data = {
      tidingsFromId:this.data.info.tidings_form.id,
      formSubstance:Object.values(e.detail.value).toString(),
    }
    app.apiPost('subTidingsForm',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        setTimeout(()=>{
          this.setData({
            isShowForm:false
          })
        },1000)
      }
    })
  },
  openDocument(){ 
    var self = this
    wx.downloadFile({
      url:self.data.info.accessoryName.toString(),
      success:function(res){
        var filePath = res.tempFilePath
        app.toastMsg('success','正在下载文档')
        wx.openDocument({
          filePath:filePath,
          success:function(res){
            app.toastMsg('success','正在打开文档')
          }
        })
      },
      fail:function(err){
        app.toastMsg('error','文件下载失败')
      },
    })
  },

})