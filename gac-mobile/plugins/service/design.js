export default {
  designerPage: ['/api/designmanu/designroom/designerPage', 'post'],
  designerInfo: ['/api/designmanu/designroom/designInfo', 'get'],
  designerBanner: ['/app/designmanu/designroom/banner', 'get'],
  designerIndex: ['/api/designmanu/designroom/indexPage', 'get'],
  designerProduct: ['/api/designmanu/designroom/designCasePage', 'post'],
  designerCategories: ['/api/designmanu/designroom/categoryList/0', 'get'],
  // 设计师改版相关接口
  designerOpus: ['/api/designmanu/designer/getFilter', 'get'],
  designerOpusInfo: ['/api/designmanu/designer/designWorkInfo', 'get'],
  designerCustomInfo: ['/api/designmanu/designer/customGoodsInfo', 'get'],
  designerDetail: ['/api/designmanu/designer/designerInfo', 'get']
}
