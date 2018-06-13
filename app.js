//app.js
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    let localId = wx.getStorageSync('number')
    if (!localId){
      wx.reLaunch({
        url: '/pages/account/login/login',
      })
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    site: 'http://nengdong.xiaoyuandake.com'
  },
   /**
   * 网络请求，post
   */
  apiPost: function (url, data={}, title ='加载中') {
    wx.showLoading({
      title: title,
    })
    if (wx.getStorageSync('number')){
      data.student_info_id = wx.getStorageSync('number')
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.server + url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: (response) => {
          wx.hideLoading()
          resolve(response.data)
        },
        fail: (response) => {
          wx.hideLoading()
          reject(response.data)
          wx.showToast({
            title: '请求超时',
            image: '/images/error.png',
          })
        }
      })
    })

  },

  /**
   * 网络请求，post
   */
  apiPost: function (url, data = {}, need_id = true, title ='加载中') {
    wx.showLoading({
      title: title,
    })
    if (need_id && wx.getStorageSync('number')){
      data.student_info_id = wx.getStorageSync('number')
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.server + url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: (response) => {
          wx.hideLoading()
          resolve(response.data)
        },
        fail: (response) => {
          wx.hideLoading()
          reject(response.data)
          wx.showToast({
            title: '请求超时',
            image: '/images/error.png',
          })
        }
      })
    })

  },

  /**
   * 弹框消息，cate: 0成功，1失败，2警告
   */
  toastMsg: function (cate, msg) {
    if (cate === 'error') {
      wx.showToast({
        title: msg,
        image: '/images/error.png',
      })
    } else if (cate === 'success') {
      wx.showToast({
        title: msg,
        icon: 'success',
      })
    } else if (cate === 'warning') {
      wx.showToast({
        title: msg,
        image: '/images/warning.png',
      })
    }
  },

  /**
   * 保存微信图像
   */
  saveWxImg: function () {
    let _this = this
    wx.getUserInfo({
      success: function (res) {
        wx.request({
          url: _this.server + 'users/uploadwximg',
          method: 'POST',
          data: {
            wxpic: res.userInfo.avatarUrl,
            'number': wx.getStorageSync('number'),
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  animation:function(elem,transX=-50,rotateX=-270){
    var animation = wx.createAnimation({
      duration:1000,
      timingFunction:'ease',
    })
    this.elem = animation
    animation.translate(transX).rotate(rotateX).step()
    return animation.export()
  },
  
  regPhone:function(){
    return this.reg.phone
  },
  //验证正则
  reg:{
    phone:'/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/',
    email:'/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/',
    ID:'/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/'
  },

  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },


  server:'http://192.168.10.122:8686/SchoolFellow/'

})

