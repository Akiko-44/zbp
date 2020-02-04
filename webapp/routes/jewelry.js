var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("jewelry/index", { 
		title: "去哪儿买",
		headerIndex: 1
	});
});
router.get("/promotion", function(req, res, next) {
	res.render("jewelry/promotion", { 
		title: "优惠活动",
		headerIndex: 1
	});
});
router.get("/concession", function(req, res, next) {
	res.render("jewelry/concession", { 
		title: "优惠活动专场",
		headerIndex: 1
	});
});
router.get("/newProduct", function(req, res, next) {
	res.render("jewelry/newProduct", { 
		title: "新品推荐",
		headerIndex: 1
	});
});
router.get("/fineQuality", function(req, res, next) {
	res.render("jewelry/fineQuality", { 
		title: "精品导购",
		headerIndex: 1
	});
});
router.get("/fineQualityDetails", function(req, res, next) {
	res.render("jewelry/fineQualityDetails", { 
		title: "精品导购-展示",
		headerIndex: 1
	});
});
router.get("/brandWall", function(req, res, next) {
	res.render("jewelry/brandWall", { 
		title: "品牌墙",
		headerIndex: 1
	});
});
router.get("/brandStory", function(req, res, next) {
	res.render("jewelry/brandStory", { 
		title: "品牌故事",
		headerIndex: 1
	});
});
router.get("/shopSearch", function(req, res, next) {
	res.render("jewelry/shopSearch", {
		title: "店铺搜索",
		headerIndex: 1
	});
});
router.get("/shopList", function(req, res, next) {
	res.render("jewelry/shopList", {
		title: "品牌列表",
		headerIndex: 1
	});
});
router.get("/shoppingCart", function(req, res, next) {
	res.render("jewelry/shoppingCart", {
		title: "购物车",
		headerIndex: 1
	});
});
router.get("/checkOrder", function(req, res, next) {
	res.render("jewelry/checkOrder", {
		title: "核对订单",
		headerIndex: 1
	});
});
router.get("/details", function(req, res, next) {
	res.render("jewelry/details", {
		title: "详情",
		headerIndex: 1
	});
});
router.get("/goodsList", function(req, res, next) {
	res.render("jewelry/goodsList", {
		title: "商品列表",
		headerIndex: 1
	});
});

module.exports = router;