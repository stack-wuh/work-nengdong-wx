// pages/map/firend/firend.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[
      {
        name:'入学年份',
        list:['2010','2011','2012','2013','2014'],
        value:'',
        prop:'age_name',
        search:'school_age'
      },
      {
        name:'专业',
        list:['油气储运工程','能源与动力工程','轮机工程'],
        value:'',
        prop:'line_name',
        search:'line'
      },
      {
        name:'班级',
        list:['20100102','20100103','20100102','20100102','20100102','20100103','20100102','20100102'],
        value:'',
        prop:'class_name',
        search:'classes'
      },
      {
        name:'所在地',
        list:['湖北省','武汉市','洪山区'],
        value:'',
        search:'site'
      },
      {
        name:'状态',
        list:['升学','就业','升学就业'],
        value:'',
        prop:'',
        search:'state'
      },
      {
        name:'单位性质',
        list:['外资','合资','国企','民营公司','上市公司','创业公司','外企代表处','政府机关','事业单位'],
        value:'',
        prop:'property_name',
        search:'unit_property'
      },
      {
        name:'所在行业',
        list:['计算机/网路/通讯/电子','会计/金融/银行/保险','贸易/消费/制造/营运','广告/媒体','广告/媒体'],
        value:'',
        prop:'place_class_name',
        search:'unit_way'
      }
    ],
    animation:'',
    list:[],
    isShowDialog:false,
    isShowInput:false,
    info:{
      name:'',
      line:'',
      classes:'',
      unit_property:'',
      state:'',
      unit_way:'',
      school_age:'',
      site:'',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
    this.getYears()
    this.getClassifies()
    this.getKlasses()
    this.getPropety()
    this.getWorks()
  },
  resetInfo(){
    for(var k  in this.data.info){
      this.data.info[k] = ''
    }
    this.setData({
      info:this.data.info
    })
    this.fetchData()
  },
  pickerChange(e){
    let vIndex = e.detail.value , name = e.currentTarget.dataset.name , index = e.currentTarget.dataset.index
    this.data.menuList.map((item,idx)=>{
      if(item.name == name){
        if(item.prop){
          item.value = this.data.menuList[index].list[vIndex][item.prop]
        }else if(item.name === '所在地'){
          item.value = e.detail.value
        }else if(item.name === '状态'){
          item.value = this.data.menuList[index].list[vIndex]
        }
      }
      for(var k in this.data.info){
        if(item.search == k){
          this.data.info[k] = item.value
        }
      }
    })
    this.setData({
      menuList:this.data.menuList,
      info:this.data.info
    })
    this.fetchData()
  },
  getYears(){
    app.apiPost('getYear').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name == '入学年份'){
          item.list = res
        }
      })
      this.setData({
        menuList:this.data.menuList
      })
    })
  },
  getClassifies(){
    app.apiPost('getStudent_Info_Line').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name === '专业'){
          item.list = res
        }
      })
      this.setData({
        menuList:this.data.menuList
      })
    })
  },
  getKlasses(){
    app.apiPost('getStudent_Info_Class').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name === '班级'){
          item.list = res
        }
      })
      this.setData({
        menuList:this.data.menuList
      })
    })
  },
  getStates(){

  },
  getPropety(){
    app.apiPost('getStudent_Info_Property').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name === '单位性质'){
          item.list = res
        }
      })
      this.setData({
        menuList:this.data.menuList
      })
    })
  },
  getWorks(){
    app.apiPost('getStudent_Info_Place_Class').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name === '所在行业'){
          item.list = res
        }
      })
      this.setData({
        menuList:this.data.menuList
      })
    })
  },
  saveInput(e){
    this.data.info.name = e.detail.value
    this.setData({
      info:this.data.info
    })
  },
  showInput(e){
    let index = e.currentTarget.dataset.index
    index == 0 && this.setData({
      isShowDialog:true
    })
    index == 1 && this.setData({
      isShowInput:true
    })
  },
  handleClickCollect(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('addStudent_Info_Collect',{others_id:id}).then(res=>{
      this.data.list.map(item=>{
        if(item.id == id){
          item.student_info_collect.or_name = !item.student_info_collect.or_name
        }
      })
      this.setData({
        list:this.data.list
      })
    })
  },
  showCheckBox(e){
    let isRow = e.currentTarget.dataset.isrow
    isRow == 1 && this.setData({
      animation:app.animation(this.data.animation,-375,0)
    })
    isRow == 2 && this.setData({
      animation:app.animation(this.data.animation,0,0)
    })
  },

  fetchData(){
    app.apiPost('getStudent_Info',this.data.info).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      res.error == 0 &&
      this.setData({
        list:res.data,
        isShowDialog:false,
        animation:app.animation(this.data.animation,0,0)
      })
      wx.setStorageSync('firendsList',res.data)
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