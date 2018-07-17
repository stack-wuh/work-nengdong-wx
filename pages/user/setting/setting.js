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
    wx.removeStorageSync('recodeInfo')
    wx.removeStorageSync('privateInfo')
    app.toastMsg('wraning','注销登录')
    setTimeout(() => {
      wx.redirectTo({
        url:'/pages/account/login/login'
      })  
    }, 1000);
  },
})