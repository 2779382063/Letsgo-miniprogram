// page/secondPages/pages/choosepassenger/choosepassenger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passenger_number:3,
    passenger:[
      {
        passenger_headicon: '../../../common/image/headicon_demo.png',
        passenger_name: '张锦晖',
        passenger_credit:88,
        passenger_gender:false,
        order_time:'现在',
        start_from:'武汉大学-北门',
        destination:'武汉国际博览中心',
        travel_time:7}
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.passenger.push({
      passenger_headicon: '../../../common/image/headicon_demo.png',
      passenger_name: '来次',
      passenger_credit: 85,
      passenger_gender: true,
      order_time: '现在',
      start_from: '武汉大学-北门',
      destination: '武汉国际博览中心-地铁站',
      travel_time: 21
    },
      {
        passenger_headicon: '../../../common/image/headicon_demo.png',
        passenger_name: '禺彊',
        passenger_credit: 85,
        passenger_gender: false,
        order_time: '今天 14:30',
        start_from: '武汉大学-北门',
        destination: '武汉国际博览中心-地铁站',
        travel_time: 21
      })
    var passengers=this.data.passenger
    this.setData({
      passenger:passengers,
      passenger_number:this.data.passenger.length
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
  
  }
})