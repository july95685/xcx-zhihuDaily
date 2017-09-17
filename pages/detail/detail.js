var utils = require('../../utils/util.js');
var requests = require('../../requests/requests.js');

Page({
	data: {
	    id: "", //当前日报id
	    loading: false, //是否加载中
	    isTheme: false,
	    news: {}, //日报详情
	    modalHidden: true,
	    extraInfo: {},
	    modalMsgHidden: true,
	    pageShow: 'none',
	    isCollect: false//是否被收藏
	},

	onLoad: function (options) {
		console.log(options);
		var id = options.id;
		var isTheme = options['theme'];
		var pageData = wx.getStorageSync('pageData') || [];
		for(var i = 0;i < pageData.length;i++){
			if (pageData[i].id == id) {
		        this.setData({ isCollect: true });
		        break;
		    }
		}
		this.setData({ id: id, isTheme: isTheme });
	},
	onReady: function(){
		console.log('ready');
 		loadData.call(this);
	},

});

function loadData(){
	var _this = this;
	var id = this.data.id;
	var isTheme = this.data.isTheme;

	_this.setData({ loading: true});
	requests.getNewsDetail(id,(data) => {
		console.log(data);
		data['image'] =  utils.fixImgPrefix(data['image']);
		data.body = utils.parseStory(data.body, isTheme);
		_this.setData({ news: data, pageShow: 'block' });
    	wx.setNavigationBarTitle({ title: data.title }); //设置标题
	}, null, () => {
	    _this.setData({ loading: false });
	});

	//请求日报额外信息（主要是评论数和推荐人数）
	  requests.getStoryExtraInfo(id, (data) => {
	    console.log('extra', data);
	    _this.setData({ extraInfo: data });
	  });
}