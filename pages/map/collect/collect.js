// pages/map/collect/collect.js
let app = getApp()
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
    remind: '正在加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },
  handleClickCollage(e){
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    let url = '' , data = {}
    if(type){
      url = 'addStudent_Info_Collect'
      data = {
        others_id:id
      }
    }else{
      url = 'addAlumni_Pages_Collect'
      data = {
        alumni_pages_id:id
      }
    }
    app.apiPost(url,data).then(res=>{
      this.data.list.map(item=>{
        if(type){
          item.student_info_collect.or_name = !item.student_info_collect.or_name
        }else{
          item.alumni_pages_collect.or_name = !item.alumni_pages_collect.or_name
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
      this.data.list.map(item=>{
        item.alumni_praise.praise_or = !item.alumni_praise.praise_or
        if(item.alumni_praise.praise_or){
          item.praise ++
        }else{
          item.praise -- 
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
      listRow: type<3?10:20
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
      url = 'ShowSchool_Info_School'
    }
    app.apiPost(url).then(res=>{
      this.setData({
        list: this.data.list.concat(res.data)
      })
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