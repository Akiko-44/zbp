var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("jwshow/index", { 
		title: "珠宝展首页",
		headerIndex: 7
	});
});

router.get("/detail", function(req, res, next) {
	res.render("jwshow/detail", { 
		title: "珠宝展详情",
		headerIndex: 7
	});
});

router.get("/apply", function(req, res, next) {
	res.render("jwshow/apply", { 
		title: "珠宝展-申请",
		headerIndex: 7
	});
});

router.get("/edit", function(req, res, next) {
	res.render("jwshow/edit", { 
		title: "珠宝展-编辑",
		headerIndex: 7
	});
});

router.get("/show_list", function(req, res, next) {
	res.render("jwshow/show_list", { 
		title: "申请入驻主页",
		headerIndex: 7
	});
});

router.get("/upload", function(req, res, next) {
	res.render("jwshow/upload", { 
		title: "珠宝展-上传图片",
		headerIndex: 7
	});
});
module.exports = router;