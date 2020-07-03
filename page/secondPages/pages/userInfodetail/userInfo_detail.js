
// page/userInfo_detal/userInfo_detal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    defaultSize: 'default',
    user_Image: "../../../../image/myheadHL.png",
    submitState: '提交资料',
    usegender: '',
    usenikename: wx.getStorageSync('nikename'),
    usesignature: wx.getStorageSync('signature')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      usernikename: wx.getStorageSync('nikename'),
      usergender: wx.getStorageSync('gender'),
      userage: wx.getStorageSync('age'),
      usercompany: wx.getStorageSync('company'),
      userjob: wx.getStorageSync('job'),
      usersignature: wx.getStorageSync('signature')
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
   // const usergender = wx.getStorageSync('gender')
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

  usenikename: function (e) {
    this.setData({
      usernikename: e.detail.value
    })
  },

  usegender: function (e) {
    this.setData({
      usergender: e.detail.value,
    })
  },
  useage: function (e) {
    this.setData({
      userage: e.detail.value,
    })
  },
  usecompany: function (e) {
    this.setData({
      usercompany: e.detail.value,
    })
  },
  usejob: function (e) {
    this.setData({
      userjob: e.detail.value,
    })
  },
  usesignature: function (e) {
    this.setData({
      usersignature: e.detail.value
    })
  },
  sendUserInfo: function (e) {
    wx.setStorage({
      key: 'nikename',
      data: this.data.usernikename,
    }),
      wx.setStorage({
        key: 'gender',
        data: this.data.usergender,
      }),
      wx.setStorage({
        key: 'age',
        data: this.data.userage,
      }),
      wx.setStorage({
        key: 'company',
        data: this.data.usercompany,
      }),
      wx.setStorage({
        key: 'job',
        data: this.data.userjob,
      }),
      wx.setStorage({
        key: 'signature',
        data: this.data.usersignature,
      }),
      wx.request({
        //后台接口地址
        url: 'http://www.letscx.top/letsgo/servlet/BianJiZiLiao_servlet?FunctionName=update&',
        data: {
          YongHuID: '2',
          YongHuZhangHao: '21',
          ShengFenZheng: '31',
          YongHuXingBe: this.data.usergender,
          HangYe: '51',
          GongSi: '61',
          GeXingQianMing: this.data.usesignature
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
      })
  }
})