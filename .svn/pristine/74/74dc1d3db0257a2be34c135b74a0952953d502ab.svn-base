// pages/account/forgetPwd/forgetPwd.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formInfo:{
      number:'',
      no:'',
      email:'',
      inputCode:''
    },
    code:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit(e){
    for(var k in e.detail.value){
      if(e.detail.value[k] == ''){
        app.toastMsg('error','请填写必填项')
        return
      }
    }
    if(e.detail.value.inputCode !== this.data.code){
      app.toastMsg('error','验证码错误,请重试')
      return
    }
    app.apiPost('getId').then(res=>{
    })
  },

  saveInputValue(e){
    this.setData({
      formInfo:{
        email:e.detail.value
      }
    })
  },
  //发送验证码
  handleClickGetCode(e){
    app.apiPost('ClickCode',{email:this.data.formInfo.email}).then(res=>{
      this.setData({
        code:res
      })
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