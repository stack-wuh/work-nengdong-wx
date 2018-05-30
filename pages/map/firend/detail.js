// pages/map/firend/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [{
        title: '基础信息',
        iconPath: '/images/icon-info.png',
        list: [{
            name: '手机号',
            value: '',
            prop:'phone_number'
          },
          {
            name: '邮箱',
            value: '',
            prop:'email'
          },
          {
            name: 'QQ',
            value: '',
            prop:'qq'
          },
          {
            name: "微信",
            value: '',
            prop:'weixin'
          },
          {
            name: "工作/升学所在地",
            value: '',
          },
          {
            name: '详细地址（选填）',
            value: '',
            prop:'address'
          }
        ]
      },
      {
        title: '就业档案',
        iconPath: '/images/icon-file.png',
        list: [{
            name: '用人单位名称',
            value: '',
            prop:'unit_name'
          },
          {
            name: '单位性质',
            value: '',
            prop:'unit_property'
          },
          {
            name: '单位所在行业',
            value: '',
            prop:'unit_way'
          },
          {
            name: '工作职位类别',
            value: '',
            prop:'place_class'
          },
          {
            name: '岗位名称',
            value: '',
            prop:'post_name'
          }
        ]
      },
      {
        title: '升学档案',
        iconPath: '/images/icon-student.png',
        list: [{
            name: '层次',
            value: '',
            prop:'levels'
          },
          {
            name: '学校',
            value: '',
            prop:'schools'
          },
          {
            name: '院系',
            value: '',
            prop:'faculty'
          },
          {
            name: '专业',
            value: '',
            prop:'line_text'
          }
        ]
      }
    ],
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(options.id)
    this.formatList()
  },
  formatList(){
    this.data.optionList[0].list.map(item=>{
      for(var k in this.data.list){
        if(item.prop == k){
          item.value = this.data.list[k]
        }
        if(!item.prop){
          item.value = this.data.list['site_provinces'] +'省'+ this.data.list['site_cities'] + '市' + this.data.list['site_areas'] + '县（区）' 
        }
      }
    })
    this.data.optionList[1].list.map(item=>{
      for(var k in this.data.list.employment_archives){
        if(item.prop == k){
          item.value = this.data.list.employment_archives[k]
        }
      }
    })
    this.data.optionList[2].list.map(item=>{
      for(var k in this.data.list.advance_archives){
        if(item.prop == k){
          item.value = this.data.list.advance_archives[k]
        }
      }
    })

    this.setData({
      optionList:this.data.optionList
    })
  },
  fetchData(id) {
    let data = wx.getStorageSync('firendsList')
    let obj = data.find(item => {
      return item.id == id
    })
    this.setData({
      list: obj
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