// pages/account/resetPwd/resetPwd.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit(e){
    var data = e.detail.value
    for(var k in data){
      if(!data[k]){
        app.toastMsg('error','请输入必填项')
        return
      }
      if(data[k].length < 6){
        app.toastMsg('error','密码至少6位!')
        return
      }
    }
    if(data.password != data.checkpwd){
      app.toastMsg('error','密码不一致!')
      return
    }
    let id = wx.getStorageSync('id')
    var data = Object.assign({id:id},data)
    app.apiPost('UpdatePassword',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      
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