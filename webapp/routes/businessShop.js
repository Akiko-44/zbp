var express = require("express");
var router = express.Router();
router.get("/index", function(req, res, next) {
	res.render("businessShop/index", {
		title: "商家店铺",
		shopHeaderIndex: 1
	});
});
router.get("/shopGoodsList", function(req, res, next) {
	res.render("businessShop/shopGoodsList", {
		title: "商家店铺搜索结果",
		shopHeaderIndex: 2
	});
});
module.exports = router;