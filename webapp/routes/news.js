var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render("news_index", { 
		title: "行业之声",
		headerIndex: 6
	});
});

router.get("/list", function(req, res, next) {
	res.render("news_list", { 
		title: "行业之声",
		headerIndex: 6
	});
});

router.get("/detail/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("news_detail", { 
		title: "行业之声",
		headerIndex: 6,
		data: {
			id: id
		}
	});
});
router.get("/patent/:id", function(req, res, next) {
	res.render("news_patent", { 
		title: "行业之声",
		headerIndex: 6
	});
});
router.get("/detailspage/:id", function(req, res, next) {
	res.render("news_detailspage", { 
		title: "行业之声",
		headerIndex: 6
	});
});

router.get("/bulletin", function(req, res, next) {
	res.render("news_bulletin", { 
		title: "行业之声",
		headerIndex: 6
	});
});
router.get("/more/:id", function(req, res, next) {
	res.render("news_more", { 
		title: "行业之声",
		headerIndex: 6
	});
});
router.get("/public/:id", function(req, res, next) {
	res.render("new_public", { 
		title: "行业之声",
		headerIndex: 6
	});
});
router.get("/activity", function(req, res, next) {
	res.render("news_activity", { 
		title: "行业之声",
		headerIndex: 6
	});
});
router.get("/activityDetails", function(req, res, next) {
	res.render("news_activityDetails", { 
		title: "行业之声",
		headerIndex: 6
	});
});
module.exports = router;