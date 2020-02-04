var express = require("express");
var router = express.Router();

router.get("/query_jewelry_price", function(req, res, next) {
	res.render("home/query_jewelry_price", {
		title: "查珠宝价格",
		headerIndex: 0
	})
})

router.get("/query_id_card", function(req, res, next) {
	res.render("home/query_id_card", {
		title: "查珠宝身份证",
		headerIndex: 0
	})
})

router.get("/fidelity_index", function(req, res, next) {
	res.render("home/fidelity_index", {
		title: "打假保真",
		headerIndex: 0
	})
})

router.get("/query_result", function(req, res, next) {
	res.render("home/query_result", {
		title: "查询结果",
		headerIndex: 0
	})
})

router.get("/integrity_enterprise", function(req, res, next) {
	res.render("home/integrity_enterprise", {
		title: "诚信企业",
		headerIndex: 0
	})
})

router.get("/enterprise_directories", function(req, res, next) {
	res.render("home/enterprise_directories", {
		title: "企业名录",
		headerIndex: 0
	})
})

router.get("/notice", function(req, res, next) {
	res.render("home/notice", {
		title: "平台公告",
		headerIndex: 0
	})
})

module.exports = router;