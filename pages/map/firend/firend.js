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
        list:[],
        value:'',
        prop:'age_name',
        search:'school_age',
        height: '150rpx'
      },
      {
        name:'专业',
        list:[],
        value:'',
        prop:'line_name',
        search:'line',
        height: '150rpx'
      },
      {
        name:'班级',
        list:[],
        value:'',
        prop:'class_name',
        search:'classes',
        height: '150rpx'
      },
      {
        name:'所在地',
        list: [],
        value:'',
        prop: 'site',
        search:'site',
        height: '150rpx',
        choosed: false
      },
      {
        name:'状态',
        list: [{ state: '升学' }, { state: '就业' }, { state: '升学就业' }],
        value:'',
        prop:'state',
        search:'state',
        height: '150rpx'
      },
      {
        name:'单位性质',
        list:[],
        value:'',
        prop:'property_name',
        search:'unit_property',
        height: '150rpx'
      },
      {
        name:'所在行业',
        list:[],
        value:'',
        prop:'place_class_name',
        search:'unit_way',
        height: '150rpx'
      }
    ],
    animation:'',
    list:[],
    isShowDialog:false,
    isShowInput:false,
    info:{
      line:'',
      classes:'',
      unit_property:'',
      state:'',
      unit_way:'',
      school_age:'',
      site:'',
    },
    page: 1,
    showMore: true,
    remind: '正在加载中',
    name: '',
    isShowSlide: true
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
    this.data.menuList.forEach(item=>{
      if(item.name == '所在地'){
        this.data.menuList[3].value = ''
        this.data.menuList[3].choosed = false
      }else{
        item.list.forEach(item1=>{
          item1.choosed = false
        })
      }
    })
    this.setData({
      menuList: this.data.menuList,
    })
  },
  pickerChange(e){
    this.data.menuList[3].value = e.detail.value.join('')
    this.data.menuList[3].choosed = true
    this.setData({
      menuList: this.data.menuList,
    })
    // let vIndex = e.detail.value , name = e.currentTarget.dataset.name , index = e.currentTarget.dataset.index
    // this.data.menuList.map((item,idx)=>{
    //   if(item.name == name){
    //     if(item.prop){
    //       item.value = this.data.menuList[index].list[vIndex][item.prop]
    //     }else if(item.name === '所在地'){
    //       item.value = e.detail.value
    //     }else if(item.name === '状态'){
    //       item.value = this.data.menuList[index].list[vIndex]
    //     }
    //   }
    //   for(var k in this.data.info){
    //     if(item.search == k){
    //       this.data.info[k] = item.value
    //     }
    //   }
    // })
    // this.setData({
    //   menuList:this.data.menuList,
    //   info:this.data.info
    // })
    // this.fetchData()
  },
  delRegion: function(){
    this.data.menuList[3].value = ''
    this.data.menuList[3].choosed = false
    this.setData({
      menuList: this.data.menuList,
    })
  },
  getYears(){
    app.apiPost('getYear').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name == '入学年份'){
          item.list = res.data
          item.list.forEach(item1=>{
            item1.choosed = false
          })
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
          item.list.forEach(item1 => {
            item1.choosed = false
          })
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
          item.list.forEach(item1 => {
            item1.choosed = false
          })
        }
      })
      this.setData({
        menuList:this.data.menuList
      })
    })
  },
  getPropety(){
    app.apiPost('getStudent_Info_Property').then(res=>{
      this.data.menuList.map(item=>{
        if(item.name === '单位性质'){
          item.list = res
          item.list.forEach(item1 => {
            item1.choosed = false
          })
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
          item.list.forEach(item1 => {
            item1.choosed = false
          })
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
  bindblur: function(){
    this.setData({
      isShowDialog: false,
      isShowInput: false,
      name: ''
    })
  },
  handleClickCollect(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('addStudent_Info_Collect',{others_id:id}).then(res=>{
      app.toastMsg(res.error?'error':'success', res.msg)
      if(!res.error){
        this.data.list.map(item => {
          if (item.id == id) {
            item.is_collect = !item.is_collect
          }
        })
        this.setData({
          list: this.data.list
        })
        wx.setStorageSync('firendsList', this.data.list)
      }
    })
  },
  showCheckBox(e){
    let isRow = e.currentTarget.dataset.isrow
    this.setData({
      isShowSlide: isRow == 2?true:false
    })
    if(isRow == 2){
      this.resetInfo()
    }
    // isRow == 1 && this.setData({
    //   animation:app.animation(this.data.animation,-375,0)
    // })
    // isRow == 2 && this.setData({
    //   animation:app.animation(this.data.animation,0,0)
    // })
  },

  fetchData(){
    let data = Object.assign(this.data.info, { pageNo: this.data.page, name: this.data.name, aid: wx.getStorageSync('number')})
    app.apiPost('getStudent_Info',data, false).then(res=>{
      res.data = res.data||[]
      res.data.forEach(item=>{
        item.is_collect = item.student_info_collect?true:false
      })
      let error = res.error == 0 ? 'success' : 'error'
      res.error == 0 &&
      this.setData({
        list: this.data.list.concat(res.data),
        isShowDialog:false,
        animation:app.animation(this.data.animation,0,0)
      })
      if(res.data.length==10){
        this.setData({
          showMore: true,
          remind: '上拉加载更多'
        })
      }else{
        this.setData({
          showMore: false,
          remind: '没有更多啦'
        })
      }
      wx.setStorageSync('firendsList',res.data)
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.showMore){
      this.setData({
        page: this.data.page + 1
      })
      this.fetchData()
    }
  },

  /**
   * 搜索
   */
  searchData: function(e){
    this.setData({
      list: [],
      page: 1,
      showMore: true,
      remind: '正在加载中',
      name: e.detail.value
    })
    this.fetchData()
  },

  /**
   * 切换分类内容显示隐藏
   */
  tagShow: function(e){
    let index = e.currentTarget.dataset.index
    this.data.menuList[index].height = this.data.menuList[index].height == '100%' ? '150rpx' :'100%'
    this.setData({
      menuList: this.data.menuList
    })
  },

  tagChoose: function(e){
    this.data.menuList[e.currentTarget.dataset.list].list[e.currentTarget.dataset.index].choosed = !this.data.menuList[e.currentTarget.dataset.list].list[e.currentTarget.dataset.index].choosed
    this.setData({
      menuList: this.data.menuList
    })
  },

  filterData: function(){
    this.data.menuList.forEach(item=>{
      if(item.name == '所在地'){
        this.data.info.site = item.value
      }else{
        let list = []
        item.list.forEach(item1=>{
          if(item1.choosed){
            list.push(item1[item.prop])
          }
        })
        this.data.info[item.search] = list
      }
    })
    this.setData({
      info: this.data.info,
      isShowSlide: true
    })
    this.fetchData()
  }
  

})