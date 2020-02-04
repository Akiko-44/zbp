var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("down/index", {
    title: "下载",
    headerIndex: 1
  });
});
router.get("/app", function (req, res, next) {
  res.render("down/app", {
    title: "下载",
    headerIndex: 1
  });
});

module.exports = router;