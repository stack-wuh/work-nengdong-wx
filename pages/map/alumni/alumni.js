// pages/map/alumni/alumni.js
var app = getApp()
const format = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    typeList: [],
    type: '',
    title: '',
    isShowInput: false,
    animation: '',
    isBack: false,
    isbtn: false,
    page: 1,
    showMore: false,
    remind: '正在加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
    this.getTypeList()
  },


  jumpToOther() {
    wx.navigateTo({
      url: '/pages/map/alumni/action'
    })
  },

  collected(e) {
    let id = e.currentTarget.dataset.id
    app.apiPost('addAlumni_Pages_Collect', { alumni_pages_id: e.currentTarget.dataset.id }).then(res => {
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error, res.msg)
      this.data.list.map(item => {
        if (item.id === id) {
          item.is_collect = !item.is_collect
        }
      })
      this.setData({
        list: this.data.list
      })
    })
  },
  parised(e) {
    let id = e.currentTarget.dataset.id
    app.apiPost('UpdateAlumni_praise', { id: e.currentTarget.dataset.id }).then(res => {
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error, res.msg)
      this.data.list.map(item => {
        if (item.id === id) {
          item.is_praise = !item.is_praise
          if (item.is_praise) {
            item.praise += 1
          } else {
            item.praise -= 1
          }
        }
      })
      this.setData({
        list: this.data.list
      })
    })
  },
  bindblur() {
    this.setData({
      isShowInput: false
    })
  },
  changeActive() {
    this.setData({
      isShowInput: true
    })
  },
  saveInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  pickerChange(e) {
    this.setData({
      type: this.data.typeList[e.detail.value].name,
      page: 1,
      showMore: true,
      remind: '正在加载中',
      list: []
    })
    this.fetchData()
  },
  getTypeList() {
    app.apiPost('getAlumni_Pages_TypeService').then(res => {
      res.unshift({ id: '-1', name: '全部' })
      this.setData({
        typeList: res
      })
    })
  },
  searchInput(e){
    this.setData({
      title: e.detail.value,
      page: 1,
      showMore: true,
      remind: '正在加载中',
      list: []
    })
    this.fetchData()
  },

  fetchData() {
    let data = {
      title: this.data.title,
      type: this.data.type == '全部' ? '' : this.data.type,
      pageNo: this.data.page,
      aid: wx.getStorageSync('number')
    }
    app.apiPost('getAlumni_Pages', data, false).then(res => {
      res.data.map(item => {
        item.time = format.formatTime(new Date(item.time))
        item.is_praise = item.alumni_praise?1:0
        item.is_collect = item.alumni_pages_collect?1:0
      })
      this.setData({
        list: this.data.list.concat(res.data),
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
        page: this.data.page+1
      })
      this.fetchData()
    }
  },

})