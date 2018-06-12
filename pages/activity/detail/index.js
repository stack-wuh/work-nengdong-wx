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
    let pages = getCurrentPages() , 
    prevPage = pages[pages.length-2] ,
    imgList = [] ,
    address = prevPage.data.newList[options.index].activity_image.address.split(',')
    address.map(item=>{
      imgList.push(item)
    })
    imgList.push(prevPage.data.newList[options.index].cover)
    this.setData({
      list:prevPage.data.newList[options.index],
      imgUrls:imgList
    })
    this.id = options.id
    this.getList(options.id)
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
    })
  },

  //点击报名--取消报名
  handleSubmit(e){
    let type = e.currentTarget.dataset.type
    // let url = type === 'submit' ? 'addJoinActivity' : 'delJoinActivity'
    let data = {
      activity_id:this.id
    }
    app.apiPost('addJoinActivity',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
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
      return
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
  
  //上拉加载更多
  showMore(){
    
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