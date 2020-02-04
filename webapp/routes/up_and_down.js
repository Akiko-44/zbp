var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("up_and_down/index", {
		title: "上下游服务",
		headerIndex: 9,
	});
});

router.get("/detail", function(req, res, next) {
	res.render("up_and_down/detail", {
		title: "上下游服务详情",
		headerIndex: 9,
	});
});



module.exports = router;