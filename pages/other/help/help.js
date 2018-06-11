// pages/other/help/help.js
var app = getApp()
const format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    typeList:[],
    type:'',
    title:'',
    showInput:false,
    isPraise:1,
    page: 1,
    showMore: true,
    remind: '正在加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
    this.getHelpType()
  },

  getHelpType: function(){
    app.apiPost('getMutual_Help_Type').then(res=>{
      let data = res.data.map(item=>{
        return item.name
      })
      data.unshift('全部')
      this.setData({
        typeList: data
      })
    })
  },

  
  showInput(){
    this.setData({
      showInput:true
    })
  },


  pickerChange(e){
    this.setData({
      type:this.data.typeList[e.detail.value],
      title: '',
      list: [],
      page: 1,
      showMore: true,
      remind: '正在加载中'
    })
    this.fetchData()
  },

  searchInput: function(e){
    this.setData({
      title: e.detail.value,
      list: [],
      page: 1,
      showMore: true,
      remind: '正在加载中',
      showInput: false
    })
    this.fetchData()
  },

  handleClickPraise(e){
    let index = e.currentTarget.dataset.index
    this.data.list[index].praise_or = !this.data.list[index].praise_or
    
    app.apiPost('UpdateMutual_Help_Praise',{id:e.currentTarget.dataset.id}).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        if(res.data){
          this.data.list[index].praise -= 1
        }else{
          this.data.list[index].praise += 1
        }
        this.setData({
          list: this.data.list
        })
      }
    })
  },

  fetchData(){
    let data = {
      type:this.data.type === '全部' ? '' : this.data.type,
      title:this.data.title,
      pageNo: this.data.page
    }
    app.apiPost('getMutual_Help',data).then(res=>{
      res.data.map(item=>{
        let date = new Date(item.time)
        item.time = date.getFullYear() + '-' + (date.getMonth() +1) +'-'+ date.getDate()
        item.praise_or = item.mutual_help_praise?1:0
        if (item.mutual_help_image){
          item.mutual_help_image.address = item.mutual_help_image.address.split(',')
        }
      })
      this.setData({
        list:this.data.list.concat(res.data)
      })
      if(res.data.length == 10){
        this.setData({
          showMore: true,
          remind: '上滑加载更多'
        })
      }else{
        this.setData({
          showMore: false,
          remind: '没有更多啦'
        })
      }
      wx.setStorageSync('MutualList',this.data.list)
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