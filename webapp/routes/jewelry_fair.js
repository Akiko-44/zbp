var express = require("express");
var router = express.Router();


router.get("/index", function(req, res, next) {
	res.render("jewelry_fair/index", { 
		title: "珠宝展",
		headerIndex: 7
	});
});
//普通详情页
router.get("/detail/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("jewelry_fair/detail", {
		title: "详情",
		headerIndex: 7,
		data: {
			id: id
		}
	});
});
//展会更多页
router.get("/langdata/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("jewelry_fair/langdata", {
		title: "珠宝展",
		headerIndex: 7,
		data: {
			id: id
		}
	});
});
//轮播图详情页
router.get("/from/:id", function(req, res, next) {
	res.render("jewelry_fair/from", { 
		title: "珠宝展",
		headerIndex: 7
	});
});
//活动列表页
router.get("/activity", function(req, res, next) {
	res.render("jewelry_fair/activity", { 
		title: "珠宝展",
		headerIndex: 7
	});
});
//活动详情页
router.get("/activitys", function(req, res, next) {
	res.render("jewelry_fair/activityDetails", { 
		title: "珠宝展",
		headerIndex: 7
	});
});
//普通更多页
router.get("/more/:id", function(req, res, next) {
	res.render("jewelry_fair/more", { 
		title: "珠宝展",
		headerIndex: 7
	});
});
//展会详情页
router.get("/details/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("jewelry_fair/details", {
		title: "详情",
		headerIndex: 7,
		data: {
			id: id
		}
	});
});
module.exports = router;