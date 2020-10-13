// packages/common/webView/webView.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options,"options")
    if(options.url){
      console.log(options.url,"options")
      that.setData({
        url: options.url
      })
    }else{
      
      let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('webView', function(data){
      that.setData({
        url: data.url
      })
      console.log(that.data.url,"eventChannel")
    })
    }

    // that.setData({
    //   url: 'http://open.talk-fun.com/watch/PD05JCErKmgnaiAt?roomid=1038827&public=1&sign=1512466da801dbcabbb39d8ddcb11234'
    // })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let paramsStr = 'isshare=1&gid=1' + '&url=' + that.data.url
    return app.shareTool.getShareReturnInfo('0,1', 'webView', paramsStr, '/images/other/share1.png')
  }
})