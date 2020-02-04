export default {
  swapIndexRecommend: ['/api/swap/portal/goods/swap_recommend/app', 'get'],
  swapGoodsList: ['/api/swap/portal/goods/sale_goods/list', 'get'],
  swapGoodsDetail: ['/api/swap/portal/goods/sale_goods/info', 'get'],
  swapGoodsDesc: ['/api/swap/portal/common/goods_desc', 'get'],
  swapCategories: ['/api/swap/user/common/categorys', 'get'],
  swapBrands: ['/api/swap/user/common/brands', 'get'],
  swapAuctionList: ['/api/swap/portal/goods/swap_goods_auction/list', 'get'],
  swapGoodsAuctionList: ['/api/swap/portal/goods/swap_goods_auction/auction_list', 'get'],
  swapRecycleList: ['/api/swap/portal/goods/swap_recycle/list', 'get'],
  swapHotList: ['/api/swap/portal/goods/sale_goods/hot_list', 'get'],
  swapAtlasPage: ['/app/gallery/subject/page', 'get'],
  swapCollect: [`/api/swap/user/goods/sale_goods/save`, 'post'],
  swapSaleGoodsSave: ['/api/swap/user/goods/sale_goods/save', 'post'],
  swapSaleGoodsDraft: ['/api/swap/user/goods/sale_goods/draft', 'post'],
  swapAuctionDetail: ['/api/swap/portal/goods/swap_goods_auction/info', 'get'],
  swapAuctionOffer: ['/api/swap/portal/goods/swap_goods_auction/offer', 'post'],
  swapAuctionJoinCheck: [
    '/api/swap/portal/goods/swap_goods_auction/join_check',
    'get'
  ],
  swapAuctionJoin: [
    '/api/swap/portal/goods/swap_goods_auction/join_auction',
    'get'
  ],
  swapRecycleDetail: ['/api/swap/portal/goods/swap_recycle/info', 'get'],
  swapUserSaleDetail: [`/api/swap/user/goods/sale_goods/info`, 'get'],
  swapUserAuctionDetail: ['/api/swap/user/goods/auction_goods/info', 'get'],
  swapUserRecycleDetail: ['/api/swap/user/goods/recycle/info', 'get'],
  swapUserSalesList: ['/api/swap/user/goods/sale_goods/list', 'get'],
  swapUserAuctionList: ['/api/swap/user/goods/auction_goods/list', 'get'],
  swapUserRecycleList: ['/api/swap/user/goods/recycle/list', 'get'],
  swapUserSalesDelete: ['/api/swap/user/goods/sale_goods/del', 'get'],
  swapReleaseSaleGoods: ['/api/swap/user/goods/sale_goods/save', 'post'],
  swapReleaseAuctionGoods: ['/api/swap/user/goods/auction_goods/save', 'post'],
  swapReleaseRecycleGoods: ['/api/swap/user/goods/recycle/save', 'post'],
  swapUserGoodsList: [
    '/api/swap/portal/goods/swap_recycle/user_goods_list',
    'get'
  ],
  swapSaleGoodsOffSell: ['/api/swap/user/goods/sale_goods/off_sell', 'get'],
  swapSaleList: ['/api/swap/user/goods/sale_goods/list', 'get'],
  addrList: ['/api/userCenter/addr/page', 'get'],
  orderLaunch: ['/api/order/swap/add', 'post'],
  orderCommentAdd: ['/api/userCenter/userComment/orderCommentAdd', 'post'],
  orderCommentGoodVOList: ['/api/order/info', 'get']
}
