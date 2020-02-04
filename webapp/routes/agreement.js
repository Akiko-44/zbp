var express = require("express");
var router = express.Router();

router.get("/about_we", function (req, res, next) {
  res.render("agreement/about_we", {
    title: "关于我们",
    headerIndex: 0
  });
});

router.get("/touch_we", function (req, res, next) {
  res.render("agreement/touch_we", {
    title: "联系我们",
    headerIndex: 0
  });
});

router.get("/disclaimer", function (req, res, next) {
  res.render("agreement/disclaimer", {
    title: "免责声明",
    headerIndex: 0
  });
});

router.get("/user_protocol/sumary", function (req, res, next) {
  res.render("agreement/user_protocol/sumary", {
    title: "纠纷处理总规则",
    headerIndex: 0
  });
});
router.get("/user_protocol/quality", function (req, res, next) {
  res.render("agreement/user_protocol/quality", {
    title: "商品质量问题纠纷处理",
    headerIndex: 0
  });
});
router.get("/user_protocol/sign_in_rules", function (req, res, next) {
  res.render("agreement/user_protocol/sign_in_rules", {
    title: "签收问题的纠纷处理",
    headerIndex: 0
  });
});
router.get("/user_protocol/evaluate", function (req, res, next) {
  res.render("agreement/user_protocol/evaluate", {
    title: "用户评价规则声明",
    headerIndex: 0
  });
});
router.get("/user_protocol/freight", function (req, res, next) {
  res.render("agreement/user_protocol/freight", {
    title: "运费问题纠纷处理",
    headerIndex: 0
  });
});
router.get("/user_protocol/refundable", function (req, res, next) {
  res.render("agreement/user_protocol/refundable", {
    title: "退货问题纠纷处理",
    headerIndex: 0
  });
});
router.get("/user_protocol/privacy", function (req, res, next) {
  res.render("agreement/user_protocol/privacy", {
    title: "隐私权条款",
    headerIndex: 0
  });
});

module.exports = router;