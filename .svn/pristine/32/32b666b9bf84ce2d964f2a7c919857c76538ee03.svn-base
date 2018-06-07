// pages/account/bind/bind.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    inputCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  changeSaveInput(e){
    this.setData({
      inputCode:e.detail.value
    })
  },
  handleClickGetCode(){
    let regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if(this.data.inputCode){
    if(regEmail.test(this.data.inputCode)){
      app.apiPost('ClickCode',{email:this.data.inputCode}).then(res=>{
        this.setData({
          code:res
        })
      })
    }else{
      app.toastMsg('error','邮箱格式错误!')
    }}else{
      app.toastMsg('error','请先输入邮箱!')
    }
  },
  formSubmit(e){
    var data = e.detail.value
    let regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    for(var k in data){
      if(!data[k]){
        app.toastMsg('error','请填写必填项')
        return
      }
    }
    if(!regPhone.test(data.phone_number)){
      app.toastMsg('error','手机号格式错误')
      return
    }
    if(data['password'] !== data['checkpwd']){
      app.toastMsg('error','密码不一致!')
      return
    }
    if(data.code != this.data.code){
      app.toastMsg('error','验证码错误!')
      return
    }
    let id = wx.getStorageSync('id')
    var data = Object.assign({id:id},data)
    app.apiPost('updateStudent_Info',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        wx.redirectTo({
          url:'/pages/account/login/login'
        })
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