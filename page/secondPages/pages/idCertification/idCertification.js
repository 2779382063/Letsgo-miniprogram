// page/secondPages/pages/idCertification/idCertification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitComplete:false,
    idname:'',
    idnumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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


  formSubmit:function(e){
    if(this.data.submitComplete){
      this.setData({
        submitComplete:!this.data.submitComplete
      })
      wx.showToast({
        title: '请勿重复提交',
        icon:'none'
      })
    }else if(this.data.idname.length == 0 || this.data.idnumber.length == 0){
      console.log('姓名或身份证号为空')
      wx.showToast({
        title: '姓名或身份证号为空',
        icon: 'none'
      })
    }else{
      console.log(e.detail.value)
      this.setData({
        submitComplete: !this.data.submitComplete
      })
    }
  },

  bindIdNameInput:function(e){
    this.setData({
      idname:e.detail.value
    })
  },
  bindIdNumberInput: function (e) {
    this.setData({
      idnumber: e.detail.value
    })
  },
  sendUserInfo: function (e) {
    wx.request({
      //后台接口地址
      url: 'https://www.letscx.top/letsgo/servlet/ShiMingRenZheng_servlte?FunctionName=update&',
      data: {
        YongHuID: '1',
        XingMing:'5',
        ShengFenZheng: '3'
      
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
  },
  startUpload: function () {

    wx.chooseImage({

      success: function (res) {

        var tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths)

        wx.uploadFile({

          url: 'https://www.letscx.top/letsgo/servlet/ShiMingRenZheng_servlte?FunctionName=update&YongHuID=1&XingMing=someone&ShengFenZheng=123456', //仅为示例，非真实的接口地址

          filePath: tempFilePaths[0],

          name: "file",

          header: {

            'content-type': 'application/x-www-form-urlencoded'

          },

          formData: {

            "user": "test",

          },

          success: function (res) {

            var data = res.data

            console.log(data)

            //do something

          }

        })

      }
    })
  }
})