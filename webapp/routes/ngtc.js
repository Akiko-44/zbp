var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("ngtc/index", { 
		title: "溯源查询",
		headerIndex :'6'
	});
});

router.get("/ngtc", function(req, res, next) {
	res.render("ngtc/ngtc", { 
		title: "国检",
		headerIndex :'6'
	});
});

router.get("/hjtc", function(req, res, next) {
	res.render("ngtc/hjtc", { 
		title: "华津国检",
		headerIndex :'6'
	});
});



module.exports = router;