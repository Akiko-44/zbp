var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render("gallery_index_new", { 
		title: "图文馆",
		headerIndex: 5
	});
});


router.get("/index", function(req, res, next) {
	res.render("gallery_index_new", { 
		title: "图文馆",
		headerIndex: 5
	});
});


router.get("/list/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("gallery_list_new", { 
		title: "图文馆",
		headerIndex: 5,
		data: {
			id: id
		}
	});
});


router.get("/detail/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("gallery_detail_new", { 
		title: "图文馆",
		headerIndex: 5,
		data: {
			id: id
		}
	});
});

router.get("/topic", function(req, res, next) {
	res.render("gallery_topic", { 
		title: "图文馆",
		headerIndex: 5
	});
});
router.get("/topic_detail/:id", function(req, res, next) {
	var id = req.params.id;
	res.render("gallery_topicDetail", { 
		title: "图文馆",
		headerIndex: 5,
		data: {
			id: id
		}
	});
});
router.get("/detail", function(req, res, next) {
	var id = req.params.id;
	res.render("gallery_more", { 
		title: "图文馆",
		headerIndex: 5,
		data: {
			id: id
		}
	});
});

router.get("/activity", function(req, res, next) {
	res.render("gallery_activity", { 
		title: "图文馆",
		headerIndex: 5
	});
});

router.get("/activity_details", function(req, res, next) {
	var id = req.params.id;
	res.render("gallery_activityDetails", { 
		title: "图文馆",
		headerIndex: 5,
		data: {
			id: id
		}
	});
});
module.exports = router;