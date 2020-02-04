var express = require('express');
var router = express.Router();
router.get("/account/fund", function (req, res, next) {
  res.render("user/account/fund", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/account/bankcard", function (req, res, next) {
  res.render("user/account/bankcard", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});


router.get("/account", function (req, res, next) {
  res.render("user/account", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});
router.get("/acc_userinfo", function (req, res, next) {
  res.render("user/acc_userinfo", {
    title: "账号信息",
    userHeaderIndex: 0
  });
});
router.get("/acc_phone/:phone", function (req, res, next) {
  var phone = +req.params.phone;
  res.render("user/acc_phone", {
    title: "个人中心",
    userHeaderIndex: 0,
    data: {
      phone: phone
    }
  });
});

router.get("/acc_address", function (req, res, next) {
  res.render("user/acc_address", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_card", function (req, res, next) {
  res.render("user/acc_card", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_BusinessAuthentication", function (req, res, next) {
  res.render("user/acc_BusinessAuthentication", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_BusinessDetail", function (req, res, next) {
  res.render("user/acc_BusinessDetail", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});
router.get("/add_PersonalAuthentication", function (req, res, next) {
  res.render("user/add_PersonalAuthentication", {
    title: "个人认证",
    userHeaderIndex: 6
  });
});
router.get("/Intellectual", function (req, res, next) {
  res.render("user/Intellectual", {
    title: "个人中心/知识产权",
    userHeaderIndex: 0,
  });
});
router.get("/Complaint", function (req, res, next) {
  res.render("user/Complaint", {
    title: "投诉处理公示",
    headerIndex: 0,
    userHeaderIndex: 0
  });
});
router.get("/ComplaintDesc", function (req, res, next) {
  res.render("user/ComplaintDesc", {
    title: "投诉入口",
    headerIndex: 0,
    userHeaderIndex: 0
  });
});
router.get("/acc_password", function (req, res, next) {
  res.render("user/acc_password", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_info", function (req, res, next) {
  res.render("user/acc_info", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_info_details", function (req, res, next) {
  res.render("user/acc_info_details", {
    title: "个人信息",
    userHeaderIndex: 0
  });
});

router.get("/Intellectual", function (req, res, next) {
  res.render("user/Intellectual", {
    title: "个人中心/知识产权",
    userHeaderIndex: 0
  });
});
router.get("/acc_mid", function (req, res, next) {
  res.render("user/acc_mid", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_kefu", function (req, res, next) {
  res.render("user/acc_kefu", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_report", function (req, res, next) {
  res.render("user/acc_report", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_ticket", function (req, res, next) {
  res.render("user/acc_ticket", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/acc_invoice", function (req, res, next) {
  res.render("user/acc_invoice", {
    title: "个人中心",
    userHeaderIndex: 0
  });
});

router.get("/shop_info", function (req, res, next) {
  res.render("user/shop_info", {
    title: "我的店铺",
    userHeaderIndex: 0
  });
});
router.get("/shop_edit", function (req, res, next) {
  res.render("user/shop_edit", {
    title: "我的店铺",
    userHeaderIndex: 0
  });
});
router.get("/shop_checking", function (req, res, next) {
  res.render("user/shop_checking", {
    title: "我的店铺",
    userHeaderIndex: 0
  });
});
router.get("/membershipEntry", function (req, res, next) {
  res.render("user/membershipEntry", {
    title: "中宝协会员入驻专属通道",
    userHeaderIndex: 0
  });
});


//珠宝店订单
router.get("/order/jewelry", function (req, res, next) {
  res.render("user/order/jewelry", {
    title: "珠宝店订单",
    userHeaderIndex: 1
  });
});
router.get("/order/jewelry_detail", function (req, res, next) {
  res.render("user/order/jewelry_detail", {
    title: "珠宝店订单",
    userHeaderIndex: 1
  });
});
//互换坊订单
router.get("/order/exchange_buy", function (req, res, next) {
  res.render("user/order/exchange_buy", {
    title: "我的购买订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_buy_detail", function (req, res, next) {
  res.render("user/order/exchange_buy_detail", {
    title: "我的购买订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_swap", function (req, res, next) {
  res.render("user/order/exchange_swap", {
    title: "我的申请交换订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_swap_detail", function (req, res, next) {
  res.render("user/order/exchange_swap_detail", {
    title: "我的申请交换订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_auction", function (req, res, next) {
  res.render("user/order/exchange_auction", {
    title: "我的拍卖订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_auction_detail", function (req, res, next) {
  res.render("user/order/exchange_auction_detail", {
    title: "我的拍卖订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_recover", function (req, res, next) {
  res.render("user/order/exchange_recover", {
    title: "我的申请回收订单",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_recover_detail", function (req, res, next) {
  res.render("user/order/exchange_recover_detail", {
    title: "我的申请回收订单",
    userHeaderIndex: 1
  });
});

router.get("/order/exchange_buy_out", function (req, res, next) {
  res.render("user/order/exchange_buy_out", {
    title: "销售订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_buy_out_detail", function (req, res, next) {
  res.render("user/order/exchange_buy_out_detail", {
    title: "销售订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_swap_out", function (req, res, next) {
  res.render("user/order/exchange_swap_out", {
    title: "交换订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_swap_out_detail", function (req, res, next) {
  res.render("user/order/exchange_swap_out_detail", {
    title: "交换订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_auction_out", function (req, res, next) {
  res.render("user/order/exchange_auction_out", {
    title: "拍卖订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/exchange_auction_out_detail", function (req, res, next) {
  res.render("user/order/exchange_auction_out_detail", {
    title: "拍卖订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/orderRefund", function (req, res, next) {
  res.render("user/order/orderRefund", {
    title: "退货管理",
    userHeaderIndex: 1
  });
});
router.get("/order/cancelRefund", function (req, res, next) {
  res.render("user/order/cancelRefund", {
    title: "取消订单管理",
    userHeaderIndex: 1
  });
});
router.get("/order/orderRefund_detail", function (req, res, next) {
  res.render("user/order/orderRefund_detail", {
    title: "退货管理",
    userHeaderIndex: 1
  });
});
router.get("/order/acc_refundAddr", function (req, res, next) {
  res.render("user/order/acc_refundAddr", {
    title: "退货地址",
    userHeaderIndex: 1
  });
});

//设计室订单
router.get("/order/design", function (req, res, next) {
  res.render("user/order/design", {
    title: "设计室订单",
    userHeaderIndex: 1
  });
});
router.get("/order/design_detail", function (req, res, next) {
  res.render("user/order/design_detail", {
    title: "设计室订单",
    userHeaderIndex: 1
  });
});
//制造间订单
router.get("/order/manufacture", function (req, res, next) {
  res.render("user/order/manufacture", {
    title: "制造间订单",
    userHeaderIndex: 1
  });
});
router.get("/order/manufacture_detail", function (req, res, next) {
  res.render("user/order/manufacture_detail", {
    title: "制造间订单",
    userHeaderIndex: 1
  });
});
//图文馆订单
router.get("/order/gallery", function (req, res, next) {
  res.render("user/order/gallery", {
    title: "图文馆订单",
    userHeaderIndex: 1
  });
});
router.get("/order/gallery_detail", function (req, res, next) {
  res.render("user/order/gallery_detail", {
    title: "图文馆订单",
    userHeaderIndex: 1
  });
});
// 我的订单
router.get("/order/index", function (req, res, next) {
  res.render("user/order/index", {
    title: "我的订单",
    userHeaderIndex: 1
  });
});
router.get("/order/detail", function (req, res, next) {
  res.render("user/order/detail", {
    title: "订单详情",
    userHeaderIndex: 1
  });
});

//退款售后
router.get("/order/refund", function (req, res, next) {
  res.render("user/order/refund", {
    title: "退款售后",
    userHeaderIndex: 1
  });
});
router.get("/order/cancel_apply", function (req, res, next) {
  res.render("user/order/cancel_apply", {
    title: "退款售后",
    userHeaderIndex: 1
  });
});
router.get("/order/refund_apply", function (req, res, next) {
  res.render("user/order/refund_apply", {
    title: "退款售后",
    userHeaderIndex: 1
  });
});
router.get("/order/refund_detail", function (req, res, next) {
  res.render("user/order/refund_detail", {
    title: "退款售后",
    userHeaderIndex: 1
  });
});
router.get("/order/arbitrate_apply", function (req, res, next) {
  res.render("user/order/arbitrate_apply", {
    title: "退款售后",
    userHeaderIndex: 1
  });
});
router.get("/order/returnGoods_apply", function (req, res, next) {
  res.render("user/order/returnGoods_apply", {
    title: "寄回商品",
    userHeaderIndex: 1
  });
});
router.get("/order/comment", function (req, res, next) {
  res.render("user/order/comment", {
    title: "我的评价",
    userHeaderIndex: 1
  });
});

//我发布的信息
router.get("/publish/sale", function (req, res, next) {
  res.render("user/publish/sale", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/freight", function (req, res, next) {
  res.render("user/publish/freight", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/model/explain", function (req, res, next) {
  res.render("user/publish/model/explain", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/model", function (req, res, next) {
  res.render("user/publish/model", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/model2", function (req, res, next) {
  res.render("user/publish/model2", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/list", function (req, res, next) {
  var type = req.params.type;
  res.render("user/publish/list", {
    title: "我发布的信息",
    userHeaderIndex: 2,
    data: {
      type: type
    }
  });
});
router.get("/publish/sale_list", function (req, res, next) {
  res.render("user/publish/sale_list", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});

router.get("/publish/swap", function (req, res, next) {
  res.render("user/publish/swap", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/swap_list", function (req, res, next) {
  res.render("user/publish/swap_list", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});

router.get("/publish/recovery", function (req, res, next) {
  res.render("user/publish/recovery", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/recovery_list", function (req, res, next) {
  res.render("user/publish/recovery_list", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});

router.get("/publish/auction", function (req, res, next) {
  res.render("user/publish/auction", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});
router.get("/publish/auction_list", function (req, res, next) {
  res.render("user/publish/auction_list", {
    title: "我发布的信息",
    userHeaderIndex: 2
  });
});

router.get("/comment/:type", function (req, res, next) {
  var type = req.params.type;
  res.render("user/comment", {
    title: "我的评价",
    userHeaderIndex: 3,
    data: {
      type: type
    }
  });
});

//我的评价改版
router.get("/mine_evaluate", function (req, res, next) {
  res.render("user/mine_evaluate", {
    title: "我的评价",
    userHeaderIndex: 3,
  });
});

router.get("/collect/:type", function (req, res, next) {
  var type = req.params.type;
  res.render("user/collect", {
    title: "我的收藏",
    userHeaderIndex: 4,
    data: {
      type: type
    }
  });
});

router.get("/message", function (req, res, next) {
  res.render("user/message", {
    title: "消息中心",
    userHeaderIndex: 5
  });
});

router.get("/message_detail", function (req, res, next) {
  res.render("user/message_detail", {
    title: "消息详情",
    userHeaderIndex: 5
  });
});

router.get("/openShop", function (req, res, next) {
  res.render("user/openShop", {
    title: "开店入口",
    userHeaderIndex: 6
  });
});
router.get("/shop", function (req, res, next) {
  res.render("user/shop", {
    title: "我的店铺",
    userHeaderIndex: 6
  });
});

router.get("/shop_video", function (req, res, next) {
  res.render("user/shop_video", {
    title: "帮助视频",
    userHeaderIndex: 6
  });
});

router.get("/shop_doc", function (req, res, next) {
  res.render("user/shop_doc", {
    title: "帮助手册",
    userHeaderIndex: 6
  });
});

router.get("/apply_residence", function (req, res, next) {
  res.render("user/apply_residence", {
    title: "加盟入驻",
    headerIndex: 0
  });
});

//直播管理
router.get("/live/index", function (req, res, next) {
  res.render("user/live/index", {
    title: "直播列表",
    userHeaderIndex: 7
  });
});
router.get("/live/upload", function (req, res, next) {
  res.render("user/live/upload", {
    title: "直播上传",
    userHeaderIndex: 7
  });
});
//我是服务商
router.get("/provider/order-information", function (req, res, next) {
  res.render("user/provider/order-information", {
    title: "订单信息",
    userHeaderIndex: 8
  });
});
router.get("/provider/business-introduction", function (req, res, next) {
  res.render("user/provider/business-introduction", {
    title: "业务介绍",
    userHeaderIndex: 8
  });
});
router.get("/provider/information", function (req, res, next) {
  res.render("user/provider/information", {
    title: "公司介绍",
    userHeaderIndex: 8
  });
});
//消息
router.get("/msg/ordermessage", function (req, res, next) {
  res.render("user/msg/ordermessage", {
    title: "订单消息",
    userHeaderIndex: 5
  });
});
router.get("/msg/feedback", function (req, res, next) {
  res.render("user/msg/feedback", {
    title: "意见反馈",
    userHeaderIndex: 5
  });
});
//帮助中心
router.get("/help", function (req, res, next) {
  res.render("user/help/index", {
    title: "帮助中心"
  });
});

//优惠券
router.get("/discount_coupon", function (req, res, next) {
  res.render("user/discount_coupon", {
    title: "优惠券"
  });
});

//安全设置
router.get("/acc_safety_setting", function (req, res, next) {
  res.render("user/acc_safety_setting", {
    title: "安全设置",
    userHeaderIndex: 0
  });
});

//我的足迹
router.get("/acc_mine_track", function (req, res, next) {
  res.render("user/acc_mine_track", {
    title: "我的足迹",
    userHeaderIndex: 0
  });
});

//账户明细
router.get("/acc_details", function (req, res, next) {
  res.render("user/acc_details", {
    title: "账户明细",
    userHeaderIndex: 0
  });
});
module.exports = router;