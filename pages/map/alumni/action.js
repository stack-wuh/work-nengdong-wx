// pages/map/alumni/action.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cover: '',
    typeList: ['年级', '地域', '行业', '其他'],
    type: '',
    isShowDialog: false,
    isShowDialogBtn: 0,
    user: [
      {
        name: '手机号',
        value: '',
        showimg: true,
        msg: '请输入手机号',
        hide: false,
        prop: 'phone'
      },
      {
        name: '邮箱',
        value: '',
        showimg: true,
        msg: '请输入邮箱',
        hide: false,
        prop: 'email'
      },
      {
        name: 'QQ',
        value: '',
        showimg: true,
        msg: '请输入QQ',
        hide: false,
        prop: 'qq'
      },
      {
        name: '微信',
        value: '',
        showimg: true,
        msg: '请输入微信',
        hide: false,
        prop: 'weixin'
      }
    ],
    is_edit: false,
    info: {}
  },

  onLoad: function (options) {
    if (options.edit) {
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      this.setData({
        is_edit: true,
        info: prevPage.data.list,
        type: prevPage.data.list.type,
        user: [
          {
            name: '手机号',
            value: prevPage.data.list.phone,
            showimg: true,
            msg: '请输入手机号',
            hide: prevPage.data.list.alumni_information_hide && prevPage.data.list.alumni_information_hide.phone_hide == 'false',
            prop: 'phone'
          },
          {
            name: '邮箱',
            value: prevPage.data.list.email,
            showimg: true,
            msg: '请输入邮箱',
            hide: prevPage.data.list.alumni_information_hide && prevPage.data.list.alumni_information_hide.email_hide == 'false',
            prop: 'email'
          },
          {
            name: 'QQ',
            value: prevPage.data.list.qq,
            showimg: true,
            msg: '请输入QQ',
            hide: prevPage.data.list.alumni_information_hide && prevPage.data.list.alumni_information_hide.qq_hide == 'false',
            prop: 'qq'
          },
          {
            name: '微信',
            value: prevPage.data.list.weixin,
            showimg: true,
            msg: '请输入微信',
            hide: prevPage.data.list.alumni_information_hide && prevPage.data.list.alumni_information_hide.weixin_hide == 'false',
            prop: 'weixin'
          }
        ],
        cover: prevPage.data.list.image,
        address: prevPage.data.list.alumni_pages_album.address.split(',')
      })
      wx.setNavigationBarTitle({
        title: '编辑校友会'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '创建校友会'
      })
    }

  },


  hideDialog() {
    this.setData({
      isShowDialog: false,
      isShowDialogBtn: 0
    })
  },
  pickerChange(e) {
    this.setData({
      type: this.data.typeList[e.detail.value]
    })
  },
  deleteImg(e) {
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    if (type == 1) {
      this.setData({
        cover: ''
      })
    }
    if (type == 2) {
      this.data.address.splice(index, 1)
      this.setData({
        address: this.data.address
      })
    }
  },
  uploadImg(e) {
    let self = this,
      type = e.currentTarget.dataset.type
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.server + 'addImages',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            let data = JSON.parse(res.data)
            if (res.statusCode == 200) {
              if (type == 1) {
                self.setData({
                  cover: data
                })
              }
              if (type == 2) {
                self.data.address.push(data)
                self.setData({
                  address: self.data.address
                })
              }
            } else {
              app.toastMsg('error', '上传失败')
            }
          }
        })
      }
    })
  },
  submit(e) {
    var data = e.detail.value
    data = Object.assign({ image: this.data.cover, address: this.data.address }, data)
    data.phone_hide = !this.data.user[0].hide
    data.email_hide = !this.data.user[1].hide
    data.qq_hide = !this.data.user[2].hide
    data.weixin_hide = !this.data.user[3].hide
    if (!this.data.user[0].hide && !this.data.user[1].hide && !this.data.user[2].hide && !this.data.user[3].hide) {
      wx.showModal({
        title: '提示',
        content: '至少公开一种联系方式',
        showCancel: false
      })
      return false
    }
    for (var k in data) {
      if (!data['phone'] && !data['email'] && !data['qq'] && !data['weixin']) {
        if (data[k] == '' || data[k] == null) {
          app.toastMsg('error', '请填写必填项')
          return
        }
      }
    }
    if (this.data.is_edit) data.id = this.data.info.id
    app.apiPost('addAlumni_Pages', data, !this.data.is_edit).then(res => {
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error, res.msg)
      if (res.error == 0) {
        this.setData({
          isShowDialog: true,
          isShowDialogBtn: 1
        })
        wx.setStorageSync('alumniInfo', data)
      } else {
        this.setData({
          isShowDialog: true,
          isShowDialogBtn: 2
        })
      }
    })
  },
  checkShow(e) {
    this.data.user.map(item => {
      if (e.currentTarget.dataset.prop == item.prop)
        item.hide = true
    })
    this.setData({
      user: this.data.user
    })
  },
  checkHide(e) {
    this.data.user.map(item => {
      if (e.currentTarget.dataset.prop == item.prop)
        item.hide = false
    })
    this.setData({
      user: this.data.user
    })
  },
  bindinput(e) {
    let prop = e.currentTarget.dataset.prop
    this.data.user.forEach(item => {
      if (item.prop === prop) {
        item.value = e.detail.value
      }
    });
    this.setData({
      user: this.data.user
    })
  },
})