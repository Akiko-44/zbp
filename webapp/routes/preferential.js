var express = require("express");
var router = express.Router();

/*router.get("/activity", function(req, res, next) {
	res.render("preferential/activity", { 
		title: "h5",
		userHeaderIndex: 0
	});
});*/

router.get("/index", function(req, res, next) {
	res.render("preferential/index", {
		title: "设计室",
		headerIndex: 0
	});
});

router.get("/two", function(req, res, next) {
	res.render("preferential/two", {
		title: "制造间",
		headerIndex: 0
	});
});

router.get("/three", function(req, res, next) {
	res.render("preferential/three", {
		title: "互换坊",
		headerIndex: 0
	});
});

module.exports = router;