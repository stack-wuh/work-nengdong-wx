// pages/other/donate/donate.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },  

  handleClickPraise(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('addAlumni_Or',{alumni_id:id}).then(res=>{
      this.data.list.map(item=>{
        if(item.id == id){
          item.alumni_or.or_name = !item.alumni_or.or_name
        }
        if(item.alumni_or.or_name){
          item.praise ++
        }else{
          item.praise --
        }
      })
      this.setData({
        list:this.data.list
      })
    })
  },
  fetchData(){
    app.apiPost('getAlumni').then(res=>{
      res.data.map(item=>{
        item.time = format.formatTime(new Date(item.time))
      })
      this.setData({
        list:res.data
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