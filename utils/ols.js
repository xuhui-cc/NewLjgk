// const URI_base = "http://gkcs.lingjun.net/" //测试域名
const URI_base = "https://gk.lingjun.net/" // 正式域名
// const URI_base = "https://zy.lingjun.net/" // 正式域名

const URI = URI_base + 'api.php/'    //接口地址

// const addImgUrl = "http://gkcs.lingjun.net/api.php/annex/upload"
// const addImgUrl = "https://gk.lingjun.net/api.php/annex/upload"

const fetch = require('./fetch')

//登录 （废弃）
function login(params) {
  return fetch.olsfetchpost(URI, 'v1/login/phonelogin', params)
}
// 首页年级选择
function getlist(params) {
  return fetch.olsfetchpost(URI, 'v1/grade/getlist', params,"获取年级")
}
//获取平台人数
function user_number(params) {
  return fetch.olsfetchpost(URI, 'v1/basic/getmembernum', params)
}
// 获取学科
function discipline(params) {
  return fetch.olsfetchpost(URI, 'v1/discipline/getlist', params,"获取学科")
}
//获取拼团数据列表v3
function hot_list4(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/gethotlist', params,"热门课程",false,"课程加载中...")
}
// 获取广告弹窗数据
function getAdWindow(params) {
  return fetch.olsfetchpost(URI, 'v1/activity/getlist', params, '获取广告弹窗数据')
}
//轮播图
function banner3(params) {
  return fetch.olsfetchpost(URI, 'v1/banner/getlist', params,"轮播")
}
//获取课程列表
function grade_course4(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/getlist', params)
}
//会员列表
function v4_viplist(params) {
  return fetch.olsfetchpost(URI, 'v1/vipcard/getlist', params,"会员卡列表")
}
//课程页会员列表
function v4_courseViplist(params) {
  return fetch.olsfetchpost(URI, 'v1/vipcard/getviplist', params,"课程页会员卡列表")
}
// 获取课程详情v3(拼团)
function course_info4(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/getinfo', params,"课程详情介绍")
}
//获取课程目录v4(会员)
function course_cata4(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/getoption', params,"课程详情目录")
}
// 我的课程
function my_course_all4(params) {
  return fetch.olsfetchpost(URI, 'v1/order/getLessonlist', params,"我的课程")
}
//我的页面vip信息
function v4_myVip(params) {
  return fetch.olsfetchpost(URI, 'v1/vipcard/getvipcard', params,"我的vip")
}
// 刷新用户基本信息 (废弃)
function refreshUserInfo(params) {
  return fetch.olsfetchpost(URI, 'v1/member/getinfo', params, '刷新用户基本信息')
}
// 刷新用户基本信息
function my_about(params) {
  return fetch.olsfetchpost(URI, 'v1/basic/aboutus', params, '关于我们')
}
//获取课程视频链接
function getvideo(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/getvideo', params,"获取课程视频")
}
//获取课程视频断点时间——1.2
function getvideo_info(params) {
  return fetch.olsfetchpost(URI, 'v1/study/getvideoline', params,"获取课程视频断点")
}
//视频页其他信息
function getplaypushlist(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/getplaypushlist', params,"获取视频页附加信息")
}
//视频开始更新状态——1.2
function video_start(params) {
  return fetch.olsfetchpost(URI, 'v1/study/setbeginvideoline', params,"视频开始更新状态")
}
//视频结束更新状态——1.2
function video_end(params) {
  return fetch.olsfetchpost(URI, 'v1/study/setfinishvideoline', params,"视频结束更新状态")
}
//兑换码验证
function cheek_code4(params) {
  return fetch.olsfetchpost(URI, 'v1/redeem/checkredeemcode', params,"兑换码验证")
}
//兑换码兑换
function exchange_code4(params) {
  return fetch.olsfetchpost(URI, 'v1/redeem/exchangeredeem', params,"兑换码兑换")
}
//分享判断
function judge_share4(params) {
  return fetch.olsfetchpost(URI, 'v1/share/getinterface', params,"分享判断v4",true,"分享加载中")
}
//更新年级
function grade_update(params) {
  return fetch.olsfetchpost(URI, 'v1/member/update', params,"更新年级")
}
//扫码一对多VIP信息
function info_1Vn(params) {
  return fetch.olsfetchpost(URI, 'v1/redeem/lookredeemonecode', params,"扫码一对多VIP信息")
}
//验证一对多VIP有效
function check_1Vn(params) {
  return fetch.olsfetchpost(URI, 'v1/redeem/checkredeemonecode', params,"验证一对多VIP有效")
}
//兑换一对多VIP
function exchange_1Vn(params) {
  return fetch.olsfetchpost(URI, 'v1/redeem/exchangeredeem2', params,"兑换一对多VIP")
}
//课程直播/伪直播链接获取
function get_live(params) {
  return fetch.olsfetchpost(URI, 'v1/lesson/getmtcourseurl', params,"欢拓直播/伪直播")
}
//优惠券开启状态
function couponShow(params) {
  return fetch.olsfetchpost(URI, 'v1/coupon/getcouponstatus', params,"优惠券开启状态")
}
//优惠券列表
function couponList(params) {
  return fetch.olsfetchpost(URI, 'v1/coupon/getcouponinfolist', params,"优惠券列表")
}
//优惠券老师
function couponTea(params) {
  return fetch.olsfetchpost(URI, 'v1/basic/getteacherinfo', params,"优惠券老师")
}
//消息订阅
function subMsg(params) {
  return fetch.olsfetchpost(URI, 'v1/course_apply/addcourseapply', params,"订阅消息")
}
//广告条文章详情
function essayDetail(params) {
  return fetch.olsfetchpost(URI, 'v1/news/getinfo', params,"广告条文章详情")
}
//后台推荐课程（关联后台推荐按钮）
function coursePushList(params) {
  return fetch.olsfetchpost(URI, 'v1/coupon/getCodePushList', params,"后台推荐课程")
}






