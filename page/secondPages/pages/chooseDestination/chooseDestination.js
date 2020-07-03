// page/secondPages/pages/chooseDeparture/chooseDeparture.js
var QQMapWX = require('../../../common/lib/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locInfo: {
      lat: null,
      lng: null,
      city: '湘潭市'
    },
    pois: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    qqmapsdk = new QQMapWX({
      key: 'VAABZ-TYDWV-SBCPE-UACZC-H5NU7-QPBA4'
    })
    this.setData({
      locInfo: {
        lat: options.lat,
        lng: options.lng
      }
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: options.lat,
        longitude: options.lng
      },
      get_poi: 1,
      success: function (res) {
        var ppois = res.result.pois
        that.data.pois.push(res.result.pois)
        var update = that.data.pois
        that.setData({
          pois: update,
          locInfo: {
            city: res.result.address_component.city
          }
        })
        console.log(that.data.pois)
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

  search: function (e) {
    var that = this
    console.log(e.detail.value)
    qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      region: that.data.locInfo.city,
      region_fix: 1,
      policy: 1,
      success: function (res) {
        console.log(res)
        that.data.pois.splice(0, that.data.pois.length)
        that.data.pois.push(res.data)
        var update = that.data.pois
        that.setData({
          pois: update
        })
        console.log(that.data.pois)
      }
    })
  },

  chooseLocation:function(e){
    console.log(e.currentTarget.dataset.id)
    console.log(this.data.pois[0][e.currentTarget.dataset.id])
    var pages = getCurrentPages()
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2]
      prePage.setDestination(this.data.pois[0][e.currentTarget.dataset.id])
      wx.navigateBack({
        delta: 1
      })
    }
  }
})