// pages/activity/index/index.js
var app = getApp()
const format = n =>{
  n = n.toString()
  return n[1] ? n : '0' + n
}
// import format from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSearch:false,
    isShowInput:false,
    newList:[],
    title:'',
    typeList:['校友活动','学校活动','学院活动','专业活动','班级活动','讲座活动'],
  },  
  
  bindchange(e){
    console.log(e.detail.value)
  },
  fetchData(){
    let data = {
      title:this.data.title,
    }
    app.apiPost('getActivity',data).then(res=>{
      res.map(item=>{
        let start = new Date(item.starttime) , end = new Date(item.endtime)
        item.starttime = [start.getFullYear(),start.getMonth(),start.getDate()].map(format).join('-') + ' ' + [start.getHours(),start.getMinutes()].map(format).join(':')
        item.endtime = [end.getFullYear(),end.getMonth(),end.getDate()].map(format).join('-') + ' ' + [end.getHours(),end.getMinutes()].map(format).join(':')
      })
      this.setData({
        newList:res
      })
    })
  },
  
  hiddenSearchBox(){
    this.setData({
      isShowSearch:false,
      isShowInput:false
    })
  },
  /*input搜索框,enter事件*/
  searchData(e){
    this.setData({
      title:e.detail.value
    })
    this.fetchData()
    this.setData({
      isShowSearch:false,
      isShowInput:false
    })
  },
  /*单击搜索按钮,弹出搜索模态框*/
  handleClickShowSearch(){
    this.setData({
      isShowSearch:true
    })
  },
  handleClickShowInput(){
    this.setData({
      isShowInput:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
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