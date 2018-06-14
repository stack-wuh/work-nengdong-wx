// pages/activity/detail/index.js
var app = getApp()
let id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    list:{},
    imgList:'',
    listData:[],
    isActioned:false,
    showMsg:false,
    remind:'没有更多啦',
    pageNo:1,
    isShowMoew:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.getList(options.id)
    this.fetchData(options.id)
  },

  //隐藏模态框
  hideBox(){
    this.setData({
      showMsg:false
    })
  },
  handleClickShowMore(){
    if(this.data.isShowMoew){
      this.setData({
        pageNo:++this.data.pageNo
      })
      this.getList(this.id)
    }
  },
  getList(id){
    app.apiPost('getActivity_Enroll',{activity_id:id,pageNo:this.data.pageNo}).then(res=>{
      if(res.data){
        if(res.data.length == 10){
          this.setData({
            listData:res.data,
            isShowMoew:true
          })
        }else{
          this.setData({
            listData:res.data,
            isShowMoew:false
          })
        }
      }
    })
  },

  //点击报名--取消报名
  handleSubmit(e){
    let type = e.currentTarget.dataset.type
    let data = {
      activity_id:this.id
    }
    this.data.list.activity_or.or_text = !this.data.list.activity_or.or_text
    this.setData({
      list:this.data.list
    })
    app.apiPost('addJoinActivity',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(type === 'submit'){
        if(res.error == 0){
          this.setData({
            isActioned:true,
            showMsg:true
          })
        }else{
          setData({
            isActioned:false
          })
        }
      }
    })
  },
  
  fetchData(id){
    app.apiPost('GWActivity',{id:id}).then(res=>{
      let imgList = [] , address = []
      if(res.data[0].activity_image){
        if(res.data[0].activity_image.address){
          address = res.data[0].activity_image.address
          address = address ? address.split(',') : []
          address.map(item=>{
            imgList.push(item)
          })
        }
      }
      imgList.push(res.data[0].cover)
      this.setData({
        list:res.data[0],
        imgUrls:imgList
      })     
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})