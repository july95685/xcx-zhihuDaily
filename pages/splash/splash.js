var requests = require('../../requests/requests.js');
var util = require('../../utils/util.js');

Page({
	data:{
		splash:{},
		screenHeight: 0,
		screenWidth: 0
	},
	onLoad: function(){
		var _this = this;
		console.log("splash");
		console.log(_this);
		wx.getSystemInfo({
			success: function(res){
				console.log(this);
				_this.setData({
					screenHeight: res.windowHeight,
					screenWidth: res.windowWidth
				});
			}
		})
	},
	onReady: function(){
		var _this = this;
		var size = this.data.screenWidth + "*" + this.data.screenHeight;
		requests.getSplashCover(size,(data)=>{
			console.log(data);
			_this.setData({ splash: data });
		},null,()=>{
			// toIndexPage.call(_this);
			_this.toIndexPage();
		});
	},
	toIndexPage: function(){
		setTimeout(function(){
			wx.redirectTo({
				url:"../index/index"
			});
		},200)
	}

});

// function toIndexPage(){
// 	setTimeout(function(){
// 		wx.redirectTo({
// 			url:"../index/index"
// 		});
// 	},2000)
// }