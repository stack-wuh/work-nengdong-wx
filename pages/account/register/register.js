// pages/account/register/register.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearList: [],
    formInfo:{
      name:'',
      number:'',
      no:'',
      school_age:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.apiPost('getYear').then(res=>{
      let yearList = res.data.map(item=>{
        return item.age_name
      })
      this.setData({
        yearList:yearList
      })
    })
  },
  changeYear(e){
    this.setData({
      formInfo:{
        school_age:this.data.yearList[e.detail.value]
      }
    })
  },
  formSubmit(e){
    let data = e.detail.value
    let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    for(var k in data){
      if(!data.number){
        if(!data[k] && k !== 'number'){
          app.toastMsg('error','请填写必填项')
          return
        }
      }
      if(!data.no){
        if(!data[k] && k !== 'no'){
          app.toastMsg('error','请填写必填项')
          return
        }
      } 
    }
    if(data.password.length < 6){
      app.toastMsg('error','密码至少6位')
      return
    }
    if(data.password !== data.checkpwd){
      app.toastMsg('error','密码不一致!!')
      return
    }
    let result = reg.test(data.no)
    if(!result){
      app.toastMsg('error','身份证号错误')
      return
    }
    if(!this.data.formInfo.school_age){
      app.toastMsg('error','请填写必填项')
      return
    }
    let newData = Object.assign(data,this.data.formInfo)
    app.apiPost('addStudent_Info',newData).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      wx.setStorageSync('id',res.id)
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        setTimeout(()=>{
          wx.navigateTo({
            url:'/pages/account/bind/bind'
          })
        },1000)
      }
    })
  },
  /**
   * 点击理解绑定跳转绑定页面
   */
  bind: function(){
    wx.navigateTo({
      url: '/pages/account/bind/bind',
    })
  }
})