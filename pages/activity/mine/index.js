// pages/activity/mine/index.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    check:'待审核',
    list:[],
    showInput:false,
    title:'',
    remind:'正在加载中',
    pageNo:1,
    isShowMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  //上拉加载更多
  showMore(){
    if(this.data.isShowMore){
      this.setData({
        pageNo:++this.data.pageNo
      })
      this.fetchData()
    }
  },

  bindblur(){
    this.setData({
      showInput:false
    })
  },
  saveInput(e){
    this.setData({
      title:e.detail.value
    })
  },
  showInput(){
    this.setData({
      showInput:true
    })
  },
  changeActive(e){
    this.setData({
      type:e.currentTarget.dataset.type,
      check:e.currentTarget.dataset.title
    })
    this.fetchData()
  },
  fetchData(){
    app.apiPost('getMyActivity',{check:this.data.check,title:this.data.title,pageNo:this.data.pageNo}).then(res=>{
      if(res.data)
      res.data.map(item=>{
        item.starttime = format.formatTime(new Date(item.starttime))
        item.endtime = format.formatTime(new Date(item.endtime))
      })
      this.data.list = this.data.list.concat(res.data) 
      if(res.data.length == 10){
        this.setData({
          isShowMore:true,
          remind:'上拉加载更多'
        })
      }else{
        this.setData({
          isShowMore:false,
          remind:'没有更多啦'
        })
      }
      this.setData({
        list:res.data
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.showMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})