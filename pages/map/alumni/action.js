// pages/map/alumni/action.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cover:'',
    typeList:['年级','地域','行业','其他'],
    type:'',
    isShowDialog:false,
    isShowDialogBtn:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  hideDialog(){
    this.setData({
      isShowDialog:false,
      isShowDialogBtn:0
    })
  },
  pickerChange(e){
    this.setData({
      type:this.data.typeList[e.detail.value]
    })
  },
  deleteImg(e){
    let index = e.currentTarget.dataset.index 
    let type = e.currentTarget.dataset.type
    if(type == 1){
      this.setData({
        cover:''
      })
    }
    if(type == 2){
      this.data.address.splice(index,1)
      this.setData({
        address:this.data.address
      })
    }
  },
  uploadImg(e){
    let self = this ,
    type = e.currentTarget.dataset.type
    wx.chooseImage({
      count:1,
      success:function(res){
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url:app.server + 'addImages',
          filePath:tempFilePaths[0],
          name:'file',
          success:function(res){
            let data = JSON.parse(res.data)
              if(res.statusCode == 200){
                if(type == 1){
                  self.setData({
                    cover:data
                  })
                }
                if(type == 2){
                  self.data.address.push(data)
                  self.setData({
                    address:self.data.address
                  })
                }
              }else{
                app.toastMsg('error','上传失败')
              }
          }
        })
      }
    })
  },
  submit(e){
    var data = e.detail.value
    data = Object.assign({image:this.data.cover,address:this.data.address},data)
    for(var k in data){
      if(!data['phone'] && !data['email'] && !data['qq'] && !data['weixin']){
        if(data[k] == '' || data[k] == null){
          app.toastMsg('error','请填写必填项')
          return
        }
      }
    }
    app.apiPost('addAlumni_Pages',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        this.setData({
          isShowDialog:true,
          isShowDialogBtn:1
        })
        wx.setStorageSync('alumniInfo',data)
      }else{
        this.setData({
          isShowDialog:true,
          isShowDialogBtn:2
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