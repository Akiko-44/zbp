export default {
  // 制造间首页
  makerHome: ['/api/designmanu/menufact/indexApp', 'get'],
  // 制造商列表
  makerList: ['/api/designmanu/menufact/manufactAppPage', 'post'],
  // 制造商分类
  makerCategoryList: ['/api/designmanu/menufact/designcategory/list', 'post'],
  //商品分类  0、设计室；1、制造间  2、工艺品  3、互换坊
  productCategoryList: ['/api/designmanu/designroom/categoryList/', 'get'],
  // 工艺列表
  makerCraftList: ['/api/designmanu/menufact/craftPCPage', 'post'],
  makerPage: ['/api/designmanu/menufact/manufactPage', 'post'],
  makerInfo: ['/api/designmanu/menufact/manufact/info', 'get'],
  makerBanner: ['/app/designmanu/menufact/banner', 'get'],
  makerCoupons: ['/api/userCenter/addCoupons', 'post'],
  makerArt: ['/api/designmanu/menufact/craft/info', 'get']
}