//分享判断
function judge_share(params) {
  return fetch.olsfetchpost(URI, 'share/getinterface', params)
}



// 小程序直播接入
function getclassroom(params) {
  return fetch.olsfetchpost(URI, 'classroom/getclassroom', params)
}

// 添加地址
function add_adress(params) {
  return fetch.olsfetchpost(URI, 'address/addinfo', params)
}

// 获取地址
function getdefault(params) {
  return fetch.olsfetchpost(URI, 'address/getdefault', params)
}

// 更新地址
function setinfo(params) {
  return fetch.olsfetchpost(URI, 'address/setinfo', params)
}

// 答题上传图片
function addImg() {
  return URI + "/annex/upload"
}

// 假人头像
function dummy() {
  return URI_base
}


// 获取专题
function gettoplist(params) {
  return fetch.olsfetchpost(URI, 'category/gettoplist', params)
}

// 获取全部订单
function order_all(params) {
  return fetch.olsfetchpost(URI, 'order/getlist', params)
}

// 获取全部订单(拼团)
function order_all3(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getlist', params)
}

//待支付
function order_wait(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getwaitlist', params)
}

//已支付
function order_ed(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getpaylist', params)
}

//已关闭
function order_close(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getcloselist', params)
}

// 获取全部错题
function wrong(params) {
  return fetch.olsfetchpost(URI, 'wrong/getlist', params)
}



// 获取测评试题（已登录）
function test_ques1(params) {
  return fetch.olsfetchpost(URI, 'paper/gettestlist', params)
}

// 获取测评试题（未登录）
function test_ques2(params) {
  return fetch.olsfetchpost(URI, 'v2/paper/gettestlist', params)
}



// 获取课程页课程(已登录)
function grade_course1(params) {
  return fetch.olsfetchpost(URI, 'lesson/getlist', params)
}

// 获取课程页课程(未登录)
function grade_course2(params) {
  return fetch.olsfetchpost(URI, 'v2/lesson/getlist', params)
}

