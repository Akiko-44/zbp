var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("design/index", {
		title: "设计室",
		headerIndex: 3
	});
});
router.get("/product", function(req, res, next) {
    res.render("design/product", {
        title: "所有作品",
        headerIndex: 3
    });
});
router.get("/room", function(req, res, next) {
    res.render("design/room", {
        title: "设计室",
        headerIndex: 3
    });
});
router.get("/designer", function(req, res, next) {
    res.render("design/designer", {
        title: "所有设计师",
        headerIndex: 3
    });
});

router.get("/designer_detail", function(req, res, next) {
    res.render("design/designer_detail", {
        title: "设计师详情",
        headerIndex: 3
    });
});
router.get("/product_detail", function(req, res, next) {
    res.render("design/product_detail", {
        title: "作品详情",
        headerIndex: 3
    });
});
module.exports = router;