App({
  onLaunch:function(){
    //展现本地存储能力
    var _this = this;
    //获取应用设置
    // var settingData = wx.setStorage(_this.constant.SETTING);
    var settingData = ""
    if( settingData ){
      this.globalData.appSetting = settingData;
    }
  },
  getUserInfo: function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success:function(){
          wx.getUserInfo({
            success:function(res){
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    //应用设置
    appSetting: {
      theme: 'light', //主题
      noPicMode: false //无图模式
    }
  },
  constant: {
    SETTING: 'ZHIHU_SETTING',
    CACHE: 'ZHIHU_CACHE'
  },
})