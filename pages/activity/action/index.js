// pages/activity/action/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:['校友活动','学校活动','学院活动','专业活动','班级活动','讲座活动'],
    type:'',
    organizerList:['官方','非官方'],
    organ:'',
    klassList:['校团委','学生会','学工处','后勤处'],
    klass:'',
    start:{},
    end:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      start:wx.getStorageSync('start'),
      end:wx.getStorageSync('end')
    })
    
  },
  pickerChange(e){
    let type = e.currentTarget.dataset.type
    let value = []
    switch(type){
      case 1 : this.setData({type:this.data.typeList[e.detail.value]})
                break;
      case 2 :this.setData({organ:this.data.organizerList[e.detail.value]})
                break;
      case 3 : this.setData({klass:this.data.klassList[e.detail.value]})
    }
  },
  mulChange(e){

  },
  formSubmit(e){
    console.log(e)
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