// 获取课程详情介绍(已登录)
function course_info1(params) {
  return fetch.olsfetchpost(URI, 'lesson/getinfo', params)
}

// 获取课程详情介绍(未登录)
function course_info2(params) {
  return fetch.olsfetchpost(URI, 'v2/lesson/getinfo', params)
}





//获取课程目录(已购买)
function course_cata1(params) {
  return fetch.olsfetchpost(URI, 'lesson/getOption', params)
}

//获取课程目录(未购买)
function course_cata2(params) {
  return fetch.olsfetchpost(URI, 'v2/lesson/getoption', params)
}

//获取课程目录v3(拼团)
function course_cata3(params) {
  return fetch.olsfetchpost(URI, 'v3/lesson/getoption', params)
}


//获取课程讲义列表
function handout(params) {
  return fetch.olsfetchpost(URI, 'lesson/getannex', params)
}






//课程预支付
function preorder(params) {
  return fetch.olsfetchpost(URI, 'wepay/preorder', params)
}

//拼团预支付
function group_preorder3(params) {
  return fetch.olsfetchpost(URI, 'v3/wepay/pregrouporder', params,"拼团预支付")
}

//订单详情
function order_detail(params) {
  return fetch.olsfetchpost(URI, 'order/getinfo', params)
}





//测评试题id
function test_id(params) {
  return fetch.olsfetchpost(URI, 'paper/getidlist', params)
}

//测评答题状态初始化
function setmark(params) {
  return fetch.olsfetchpost(URI, 'mark/setmark', params)
}

//测评试卷概要
function test_explain(params) {
  return fetch.olsfetchpost(URI, 'paper/getinfo', params)
}

//测评试卷单个试题详情
function ques_detail(params) {
  return fetch.olsfetchpost(URI, 'paper/getquestion', params)
}

//试卷基本信息（课后作业、结课考试通用）
function ques_info(params) {
  return fetch.olsfetchpost(URI, 'paper/getpaper', params)
}

//试卷基本信息（测评）
function testques_info(params) {
  return fetch.olsfetchpost(URI, 'paper/gettestpaper', params)
}

//测评试卷答案提交
function cp_ans_submit(params) {
  return fetch.olsfetchpost(URI, 'mark/submittestquestion', params)
}

//作业答案提交
function work_submit(params) {
  return fetch.olsfetchpost(URI, 'mark/submitquestion', params)
}

//更新测评试卷状态
function update_cpsubmit(params) {
  return fetch.olsfetchpost(URI, 'mark/submittestmark', params)
}

//更新试卷状态
function update_testsubmit(params) {
  return fetch.olsfetchpost(URI, 'mark/submitmark', params)
}

//测评报告
function cp_report(params) {
  return fetch.olsfetchpost(URI, 'report/gettestchart', params)
}

//测评点评
function cp_comment(params) {
  return fetch.olsfetchpost(URI, 'report/getcommentlist', params)
}

//测评某一试题详情
function cp_analysis(params) {
  return fetch.olsfetchpost(URI, 'report/getquestion', params)
}

//某个测评试卷答题卡数据列表
function cp_ans_id(params) {
  return fetch.olsfetchpost(URI, 'report/getmarkcard', params)
}

//错题详情id列表
function wrong_id(params) {
  return fetch.olsfetchpost(URI, 'wrong/getidlist', params)
}

//错题详情id列表
function wrong_detail(params) {
  return fetch.olsfetchpost(URI, 'wrong/getquestion', params)
}




//（课后作业、结课考试）报告
function test_report(params) {
  return fetch.olsfetchpost(URI, 'report/getchart', params)
}

//结课报告1
function end_report1(params) {
  return fetch.olsfetchpost(URI, 'v5/report/getstudyday', params)
}

//结课报告2
function end_report2(params) {
  return fetch.olsfetchpost(URI, 'v5/report/getstudyearlynight', params)
}

//结课报告3
function end_report3(params) {
  return fetch.olsfetchpost(URI, 'report/getstudyinfo', params)
}

