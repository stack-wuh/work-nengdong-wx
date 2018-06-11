// pages/other/help/detail.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    check_text:'待审核',
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
      check_text:e.currentTarget.dataset.check,
      list: [],
      page: 1,
      showMore: true,
      remind: '正在加载中'
    })
    this.fetchData()
  },
  fetchData(){
    let data = { 
      check_text: this.data.check_text,
      pageNo: this.data.page 
    }
    app.apiPost("getMutual_HelpByMe", data).then(res=>{
      res.data.map(item=>{
        item.time = format.formatTime(new Date(item.time))
        item.praise_or = item.mutual_help_praise ? 1 : 0
        if (item.mutual_help_image){
          item.mutual_help_image.address = item.mutual_help_image.address.split(',')
        }
      })
      this.setData({
        list: this.data.list.concat(res.data)
      })
      if(res.data.length == 10){
        this.setData({
          remind: '上拉加载更多',
          showMore: true
        })
      }else{
        this.setData({
          remind: '没有更多啦',
          showMore: false
        })
      }
      wx.setStorageSync('MutualByMe',this.data.list)
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

})