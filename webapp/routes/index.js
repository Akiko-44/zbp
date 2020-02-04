var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "首页",
    headerIndex: 0
  });
});
router.get("/WhereToBuy", function (req, res, next) {
  res.render("WhereToBuy", {
    title: "去哪买",
    headerIndex: 0
  });
});
router.get("/Goldprice", function (req, res, next) {
  res.render("Goldprice", {
    title: "今日金价",
    headerIndex: 0
  });
});
router.get("/SelectCity", function (req, res, next) {
  res.render("SelectCity", {
    title: "城市选择",
    headerIndex: 0
  });
});

router.get("/comment/:id", function (req, res, next) {
  var id = req.params.id;
  res.render("comment", {
    title: "评论",
    headerIndex: 6,
    data: {
      id: id
    }
  });
});

router.get("/login", function (req, res, next) {
  res.render("system/login", {
    title: "登录"
  });
});

router.get("/reg", function (req, res, next) {
  res.render("system/reg", {
    title: "注册"
  });
});

router.get("/reg_success", function (req, res, next) {
  res.render("system/reg_success", {
    title: "注册成功"
  });
});

router.get("/findpwd", function (req, res, next) {
  res.render("system/findpwd", {
    title: "找回密码"
  });
});

router.get("/find_next/:data", function (req, res, next) {
  var data = req.params.data;
  res.render("system/find_next", {
    title: "找回密码",
    data: {
      data: data
    }
  });
});

router.get("/find_success", function (req, res, next) {
  res.render("system/find_success", {
    title: "找回密码"
  });
});

router.get("/bind", function (req, res, next) {
  res.render("system/bind", {
    title: "绑定手机"
  });
});

router.get("/bind_success", function (req, res, next) {
  res.render("system/bind_success", {
    title: "绑定成功"
  });
});

router.get("/business", function (req, res, next) {
  res.render("system/business", {
    title: "商家注册"
  });
});

router.get("/system/applyShop", function (req, res, next) {
  res.render("system/applyShop", {
    title: "企业认证",
    userHeaderIndex: 0
  });
});

router.get("/system/apply_store", function (req, res, next) {
  res.render("system/apply_store", {
    title: "珠宝店资料填写"
  });
});

router.get("/apply_exchange", function (req, res, next) {
  res.render("system/apply_exchange", {
    title: "互换坊资料填写"
  });
});

router.get("/system/apply_office", function (req, res, next) {
  res.render("system/apply_office", {
    title: "设计室资料填写"
  });
});

router.get("/apply_office_sign", function (req, res, next) {
  res.render("system/apply_office_sign", {
    title: "对公款认证"
  });
});

router.get("/system/apply_room", function (req, res, next) {
  res.render("system/apply_room", {
    title: "制造间资料填写"
  });
});

router.get("/apply_provider", function (req, res, next) {
  res.render("system/apply_provider", {
    title: "服务商资料填写"
  });
});

router.get("/system/apply_checking", function (req, res, next) {
  res.render("system/apply_checking", {
    title: "注册审核中"
  });
});

router.get("/activity", function (req, res, next) {
  res.render("activity", {
    title: "活动",
    headerIndex: '0'
  });
});

router.get("/activityDetails", function (req, res, next) {
  res.render("activityDetails", {
    title: "活动详情",
    headerIndex: '0'
  });
});

router.get("/copyright", function (req, res, next) {
  res.render("copyright", {
    title: "中宝平知识产权服务",
    headerIndex: '6'
  });
});

router.get("/updateAppVersion", function (req, res, next) {
  res.render("system/updateAppVersion", {
    title: "更新APP版本"
  });
});

module.exports = router;