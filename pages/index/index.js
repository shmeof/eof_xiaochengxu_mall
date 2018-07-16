// pages/my/index.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent:0,
    categories: [],
    activeCategoryId: 0,
    scrollTop: "0",
    loadingMoreHidden: true,
    searchInput: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })

    // https://api.it120.cc/tz/banner/list
    console.log("轮播图数据地址: " +            'https://api.it120.cc/' +
      app.globalData.subDomain +
      '/banner/list')
    wx.request({
      url: 'https://api.it120.cc/' +
          app.globalData.subDomain +
          '/banner/list',
      data: {
        key: 'mallName'
      },
      success: function(res) {
        if (res.data.code == 404) {
          wx.showModal({
            title: '提示',
            content: '请在后台添加轮播图片',
            showCancel: false
          })
        } else {
          console.log("banners data:" + JSON.stringify(res.data.data))
          that.setData({
            banners: res.data.data
          })
        }
      }
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

  swiperchange: function (e) {
    console.log("swiperchange current:" + e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },

  toSearch: function() {
    this.getGoodsList(this.data.activeCategoryId);
  },

  getGoodsList:function(categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }

    console.log("getGoodsList:" + categoryId)

    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' +
      app.globalData.subDomain + '/shop/goods/list',
      data: {
        categoryId: categoryId,
        nameLike: that.data.searchInput
      },
      success: function(res) {
        that.setData({
          goods:[],
          loadingMoreHidden:true
        });
        var goods = [];
        if (res.data.code != 0
        || res.data.data.length == 0) {
          that.setData({
            loadingMoreHidden:false,
          });
          return;
        }

        for (var i = 0; i < res.data.data.length; ++i) {
          goods.push(res.data.data);
        }
        that.setData({
          goods:goods,
        });
      }
    })
  },
  scroll: function(e) {
    var that = this
    scrollTop = that.data.scrollTop
    that.setData({
      scrollTop: e.detail.scrollTop
    })
  }
})