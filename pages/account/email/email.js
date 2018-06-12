// pages/account/email/email.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    value:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = ''
    title = options.type == 1 ? '绑定手机号' : options.type == 2 ? '绑定邮箱' : '设置'
    wx.setNavigationBarTitle({
      title:title
    })
    this.setData({
      type:options.type
    })
  },
  saveInput(e){
    this.setData({
      value:e.detail.value
    })
  },
  getCode(e){
    let data = {}
    data = e.currentTarget.dataset.type == 1 ? {phone_number:this.data.value} : {email:this.data.value}
    app.apiPost('ClickCode',data).then(res=>{
      res && app.toastMsg('success','验证码已发送')
      res && this.setData({
        code:res
      })
    })
  },
  formSubmit(e){
    let data = {
      id:wx.getStorageSync('number'),
      email:'',
      phone_number:'',
      password:''
    }
    if(e.detail.value.email){
      data.email = e.detail.value.email
    }else if(e.detail.value.phone_number){
      data.phone_number = e.detail.value.phone_number
    }
    if(e.detail.value.code){
      if(e.detail.value.code == this.data.code){
        app.apiPost('updateStudent_Info',data).then(res=>{
          let error = res.error == 0?'success' :'error'
          app.toastMsg(error,res.msg)
          if(res.error == 0){
            setTimeout(()=>{
              wx.navigateBack({
                delta:1
              })
            },1000)
          }
        })
      }else{
        app.toastMsg('error','验证码错误')
      }
    }else{
      app.apiPost('updateStudent_Info',data).then(res=>{
        let error = res.error == 0 ? 'success' : 'error'
        app.toastMsg(error,res.msg)
          if(res.error == 0){
            setTimeout(()=>{
              wx.navigateBack({
                delta:1
              })
            },1000)
          }        
      })
    }
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