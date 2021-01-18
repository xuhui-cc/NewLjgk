const app = getApp()

var timer,ms_timer
Page({
  // 是否要跳转到分享的页面
  toSharePage: false,

  subjectCoursePage:1,
  vipCoursePage:1,
  pageNum:10,
  vipTotal:0,  // 会员权益课程总数
  courseTotal:0,   //普通科目下课程总数

  data: {
    current_special:-1,
    current_subject: 0,
    btn_buy:app.globalData.btn_buy,
    // did:-1,
    vip:'',
    // 广告弹窗读对象
    adWindowModel: null,
  },

  onLoad: function (options) {
    options = app.shareTool.getShareOption()
    let that = this
    that.setData({
      couponUseTip:wx.getStorageSync('couponUseTip')
    })
    if (options.share && options.share == 1) {
      this.toSharePage = true
    }
    if (options.isshare == 1) {
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare: options.isshare,
        // gid: options.gid,
        // login: wx.getStorageSync("login")
      })
      console.log("分享打开", that.data.isshare, that.data.gid)
    } else {
      console.log("非分享打开")
    }
    
    
    app.shareTool.shareTarget()
  },
  
  onShow: function () {
    let that = this
    // that.vipCoursePage = 1
    // that.subjectCoursePage = 1
    // that.setData({
    //   current_special:-1,
    // })
    that.judge_login()    //登陆判断
    // that.getgrade()    //获取年级 
    // that.getsubject()   //获取学科
    // that.get_banner3()  //轮播图
    that.couponShow()    //优惠券显示状态




    // that.coursePushList()   //后台推荐课程
    // if(that.data.grade){
    //   for (var i = 0; i < that.data.grade.length; i++) {
    //     if (that.data.gid == that.data.grade[i].id) {
    //       that.setData({
    //         grade_index: i
    //       })
    //     }
    //   }
    // }
    
    // that.hot()  //热门课程
  //   if(that.data.current_subject == 1){
      
  //     that.setData({
  //       vipCourseList:'',
  //       total:''
  //     })
  // //     subjectCoursePage:1,
  // // vipCoursePage:1,
  //     that.v4_viplist()   //获取vip
  //     that.allVipCourse()   //获取vip课程
  //   }else if(that.data.current_subject > 1){
      
  //     that.setData({
  //       course:'',
  //       courseTotal:''
  //     })
  //     that.getcourse()     //获取课程
  //   }
    if (!this.toSharePage) {
      this.toSharePage = false
      this.getAd()
    } else {
      this.setData({
        adWindowModel: null
      })
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let paramStr = 'isshare=1&gid=' + that.data.gid
    return app.shareTool.getShareReturnInfo('0,1', 'logs', paramStr, '/images/other/share1.png')
  },

  /**
   * 页面触底方法
   */
  onReachBottom: function() {
    let that = this 
    // console.log("触底")
    if(that.data.current_subject == 1){
      if(that.data.vipCourseList.length < that.vipTotal){
        that.vipCoursePage += 1
        that.allVipCourse()
      }
    }else if(that.data.current_subject > 1){
      if(that.data.course.length < that.courseTotal){
        that.subjectCoursePage += 1
      that.getcourse()
      }
    }
  },

   /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer); 
    clearInterval(ms_timer); 
  },

  /*-------------------------------------------------------接口------------------------------------------------ */
  //获取科目接口
  getsubject: function () {
    let that = this
    var params = {
      "gid": that.data.gid
    }
    app.ols.discipline(params).then(d => {
      if (d.data.code == 0) {
        var subject=[ {'id':-1, 'title': '推荐'},{'id':-2, 'title': 'VIP'}]
        for (let i in d.data.data) {
          subject.push(d.data.data[i]);   //对象转换为数组
        }
        that.setData({
          subject: subject
        })
        if(that.data.current_subject > 1){
          if(that.data.current_subject < subject.length){
            that.courseTotal = 0
            that.getspecial()  //获取专题
            that.getcourse()     //获取课程
          }else{
            that.setData({
              current_subject:0,
            })
          }
        }else if(that.data.current_subject == 1){
          that.vipTotal = 0
          that.v4_viplist()   //获取vip
          that.allVipCourse()
        }else{
          that.coursePushList()   //后台推荐课程
        }
      } else {
        that.setData({
          subject: ''
        })
      }
    })
  },

  //专题获取课程
  special_course:function(){
    let that = this
    var token
    if (wx.getStorageSync("login")){
     token = wx.getStorageSync("token")
    }else{
     token = 0
    }
      var params = {
        "token": token,
        "gid": that.data.gid,
        "did": that.data.did,
        "cid": that.data.special[that.data.current_special].id,
        "num": that.pageNum,
        "page":that.subjectCoursePage
      }
      app.ols.grade_course4(params).then(d => {
      // app.ols.grade_course2(params).then(d => {
        // console.log(d)
        if (d.data.code == 0) {
          // console.log(d.data.data)
          that.setData({
            course: d.data.data
          })
        } else {
          that.setData({
            course: ''
          })
        }
      })
  },

  //获取年级接口
  getgrade: function () {
    let that = this
    var params = ''
    app.ols.getlist(params).then(d => {
      if (d.data.code == 0) {
        let arr1 = [];
        for (let i in d.data.data) {
          arr1.push(d.data.data[i]);
        }
        that.setData({
          grade: arr1
        })
        for (var i = 0; i < that.data.grade.length; i++) {
          if (that.data.gid == that.data.grade[i].id) {
            that.setData({
              grade_index: i
            })
          }
        }
      }
    })
  },

  //获取专题接口
  getspecial: function () {
    let that = this
    var params = {
      "gid":that.data.gid,
      "did":that.data.did
    }
    app.ols.gettoplist(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          special: d.data.data
        })
      }
    })
  },

  //热门课程(暂弃用)
  hot:function(){
    let that = this
    if (wx.getStorageSync("login")) {
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.gid
      }
    }else{
      var params = {
        "token":0,
        "gid": that.data.gid,
      }
    }
    app.ols.hot_list4(params).then(d => {
      var hot1 = []
      var hot2 = []
      var hot3 = []
      if (d.data.code == 0) {
        var timestamp = (Date.parse(new Date()))/1000
        console.log(timestamp,"timestamp")
        for(var i=0;i<d.data.data.lists.length;i++){
          if(d.data.data.lists[i].pt_price){
            d.data.data.lists[i].endtime = d.data.data.lists[i].endtime - timestamp
            hot1.push(d.data.data.lists[i])
          }else if(d.data.data.lists[i].ms_price){
            d.data.data.lists[i].endtime = d.data.data.lists[i].endtime - timestamp
            hot3.push(d.data.data.lists[i])
          }else{
            hot2.push(d.data.data.lists[i])
          }
        }
        that.setData({
          hot1: hot1,
          hot2:hot2,
          hot3:hot3
        })
        if(hot1 != ''){
          that.cs()
        }
        if(hot3 != ''){
          that.cs_ms()
        }
      } else {
        that.setData({
          hot1: '',
          hot2:'',
          hot3:''
        })
      }
    })
  },

  //年级切换
  subject_sel: function (e) {
    let that = this
    that.toTop()   //切换置顶
    var xb = e.currentTarget.dataset.xb
    if(xb == that.data.grade_index){
      wx.showToast({
        title: '现在就是这个年级哦',
        icon: "none",
        duration: 3000
      })
      that.setData({
        grade_select: false
      })
    }else{
      that.setData({
        grade_index: xb,
        gid: that.data.grade[xb].id,
        current_subject: 0,
        hot2:'',
        hot3:'',
      })
      if (wx.getStorageSync("login")) {
        var params = {
          "token": wx.getStorageSync("token"),
          "gid": that.data.grade[xb].id
        }
        app.ols.grade_update(params).then(d => {
          if (d.data.code == 0) {
            clearInterval(timer);   
            wx.setStorageSync('gid', that.data.grade[xb].id)
            that.getsubject()   //获取科目
            that.coursePushList() //后台推荐课
            that.setData({
              grade_select: false
            })
            console.log("更新接口存班级")
          } 
        })
      }else{
        clearInterval(timer);   
        wx.setStorageSync('gid', that.data.grade[xb].id)
        that.getsubject()   //获取科目
        that.coursePushList() //后台推荐课
        that.setData({
          grade_select: false
        })
      }
    }
  },

  //获取课程接口
  getcourse:function(){
    let that = this
    var token
    if (wx.getStorageSync("login")){
     token = wx.getStorageSync("token")
    }else{
     token = 0
    }
    var params = {
      "token": token,
      "gid": that.data.gid,
      "did": that.data.did,
      "num": that.pageNum,
      "page": that.subjectCoursePage
    }
    if(!that.courseTotal || (that.data.course.length < that.courseTotal))
    app.ols.grade_course4(params).then(d => {
      if (d.data.code == 0) {
        if(that.subjectCoursePage == 1){
          that.courseTotal = d.data.data.total
          that.setData({
            course: d.data.data.lists
          })
        }else{
          var coursefinalList = that.data.course.concat(d.data.data.lists)
          that.setData({
            course:coursefinalList
          })
        }
      } else {
        that.setData({
          course: ''
        })
      }
    })
  },


  //轮播图
  get_banner3:function(){
    let that = this 
    var params = ''
    app.ols.banner3(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          banner3: d.data.data.lists
        })
      } 
    })
  },

  /**
   * 获取弹窗广告
  */
 getAd: function() {
  let params = {}
  let token = wx.getStorageSync('token')
  if (token && token != '') {
    params.token = token
  }
  let that = this
  app.ols.getAdWindow(params).then(d=>{
    if (d.data.code == 0) {
      let adModel = d.data.data
      if (adModel && adModel != '') {
        let storageAdIdArray = wx.getStorageSync('adIDArray')
        let canLoadAd = false
        if (storageAdIdArray && storageAdIdArray.length != 0) {
          // 若有已存的广告ID
          if(storageAdIdArray.indexOf(adModel.id) == -1) {
            // 是新的ID
            canLoadAd = true
            storageAdIdArray.push(adModel.id)
            wx.setStorageSync('adIDArray', storageAdIdArray)
          }
        } else {
          // 若没有已存的广告ID
          wx.setStorageSync('adIDArray', [adModel.id])
          canLoadAd = true
        }
        if (canLoadAd) {
          that.setData({
            adWindowModel: adModel
          })
        }
      }
    }
  })
},

  //优惠券悬浮
  couponShow:function(){
    let that = this
    if(wx.getStorageSync('login')){
      var params = {
        "token":wx.getStorageSync('token')
      }
      app.ols.couponShow(params).then(d => {
        if (d.data.code == 0) {
          that.setData({
            couponShow:d.data.data.res,
            copon_price:d.data.data.total
          })
        }
      })
    }
  },

  //后台推荐课程
  coursePushList:function(){
    let that = this 
    if(that.data.login){
      var params = {
        "token":wx.getStorageSync('token')
      }
    }else{
      var params = {
        "token":0
      }
    }
    app.ols.coursePushList(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          coursePushList:d.data.data.lists
        })
      }else{
        that.setData({
          coursePushList:''
        })
      }
    })
  },

  //会员卡标签数据
  v4_viplist:function(){
    let that = this
    if(that.data.login){
      var params = {
        "token": wx.getStorageSync("token"),
      }
      app.ols.cardInfo(params).then(d => {
        if (d.data.code == 0) {
          that.setData({
            vip:d.data.data
          })
        } 
      })
    }
  },

  toSubMsg:function(kid){
    let that = this 
    console.log("触发报名")
    wx.requestSubscribeMessage({
      tmplIds: ['leet7lbTpajEaI84ml4bop06JleNT7Gn4XjiJjbDQOk'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      success(res) { 
        console.log(res)
        var params = {
          "token":wx.getStorageSync('token'),
          "course_id":kid
        }
        app.ols.subMsg(params).then(d => {
          if (d.data.code == 0 || d.data.code == 4) {
            if(that.data.current_subject == 0){
              that.coursePushList()   //后台推荐课程
            }else if(that.data.current_subject == 1){
              this.vipCoursePage=1,
              this.vipTotal = 0
              // that.setData({
              //   // courseTotal:'',
              //   vipCourseList:''
              // })
              that.v4_viplist()   //获取vip
              that.allVipCourse()   //获取vip课程
            }else{
              
              // that.setData({
              //   courseTotal:'',
              //   course:''
              // })
              that.subjectCoursePage = 1
              this.courseTotal = 0
              that.getcourse()     //获取课程
            }
          }
        })
      },
      fail(res){
        console.log("报名失败")
        wx.showModal({
          title: '提示', //提示的标题,
          content: '请打开订阅消息权限', //提示的内容,
          showCancel: true, //是否显示取消按钮,
          
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success(res) {
                },
                fail(res) {
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
    } 
      
    })
  },

  //获取会员卡课程
  allVipCourse:function(){
    let that = this
    if(!that.vipTotal || (that.data.vipCourseList.length < that.vipTotal)){
      var params = {
        "token": wx.getStorageSync("token"),
        "num":that.pageNum,
        "page":that.vipCoursePage
      }
      app.ols.allVipCourse(params).then(d => {
        if (d.data.code == 0) {
          if(that.vipCoursePage == 1){
            that.vipTotal = d.data.data.total,
            that.setData({
              vipCourseList:d.data.data.lists
            })
          }else{
            var finalList = that.data.vipCourseList.concat(d.data.data.lists)
            that.setData({
              vipCourseList:finalList
            })
          }
          
        } 
        else{
          
        }
      })
    }
    
  },

  /*------------------------------------------------------方法---------------------------------------------- */

  //一键置顶
  toTop:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

    
  onPageScroll: function (e) {
    let that = this
    var top = 0
      if(e.scrollTop > 350){
      top = 1
    }
    that.setData({
      top:top
    })
  },

  //判断当前滚动超过一屏时，设置tab标题滚动条。 
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.toTop()
    }
  },

  //vip详情页跳转
  to_vip:function(){
    let that = this
    wx.navigateTo({
      url: app.getPagePath('vip_detail'),
    })
  },

  //课程详情跳转
  to_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    let type = e.currentTarget.dataset.type
    let course 
    if(type == 1){
      course = that.data.course[xb]
    }else if(type == 2){
      course = that.data.vipCourseList[xb]
    }
    if(course.type == 0){
      wx.navigateTo({
        url: app.getPagePath('course_detail') + '?kid=' + course.kid,
      })
    }else if(course.type == 1){
      wx.navigateTo({
        url: app.getPagePath('groupBuy') + '?kid=' + course.kid,
      })
    }else if(course.type == 2){
      wx.navigateTo({
        url: app.getPagePath('course_seckill') + '?kid=' + course.kid,
      })
    }
  },

  // vip_course_detail:function(e){
  //   let that = this
  //   var xb = e.currentTarget.dataset.xb
  //   var course = that.data.vipCourseList[xb]
  //   if(course.type == 0){
  //       wx.navigateTo({
  //         url: app.getPagePath('course_detail') + '?kid=' + course.kid,
  //       })
  //   }else if(course.type == 1){
  //     wx.navigateTo({
  //       url: app.getPagePath('groupBuy') + '?kid=' + course.kid,
  //     })
  //   }else if(course.type == 2){
  //     wx.navigateTo({
  //       url: app.getPagePath('course_seckill') + '?kid=' + course.kid,
  //     })
  //   }
  // },

  //热门课程下课程跳转（暂弃用）
  to_course_hot:function(e){
    let that = this
    var kid = e.currentTarget.dataset.kid
    var hot = e.currentTarget.dataset.hot
    if(hot == 1){
      wx.navigateTo({
        url: app.getPagePath('groupBuy') + '?kid=' + kid,
      })
    }else if(hot == 2){
      wx.navigateTo({
        url: app.getPagePath('course_detail') + '?kid=' + kid,
      })

    }else if(hot == 3){
      wx.navigateTo({
        url: app.getPagePath('course_seckill') + '?kid=' + kid,
      })
    }
  },

  //登录判断
  judge_login: function () {
    let that = this
    if(wx.getStorageSync("login") != that.data.login){
      that.setData({
        login: wx.getStorageSync("login"),
        gid: wx.getStorageSync("gid"),
        // ,
        current_subject:0
      })
      that.vipCoursePage = 1
      that.subjectCoursePage = 1
      that.getgrade()    //获取年级 
      that.getsubject()   //获取学科
      that.get_banner3()  //轮播图
      that.toTop()
    }else{
      that.setData({
        login: wx.getStorageSync("login"),
        gid: wx.getStorageSync("gid"),
        // current_special:-1,
      })
    }
    
  },

  //年级弹框
  grade_select: function () {
    let that = this
    that.setData({
      grade_select: true
    })
  },

  //专题切换
  swichNav_special: function (e) {
    var that = this
    that.toTop()   //切换置顶
    that.subjectCoursePage = 1
    var cur = e.target.dataset.current;
    if (cur == that.data.current_special){
      that.setData({
        current_special: -1
      })
      that.getcourse()    //获取课程
    }else{
      that.setData({
        current_special: cur
      })
      that.special_course() //获取专题课程
    }
    
      
  },

  //科目切换
  swichNav_subject: function (e) {
    var that = this
    that.toTop()   //切换置顶
    that.vipCoursePage = 1
    that.subjectCoursePage = 1
    that.vipTotal = 0
    that.courseTotal = 0
    var cur = e.target.dataset.current;
    that.setData({
      current_subject: cur,
      current_special:-1,
    })
    if(cur == 1){
      that.setData({
        special:''
      })
      that.v4_viplist()  //获取vip
      that.allVipCourse()   //获取vip课程
    }else{
      that.setData({
        did: that.data.subject[cur].id,
      })
      that.getcourse()     //获取课程
    }
  },

  //广告条跳转
  ad_detail: function (e) {
    var id = e.currentTarget.dataset.id
    var type = e.currentTarget.dataset.type
    var cate = e.currentTarget.dataset.cate
    if(type == 2) {
      if(cate == 0){
        wx.navigateTo({
          url: app.getPagePath('course_detail') + '?kid=' + id,
        })
      }
      else if(cate == 1){
        wx.navigateTo({
          url: app.getPagePath('groupBuy') + '?kid=' + id,
        })
      }else if(cate == 2){
        console.log("秒杀")
        // wx.navigateTo({
        //   url: '../../pages/groupBuy/groupBuy?kid=' + id,
        // })
      }
    }else if(type == 1){
      console.log("文章")
      wx.navigateTo({
        url: app.getPagePath('book_detail') + '?id=' + id,
      })
    }
    else if(type == 3){
      // 管理链接
      console.log("链接")
      wx.navigateTo({
        url: app.getPagePath('webView'),
        success (res) {
          res.eventChannel.emit('webView', {url: id})
        }
      })
    }
    else if(type == 4){
      console.log("会员卡")
      wx.navigateTo({
        url: app.getPagePath('vip_detail'),
      })
    }
    
  },

  //关闭年级选择蒙层
  del: function () {
    let that = this
    that.setData({
      grade_select: false
    })
  },

  //倒计时计算
  cs:function(){
    let that = this
    let len=that.data.hot1.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.hot1.length; i++) { 
        var intDiff = that.data.hot1[i].endtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.hot1[i].endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        that.data.hot1[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        hot1: that.data.hot1 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    timer = setInterval(nowTime, 1000); 
  },
  cs_ms:function(){
    let that = this
    let len=that.data.hot3.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.hot3.length; i++) { 
        var intDiff = that.data.hot3[i].endtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.hot3[i].endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(ms_timer);   
        } 
        // console.log(str); 
        that.data.hot3[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        hot3: that.data.hot3 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    ms_timer = setInterval(nowTime, 1000); 
  },

    
  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    // var hhh = e.currentTarget.dataset.hhh
    console.log(e.currentTarget.dataset.kid)
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        if(that.data.current_subject != 1){
          that.onShow()
          // console.log("点击报名")
          // that.toSubMsg(e.currentTarget.dataset.kid)
        }else{
          that.signBtn()
        // that.onShow()
        that.v4_viplist()   //获取vip
        that.allVipCourse()   //获取vip课程
        }
        
      }
    })
  },

  //名师简介
  teacher_inter:function(){
    wx.navigateTo({
      url: app.getPagePath('teacherList') + '?type=1',
    })
  },

  //开通会员按钮
  signBtn:function(){
    let that = this 
    that.setData({
      signBtn:!that.data.signBtn
    })
  },

  //优惠券 页跳转
  to_coupon:function(){
    let that = this 
    wx.navigateTo({
      url: app.getPagePath('my_coupon'),
    })
  },

  //订阅消息
  subMsg:function(e){
    let that = this 
    var msgKid = e.currentTarget.dataset.kid
    if(that.data.current_subject == 0){
      var coursePushList = that.data.coursePushList
      for(var i=0;i<coursePushList.length;i++){
        if(coursePushList[i].kid == msgKid){
          if(coursePushList[i].buy == 1 || (coursePushList[i].buy >= 3 && coursePushList[i].buy <= 5)){
            that.toSubMsg(msgKid)
          }else if(coursePushList[i].buy == 2){
            wx.showToast({
              title: '正在拼团中哦~',
              icon:"none"
            })
          }else{
            if(coursePushList[i].price == 0){
              that.to_free(msgKid)
            }else{
              wx.showToast({
                title: '暂无课程权限，请联系分校老师',
                icon:"none"
              })
            }
          }
        }
      }
    }else if(that.data.current_subject == 1){
      that.toSubMsg(msgKid)
    }else{
      var course = that.data.course
      for(var i=0;i<course.length;i++){
        if(course[i].kid == msgKid){
          if(course[i].buy == 1 || (course[i].buy >= 3 && course[i].buy <= 5)){
            that.toSubMsg(msgKid)
          }else if(course[i].buy == 2){
            wx.showToast({
              title: '正在拼团中哦~',
              icon:"none"
            })
          }else{
            if(course[i].price == 0){
              that.to_free(msgKid)
            }else{
              wx.showToast({
                title: '暂无课程权限，请联系分校老师',
                icon:"none"
              })
            }
          }
        }
      }
    }
    // that.toSubMsg(e.currentTarget.dataset.kid)
  },

  //免费课领取
  to_free:function(msgKid){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "kid": msgKid
    }
    app.ols.get_free(params).then(d => {
      if (d.data.code == 0) {
        that.toSubMsg(msgKid)
      } else {
       }
    })
  },

  //兑换码输入
  input_code: function (e) {
    let that = this
    // var code = e.detail.value
    that.setData({
      code : e.detail.value
      })
      if(that.data.code != e.detail.value){
        that.setData({
          checkCode:1,
        })
      }
  },

  //兑换码验证
  submit_check:function(){
    let that =  this
    var params = {
      "token": wx.getStorageSync("token"),
      "code":that.data.code
    }
    app.ols.cheek_code(params).then(d => {
      
      if (d.data.code == 0) {
        that.setData({
          signBtn:false,
          code_layout:false,
          code:''
        })
        if(d.data.data.cate == 2){
          wx.navigateTo({
            url: app.getPagePath('exchangeCode_2C') + '?id=' + d.data.data.id,
          })
        }else{
          that.setData({
          // signBtn:false,
          codeinfo:d.data.data,
          exchange_page:true,
          // code_layout:false,
          // code:''
        })
        }
      } else if(d.data.code == 5){
        that.setData({
          checkCode:-1,
          check_msg:d.data.msg
          
        })
      }
      // else{
      //   console.log("会员列表失败==============" + d.data.msg)
      // }
    })
  },


  //确认兑换
  yes_exchange:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":that.data.codeinfo.id
    }
    app.ols.exchange_code(params).then(d => {
      that.setData({
        exchange_page:false,
        code:'',
      })
      if (d.data.code == 0) {
        wx.showToast({
          title: "兑换成功",
          icon:"none",
        })
      //   that.v4_viplist()   //获取vip
      // that.allVipCourse()   //获取vip课程
        
        that.setData({
          // exchange_page:false,
          // code:'',
          sign_title:d.data.data.title,
          sign_remark:d.data.data.remark,
        })
      } else if(d.data.code == 5){
        wx.showToast({
          title: d.data.msg,
          icon:"none",
        })
        
        
      }

      that.v4_viplist()   //获取vip
      that.allVipCourse()   //获取vip课程
    })
  },


})
