// pages/map/school/scholl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: 1,
    list: [],
    title: '',
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

  /**
   * 切换分类，学校、学院
   */
  handleClick: function(e){
    this.setData({
      cate: e.currentTarget.dataset.cate,
      list: [],
      page: 1,
      showMore: true,
      remind: '正在加载中',
      title: ''
    })
    this.fetchData()
  },


  /**
   * 获取数据
   */
  fetchData: function(){
    let data, url
    if(this.data.cate == 1){
      data = {
        name: this.data.title,
        pageNo: this.data.page
      }
      url = 'getXueXiao'
    }else{
      data = {
        school_name: this.data.title,
        pageNo: this.data.page
      }
      url = 'ShowSchool_Info_School'
    }
    
    app.apiPost(url, data).then(res=>{
      res.data = res.data || []
      res.data.forEach(item=>{
        if(this.data.cate == 1){
          item.is_collect = item.xuexiao_collect?true:false
        }
        if (this.data.cate == 2) {
          item.is_collect = item.student_collect ? true : false
        }
      })
      this.setData({
        list: this.data.list.concat(res.data)
      })
      if(res.data.length == 20){
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

  /**
   * 搜索
   */
  searchInput: function(e){
    this.setData({
      list: [],
      page: 1,
      showMore: true,
      remind: '正在加载中',
      title: e.detail.value
    })
    this.fetchData()
  },

  /**
   * 拨打电话
   */
  call: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },

  /**
   * 收藏
   */
  collect: function (e) {
    let data, url
    if (this.data.cate == 1) {
      data = {
        xuexiao_id: e.currentTarget.dataset.id
      }
      url = 'addXuexiao_Collect'
    }else{
      data = {
        id: e.currentTarget.dataset.id
      }
      url = 'SCSchool_Info_School'
    }
    app.apiPost(url, data).then(res=>{
      app.toastMsg(res.error?'error':'success', res.msg)
      if(!res.error){
        this.data.list.forEach(item=>{
          if (item.id == e.currentTarget.dataset.id){
            item.is_collect = !item.is_collect
          }
        })
        this.setData({
          list: this.data.list
        })
      }
    })
  }
})