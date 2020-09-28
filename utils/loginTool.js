
const ols = require('./ols')
const pagePath = require('./pagePath.js')

// 注册口令
var password = null

function getPhoneNumber(e, gid, callback) {
  var that = this
  if (e.detail.errMsg != "getPhoneNumber:ok") {
    return
  }
  register(e, gid, callback)
}

/**
 * 登录 / 获取注册口令
*/
function loginOrGetRegisterPassword(code) {
  let params = {
    code: code,
  }
  let that = this
  ols.loginOrGetRegisterPassword(params).then(d=>{
    if (d.data.code == 0) {
      password = d.data.data.password
    }
  })
}

function register(e, gid, callback) {
  let iv = encodeURIComponent(e.detail.iv);
  let encryptedData = encodeURIComponent(e.detail.encryptedData);
  var params = {
    "iv": iv,
    "encryptedData": encryptedData,
    gid: gid,
    password: password
  }
  ols.registerWithPassword(params).then(d=>{
    if (d.data.code == 0) {
      let userinfo = d.data.data
      wx.setStorageSync("login", true)
      wx.setStorageSync("token", userinfo.token)
      wx.setStorageSync('userinfo', userinfo)
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
      typeof callback == "function" && callback(false, "登录失败")
    }
  })
}

module.exports = {
  getPhoneNumber, 
  loginOrGetRegisterPassword
}