//app.js

const ols = require('./utils/ols.js')
const loginTool = require('./utils/loginTool.js')
const util = require('./utils/util.js')
const shareTool = require('./utils/shareTool.js')
const notificationCenter = require('./utils/WxNotificationCenter.js')
const pagePath = require('./utils/pagePath.js')

const notiNameDic = {
  userinfoChange: "userinfoChange"
}

App({

  ols: ols,
  loginTool: loginTool,
  util: util,
  shareTool: shareTool,
  notificationCenter: notificationCenter,
  notiNameDic: notiNameDic,
  onLaunch: function () {

    loginTool.firstLaunch()
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow: function() {
  },

  /**
   * 获取页面路径
  */
  getPagePath(pageName) {
    return pagePath.getPagePath(pageName)
  },
  

  globalData: {
    userInfo: null,
    btn_buy:true
  }
})