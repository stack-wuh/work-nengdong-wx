// pages/activity/detail/index.js
var app = getApp()
let id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      '../../../images/avatar.jpg',
      '../../../images/upload.png',
      '../../../images/submit-pass.png'
    ],
    list:{},
    imgList:'',
    listData:[
      {index:'01',name:'text1',classify:'英语1301',tel:'13123234343'},
      {index:'02',name:'text2',classify:'英语1301',tel:'13123234343'},
      {index:'03',name:'text3',classify:'英语1301',tel:'13123234343'},
      {index:'04',name:'text4',classify:'英语1301',tel:'13123234343'},
      {index:'05',name:'text5',classify:'英语1301',tel:'13123234343'},
      {index:'06',name:'text6',classify:'英语1301',tel:'13123234343'}
    ],
    isActioned:false,
    showMsg:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list = wx.getStorageSync('activeDetail')
    this.id = options.id
    let data = list.find(item=>{
      return item.id == this.id
    })
    let imgList = data.cover + ','+ data.activity_image.address
    this.setData({
      list:data,
      imgUrls:imgList.split(',')
    })
    console.log(this.data)
  },

  //隐藏模态框
  hideBox(){
    this.setData({
      showMsg:false
    })
  },

  //点击报名--取消报名
  handleSubmit(e){
    let type = e.currentTarget.dataset.type
    let url = type === 'submit' ? 'addJoinActivity' : 'delJoinActivity'
    let data = {
      activity_id:this.id
    }
    app.apiPost(url,data).then(res=>{
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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