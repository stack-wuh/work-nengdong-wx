// pages/other/donate/donate.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page: 1,
    showMore: true,
    remind: '正在加载中'
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
      app.toastMsg(res.error?'error':'success', res.msg)
      this.data.list.map(item=>{
        if(item.id == id){
          item.alumni_or.or_name = !item.alumni_or.or_name
          if (item.alumni_or.or_name) {
            item.praise++
          } else {
            item.praise--
          }
        }
        
      })
      this.setData({
        list:this.data.list
      })
    })
  },
  fetchData(){
    let data = {
      pageNo: this.data.page
    }
    app.apiPost('getAlumni', data).then(res=>{
      res.data.map(item=>{
        item.time = format.formatTime(new Date(item.time))
      })
      this.setData({
        list: this.data.list.concat(res.data)
      })
      if(res.data.length == 10){
        this.setData({
          showMore: true,
          remind: '上拉加载更多'
        })
      }else{
        this.setData({
          showMore: false,
          remind: '正在加载中'
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.showMore){
      this.setData({
        page: this.data.page + 1
      })
      this.fetchData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})