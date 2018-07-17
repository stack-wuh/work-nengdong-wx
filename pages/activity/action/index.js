// pages/activity/action/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:['校友活动','学校活动','学院活动','专业活动','班级活动','讲座活动'],
    type:'',
    organizerList:['官方','非官方'],
    organ:'',
    klassList:['校团委','学生会','学工处','后勤处'],
    klass:'',
    start:'',
    end:'',
    cover:[],
    address:[],
    isShow:0,
    years:[],
    months:[],
    days:[],
    hours:[],
    munite:[],
    showPickerView:false,
    nowTime: [],
    user:{
      name:'',
      phone_number:'',
      email:'',
      qq:'',
      weixin:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newTimeStr()
    this.getUserInfo()
  },

  setMonthDay: function(day){
    this.data.days = []
    for (var i = 1; i <= day; i++) {
      this.data.days.push(i)
    }
    this.setData({
      days: this.data.days
    })
  },
  pickerViewChange(e){
    let indexArr = e.detail.value
    let month_arr = [1,3,5,7,8,10,12]
    let month = indexArr[1] + 1
    if(month == 2){
      if (this.data.years[indexArr[0]]%4){
        this.setMonthDay(28)
      }else{
        this.setMonthDay(29)
      }
      
    }else if(month_arr.indexOf(month)>-1){
      this.setMonthDay(31)
    }else{
      this.setMonthDay(30)
    }

    if(this.data.showPickerView == 'start'){
      this.data.start = this.data.years[indexArr[0]] +'-'+this.data.months[indexArr[1]]+'-'+this.data.days[indexArr[2]]+' '+this.data.hours[indexArr[3]]+':'+this.data.munite[indexArr[4]]+':'+'00'
    }
    if(this.data.showPickerView == 'end'){
      this.data.end = this.data.years[indexArr[0]] +'-'+this.data.months[indexArr[1]]+'-'+this.data.days[indexArr[2]]+' '+this.data.hours[indexArr[3]]+':'+this.data.munite[indexArr[4]]+':'+'00'
    }
  },
  pickerBtn(e){
    let type = e.currentTarget.dataset.btn
    if(type == 'ok'){
      this.setData({
        start:this.data.start,
        end:this.data.end,
        showPickerView:false
      })
    }else{
      this.setData({
        showPickerView:false
      })
    }
  },
  timeConfirm(){

  },
  newTimeStr(){
    let date = new Date()

    for(var i = 2018; i<date.getFullYear()+5;i++){
      this.data.years.push(i)
    }
    for(var i=1;i<=12;i++){
      
      this.data.months.push(i)
    }
    for(var i=1;i<=31;i++){
      this.data.days.push(i)
    }
    for(var i=0;i<24;i++){
      if(i < 10){
        i = '0' + i
      }
      this.data.hours.push(i)
    }
    for(var i=0;i<60;i++){
      if(i<10){
        i = '0'+i
      }
      this.data.munite.push(i)
    }
    this.setData({
      years:this.data.years,
      months:this.data.months,
      days:this.data.days,
      hours:this.data.hours,
      munite:this.data.munite,
      nowTime: [this.data.years.indexOf(date.getFullYear()), this.data.months.indexOf(date.getMonth() + 1), this.data.days.indexOf(date.getDate()), this.data.hours.indexOf(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()), this.data.munite.indexOf(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())]
    })
  },
  chooseTime(e){
    let type = e.currentTarget.dataset.type
    this.setData({
      showPickerView:type
    })
  },
  pickerChange(e){
    let type = e.currentTarget.dataset.type
    let value = []
    switch(type){
      case 1 : this.setData({type:this.data.typeList[e.detail.value]})
                break;
      case 2 :this.setData({organ:this.data.organizerList[e.detail.value]})
                break;
      case 3 : this.setData({klass:this.data.klassList[e.detail.value]})
    }
  },
  cancel(){
    this.setData({
      isShow:0
    })
  },
  deleteImg(e){
    let index = e.currentTarget.dataset.index 
    let type = e.currentTarget.dataset.type
    if(type == 1){
      this.setData({
        cover:''
      })
    }
    if(type == 2){
      this.data.address.splice(index,1)
      this.setData({
        address:this.data.address
      })
    }
  },
  uploadImg(e){
    let self = this ,
    type = e.currentTarget.dataset.type
    wx.chooseImage({
      count:1,
      success:function(res){
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url:app.server + 'addImages',
          filePath:tempFilePaths[0],
          name:'file',
          success:function(res){
            let data = JSON.parse(res.data)
              if(res.statusCode == 200){
                if(type == 1){
                  self.setData({
                    cover:data
                  })
                }
                if(type == 2){
                  self.data.address.push(data)
                  self.setData({
                    address:self.data.address
                  })
                }
              }else{
                app.toastMsg('error','上传失败')
              }
          }
        })
      }
    })
  },

  formSubmit(e){
    var data = e.detail.value
    var newList = {
      starttime:this.data.start,
      endtime:this.data.end,
      cover:this.data.cover,
      address:this.data.address.toString()
    }
    data = Object.assign(data,newList)
    console.log(data)
    return
    if(data.cover.length == 0){
      app.toastMsg('error','请上传封面照')
      return
    }
    if(!data.title){
      app.toastMsg('error','请填写标题')
      return
    }
    if(!data.type){
      app.toastMsg('error','请选择活动类型')
      return
    }
    if(!data.starttime || !data.endtime){
      app.toastMsg('error','请选择时间')
      return
    }
    if(!data.place){
      app.toastMsg('error','请填写地址')
      return
    }
    if(!data.organizer){
      app.toastMsg('error','请选择组织者')
      return
    }
    if(!data.participants){
      app.toastMsg('error','请填写参与人数')
      return
    }
    // if(!data.phone && !data.email && !data.weixin && !data.qq){
    //   app.toastMsg('error','请填写联系方式')
    //   return
    // }

    app.apiPost('addActivity',data).then(res=>{
      let error = res.error == 0 ? 'success' : 'error'
      app.toastMsg(error,res.msg)
      if(res.error == 0){
        this.setData({
          isShow:1
        })
        wx.removeStorageSync('start')
        wx.removeStorageSync('end')
      }else{
        this.setData({
          isShow:2
        })
      }
    })
  },

  getUserInfo(){
    app.apiPost('showStudent_Info',{id:wx.getStorageSync('number')}).then(res=>{
      for(var k in res.data[0]){
        for(var j in this.data.user){
          if(j == k){
            this.data.user[j] = res.data[0][k]
          }
        }
      }
      this.setData({
        user:this.data.user
      })
      console.log(this.data.user)
    })
  },
})