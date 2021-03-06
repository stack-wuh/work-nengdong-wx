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
      this.setData({
        listData:[]
      })
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
    app.apiPost('addJoinActivity',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      this.data.list.isActivited = !this.data.list.isActivited
      this.setData({
        list:this.data.list
      })
      this.getList(this.id)
      if(type === 'submit'){
        if(res.error == 0){
          this.setData({
            isActioned:true,
            showMsg:true,
          })
        }else{
          setData({
            isActioned:false,
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
      if(res.data[0].activity_or){
        res.data[0].isActivited = true
      }else{
        res.data[0].isActivited = false
      }
      imgList.push(res.data[0].cover)
      this.setData({
        list:res.data[0],
        imgUrls:imgList
      })     
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let self = this
    if(res.from === 'button'){
      console.log(res.target)
    }
    return {
      title:self.data.list.title,
      path:`/pages/activity/detail/index?id=${self.id}&index=0`
    }
  },
})