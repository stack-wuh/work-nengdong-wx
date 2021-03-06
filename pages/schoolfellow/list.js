// pages/schoolfellow/list.js
const app = getApp()
const format = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInput: false,
    name: '',
    list: [],
    page: 1,
    showMore: true,
    remind: '正在加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.fetchData()
  },

  /**
   * 获取数据
   */
  fetchData: function(){
    let data = {
      list: this.data.name,
      pageNo: this.data.page
    }
    app.apiPost('getNd_Article', data).then(res=>{
      res.data.map(item=>{
        item.pubtime = format.formatTime(new Date(item.pubtime))
        let imgReg = /<img.*?(?:>|\/>)/gi;
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let arr = item.content.match(imgReg);
        if(arr[0]){
          let img = arr[0].match(srcReg)
          if(img[1]){
            if(img[1][0] == '/'){
              item.image = app.globalData.site + img[1]
            }else{
              item.image = img[1]
            }
          }
        }
        
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
          remind: '没有更多啦'
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

  bindblur() {
    this.setData({
      showInput: false
    })
  },
  saveInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  showInput() {
    this.setData({
      showInput: true
    })
  },

})