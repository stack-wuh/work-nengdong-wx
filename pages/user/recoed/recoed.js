// pages/user/recoed/recoed.js
var app = getApp()
const optionList = [
  {
    title: '基础信息',
    iconPath: '/images/icon-info.png',
    list: [{
        name: '学院',
        value: '',
        require: true,
        list: [],
        range: 'school_name',
        isInput: false,
        prop: 'school'
      }, {
        name: '专业',
        value: '',
        require: true,
        list: [],
        range: 'line_name',
        isInput: false,
        prop: 'line'
      }, {
        name: '班级',
        value: '',
        list: [],
        range: 'class_name',
        require: true,
        isInput: false,
        prop: 'classes'
      }, {
        name: '手机号',
        value: '',
        prop: 'phone_number',
        require: true,
        isInput: true,
      }, {
        name: '邮箱',
        value: '',
        prop: 'email',
        require: true,
        isInput: true
      }, {
        name: 'QQ',
        value: '',
        prop: 'qq',
        require: true,
        isInput: true
      }, {
        name: '微信',
        value: '',
        prop: 'weixin',
        require: true,
        isInput: true
      },
      {
        name: '工作/升学所在地',
        value: ['湖北省', '武汉市', '洪山区'],
        require: true,
        isInput: false,
        list: [],
        prop: 'site'
      }, {
        name: '详细地址（选填）',
        value: '',
        prop: 'address',
        isInput: true,
        require: false
      }
    ]
  },
  {
    title: '就业档案',
    iconPath: '/images/icon-file.png',
    list: [{
      name: '用人单位名称',
      value: '',
      prop: 'unit_name',
      require: true,
      isInput: true
    }, {
      name: '单位性质',
      value: '',
      list: [],
      range: 'property_name',
      require: true,
      isInput: false,
      prop: 'unit_property'
    }, {
      name: '单位所在行业',
      value: '',
      list: [],
      range: 'way_name',
      require: true,
      isInput: false,
      prop: 'unit_way'
    }, {
      name: '工作职位类别',
      value: '',
      list: [],
      range: 'place_class_name',
      require: true,
      isInput: false,
      prop: 'place_class'
    }, {
      name: '岗位名称（选填）',
      value: '',
      prop: 'post_name',
      isInput: true,
      require: false
    }, {
      name: '起薪（选填）',
      value: '',
      prop: 'money',
      isInput: true,
      require: false
    }]
  },
  {
    title: '升学档案',
    iconPath: '/images/icon-student.png',
    list: [
    //   [
    //     {
    //       name: '层次',
    //       value: '',
    //       list: [],
    //       range: 'level_name',
    //       require: true,
    //       isInput: false,
    //       prop: 'levels'
    //     },
    //     {
    //       name: '学校',
    //       value: '',
    //       prop: 'schools',
    //       require: true,
    //       isInput: true
    //     },
    //     {
    //       name: '院系',
    //       value: '',
    //       prop: 'faculty',
    //       require: true,
    //       isInput: true
    //     },
    //     {
    //       name: '专业',
    //       value: '',
    //       prop: 'line_text',
    //       require: true,
    //       isInput: true
    //     },
    //   ]
    ]
  }
]
const temp = [
  {
    name: '层次',
    value: '',
    list: [],
    range: 'level_name',
    require: true,
    isInput: false,
    prop: 'levels'
  },
  {
    name: '学校',
    value: '',
    prop: 'schools',
    require: true,
    isInput: true
  },
  {
    name: '院系',
    value: '',
    prop: 'faculty',
    require: true,
    isInput: true
  },
  {
    name: '专业',
    value: '',
    prop: 'line_text',
    require: true,
    isInput: true
  },
]
/**
 * @params recoedType 
 * 1 没有提交毕业档案
 * 2 预览毕业档案
 * 3 保存毕业档案
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: optionList,
    temp:temp,
    recoedType: 2,
    schoolList: [],
    school: '',
    type: 1,
    animation: '',
    isBack: false,
    isbtn: true,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: '编辑档案'
      })
    }
    this.getSchool()
    this.getMajor()
    this.getKlass()
    this.getNautre()
    this.getTrade()
    this.getClassify()
    this.getLevel()
    this.fetchData()
  },

  //点击继续添加
  addNew() {
    this.getLevel()
    var newArr = JSON.parse(JSON.stringify(this.data.temp))
    this.data.optionList[2].list.push(newArr)
    this.setData({
      optionList: this.data.optionList
    })
  },
  jumpToOther() {
    if (this.data.isbtn) {
      wx.navigateTo({
        url: '/pages/user/private/private'
      })
    }
  },
  saveInput(e) {
    let name = e.currentTarget.dataset.name , 
        sub = e.currentTarget.dataset.sub
    this.data.optionList.map((item,itemIndex) => {
      if(item.title == '升学档案'){
          item.list.map((list,listIndex)=>{
            if(listIndex == sub)
              list.map(subList=>{
                if(subList.name === name){
                  subList.value = e.detail.value
                }
              })
          })
      }else{
        item.list.map(list => {
          if (list.name === name) {
            list.value = e.detail.value
          }
        })
      }
    })
    this.setData({
      optionList: this.data.optionList
    })
  },
  pickerChange(e) {
    let name = e.currentTarget.dataset.name
    let sub = e.currentTarget.dataset.sub
    let index = e.detail.value
    this.data.optionList.map(item => {
      if(item.title == '升学档案'){
        item.list.map((list,listIndex)=>{
          if(listIndex == sub)
            list.map((subList,subIndex)=>{
              if(subList.name == '层次'){
                subList.value = subList.list[index][subList.range]
              }
            })
        })
      }else{
        item.list.map(list => {
          if (name !== '工作/升学所在地') {
            if (list.name === name && list.list !== undefined && list.list !== null) {
              list.value = list.list[index][list.range]
            }
          } else if (list.name === '工作/升学所在地') {
            list.value = e.detail.value
          }
        })
      }
    })
    this.setData({
      optionList: this.data.optionList
    })
  },
  getLevel() {
    app.apiPost('getStudent_Info_Level').then(res => {
      this.data.optionList[2].list.map(item => {
        item.map(list=>{
          if (list.name === '层次') {
            list.list = res
          }
        })
      })
      this.setData({
        optionList: this.data.optionList
      })
    })
  },
  getClassify() {
    app.apiPost('getStudent_Info_Place_Class').then(res => {
      this.data.optionList[1].list.map(item => {
        if (item.name === '工作职位类别') {
          item.list = res
        }
      })
      this.setData({
        optionList: this.data.optionList
      })
    })
  },
  getTrade() {
    app.apiPost('getStudent_Info_WayService').then(res => {
      this.data.optionList[1].list.map(item => {
        if (item.name === '单位所在行业') {
          item.list = res
        }
      })
      this.setData({
        optionList: this.data.optionList
      })
    })
  },
  getNautre() {
    app.apiPost('getStudent_Info_Property').then(res => {
      this.data.optionList[1].list.map(item => {
        if (item.name === '单位性质') {
          item.list = res
        }
      })
      this.setData({
        optionList: this.data.optionList
      })
    })
  },
  getKlass() {
    app.apiPost('getStudent_Info_Class').then(res => {
      this.data.optionList[0].list.map(item => {
        if (item.name === '班级') {
          item.list = res
        }
      })
      this.setData({
        optionList: this.data.optionList
      })
    })
  },
  getMajor() {
    app.apiPost('getStudent_Info_Line').then(res => {
      this.data.optionList[0].list.map(item => {
        if (item.name === '专业') {
          item.list = res
        }
      })
      this.setData({
        optionList: this.data.optionList
      })
    })
  },
  getSchool() {
    app.apiPost('getSchool_Info_School').then(res => {
      this.data.optionList[0].list.map(item => {
        if (item.name === '学院') {
          item.list = res.data
        }
      })
      this.setData({
        optionList: this.data.optionList,
        typeList: res
      })
    })
  },
  handleSubmit(e) {
    let base = {} , work = {} , levels = [] , info = {} ,all = {} , self = this
    this.data.optionList[0].list.map(item=>{
      base[item.prop] = item.value
    })
    this.data.optionList[1].list.map(item=>{
      work[item.prop] = item.value
    })
    this.data.optionList[2].list.map(item=>{
        let obj = {}
        item.map(list=>{
          obj[list.prop] = list.value
          obj.archivesId = list.id
          obj.advanceArchivesId = list.id
        })
        levels.push(obj)
    })
    let number = wx.getStorageSync('number').toString()
    levels = JSON.stringify(levels)
    info = Object.assign(base,work,{data:levels,id:number})
    wx.request({
      // url:app.server + 'addEmployment_Archives',
      url:app.server + 'addAlumnus_Info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: info,
      success:function(res){
        let error = res.data.error == 0 ? 'success' : 'error'
        app.toastMsg(error,res.data.msg)
        if(res.data.error == 0){
         setTimeout(()=>{
          wx.navigateBack({
            delta:1
          })
         },1000)
        }
        wx.setStorageSync('myInfo',self.data.optionList)
        wx.setStorageSync('recodeInfo',info)
      }
    })
  },
  fetchData(){
    app.apiPost('showStudent_Info',{id:wx.getStorageSync('number')}).then(res=>{
      var info = res.data[0]
      this.data.optionList[0].list.map(item => {  // 基础信息
        for(var k in info){
          if(item.prop == k){
            if(info[k] == null || info[k]=='null'){
              item.value = ''
            }else{
              item.value = info[k]
            }
          }
        }
      })  
      this.data.optionList[1].list.map(item => {  // 就业档案
          for(var k in info.employment_archives){
            if(item.prop == k){
              if(info.employment_archives[k] == null || info.employment_archives[k] == 'null'){
                item.value = ''
              }else{
                item.value = info.employment_archives[k]
              }
            }
          }
      })  
      info.advance_ArchivesList.map((item,index) => { // 升学档案
        var obj = JSON.parse(JSON.stringify(this.data.temp))
        obj.map(oo => {
          for(var k in item){
            if(oo.prop == k){
              // oo.value = item[k]
              oo.id = item.id
              if(item[k] == null || item[k] == 'null'){
                oo.value = ''
              }else{
                oo.value = item[k]
              }
            }
          }
        })
        this.data.optionList[2].list[index] = obj
      })
      this.setData({
        optionList:this.data.optionList
      })
    })  
  }
})