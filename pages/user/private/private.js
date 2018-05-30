// pages/user/private/private.js
var app = getApp()
const optionList =[
  {
    title: '基础信息',
    iconPath: '/images/icon-info.png',
    list: [{
      name: '学院',
      value: '',
      default:true,
    }, {
      name: '专业',
      value: '',
      default:true,
    }, {
      name: '班级',
      value: '',
      default:true,
    }, {
      name: '手机号',
      value: '',
      ischecked:false,
      prop:'phone_hide'
    }, {
      name: '邮箱',
      value: '',
      ischecked:false,
      prop:'email_hide'
    }, {
      name: 'QQ',
      value: '',
      ischecked:false,
      prop:'qq_hide'
    }, {
      name: '微信',
      value: '',
      ischecked:false,
      prop:'weixin_hide'
    }, {
      name: '工作/升学所在地',
      value: '',
      default:true,
    }, {
      name: '详细地址（选填）',
      value:'',
      ischecked:false,
      prop:'address_hide'
    }]
  },
  {
    title: '就业档案',
    iconPath: '/images/icon-file.png',
    list: [{
      name: '用人单位名称',
      value: '',
      ischecked:false,
      prop:'unit_name_hide'
    }, {
      name: '单位性质',
      value: '',
      default:true,
    }, {
      name: '单位所在行业',
      value: '',
      default:true,
    }, {
      name: '工作职位类别',
      value: '',
      default:true,
    }, {
      name: '岗位名称（选填）',
      value: '',
      ischecked:false,
      prop:'post_name_hide'
    }, {
      name: '起薪（选填）',
      value: '',
      ischecked:false,
      prop:'money_hide'
    }]
  },
  {
    title: '升学档案',
    iconPath: '/images/icon-student.png',
    list: [{
        name: '层次',
        value: '',
        default:true,
      },
      {
        name: '学校',
        value: '',
        default:true,
      },
      {
        name: '院系',
        value: '',
        ischecked:false,
        prop:'faculty_hide'
      },
      {
        name: '专业',
        value: '',
        ischecked:false,
        prop:'line_text_hide'
      },
    ]
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList:optionList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync('recodeInfo')
    let privateinfo = wx.getStorageSync('privateInfo')
    this.data.optionList.map(item=>{
      data.map(ditem=>{
          item.list.map(subitem=>{
            ditem.list.map(dsub=>{
              if(subitem.name === dsub.name){
                subitem.value = dsub.value
              }
            })
          })
      })
    })
    this.setData({
      optionList:this.data.optionList
    })
    if(privateinfo){
      this.data.optionList.map(item=>{
        privateinfo.map(pdata=>{
          item.list.map(sublist=>{
            pdata.list.map(subp=>{
              if(sublist.name === subp.name){
                sublist.ischecked = subp.ischecked
              }
            })
          })
        })
      })
      this.setData({
        optionList:this.data.optionList
      })
    }
  },

  handleClickChange(e){
    let name = e.currentTarget.dataset.name
    this.data.optionList.map(item=>{
      item.list.map(list=>{
        if(list.name === name){
          list.ischecked = !list.ischecked
        }
      })
    })
    this.setData({
      optionList:this.data.optionList
    })
  },

  handleClickSubmit(){
    let data = this.data.optionList
    let arr = {}
    data.map(item=>{
      item.list.map(list=>{
        if(list.prop){
          arr[list.prop] = list.ischecked
        }
      })
    })
    app.apiPost('addStudent_Info_HideService',arr).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        wx.setStorageSync('privateInfo',data)
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