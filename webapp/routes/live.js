var express = require("express");
var router = express.Router();

router.get("/story", function(req, res, next) {
	
//	res.render("live/liveIndex", { 
//		title: "直播厅首页",
//		headerIndex: 8,
//		data: {
//			grade:2
//		}
//	});
	
	res.render("home/query_jewelry_price", { 
		title: "查珠宝价格",
		headerIndex: 8,
		data: {
			grade:2
		}
	});
});
router.get("/livelist", function(req, res, next) {
	
	res.render("live/liveList", { 
		title: "直播厅全部分类",
		headerIndex: 8,
		data: {
			grade:2
		}
	});
});

router.get("/living", function(req, res, next) {
//	let userId = req.params.userId
//	let liveId = req.params.liveId
//	let spaceId = req.params.spaceId
	res.render("live/living", { 
		title: "直播间",
		headerIndex: 8,
		data: {
//			liveId,
//			userId,
//			spaceId,
			grade:2
		}
	});
});
router.get("/otherLiveList", function(req, res, next) {
	
	res.render("live/otherLiveList", { 
		title: "直播间",
		headerIndex: 8,
		data: {
			grade:2
		}
	});
});
router.get("/storyDetail", function(req, res, next) {
	
	res.render("live/storyDetail", { 
		title: "直播间",
		headerIndex: 8,
		data: {
			grade:2
		}
	});
});
router.get("/storyList", function(req, res, next) {
	
	res.render("live/storyList", {
		title: "直播间",
		headerIndex: 8,
		data: {
			grade:2
		}
	});
});

//router.get("/story/:id", function(req, res, next) {
//	var id = req.params.id;
//	var grade = req.query.grade
//	console.log(req,1111)
//	res.render("live/story", {
//		title: "新奇故事",
//		headerIndex: 8,
//		name:"story",
//		data: {
//			id: id,
//			grade:grade
//		}
//	});
//});
//
//router.get("/product", function(req, res, next) {
//	res.render("live/story", {
//		title: "直销产品",
//		headerIndex: 8,
//		name:"product",
//	});
//});
//
//router.get("/consult", function(req, res, next) {
//	res.render("live/story", {
//		title: "专家咨询",
//		headerIndex: 8,
//		name:"consult",
//	});
//});
//
//router.get("/auction", function(req, res, next) {
//	res.render("live/story", {
//		title: "在线拍卖",
//		headerIndex: 8,
//		name:"auction",
//	});
//});

module.exports = router;