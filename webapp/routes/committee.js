var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("committee/index", {
    title: "珠宝店",
    headerIndex: 1
  });
});
router.get("/app", function (req, res, next) {
  res.render("committee/app", {
    title: "优惠活动",
    headerIndex: 1
  });
});
router.get("/activity", function (req, res, next) {
  res.render("committee/activity", {
    title: "3.8女王节",
    headerIndex: 1
  });
});

module.exports = router;