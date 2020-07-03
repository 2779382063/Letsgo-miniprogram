// page/userInfo/.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      '速度快','速度慢','车好看','人好帅','开得稳','开得好','会讲话','服务好'
    ],
    nikename:'Nike-Name',
    default_user_Image:'../../image/wechatHL.png',
    user_Image:"../../image/myheadHL.png",
    credit:80
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.array.push("座位好")
    var updata=this.data.array
    this.setData({
      array:updata,
      hasLogin:app.globalData.hasLogin,
      userInfo:app.globalData.userInfo
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

  to_userInfo: function (e) {
    wx.navigateTo({
      url: '../secondPages/pages/userInfodetail/userInfo_detail',
    })
  },

  to_userInfo_detail:function(e){
      wx.navigateTo({
        url: '../secondPages/pages/login/login',
      })
  },
  to_settings:function(e){
    wx.navigateTo({
      url: '../secondPages/pages/settings/settings',
    })
  },
  to_driverCertification:function(e){
    if (this.data.hasLogin === true) {
      wx.navigateTo({
        url: '../secondPages/pages/driverCertification/driverCertification',
      })
    } else {
      wx.showModal({
        title: '登录',
        content: '您还没有登录，确认去登录吗？',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../secondPages/pages/login/login',
            })
          }else if(res.cancel){

          }
        }
      })
      
    }
  },
  to_idCerfitication:function(e){
    if (this.data.hasLogin === true) {
      wx.navigateTo({
        url: '../secondPages/pages/idCertification/idCertification',
      })
    } else {
      wx.showModal({
        title: '登录',
        content: '您还没有登录，确认去登录吗？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../secondPages/pages/login/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  to_travels:function(e){
    if(this.data.hasLogin === true){
      wx.navigateTo({
        url: '../secondPages/pages/travels/travels',
      })
    }else{
      wx.showModal({
        title: '登录',
        content: '您还没有登录，确认去登录吗？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../secondPages/pages/login/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  to_wallet:function(e){
    if (this.data.hasLogin === true) {
      wx.navigateTo({
        url: '../secondPages/pages/wallet/wallet',
      })
    } else {
      wx.showModal({
        title: '登录',
        content: '您还没有登录，确认去登录吗？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../secondPages/pages/login/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  to_login:function(e){
    wx.navigateTo({
      url: '../secondPages/pages/login/login',
    })
  }
})