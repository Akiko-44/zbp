require("./template-filter.js");

//行业之声
var newsList = require("../template/newsList.art");
var newsDetail = require("../template/newsDetail.art");
var commentList = require("../template/commentList.art");

//图文馆
var galleryList = require("../template/galleryList.art");
var gallerySubList = require("../template/gallerySubList.art");
var galleryNav = require("../template/galleryNav.art");
var galleryTopic = require("../template/galleryTopic.art");
var galleryDetailAside = require("../template/galleryDetailAside.art");

//互换坊
var exchangeSwapItem = require("../template/exchange/swapItem.art");
var exchangeHotItem = require("../template/exchange/hotItem.art");
var exchangeAuctionItem = require("../template/exchange/auctionItem.art");
var exchangeRecoveryItem = require("../template/exchange/recoveryItem.art");

var exchangeCommentItem = require("../template/exchange/commentItem.art");

var exchangeDetailOther = require("../template/exchange/detailOther.art");
var exchangeRecoveryDetail = require("../template/exchange/recoveryDetail.art");

// 首页
var headerNav = require("../template/headerNav.art");
var headerNavDefault = require("../template/headerNavDefault.art");

//个人中心
var userIndex = require("../template/user/index.art");
var userAddressList = require("../template/user/addressList.art");
var userMessage = require("../template/user/message.art");
var userCollectList1 = require("../template/user/collectList1.art");
var userCommentList1 = require("../template/user/commentList1.art");
var userCommentListGallery = require("../template/user/commentListGallery.art");
var userOrderJewelry = require("../template/user/orderJewelry.art");
var userOrderJewelryDetail = require("../template/user/orderJewelryDetail.art");
var userOrderAuction = require("../template/user/orderAuction.art");
var userOrderComment = require("../template/user/orderComment.art");
var userOrderSwap = require("../template/user/orderSwap.art");
var userOrderSwapOut = require("../template/user/orderSwapOut.art");
var userOrderGallery = require("../template/user/orderGallery.art");
var userOrder = require("../template/user/order.art");

window._template = {
  newsList: newsList,
  newsDetail: newsDetail,
  commentList: commentList,

  galleryList: galleryList,
  gallerySubList: gallerySubList,
  galleryNav: galleryNav,
  galleryTopic: galleryTopic,
  galleryDetailAside: galleryDetailAside,

  exchangeSwapItem: exchangeSwapItem,
  exchangeHotItem: exchangeHotItem,
  exchangeAuctionItem: exchangeAuctionItem,
  exchangeRecoveryItem: exchangeRecoveryItem,

  exchangeCommentItem: exchangeCommentItem,

  exchangeDetailOther: exchangeDetailOther,
  exchangeRecoveryDetail: exchangeRecoveryDetail,

  headerNav: headerNav,
  headerNavDefault: headerNavDefault,

  userIndex: userIndex,
  userAddressList: userAddressList,
  userMessage: userMessage,
  userCollectList1: userCollectList1,
  userCommentList1: userCommentList1,
  userOrderJewelry: userOrderJewelry,
  userOrderJewelryDetail: userOrderJewelryDetail,
  userOrderAuction: userOrderAuction,
  userOrderComment: userOrderComment,
  userOrderSwap: userOrderSwap,
  userOrderSwapOut: userOrderSwapOut,
  userOrderGallery: userOrderGallery,
  userCommentListGallery: userCommentListGallery,

  userOrder: userOrder
}