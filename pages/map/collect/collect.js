// pages/map/collect/collect.js
let app = getApp()
let format = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    type:2,
    page: 1,
    listRow: 10,
    showMore: true,
    remind: '正在加载中',
    isPraise:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  handleClickCollage(e){  // 添加到收藏
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    let item = e.currentTarget.dataset.item
    let url = '' , data = {}
    if(type == 1){
      url = 'addStudent_Info_Collect'
      data = {
        others_id:id
      }
    }else if(type == 3){
      url = 'addAlumni_Pages_Collect'
      data = {
        alumni_pages_id:id
      }
    }else if(type == 2){
      url = 'CollectionCancel'
      data = {
        id:id,
        type:item.school_name ? 'school' : 'xuexiao'
      }
    }
    app.apiPost(url,data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      this.data.list.map(item=>{
        if(type == 1 && item.id == id){
          item.isCollect = !item.isCollect
        }else if(type == 3 && item.id == id){
          item.isCollect = !item.isCollect
        }else if(type == 2 && item.id == id){
          item.isCollect = !item.isCollect
        }
      })
      this.setData({
        list:this.data.list
      })
    })
  },
  handleClickPraise(e){
    let id = e.currentTarget.dataset.id 
    app.apiPost('UpdateAlumni_praise',{id:id}).then(res=>{
      let error = res.error == 0 ? 'success' :'error'
      app.toastMsg(error,res.msg)
      this.data.list.map(item=>{
        if(item.id == id){
          item.isPraise = !item.isPraise
        }
      })
      this.setData({
        list:this.data.list
      })
    })
  },
  handleClickChange(e){
    let type = e.currentTarget.dataset.type
    this.setData({
      type:type,
      listRow: type<3?10:20,
      list:[]
    })
    this.fetchData()
  },
  fetchData(){
    let url = ''
    if(this.data.type == 2){
      url = 'getStudent_Info_Collect'
    }else if(this.data.type == 1){
      url = 'getAlumni_Pages_Collect'
    }else{
      url = 'SchoolColege_Collect'
    }
    app.apiPost(url).then(res=>{
      if(res.data){
        res.data.map(item=>{
          item.time = format.formatTime(new Date(item.time))
          if(item.alumni_praise ){ //校友会黄页点赞
            item.isPraise = true
          }else{
            item.isPraise = false
          }
          if(item.alumni_pages_collect ){ //校友会黄页收藏
            item.isCollect = true
          }else{
            item.isCollect = false
          }
          if(item.student_info_collect){  //校友黄页收藏
            item.isCollect = true
          }else{
            item.isCollect = false
          }
          if(item.student_collect){ // 院校收藏
            item.isCollect = true
          }else{
            item.isCollect = false
          }
        })
      }
      if(url != 'SchoolColege_Collect'){
        this.setData({
          list: this.data.list.concat(res.data)
        })
      }else{
        var data = res.school.concat(res.xuexiao)
        data.map(item => {
          if(item.student_collect || item.xuexiao_collect){
            item.isCollect = true
          }else{
            item.isCollect = false
          }
        })
        this.setData({
          list:data
        })
      }
      if(res.length == this.data.listRow){
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
  
  },
})