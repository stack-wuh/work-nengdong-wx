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
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: res=>{
        if(res.confirm){
          let id = e.currentTarget.dataset.id
          app.apiPost('delMutual_HelpByMe', { id: id }).then(res => {
            let error = res.error == 0 ? 'success' : 'error'
            app.toastMsg(error, res.msg)
            if (res.error == 0) {
              this.fetchData()
            } 
          })
        }
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
      wx.setStorageSync('MutualByMe',res)
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})