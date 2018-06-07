// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[
      {
        title:'校友风采',
        list:[
          {
            imgUrl:'/images/icon-list-1.png',
            name:'行业动态',
            pathUrl:'/pages/schoolfellow/list?name=行业动态'
          },
          {
            imgUrl:'/images/icon-list-2.png',
            name:'企业文化',
            pathUrl:'/pages/schoolfellow/list?name=企业文化'
          },
          {
            imgUrl:'/images/icon-list-3.png',
            name:'校友名录',
            pathUrl:'/pages/schoolfellow/list?name=校友名录'
          }
        ]
      },
      {
        title:'活动聚焦',
        list:[
          {
            imgUrl:'/images/icon-list-4.png',
            name:'活动展示',
            pathUrl:'/pages/activity/index/index?type=1'
          },
          {
            imgUrl:'/images/icon-list-5.png',
            name:'我发起的',
            pathUrl:'/pages/activity/mine/index'
          },
          {
            imgUrl:'/images/icon-list-6.png',
            name:'我参与的',
            pathUrl:'/pages/activity/index/index?type=2'
          }
        ]
      },
      {
        title:'黄页',
        list:[
          {
            imgUrl:'/images/icon-list-7.png',
            name:'校友黄页',
            pathUrl:'/pages/map/firend/firend'
          },
          {
            imgUrl:'/images/icon-list-8.png',
            name:'校友会黄页',
            pathUrl:'/pages/map/alumni/alumni'
          },
          {
            imgUrl:'/images/icon-list-9.png',
            name:'院校黄页',
            pathUrl:'/pages/map/school/scholl'
          },
          {
            imgUrl:'/images/icon-list-10.png',
            name:'我的收藏',
            pathUrl:'/pages/map/collect/collect'
          }
        ]
      },
      {
        title:'其他',
        list:[
          {
            imgUrl:'/images/icon-list-11.png',
            name:'校友捐赠',
            pathUrl:'/pages/other/donate/donate',
          },
          {
            imgUrl:'/images/icon-list-12.png',
            name:'互联互助',
            pathUrl:'/pages/other/help/help',
          }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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