export default {
  getSecondCategoryList: ['/admin/category/getSecondCategoryList', 'get'],
  checkUser: ['/api/userCenter/merchantInfo/checkUser', 'get'],
  merchantInfo: ['/api/userCenter/merchantInfo/info', 'get'],
  merchantInfoUpdate: ['/api/userCenter/merchantInfo/saveOrUpdate', 'post'],

  //知识产权保护
  intellectualSaveOrUpdate: ['/api/intellectual/saveOrUpdate', 'post'],
  intellectualList: ['/api/intellectual/page', 'get'],
  intellectualDetail: ['/api/intellectual/detail', 'get'],
  intellectualDelete: ['/api/intellectual/delete', 'post'],

  // 商家开店简单注册
  openShop: ['/api/userCenter/merchantInfo/simpleSave', 'post'],
  // 商家开店简单注册，设计师选择分类
  designmanuCategoryList: ['/admin/designmanu/category/list', 'post'],
  // 营销-链接点击
  attractSMSLink: ['/admin/AttractSMS/clickLink', 'post'],
  // 营销-点击开店
  attractSMSSetShop: ['/admin/AttractSMS/clickSetShop', 'post']
}
