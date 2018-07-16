App({
  onLaunch:function() {
    console.log("App:onLaunch()")
    var that = this;
    // 获取商城名字
    wx.request({
      url: 'https://api.it120.cc/' +
      that.globalData.subDomain + 
      '/config/get-value',
      data:{
        key:'mallName'
      },
      success:function(res) {
        console.log("获取商场名字：" + res.data.code)
        if (res.data.code == 0) { // 
          wx.setStorageSync('mallName', res.data.data.value);
          console.log("获取商场名字：" + wx.getStorageSync('mallName'))
        }
      }
    })
  },

  getUserInfo:function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      // 登陆接口
      wx.login({
        success:function() {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    subDomain:"tz", // 域名子路径
  }
})