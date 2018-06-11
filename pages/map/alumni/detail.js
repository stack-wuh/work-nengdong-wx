// pages/map/alumni/unpass.js
var app = getApp()
var id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    imgList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    let list = prevPage.data.list
    let data = list.find(item=>{ 
      return item.id == options.id
    })
    data.is_self = wx.getStorageSync('number') == data.student_info_id
    this.setData({
      list: data
    })
    let imgList = this.data.list.alumni_pages_album.address.split(',')
    this.setData({
      imgList:imgList
    })
    wx.setNavigationBarTitle({
      title: this.data.list.title
    })
  },

  collected: function(){
    app.apiPost('addAlumni_Pages_Collect', { alumni_pages_id: id }).then(res => {
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error, res.msg)
      if(!res.error){
        this.data.list.is_collect = !this.data.list.is_collect
        this.setData({
          list: this.data.list
        })
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        prevPage.data.list.forEach(item=>{
          if(item.id == id){
            item.is_collect = this.data.list.is_collect
          }
        })
        prevPage.setData({
          list: prevPage.data.list
        })
      }
      
    })
  },

  handleClickPraise: function(){
    app.apiPost('UpdateAlumni_praise', { id: id }).then(res => {
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error, res.msg)
      this.data.list.is_praise = !this.data.list.is_praise
      if (this.data.list.is_praise) {
        this.data.list.praise += 1
      } else {
        this.data.list.praise -= 1
      }



      // this.data.list.map(item => {
      //   if (item.id === id) {
      //     item.is_praise = !item.is_praise
      //     if (item.is_praise) {
      //       item.praise += 1
      //     } else {
      //       item.praise -= 1
      //     }
      //   }
      // })
      this.setData({
        list: this.data.list
      })

      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      prevPage.data.list.forEach(item => {
        if (item.id == id) {
          item.is_praise = this.data.list.is_praise
          item.praise = this.data.list.praise
        }
      })
      prevPage.setData({
        list: prevPage.data.list
      })
    })
  }

  
})