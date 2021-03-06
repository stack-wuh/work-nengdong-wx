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
        value:'collected'
      },
      // {
      //   name:'我发出的',
      //   value:'send'
      // },
      // {
      //   name:'我收到的',
      //   value:'received'
      // }
    ],
    search:{
      pageNo:1,
      name:'',
      type:''
    },
    isShowMore:false,
    remind:'正在加载中',
    list:[],
    showInput:false
  },
  onLoad:function(e){
    console.log(e)
    this.fetchData()
  },
  handleClickChange(e){
    let name = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index
    this.data.search.type = name
    this.setData({
      current:index,
      search:this.data.search,
      list:[]
    })
    this.fetchData()
  },
  handleClickShowInput(){
    this.setData({
      showInput:!this.data.showInput
    })
  },
  saveInputValue(e){
    this.data.search.name = e.detail.value
    this.setData({
      search:this.data.search
    })
  },
  inputBlur(){
    this.setData({
      showInput:false,
      list:[]
    })
    this.fetchData()
  },
  fetchData(){
    app.apiPost('getMobileTidings',this.data.search).then(res=>{
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
  },
  onReachBottom:function(){
    if(this.data.isShowMore){
      this.data.search.pageNo ++ 
      this.setData({
        search:this.data.search
      })
      this.fetchData()
    }
  }
})