//结课报告4
function end_report4(params) {
  return fetch.olsfetchpost(URI, 'v5/report/getstudyresult', params)
}

//获取免费课
function get_free(params) {
  return fetch.olsfetchpost(URI, 'wepay/freeorder', params,"开通免费课")
}



//获取平台人数
function getpushlist(params) {
  return fetch.olsfetchpost(URI, 'report/getpushlist', params)
}



//授权头像
function avatar_update(params) {
  return fetch.olsfetchpost(URI, 'member/upinfo', params,"获取头像")
}

//试卷开始学习记录
function test_start(params) {
  return fetch.olsfetchpost(URI, 'study/setbeginstudy', params)
}

//试卷开始学习记录
function test_end(params) {
  return fetch.olsfetchpost(URI, 'study/setfinishstudy', params)
}




//拼团未支付删除v3
function group_del3(params) {
  return fetch.olsfetchpost(URI, 'v3/order/deldata', params)
}

//拼团未支付删除v3
function group_del4(params) {
  return fetch.olsfetchpost(URI, 'v4/order/deldata', params)
}

//团详情v3
function group_detail3(params) {
  return fetch.olsfetchpost(URI, 'v3/group/getgrouplist', params)
}

//团分享v3
function group_share3(params) {
  return fetch.olsfetchpost(URI, 'v3/share/getinterface', params)
}

// //团分享v3
// function group_share4(params) {
//   return fetch.olsfetchpost(URI, 'v4/share/getinterface', params)
// }

//团分享v3
function all_group3(params) {
  return fetch.olsfetchpost(URI, 'v3/group/getlessongrouplist', params,"团分享")
}




// 老师端获取学员列表
function teacherGetStudentsList(params) {
  return fetch.olsfetchpost(URI, 'log/teacher/getStudents', params, "老师端获取学员列表", true)
}

// 获取日志标签列表
function getReocrdTagList(params) {
  return fetch.olsfetchpost(URI, 'log/log/getTags', params, "获取日志标签列表", true)
} 

// 提交日志
function submitReocrd(params) {
  return fetch.olsfetchpost(URI, 'log/log/addLog', params, '提交日志', true, "提交中")
}

// 获取学生某一天的日志列表
function getStudentRecordListByDay(params) {
  return fetch.olsfetchpost(URI, 'log/log/dayLog', params, "获取学生某一天的日志列表", true)
} 

// 查看日期段内学生日志情况
function getPeriodRecordStatusList(params) {
  return fetch.olsfetchpost(URI, 'log/log/dateLog', params, '查看日期段内学生日志情况', true)
}

// 获取学生课时信息
function getStudentCourseHourInfo(params) {
  return fetch.olsfetchpost(URI, 'log/log/stu_info', params, '获取学生课时信息')
}

// 获取消课记录列表
function getClearCourseHourList(params) {
  return fetch.olsfetchpost(URI, 'log/log/stu_XiaoCourse', params, '获取消课记录列表', true)
}

// 上传日志图片/视频
function recordUploadFile(filePath) {
  return fetch.olsfetchUpload(URI, 'log/upload/upload', filePath, '上传日志图片/视频', true)
}

// 获取学生最新日志
function getStudentNewRecord(params) {
  return fetch.olsfetchpost(URI, 'log/log/stu_xinLog', params, '获取学生最新日志')
}

// 新建日志 上传附件路径
function getRecordUploadPath_h5() {
  return URI_base+'static/uploadH5/uploadH5.html'
}

// 判断用户和某个学生之间有无关系
function haveRelationWithStudent(params) {
  return fetch.olsfetchpost(URI, 'log/teacher/stu_isshow', params, '判断用户和某个学生之间有无关系', true)
}



//vip预支付
function v4_vipPreorder(params) {
  return fetch.olsfetchpost(URI, 'v4/wepay/precardorder', params,"vip卡预支付",true,"请稍后")
}







