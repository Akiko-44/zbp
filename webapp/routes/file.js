var express = require("express");
var router = express.Router();
var file = require("../model/file.js")


//文件上传到本地
router.post("/add", function(req, res, next) {
	file.add(req, res, next);
});

//提交到qiniu
router.post("/qiniu", function(req, res, next) {
	file.qiniu(req, res, next);
});


router.post("/upload", function(req, res, next) {
	file.upload(req, res, next);
});
module.exports = router;