var express = require("express");
var router = express.Router();

router.get("/index", function(req, res, next) {
	res.render("exchange/index", { 
		title: "互换坊",
		headerIndex: 2
	});
});

router.get("/swap", function(req, res, next) {
	res.render("exchange/swap", { 
		title: "宝贝互换列表",
		headerIndex: 2
	});
});

router.get("/swap_detail", function(req, res, next) {
	res.render("exchange/swap_detail", { 
		title: "宝贝互换详情",
		headerIndex: 2
	});
});

router.get("/swap_order", function(req, res, next) {
	res.render("exchange/swap_order", { 
		title: "宝贝互换",
		headerIndex: 2
	});
});

router.get("/swap_order_detail", function(req, res, next) {
	res.render("exchange/swap_order_detail", { 
		title: "宝贝互换",
		headerIndex: 2
	});
});

router.get("/sale", function(req, res, next) {
	res.render("exchange/sale", { 
		title: "物品销售列表",
		headerIndex: 2
	});
});

router.get("/sale_detail", function(req, res, next) {
	res.render("exchange/sale_detail", { 
		title: "物品销售详情",
		headerIndex: 2
	});
});

router.get("/auction", function(req, res, next) {
	res.render("exchange/auction", { 
		title: "物品拍卖列表",
		headerIndex: 2
	});
});

router.get("/auction_detail", function(req, res, next) {
	res.render("exchange/auction_detail", { 
		title: "物品拍卖详情",
		headerIndex: 2
	});
});

router.get("/auction_pay", function(req, res, next) {
	res.render("exchange/auction_pay", { 
		title: "物品拍卖-缴纳保证金",
		headerIndex: 2
	});
});

router.get("/recovery", function(req, res, next) {
	res.render("exchange/recovery", { 
		title: "金银回收列表",
		headerIndex: 2
	});
});

router.get("/recovery_detail", function(req, res, next) {
	res.render("exchange/recovery_detail", { 
		title: "金银回收详情",
		headerIndex: 2
	});
});

router.get("/recovery_check", function(req, res, next) {
	res.render("exchange/recovery_check", { 
		title: "金银回收-核对信息",
		headerIndex: 2
	});
});

router.get("/recovery_success", function(req, res, next) {
	res.render("exchange/recovery_success", { 
		title: "金银回收-订单发起成功",
		headerIndex: 2
	});
});

router.get("/buy", function(req, res, next) {
	res.render("exchange/buy", { 
		title: "清单",
		headerIndex: 2
	});
});

router.get("/buy_success", function(req, res, next) {
	res.render("exchange/buy_success", { 
		title: "订单发起成功",
		headerIndex: 2
	});
});

router.get("/pay", function(req, res, next) {
	res.render("exchange/pay", { 
		title: "支付",
		headerIndex: 2
	});
});

router.get("/pay_success", function(req, res, next) {
	res.render("exchange/pay_success", { 
		title: "支付成功",
		headerIndex: 2
	});
});

router.get("/cart", function(req, res, next) {
	res.render("exchange/cart", { 
		title: "我的购物车",
		headerIndex: 2,
    userHeaderIndex: 0
	});
});

router.get("/Jewellery_doyen", function(req, res, next) {
	res.render("exchange/Jewellery_doyen", { 
		title: "珠宝达人",
		headerIndex: 2
	});
});


router.get("/doyen", function(req, res, next) {
	res.render("exchange/doyen", { 
		title: "珠宝达人",
		headerIndex: 2
	});
});

/*router.get("/list", function(req, res, next) {
	res.render("exchange/list", { 
		title: "互换坊",
		headerIndex: 2
	});
});*/
/*
	详情页面放大镜插件地址：http://www.bcty365.com/content-99-561-1.html
	图片评论放大插件地址：http://www.lanrenzhijia.com/famous/5098.html
*/
/*router.get("/detail", function(req, res, next) {
	res.render("exchange/detail", { 
		title: "互换坊详情",
		headerIndex: 2
	});
});

router.get("/goods_sell", function(req, res, next) {
	res.render("exchange/goods_sell", { 
		title: "物品销售列表",
		headerIndex: 2
	});
});

router.get("/goods_sell_detail", function(req, res, next) {
	res.render("exchange/goods_sell_detail", { 
		title: "物品销售详情",
		headerIndex: 2
	});
});

router.get("/auction_list", function(req, res, next) {
	res.render("exchange/auction_list", { 
		title: "物品拍卖",
		headerIndex: 2
	});
});

router.get("/auction_detail", function(req, res, next) {
	res.render("exchange/auction_detail", { 
		title: "物品拍卖详情",
		headerIndex: 2
	});
});

router.get("/bond", function(req, res, next) {
	res.render("exchange/bond", { 
		title: "保证金页",
		headerIndex: 2
	});
});

router.get("/recovery_list", function(req, res, next) {
	res.render("exchange/recovery_list", { 
		title: "回收列表",
		headerIndex: 2
	});
});

router.get("/recovery_detail", function(req, res, next) {
	res.render("exchange/recovery_detail", { 
		title: "回收列表详情",
		headerIndex: 2
	});
});

router.get("/exchange_list", function(req, res, next) {
	res.render("exchange/exchange_list", { 
		title: "换物清单页",
		headerIndex: 2
	});
});

router.get("/exchange_list2", function(req, res, next) {
	res.render("exchange/exchange_list2", { 
		title: "换物清单页",
		headerIndex: 2
	});
});

router.get("/settlement", function(req, res, next) {
	res.render("exchange/settlement", { 
		title: "结算页",
		headerIndex: 2
	});
});

router.get("/cashier_desk", function(req, res, next) {
	res.render("exchange/cashier_desk", { 
		title: "收银台",
		headerIndex: 2
	});
});

router.get("/pay_success", function(req, res, next) {
	res.render("exchange/pay_success", { 
		title: "支付成功",
		headerIndex: 2
	});
});

router.get("/recovery_msg", function(req, res, next) {
	res.render("exchange/recovery_msg", { 
		title: "回收信息",
		headerIndex: 2
	});
});

router.get("/recovery_order", function(req, res, next) {
	res.render("exchange/recovery_order", { 
		title: "回收订单",
		headerIndex: 2
	});
});*/

module.exports = router;