// 家长获取自家孩子列表
function parentGetChildsList(params) {
  return fetch.olsfetchpost(URI, 'log/teacher/getChildrenList', params, '家长获取自家孩子列表', true)
}



// 7v1介绍 h5
function get7v1Intro_h5() {
  return URI_base+'static/7v1/index.html'
}


// 获取名师列表
function v5_getTeacherList(params) {
  return fetch.olsfetchpost(URI, 'v5/famousteacher/getlist', params, '获取名师列表', true)
}

// 获取名师列表
function v5_getTeacherIntro(params) {
  return fetch.olsfetchpost(URI, 'v5/famousteacher/getinfo', params, '获取名师详情', true)
}

/**
 * 获取注册用的口令 / 登录
 * 1，若以注册，则为登录接口，返回token及用户信息
 * 2，若未注册，则为获取注册口令接口，使用该口令调用注册接口，(后台用该口令绑定openid / session_key) 
*/
function loginOrGetRegisterPassword(params) {
  return fetch.olsfetchpost(URI, 'v1/login/getpassword', params, '获取注册用的口令 /登录')
}

// 通过注册口令 注册
function registerWithPassword(params) {
  return fetch.olsfetchpost(URI, 'v1/login/getphonelogin', params, '通过注册口令 注册', true, '登录中')
}

module.exports = { login, getclassroom, add_adress, getdefault, setinfo, getlist, discipline, gettoplist, order_all, wrong, my_course_all4, test_ques1, test_ques2, grade_course1, grade_course2, course_info1, course_info2, grade_update, course_cata1, course_cata2, handout, getvideo, getvideo_info, preorder, order_detail, order_wait, order_ed, order_close, test_id, setmark, test_explain, ques_detail, ques_info, cp_ans_submit, update_cpsubmit, cp_report, cp_analysis, cp_ans_id, wrong_id, wrong_detail, get_live, work_submit, cp_comment, update_testsubmit, test_report, end_report1, end_report2, end_report3, end_report4, get_free, user_number, getpushlist, testques_info, getplaypushlist, avatar_update, video_end, video_start, test_start, test_end,judge_share,grade_course4,course_info4,course_cata3,hot_list4,group_preorder3,order_all3,group_del3,group_detail3,group_share3,all_group3,banner3,v4_viplist,v4_vipPreorder,v4_myVip,course_cata4,judge_share4,cheek_code4, teacherGetStudentsList, getReocrdTagList, submitReocrd, getStudentRecordListByDay, getPeriodRecordStatusList, getStudentCourseHourInfo, getClearCourseHourList, recordUploadFile, getStudentNewRecord, getRecordUploadPath_h5, haveRelationWithStudent,exchange_code4,addImg,parentGetChildsList,dummy,group_del4, refreshUserInfo, get7v1Intro_h5,v5_getTeacherList,v5_getTeacherIntro, getAdWindow,my_about,info_1Vn,check_1Vn,exchange_1Vn,v4_courseViplist,couponShow,couponList,couponTea,subMsg, loginOrGetRegisterPassword , registerWithPassword , essayDetail,coursePushList}







// //已关闭
// function order_close(params) {
//   return fetch.olsfetchpost(URI, 'order/getcloselist', params)
// }

// //已支付
// function order_ed(params) {
//   return fetch.olsfetchpost(URI, 'order/getpaylist', params)
// }

// //更新视频观看状态——1.1
// function study_pro(params) {
//   return fetch.olsfetchpost(URI, 'lesson/setloginfo', params)
// }

// //待支付
// function order_wait(params) {
//   return fetch.olsfetchpost(URI, 'order/getwaitlist', params)
// }

// //上传图片
// function upload_img(params) {
//   return fetch.olsfetchpostimg(URI, 'annex/upload', params)
// }

//获取课程视频断点时间 ——1.1
// function getvideo_info(params) {
//   return fetch.olsfetchpost(URI, 'lesson/getvideoline', params)
// }

// //获取课程列表
// function grade_course3(params) {
//   return fetch.olsfetchpost(URI, 'lesson/getlist', params)
// }