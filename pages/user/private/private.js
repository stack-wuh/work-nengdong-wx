// pages/user/private/private.js
var app = getApp()
const optionList = [{
    title: '基础信息',
    iconPath: '/images/icon-info.png',
    list: [{
      name: '学院',
      value: '',
      default: true,
      rename:'school'
    }, {
      name: '专业',
      value: '',
      default: true,
      rename:'line'
    }, {
      name: '班级',
      value: '',
      default: true,
      rename:'classes'
    }, {
      name: '手机号',
      value: '',
      ischecked: false,
      prop: 'phone_hide',
      rename:'phone_number'
    }, {
      name: '邮箱',
      value: '',
      ischecked: false,
      prop: 'email_hide',
      rename:'email'
    }, {
      name: 'QQ',
      value: '',
      ischecked: false,
      prop: 'qq_hide',
      rename:'qq'
    }, {
      name: '微信',
      value: '',
      ischecked: false,
      prop: 'weixin_hide',
      rename:'weixin'
    }, {
      name: '工作/升学所在地',
      value: '',
      default: true,
      rename:'site'
    }, {
      name: '详细地址（选填）',
      value: '',
      ischecked: false,
      prop: 'address_hide',
      rename:'address'
    }]
  },
  {
    title: '就业档案',
    iconPath: '/images/icon-file.png',
    list: [{
      name: '用人单位名称',
      value: '',
      ischecked: false,
      prop: 'unit_name_hide',
      rename:'unit_name'
    }, {
      name: '单位性质',
      value: '',
      default: true,
      rename:'unit_property'
    }, {
      name: '单位所在行业',
      value: '',
      default: true,
      rename:'unit_way'
    }, {
      name: '工作职位类别',
      value: '',
      default: true,
      rename:'place_class'
    }, {
      name: '岗位名称（选填）',
      value: '',
      ischecked: false,
      prop: 'post_name_hide',
      rename:'post_name'
    }, {
      name: '起薪（选填）',
      value: '',
      ischecked: false,
      prop: 'money_hide',
      rename:'money'
    }]
  },
  {
    title: '升学档案',
    iconPath: '/images/icon-student.png',
    list: [
     [
      {
        name: '层次',
        value: '',
        default: true,
        rename:'levels'
      },
      {
        name: '学校',
        value: '',
        default: true,
        rename:'schools'
      },
      {
        name: '院系',
        value: '',
        ischecked: false,
        prop: 'faculty_hide',
        rename:'faculty'
      },
      {
        name: '专业',
        value: '',
        ischecked: false,
        prop: 'line_text_hide',
        rename:'line_text'
      }
     ],
    ],
  }
]
const temp = [
  {
    name: '层次',
    value: '',
    default: true,
    rename:'levels',
  },
  {
    name: '学校',
    value: '',
    default: true,
    rename:'schools',
  },
  {
    name: '院系',
    value: '',
    ischecked: false,
    rename:'faculty',
    prop:'facultyHide'
  },
  {
    name: '专业',
    value: '',
    ischecked: false,
    prop: 'lineTextHide',
    rename:'line_text'
  }
 ]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: optionList,
    temp:temp
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync('recodeInfo') , privateinfo = wx.getStorageSync('privateInfo') //获取--毕业档案提交表单 循环列表--optionList
    this.data.optionList.map(item=>{
      item.list.map(list=>{
        for(var k in data){
          if(k == list.rename){
            list.value = data[k]
          }
        }
      })
      if(item.title == '升学档案'){
        let newList = JSON.parse(data.data) , temp = JSON.parse(JSON.stringify(this.data.temp))
        let newArr = []
        for(var i=0;i<newList.length;i++){
          newArr[i] = []
        }
        newList.map((list,index)=>{
          let temp = JSON.parse(JSON.stringify(this.data.temp))
            for(var k in list){
              temp.map((n,i)=>{
                if(n.rename == k){
                  n.value = list[k]
                }
              })
            }
          newArr[index] = temp
        })
        item.list = newArr
      }
    })
    this.setData({optionList:this.data.optionList})
    this.fetchData()
  },

  handleClickChange(e) {
    let name = e.currentTarget.dataset.name ,
        arrIndex = e.currentTarget.dataset.index
    this.data.optionList.map(item => {
      item.list.map(list => {     // 设置基本信息和就业档案隐藏
        if (list.name === name) {
          list.ischecked = !list.ischecked
        }
      })
    })
    this.data.optionList[2].list.map( (item,index) =>{ // 设置升学信息隐藏
      item.map(list => {
        if(list.name == name && index == arrIndex){
          list.ischecked = !list.ischecked
        }
      })
    })
    this.setData({
      optionList: this.data.optionList
    })
  },

  handleClickSubmit() {
    let data = this.data.optionList
    let arr = {data:[],} 
    data.map(item => {
      item.list.map(list => {
        if (list.prop) {
          arr[list.prop] = list.ischecked
        }
      })
    })
    data[2].list.map(item =>{
      const obj = {}
      item.map( list =>{
        if(list.prop){
          console.log(list)
          obj[list.prop] = list.ischecked
          obj.advanceArchivesId = list.advanceArchivesId
        }
      })
      arr.data.push(obj)
    })
    console.log(arr)
    // return
    arr.data = JSON.stringify(arr.data)
    app.apiPost('addStudent_Info_HideService', arr).then(res => {
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error, res.msg)
      if (res.error == 0) {
        wx.setStorageSync('privateInfo', data)
      }
    })
  },

  fetchData(){
    app.apiPost('showStudent_Info',{id:wx.getStorageSync('number')}).then(res=>{
      var hideList = res.data[0].student_info_hide
      // var advanceList = res.data[0].advanceArchivesHideList
      var advanceList = res.data[0].advance_ArchivesList
      this.data.optionList[0].list.map(item => {  // 基础信息隐藏
        for(var k in hideList){
          if(item.prop == k){
            item.ischecked = hideList[k] == 'true' ?  true : false
          }
        }
      })
      this.data.optionList[1].list.map(item => {  // 就业信息隐藏
        for(var k in hideList){
          if(item.prop == k){
            item.ischecked = hideList[k] == 'true' ? true : false
          }
        }
      })
      this.data.optionList[2].list.map((item,index) => { // 升学信息隐藏
        item.map((list,lindex) =>{
          var obj = advanceList[index]
          list.advanceArchivesId = obj.id
          if(list.prop){
            list.ischecked = true
          }
          // for(var k in obj){
          //   if(k == list.prop){
          //     list.ischecked = obj[k] == 'true' ? true : false
          //     list.id = obj.id
          //   } 
          // }
        })  
      })
      this.setData({
        optionList:this.data.optionList
      })
    })
  }
})