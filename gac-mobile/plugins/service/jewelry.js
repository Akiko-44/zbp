export default {
  jewelryCategories: ['/api/homePage/categoryShow', 'get'],
  jewelryCategoriesSecondHot: ['/app/homePage/secondCategory', 'get'],
  jewelryCategoriesSecond: ['/api/portal/user/search/secondSearch', 'get'],
  jewelryShowBrand: ['/api/homePage/showBrand/1', 'get'],
  /*jewelryList: ['/api/marketPage/goodsShow', 'get'],*/
  jewelryMerchant: ['/app/search//jewelryMerchant', 'get'],
  jewelryInfo: ['/api/marketPage/goodsDetailShow', 'get'],
  jewelryComment: ['/api/marketPage/goodsCommentPageShow', 'get'],
  jewelryPage: ['/api/merchantShow/searchMerchant', 'get'],
  jewelerInfo: ['/api/merchantShow/merchantStore', 'get'],
  jewelerGoods: ['/api/merchantShow/merchantGoods', 'get'],
  jewelryProductList: ['/app/search/jewelryGoods', 'get'],
  groupGoods: ['/app/homePage/groupGoods', 'get'],
  promotionGoods: ['/app/homePage/promotionGoods', 'get'],
  account: ['/api/userCenter/account', 'get'],
  whereBuy: ['/app/homePage/whereBuy', 'get'],
  getUserInfoForWeChat: ['/api/wechat/getUserInfo', 'get'],

  getStyleList: ['/api/homePage/getStyle', 'get'],
  jewelerBrandList: ['/api/homePage/showBrand/1', 'get'],
  // 检验用户是否关注店铺
  checkShopConcern: ['/api/userCenter/collect/check/0/1', 'post'],
  // 用户关注店铺
  ShopConcern: ['/api/shopConcern/concern', 'get'],
  // 用户取消关注店铺
  removeShopConcern: ['/api/shopConcern/remove', 'get'],

  //商品列表筛选项
  getGoodsFilter: ['/app/search/getFilter', 'get'],
  //商品列表筛选结果
  getGoodsResultFilter: ['/app/search/jewelryGoodsNew', 'get'],
  //商家列表筛选项
  getMerchantFilter: ['/app/search/getMerchantFilter', 'get'],

}
