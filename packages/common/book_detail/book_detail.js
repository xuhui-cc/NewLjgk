// packages/common/book_detail/book_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.setData({
      id:options.id
    })
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
    let that = this
    that.essayDetail()
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

  },
  /*------------------------------------------------------接口----------------------------------------------- */
  /**
   * 获取文章详情
   */
  essayDetail:function(){
    let that = this 
    var params = {
      "id":that.data.id
    }
   
    app.ols.essayDetail(params).then(d => {
      
      if (d.data.code == 0) {
        d.data.data.content = d.data.data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')
        that.setData({
          essay:d.data.data
        })
       
      } else {
        // console.log("会员列表失败==============" + d.data.msg)
      }
    })
  }
})