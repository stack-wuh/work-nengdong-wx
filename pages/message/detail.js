// pages/message/detail.js
var app = getApp()
const format = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    imgUrls:[
      '/images/logo.png',
      '/images/logo.png',
      '/images/logo.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(1)
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
    app.apiPost('QueryTidings',{id:id}).then(res=>{
      if(res.data[0].collect_name){
        res.data[0].isCollect = true
      }else{
        res.data[0].isCollect = false
      }
      this.setData({
        info:res.data[0]
      })
    })
  }
})