// page/secondPages/pages/driverCertification/driverCertification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultLiscencePictureUrl:'../../resources/image/uploadDriverliscence.png',
    hasDriverLiscence:false
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

  chooseLiscencePicture:function(e){
    console.log('拍照')
    var that=this
    wx.chooseImage({
      count:1,
      success: function(res) {
        that.setData({
          defaultLiscencePictureUrl:res.tempFilePaths,
          hasDriverLiscence:true
        })
      }
    })
  },

  previewLiscencePicture:function(e){
    console.log('查看照片')
    wx.previewImage({
      urls: this.data.defaultLiscencePictureUrl
    })
  },

  sendCertificationInfo:function(e){
    if(!this.data.hasDriverLiscence){
      wx.showToast({
        title: '请先选择身份证',
        icon:'none'
      })
    }else{
      console.log('提交认证')
    }
  },
  startUpload: function () {

    wx.chooseImage({

      success: function (res) {

        var tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths)

        wx.uploadFile({

          url: 'https://www.letscx.top/letsgo/servlet/CheZhuRenZheng_servlet?FunctionName=update&YongHuID=1&GongXiangQiCheZhangHao=GXQC007&SiJiJiaZhao=x123456x', //仅为示例，非真实的接口地址

          filePath: tempFilePaths[0],

          name: "file",

          header: {

            "Content-Type": "multipart/form-data"

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