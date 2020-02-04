var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("manufacture/index", { 
		title: "制造间",
		headerIndex: 4
	});
});


router.get("/business", function(req, res, next) {
	res.render("manufacture/business", { 
		title: "制造商列表",
		headerIndex: 4
	});
});

router.get("/business_detail", function(req, res, next) {
	res.render("manufacture/business_detail", { 
		title: "制造商详情",
		headerIndex: 4
	});
});

router.get("/product", function(req, res, next) {
	res.render("manufacture/product", { 
		title: "所有作品",
		headerIndex: 4
	});
});

router.get("/product_detail", function(req, res, next) {
	res.render("manufacture/product_detail", { 
		title: "所有作品",
		headerIndex: 4
	});
});



router.get("/art", function(req, res, next) {
	res.render("manufacture/art", { 
		title: "制造间所有工艺",
		headerIndex: 4
	});
});

router.get("/art_detail", function(req, res, next) {
	res.render("manufacture/art_detail", { 
		title: "工艺详情",
		headerIndex: 4
	});
});

router.get("/made", function(req, res, next) {
	res.render("manufacture/made", { 
		title: "定制",
		headerIndex: 4
	});
});

router.get("/made_details", function(req, res, next) {
	res.render("manufacture/made_details", { 
		title: "定制详情",
		headerIndex: 4
	});
});

router.get("/made_list", function(req, res, next) {
	res.render("manufacture/made_list", { 
		title: "我的定制",
		headerIndex: 4
	});
});

router.get("/need_more", function(req, res, next) {
	res.render("manufacture/need_more", { 
		title: "更多需求",
		headerIndex: 4
	});
});

module.exports = router;