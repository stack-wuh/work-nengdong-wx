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
    this.fetchData(options.id)
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
  },

  fetchData(){
    app.apiPost('GWAlumni_Pages',{id:id}).then(res=>{
      let data = res.data[0] , imgList = [] , address = []
      wx.setNavigationBarTitle({
        title: data.title
      })
      if(data.alumni_pages_album){
        if(data.alumni_pages_album.address){
          address = data.alumni_pages_album.address.split(',')
          address.map(item=>{
            imgList.push(item)
          })
        }
      }
      if(data.cover){
        imgList.push(data.cover)
      }
      this.setData({
        list:data,
        imgList:imgList
      })
    })
  },
  /**
   * 自定义分享内容
   */
  onShareAppMessage:function(res){
    let self = this
    if(res.from === 'button'){
      console.log(res.target)
    }
    return{
      title:self.data.list.title,
      path:`/pages/map/alumni/detail?id=${self.id}`
    }
  }
})