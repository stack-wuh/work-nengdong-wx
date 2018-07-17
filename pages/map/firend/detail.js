// pages/map/firend/detail.js
var app = getApp()
const temp = [
  {
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
    prop:'faculty',
    hide:'facultyHide',
    facultyHide:'true'
  },
  {
    name: '专业',
    value: '',
    prop:'line_text',
    hide:'lineTextHide',
    lineTextHide:'true'
  }]
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
            prop:'phone_number',
            hide:'phone_hide',
            phone_hide:'false',
          },
          {
            name: '邮箱',
            value: '',
            prop:'email',
            email_hide:'false',
            hide:'email_hide',
          },
          {
            name: 'QQ',
            value: '',
            prop:'qq',
            qq_hide:'false',
            hide:'qq_hide',
          },
          {
            name: "微信",
            value: '',
            prop:'weixin',
            weixin_hide:'false',
            hide:'weixin_hide',
          },
          {
            name: "工作/升学所在地",
            value: '',
          },
          {
            name: '详细地址',
            value: '',
            prop:'address',
            address_hide:'false',
            hide:'address_hide',
          }
        ]
      },
      {
        title: '就业档案',
        iconPath: '/images/icon-file.png',
        list: [{
            name: '用人单位名称',
            value: '',
            prop:'unit_name',
            unit_name_hide:'false',
            hide:'unit_name_hide',
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
            prop:'post_name',
            hide:'post_name_hide',
            post_name_hide:'false',
          },
          {
            name:'底薪',
            value:'',
            prop:'money',
            hide:'money_hide',
            money_hide:'false',
          }
        ]
      },
      {
        title: '升学档案',
        iconPath: '/images/icon-student.png',
        list: [
          [
          {
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
            prop:'faculty',
            facultyHide:'false',
            hide:'facultyHide'
          },
          {
            name: '专业',
            value: '',
            prop:'line_text',
            lineTextHide:'false',
            hide:'lineTextHide'
          }]
        ]
      }
    ],
    list: [],
    temp:temp
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(options.id)
    console.log(options.id)
  },
  formatList(){
    this.data.optionList[0].list.map(item=>{  // 基础信息
      for(var k in this.data.list){
        if(item.prop == k){
          item.value = this.data.list[k]
          item.value = item.value == null ? ' ' : item.value == 'null' ? ' ' : item.value
        }
        if(!item.prop){
          let provinces = this.data.list['site_provinces'] ? this.data.list['site_provinces'] : ''
          let city = this.data.list['site_cities'] ? this.data.list['site_cities'] : ''
          let area = this.data.list['site_areas'] ? this.data.list['site_areas'] : ''
          item.value = provinces + city + area
        }
      }
      for(var k in this.data.list.student_info_hide){
        if(item.hide && item.hide == k){
          item[item.hide] = (this.data.list.student_info_hide[k] == null || this.data.list.student_info_hide[k] == 'true')? 'true' : 'false'
        }
      }
    })
    this.data.optionList[1].list.map(item=>{  // 就业信息
      for(var k in this.data.list.employment_archives){
        if(item.prop == k){
          item.value = this.data.list.employment_archives[k]
          item.value = item.value == null ? ' ' : item.value == 'null' ? ' ' : item.value
        }
      }
      for(var k in this.data.list.student_info_hide){
        if(item.hide && item.hide == k){
          item[item.hide] = (this.data.list.student_info_hide[k] == null || this.data.list.student_info_hide[k] == 'true')? 'true' : 'false'
        }
      }
    })
    let newData = this.data.list.advance_ArchivesList , newArr = [] , hideList = this.data.list.advanceArchivesHideList
    newData.map(item=>{
      hideList.map(list=>{
        item = Object.assign(item,list)
      })
    })
    newData.map((item,index)=>{  // 升学信息
      var newList = JSON.parse(JSON.stringify(this.data.temp))
      for(var k in item){ 
        newList.map(list=>{
          if(list.prop == k){
            list.value = item[k]
            list.value = list.value == null ? ' ' : list.value == 'null' ? ' ' : list.value 
          }
          if(list.hide == k){
            list[list.hide] = (item[k] == 'true' || item[k] == null) ? 'true' : 'false'
          }
        })
      }
      newArr.push(newList)
    }) 
    this.data.optionList[2].list = newArr
    this.setData({
      optionList:this.data.optionList
    })
  },
  fetchData(id) {
    app.apiPost('/showStudent_Info',{id:id}).then(res=>{
      if(res.data[0].student_info_collect){
        res.data[0].is_collect = true
      }else{
        res.data[0].is_collect = false
      }
      this.setData({
        list:res.data[0]
      })
      this.formatList()
    })
  },
})