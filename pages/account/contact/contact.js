// pages/account/contact/contact.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    question_type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }, 
  deleteImg(e){
    let index = e.currentTarget.dataset.index 
    this.data.imgList.splice(index,1)
    this.setData({
      imgList:this.data.imgList
    })
  },
  //上传图片
  uploadImg(){
    let self = this
    wx.chooseImage({
      count:1,
      success:function(res){
        var tempFilePaths = res.tempFilePaths
        app.toastMsg('wraning','正在上传')
        wx.uploadFile({
          url:app.server + 'addImages',
          filePath:tempFilePaths[0],
          name:'file',
          success:function(res){
            let data = JSON.parse(res.data)
              if(res.statusCode == 200){
                self.data.imgList.push(data)
                self.setData({
                  imgList:self.data.imgList
                })
              }else{
                app.toastMsg('error','上传失败')
              }
          }
        })
      }
    })
  },
  formSubmit(e){
    var data = e.detail.value
    if(!data.number){
      for(var k in data){
        if(data[k] === '' && k !== 'number'){
          app.toastMsg('error','请填写必填项')
          return
        }
      }
    }
    if(!data.no){
      for(var k in data){
        if(data[k] === '' && k !== 'no'){
          app.toastMsg('error','请填写必填项')
          return
        }
      }
    }
    if(this.data.imgList.length == 0){
      app.toastMsg('error','请先上传图片')
      return
    }
    data = Object.assign({file:this.data.imgList.toString(),student_info_id:wx.getStorageSync('number')},data)
    app.apiPost('addContact_College',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        setTimeout(()=>{
          wx.navigateBack({
            delta:1
          })
        },1000)
      }
    })
  },
})