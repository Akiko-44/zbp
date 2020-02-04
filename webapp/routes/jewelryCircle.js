var express = require("express");
var router = express.Router();

router.get("/index", function (req, res, next) {
  res.render("jewelryCircle/index", {
    title: "珠宝圈",
    headerIndex: 5,
    userHeaderIndex: 0
  });
});

module.exports = router;