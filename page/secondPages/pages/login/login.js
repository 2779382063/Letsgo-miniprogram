const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: '微信登录',
      path: 'page/secondPages/pages/login/login'
    }
  },
  
  onLoad() {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    }),
    
    this.setData({
      hasLogin: app.globalData.hasLogin,
   
    
    })
  },
  data: { hasUserInfo: true},
  login() {
    const that = this
    wx.login({
      success() {
        app.globalData.hasLogin = false
        that.setData({
          hasLogin: false
        })
      }
    })
  },
  
  getUserInfo(info) {

   const userInfo = info.detail.userInfo
 
  this.setData({
    userInfo,
      hasUserInfo: false
    })
  },
})
