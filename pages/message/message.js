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
    search:{
      pageNo:1,
      name:'全部'
    },
    isShowMore:false,
    remind:'正在加载中',
    list:[]
  },
  onLoad:function(e){
    this.fetchData()
  },
  handleClickChange(e){
    let name = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index
    this.data.search.name = name
    this.setData({
      current:index,
      search:this.data.search
    })
    this.fetchData()
  },
  fetchData(){
    app.apiPost('shwoTidings',this.data.search).then(res=>{
        if(res.data){
          this.data.list = this.data.list.concat(res.data)
          this.setData({
            list:this.data.list
          })
          if(res.data.length == 10){
            this.setData({
              isShowMore:true,
              remind:'上拉加载更多'
            })
          }else{
            this.setData({
              isShowMore:false,
              remind:'没有更多啦'
            })
          }
        }
    })
  }
})