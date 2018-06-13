// pages/activity/index/index.js
var app = getApp()
let arugs = ''
const formatNumber = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSearch:false,
    isShowInput:false,
    isShowEdit:false,
    newList:[],
    title:'',
    type:'',
    typeList:['全部','校友活动','学校活动','学院活动','专业活动','班级活动','讲座活动'],
    isShowMore:false,
    page:1,
    remind:'正在加载更多'
  },  
  
  bindchange(e){
    this.setData({
      type:this.data.typeList[e.detail.value],
      newList:[]
    })
    this.fetchData()
  },
  fetchData(){
    let type = this.data.type === '全部' ? '' : this.data.type
    let data = {
      title:this.data.title,
      type:type,
      pageNo:this.data.page
    }
    let url = ''
    if(this.arugs == 1){
      url = 'getActivity'
    }else{
      url='getMyPartake'
    }
    app.apiPost(url,data).then(res=>{
      res.data.map(item=>{
        let start = new Date(item.starttime) , end = new Date(item.endtime)
        item.starttime = formatNumber.formatTime(new Date(item.starttime))
        item.endtime = formatNumber.formatTime(new Date(item.endtime))
      })
      this.data.newList = this.data.newList.concat(res.data)
      this.setData({
        newList:this.data.newList
      })
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
      wx.setStorageSync('activeDetail',this.data.newList)
    })
  },
  showMore(){
    if(this.data.isShowMore){
      this.setData({
        page:++this.data.page
      })
      this.fetchData()
    }
  },
  hiddenSearchBox(){
    this.setData({
      isShowSearch:false,
      isShowInput:false
    })
  },
  /*input搜索框,enter事件*/
  searchData(e){
    this.setData({
      title:e.detail.value,
      newList:[]
    })
    this.fetchData()
    this.setData({
      isShowSearch:false,
      isShowInput:false
    })
  },
  /*单击搜索按钮,弹出搜索模态框*/
  handleClickShowSearch(){
    this.setData({
      isShowSearch:true
    })
  },
  handleClickShowInput(){
    this.setData({
      isShowInput:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.arugs = options.type
    if(this.arugs == 1){
      this.setData({
        isShowEdit:true
      })
      wx.setNavigationBarTitle({
        title:'活动'
      })
    }else{
      this.setData({
        isShowEdit:false
      })
      wx.setNavigationBarTitle({
        title:'我参与的'
      })
    }
    this.fetchData()
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