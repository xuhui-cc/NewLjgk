// components/adWindow/adWindow.js
let pagePath = require('../../utils/pagePath.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 广告图片地址
    */
    imgSrc: {
      type: String,
      value: ''
    },

    /**
     * 广告类型
     * 1-会员卡广告
    */
    type: {
      type: Number,
      value: 1
    },

    /**
     * 关联的文章或课程ID或关联的链接
    */
    attachid: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图片高度
    imageHeight: 953,

    // 是否展示
    show: true,
  },

  observers: {
    'imgSrc': function(imgSrc) {
      console.log('监听到广告图片地址')
      console.log(imgSrc)
      this.getImageHeight(imgSrc)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取图片高度
    */
    getImageHeight: function(imgSrc) {
      let that = this
      wx.getImageInfo({
        src: imgSrc,
        success (res) {
          console.log('广告图片信息：\n', res)
          let height = 710 * res.height / res.width
          that.setData({
            imageHeight: height
          })
        }
      })
    },

    //-------------------------------------------交互事件-------------------------------------------

    /**
     * 关闭按钮 点击事件
    */
    adWindowCloseButtonClciked: function() {
      this.setData({
        show: false
      })
    },

    /**
     * 广告图片 点击事件
    */
    adImageClicked: function() {
      switch(this.data.type*1) {
        case 1: {
          // 关联文章
          wx.navigateTo({
            url: pagePath.getPagePath('book_detail') + '?id=' + this.data.attachid,
          })
          break
        }
        case 2: {
          // 关联课程
          wx.navigateTo({
            url: pagePath.getPagePath('course_detail') + '?kid=' + this.data.attachid,
          })
          break
        }
        case 3: {
          // 管理链接
          wx.navigateTo({
            url: pagePath.getPagePath('webView'),
            success (res) {
              res.eventChannel.emit('webView', {url: this.data.attachid})
            }
          })
          break
        }
        case 4: {
          // 会员卡广告
          wx.navigateTo({
            url: pagePath.getPagePath('vip_detail'),
          })
          break
        }
      }
      this.setData({
        show: false
      })
    },
  }
})
