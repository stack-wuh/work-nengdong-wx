// pages/user/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recoedType:1,
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync('myInfo')
    if(data == [] || data == undefined || data == null){
      this.setData({
        recoedType:1
      })
    }else{
      this.setData({
        recoedType:2
      })
    }
    this.getInfo()
  },

  getInfo(){
    app.apiPost('showStudent_Info',{id:wx.getStorageSync('number')}).then(res=>{
      this.setData({
        info:res.data[0]
      })
    })
  },

})