var app = getApp()
Page({
  data:{
    current:0,
    navList:[
      {
        name:'全部',
        value:''
      },
      {
        name:'收藏',
        value:'收藏'
      },
      {
        name:'我发出的',
        value:'我发出的'
      },
      {
        name:'我收到的',
        value:'我收到的'
      }
    ],
    data:{
      pageNo:1,
      // i:0,
      // collect_name:1
    }
  },
  onLoad:function(e){
    this.fetchData()
  },
  fetchData(){
    app.apiPost('getTidings',this.data.data).then(res=>{
    
    })
  }
})