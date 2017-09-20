var utils = require('../../utils/util.js');
var requests = require('../../requests/requests.js');
var weekdayStr = ['日', ' 一', '二', '三', '四', '五', '六'];
Page({
	data: {
	    pageData: {}, //列表数据
	    themeData: {}, //主题菜单数据
	    sliderData: {}, //轮播图数据
	    currentDateStr: '',
	    currentDate: new Date(),
	    refreshAnimation: {}, //加载更多旋转动画数据
	    loadingMore: false, //是否正在加载
	    avatarUrl: '', //当前开发者头像
	    nickName: '', //当前开发者名字
	    test:"../../images/home.png",

	    loading: false,
	    loadingMsg: '加载中...',
	    pageShow: 'none',
	    showMenu:false,

	    maskDisplay: 'none',
	    slideHeight: 0,
	    slideRight: 0,
	    slideWidth: 0,
	    slideDisplay: 'block',
	    screenHeight: 0,
	    screenWidth: 0,
	    slideAnimation: {},

	    ballBottom: 20,
	    ballRight: 30,
	    ballOpacity: '.8',
	    modalMsgHidden: true,
	    themeId: 0,//当前主题id

	    id: null,
	    //pageShow: 'display',
	    background: '',
	    //pageData: [], //列表数据源
	    editorData: [], //主编数据
	    description: '',
	    //loading: false,
	    //loadingMsg: '数据加载中...'
	},
	onLoad:function(){
		var _this = this;
		wx.getSystemInfo({
	      success: function (res) {
	        _this.setData({
	          screenHeight: res.windowHeight,
	          screenWidth: res.windowWidth,
	          slideHeight: res.windowHeight,
	          slideRight: res.windowWidth,
	          slideWidth: res.windowWidth * 0.7
	        });
	      }
	    });
	    var app = getApp();
	    app.getUserInfo(function (data) {
	    	console.log(data);
	        _this.setData({ avatarUrl: data.avatarUrl, nickName: data.nickName });
	    });
	},
	onShow: function(){
		if(this.data.themeId == -1){
			var pageData = wx.getStory('pageData') || []
			this.setData({
				pageData: pageData
			})
		}
	},
	onReady: function(){
		// var data = utils.getCurrentData();
		var date = {
			year:2017,
			month:9,
			day:9,
			date:2
		};
		this.setData({ currentDateStr: date.year + '.' + date.month + '.' + date.day + '　'});
		var _this = this;
		_this.setData({
			loading:true
		});
		requests.getNewsLatest((data) => {
			data = utils.correctData(data);
			_this.setData({
				sliderData:data.top_stories,
				pageData: data.stories
			})
			console.log(data);
		},null,()=>{
			_this.setData({ loading: false});
		})

		requests.getTheme((data) => {
			console.log(data.others);
			_this.setData({
				themeData: data.others
			})
		})
	},
	//列表加載更多
	loadingMoreEvent: function(){
		if(this.data.loadingMore) return;
		console.log(this.data.loadingMore);
		console.log()
		var date = new Date(Date.parse(this.data.currentDate) - 1000 * 60 * 60 * 24);
		var _this = this;
		var pageData = [];

		this.setData({loadingMore:true});
		//加载动画
		var y = date.getFullYear();
	    var m = (date.getMonth() + 1);
	    var d = date.getDate();
	    m = m > 9 ? m : '0' + m;
	    d = d > 9 ? d : '0' + d;
	    var dateStr = [y, m, d].join('');
	    // requests.getBeforeNews(dataStr,(data)=>{
	    // 	data = utils.correctData(data);
	    // 	console.log(data);
	    // 	// pageData = _this.data.pageData;
	    // 	// pageData.push({
	    // 	// 	type:'3',title
	    // 	// })
	    // },null,()=>{
	    // 	_this.setData({loadingMore:false});
	    // })

	},
	ballClickEvent: function () {
	    console.log('ballClickEvent');
	    this.setData({
			showMenu:true
		});
	},
	ballMoveEvent: function(){
		console.log('ballMoveEvent');
	},
	toCollectPage: function(){
		console.log('toCollectPage');
	},
	toSettingPage: function(){
		console.log('toSettingPage');
	},
	toThemePage: function(e){
		console.log(e);
		var _this = this;
		_this.setData({
			loading:true,
			themeId:e.currentTarget.dataset.id
		});
	},
	toDetailPage: function(e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../detail/detail?id=' + id
		})
	},
	hideMenu: function(){
		this.setData({
			showMenu:false
		});
	}
})