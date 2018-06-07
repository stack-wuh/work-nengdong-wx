// pages/user/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[
      [
        {
          name:'绑定手机号',
          showIcon:true,
          urlPath:'/pages/account/email/email?type=1'
        },
        {
          name:'绑定邮箱',
          showIcon:true,
          urlPath:'/pages/account/email/email?type=2'
        },
      ],
      [
        {
          name:'修改密码',
          showIcon:true,
          urlPath:'/pages/account/resetPwd/resetPwd'
        }
      ],
      [
        {
          name:'注销登录',
          showIcon:false,
          click:'signout'
        },
        {
          name:'清除记录',
          showIcon:false
        }
      ]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  signout(e){
    wx.removeStorageSync('number')
    app.toastMsg('wraning','注销登录')
    setTimeout(() => {
      wx.redirectTo({
        url:'/pages/account/login/login'
      })  
    }, 1000);
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