// pages/map/alumni/mine.js
var app = getApp()
const format = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    check_text:'待审核',
    page: 1,
    showMore: false,
    remind: '正在加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  changeActive(e){
    this.setData({
      check_text:e.currentTarget.dataset.check,
      list: [],
      page: 1,
      showMore: false,
      remind: '正在加载中'
    })  
    this.fetchData()
  },
  fetchData(){
    let data = {
      check_text:this.data.check_text,
      pageNo: this.data.page
    }
    app.apiPost('getAlumni_PagesByCheck',data).then(res=>{
      res.data = res.data || []
      res.data.map(item=>{
        item.time = format.formatTime(new Date(item.time))
      })
      this.setData({
        list: this.data.list.concat(res.data)
      })
      if (res.data.length == 10) {
        this.setData({
          showMore: true,
          remind: '上拉加载更多'
        })
      } else {
        this.setData({
          showMore: false,
          remind: '没有更多啦'
        })
      }
      wx.setStorageSync('alumniList',res)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.showMore) {
      this.setData({
        page: this.data.page + 1
      })
      this.fetchData()
    }
  },
  
})