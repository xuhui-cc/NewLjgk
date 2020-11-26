
const ols = require('./ols')
const pagePath = require('./pagePath.js')

// 注册口令 (废弃)
var password = null

var openid = null
var session_key = null

/**
 * 启动加载初始数据
*/
function firstLaunch(callback) {
  wx.login({
    success(res) {
      let code = res.code
      loginOrGetRegisterPassword(code, callback)
    },
    fail(res) {
      typeof callback == 'function' && callback(false)
    }
  })
}

/**
 * 点击button 获取手机号码
*/
function getPhoneNumber(e, gid, callback) {
  var that = this
  if (e.detail.errMsg != "getPhoneNumber:ok") {
    return
  }
  register(e, gid, callback)
}


/**
 * 获取openid
*/
function getOpenid() {
  var that = this
    return openid
}

/**
 * 登录 / 获取注册口令
*/
function loginOrGetRegisterPassword(code, callback, count) {
  let params = {
    code: code,
  }
  let that = this
  ols.loginOrGetRegisterPassword(params).then(d=>{
    if (d.data.code == 0) {
      openid = d.data.data.openid
      session_key = d.data.data.session_key
      typeof callback == 'function' && callback(true)
    } else {
      typeof callback == 'function' && callback(false)
    }
  })
}

function register(e, gid, callback) {
  let iv = encodeURIComponent(e.detail.iv);
  let encryptedData = encodeURIComponent(e.detail.encryptedData);
  var params = {
    iv: iv,
    encryptedData: encryptedData,
    gid: gid,
    password: password,
    session_key: session_key,
    openid: openid
  }
  ols.registerWithPassword(params).then(d=>{
    if (d.data.code == 0) {
      let userinfo = d.data.data
      wx.setStorageSync("login", true)
      wx.setStorageSync("token", userinfo.token)
      wx.setStorageSync('userinfo', userinfo)
      wx.setStorageSync('gid', userinfo.gid)
      switch(userinfo.role * 1) {
        case 1: {
          // 学生
          typeof callback == "function" && callback(true, "登录成功")
          break
        }
        case 2: {
          // 家长
          wx.reLaunch({
            url: pagePath.getPagePath('parent_childList'),
          })
          break
        }
        case 3: {
          // 老师
          wx.reLaunch({
            url: pagePath.getPagePath('teacher_studentList'),
          })
          break
        }
      }
    } else {
      firstLaunch()
      typeof callback == "function" && callback(false, "登录失败, 请重试")
    }
  })
}

module.exports = {
  getPhoneNumber, 
  firstLaunch,
  getOpenid
}