// page/map/.js
var app=getApp()
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
var date = new Date()
var time = [['今天', '明天', '后天'], ['现在'], ['']]
var hour_of_day = ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'];
var min_of_hour = ['0分', '10分', '20分', '30分', '40分', '50分'];
var mapMovine = false
var apiSuccess = false
var count = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loc_city:'湘潭市',
    border_bottom_style_passenger:"solid",
    border_bottom_width_passenger:"5px",
    border_bottom_color_passenger:"#63B8FF",
    color_passenger:'#63B8FF',
    border_bottom_style_driver: "none",
    border_bottom_width_driver: "none",
    border_bottom_color_driver: "none",
    color_driver: 'gray',

    str: "您现在在哪",
    desti:"您想要去哪",
    multiArray: [['今天', '明天', '后天'], ['现在'], ['']],
    multiIndex: [0, 0, 0],

    sysInfo: {
      width: 0,
      height: 0,
      th: 105,
      hour: 0,
      minute: 0
    },
    choose_height: 0,
    choose_flag: false,
    choose_time_border_1: 'solid',
    choose_time_border_2: 'none',
    choose_time_color_1: 'black',
    choose_time_color_2: 'gray',
    map: {
      lat: 27,
      lng: 112,
      scale: 16,
      hasMarkers:false,
      markers: []
    },
    hiding:false,
    markers:[],
    travels:[],
    confirmorder:false,
    second_page_number:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'VAABZ-TYDWV-SBCPE-UACZC-H5NU7-QPBA4'
    });
    wx.request({
      url: 'http://www.letscx.top/letsgo/servlet/BianJiZiLiao_servlet?FunctionName=select&YongHuID=1',
      success:function(res){
        console.log(res.data)
      }
    })
    var hour = date.getHours()
    var minute = date.getMinutes()

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          sysInfo: {
            width: res.windowWidth,
            height: res.windowHeight,
            th: 105,
            hour: hour,
            minute: minute
          },
          hasLogin: app.globalData.hasLogin
        })
      },
    })
  },

  onReady: function (e) {
    var that = this
    this.mapCtx = wx.createMapContext('myMap')
  },

  onShow:function(){
    var that = this
    if(this.data.travels.length == 2){
      if(this.data.hiding == true){
        this.setData({
          markers: this.data.travels,
          confirmorder:true
        })
        that.includeTwoPoints()
      }
    }else if(this.data.travels.length == 1){
      if (this.data.travels[0].id == 1) {
        console.log(this.data.travels[0])
        that.includePoints(that.data.travels[0].latitude, that.data.travels[0].longitude)
      } else if (this.data.travels[1].id == 1) {
        console.log(this.data.travels[1])
        that.includePoints(that.data.travels[1].latitude, that.data.travels[1].longitude)
      }
    }else{
      // var that = this
      // wx.getLocation({
      //   success: function (res) {
      //     that.getLocName(res)
      //   },
      // })
    }
  },

  includeTwoPoints(){
    this.mapCtx.includePoints({
      padding:[50,50,50,50],
      points: [{
        latitude: this.data.travels[0].latitude,
        longitude: this.data.travels[0].longitude,
      }, {
        latitude: this.data.travels[1].latitude,
        longitude: this.data.travels[1].longitude,
      }]
    })
  },

  getCenterLocation: function (e) {
    var that = this
    console.log(e)
    if(e.type == 'begin'){
      // mapMovine = true
    }
    if(e.type == 'end'){
      this.mapCtx.getCenterLocation({
        success: function (res) {
          that.setData({
            text: res.longitude + +res.latitude,
            map: {
              lat: res.latitude,
              lng: res.longitude
            }
          })
          if (mapMovine == true) {
            mapMovine = false
            that.getMyLocName()
          }
        }
      })
    }
    
  },

  getMyLocName: function () {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.map.lat,
        longitude: that.data.map.lng
      },
      success: function (res) {
        console.log(res);
        apiSuccess = true
        if (res.result.address_component.nation == "中国"){
          if (that.data.travels.length > 0) {
            if (that.data.travels[0].id == 1) {
              that.data.travels.splice(0, 1)
            } else if (that.data.travels.length == 2) {
              if (that.data.travels[1].id == 1) {
                that.data.travels.splice(1, 1)
              }
            }
          }
          that.data.travels.push({
            id: 1,
            latitude: that.data.map.lat,
            longitude: that.data.map.lng,
            name: '起点',
            title: '起点',
            label: {
              content: '起点',
              color: '#FFFFFF',
              fontSize: 15,
              display: 'ALWAYS',
              borderRadius: 10,
              textAlign: 'center',
              bgColor: '#919191'
            }
          })
          var update = that.data.travels
          that.setData({
            travels: update,
          })
          console.log(that.data.travels)
          that.setData({
            str: res.result.formatted_addresses.recommend,
            loc_city: res.result.ad_info.city
          })
        }
      },
      fail: function (res) {
        apiSuccess = false
        console.log(res);
      }
    })
  },

  getLocName: function (info) {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: info.latitude,
        longitude: info.longitude
      },
      success: function (res) {
        console.log(res);
        if (that.data.travels.length > 0) {
          if (that.data.travels[0].id == 1) {
            that.data.travels.splice(0, 1)
          } else if (that.data.travels.length == 2) {
            if (that.data.travels[1].id == 1) {
              that.data.travels.splice(1, 1)
            }
          }
        }
        that.data.travels.push({
          id: 1,
          latitude: info.latitude,
          longitude: info.longitude,
          name: '起点',
          title: '起点',
          label: {
            content: '起点',
            color: '#FFFFFF',
            fontSize: 15,
            display: 'ALWAYS',
            borderRadius: 10,
            textAlign: 'center',
            bgColor: '#919191'
          }
        })
        var update = that.data.travels
        that.setData({
          travels: update
        })
        that.setData({
          str: res.result.formatted_addresses.recommend,
        })
        that.includePoints(info.latitude, info.longitude)
      }
    })
  },

  moveToGPSLocation: function () {
    var that=this
    if(this.data.travels.length == 0){
      if(count == 0){

        if (that.data.str != '正在获取您当前位置...') {
          that.setData({
            str: '正在获取您当前位置...'
          })
        }
        count = 1
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            that.setData({
              map: {
                lat: res.latitude,
                lng: res.longitude
              }
            })
            that.includePoints(res.latitude, res.longitude)
            that.getMyLocName()
          },
        })

      }
    }
  },

  moveToMyLocation: function (e) {
    var that = this
    if(this.data.second_page_number == 0){
      that.setData({
        str: '正在获取您当前位置...',
      })
      if (that.data.travels.length > 0) {
        if (that.data.travels[0].id == 1) {
          that.data.travels.splice(0, 1)
        } else if (that.data.travels.length == 2) {
          if (that.data.travels[1].id == 1) {
            that.data.travels.splice(1, 1)
          }
        }
      }
      var update_travels = this.data.travels
      this.setData({
        travels: update_travels,
      })
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.setData({
            map: {
              lat: res.latitude,
              lng: res.longitude
            }
          })
          that.includePoints(res.latitude, res.longitude)
          that.getMyLocName()
        },
      })
    }else if(this.data.second_page_number == 1){
      that.mapCtx.moveToLocation()
    }
    
  },

  resetOrder: function (e) {
    var that = this
    this.data.markers.splice(0,this.data.travels.length)
    if (that.data.travels.length > 0) {
      if (that.data.travels[0].id == 2) {
        that.data.travels.splice(0, 1)
      } else if (that.data.travels.length == 2) {
        if (that.data.travels[1].id == 2) {
          that.data.travels.splice(1, 1)
        }
      }
    }
    var update_markers = this.data.markers
    var update_travels = this.data.travels
    this.setData({
      markers:update_markers,
      travels:update_travels,
      confirmorder: false,
      str: '正在获取您当前位置...',
      desti: "您想要去哪",
      hiding: false
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          map: {
            lat: res.latitude,
            lng: res.longitude
          }
        })
        that.includePoints(res.latitude, res.longitude)
        that.getMyLocName()
      },
    })
  }, 


  includePoints: function (lat,lng) {
    var that = this
    this.mapCtx.includePoints({
      points: [{
        latitude: lat,
        longitude: lng,
      }]
    })
  },



  changeColor: function (e) {
    var that = this
    if (e.currentTarget.id == 'now') {
      this.setData({
        choose_time_border_1: 'solid',
        choose_time_border_2: 'none',
        choose_time_color_1: 'black',
        choose_time_color_2: 'gray',
        choose_flag: false,
      })
    } else {
      this.setData({
        choose_time_border_1: 'none',
        choose_time_border_2: 'solid',
        choose_time_color_1: 'gray',
        choose_time_color_2: 'black',
        choose_flag: true,
        multiArray: time,
        multiIndex: [0, 0, 0]
      })
    }
  },

  gotoChooseDeparture:function(e){
    wx.navigateTo({
      url: '../secondPages/pages/chooseDeparture/chooseDeparture' + '?lat=' + this.data.map.lat + '&lng=' + this.data.map.lng
    })
  },
  gotoChooseDestination: function () {
    wx.navigateTo({
      url: '../secondPages/pages/chooseDestination/chooseDestination' + '?lat=' + this.data.map.lat + '&lng=' + this.data.map.lng
    })
  },
  gotoDestination: function () {
    wx.navigateTo({
      url: '../destination/destination'
    })
  },



  bindClick: function () {
    var that = this
    var data = {
      multiArray: this.data.multiArray,
      sysInfo: this.data.sysInfo
    };
    var hour = date.getHours();
    var minute = date.getMinutes();
    data.sysInfo.hour = hour
    data.sysInfo.minute = minute
    data.multiArray[1][0] = ['现在'];
    for (var i = parseInt(hour) + 1, j = 1; i <= 23; i++ , j++) {
      data.multiArray[1][j] = hour_of_day[i];
    }
    data.multiArray[2] = [];
    this.setData(data);
    console.log(this.data.sysInfo.hour)
  },

  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1][0] = ['现在'];
            for (var i = parseInt(that.data.sysInfo.hour) + 1, j = 1; i <= 23; i++ , j++) {
              data.multiArray[1][j] = hour_of_day[i];
            }
            data.multiArray[2] = [];
            break;
          case 1:
            data.multiArray[1] = hour_of_day;
            data.multiArray[2] = min_of_hour;
            break;
          case 2:
            data.multiArray[1] = hour_of_day;
            data.multiArray[2] = min_of_hour;
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            if (data.multiIndex[1] == 0) {
              data.multiArray[2] = [];
            }
            else {
              data.multiArray[2] = min_of_hour;
            }
          case 1:
            data.multiArray[2] = min_of_hour;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },

  to_userInfo:function(e){
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },
  to_switch:function(e){
    var that = this
    if(e.currentTarget.id == 'passenger'){
      wx.showModal({
        title: '警告',
        content: '您当前为车主模式，是否切换为乘客模式？',
        success:function(res){
          if(res.confirm){
            that.setData({
              border_bottom_style_passenger: "solid",
              border_bottom_width_passenger: "5px",
              border_bottom_color_passenger: "#63B8FF",
              color_passenger: '#63B8FF',
              second_page_number: 0,
              border_bottom_style_driver: "none",
              border_bottom_width_driver: "none",
              border_bottom_color_driver: "none",
              color_driver: 'gray',
              hiding: false
            })
            that.moveToMyLocation()
          }else if(res.cancel){

          }
        }
      })
    }else if(e.currentTarget.id == 'driver'){
      wx.showModal({
        title: '警告',
        content: '您当前为乘客模式，切换为车主模式将清空已选择的目地点信息，是否切换？',
        success: function (res) {
          if (res.confirm) {
            that.data.markers.splice(0, that.data.travels.length)
            that.data.travels.splice(0, that.data.travels.length)
            var update_markers = that.data.markers
            var update_travels = that.data.travels
            that.setData({
              
            })
            that.setData({
              markers: update_markers,
              travels: update_travels,
              confirmorder: false,
              desti: "您想要去哪",
              border_bottom_style_passenger: "none",
              border_bottom_width_passenger: "none",
              border_bottom_color_passenger: "none",
              color_passenger: 'gray',
              second_page_number: 1,
              border_bottom_style_driver: "solid",
              border_bottom_width_driver: "5px",
              border_bottom_color_driver: "#63B8FF",
              color_driver: '#63B8FF',
              hiding: true
            })
            that.moveToMyLocation()
          } else if (res.cancel) {

          }
        }
      })
      
    }
  },
  to_choosepassenger:function(e){
    if (this.data.hasLogin === true) {
      wx.navigateTo({
        url: '../secondPages/pages/choosepassenger/choosepassenger',
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
  to_free_ride:function(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  },
  to_taxi:function(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  },
  setDeparture:function(obj_departure){
    var that = this
    if (this.data.travels.length > 0){
      if (this.data.travels[0].id == 1){
        this.data.travels.splice(0, 1)
      } else if (this.data.travels.length == 2){
        if (this.data.travels[1].id == 1){
          this.data.travels.splice(1, 1)
        }
      }
    }
    this.data.travels.push({
      id: 1,
      latitude: obj_departure.location.lat,
      longitude: obj_departure.location.lng,
      name: '起点',
      title: '起点',
      label: {
        content: '起点',
        color: '#FFFFFF',
        fontSize: 15,
        display: 'ALWAYS',
        borderRadius: 10,
        textAlign: 'center',
        bgColor: '#919191'
      }
    })
    var update = this.data.travels
    this.setData({
      str:obj_departure.title,
      travels:update,
    })
  },

  setDestination:function(obj_destination){
    var that = this
    if (this.data.travels.length > 0) {
      if (this.data.travels[0].id == 2) {
        this.data.travels.splice(0, 1)
      } else if (this.data.travels.length == 2) {
        if (this.data.travels[1].id == 2) {
          this.data.travels.splice(1, 1)
        }
      }
    }
    this.data.travels.push({
      id: 2,
      latitude: obj_destination.location.lat,
      longitude: obj_destination.location.lng,
      name: '目的地',
      title: '目的地',
      label: {
        content: '目的地',
        color: '#FFFFFF',
        fontSize: 15,
        display: 'ALWAYS',
        borderRadius: 10,
        textAlign: 'center',
        bgColor: '#919191'
      }
    })
    var update = this.data.travels
    this.setData({
      desti: obj_destination.title,
      travels: update,
      hiding: true,
    })
  }
})