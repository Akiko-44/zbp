export default {
  notice: ['/api/portal/platformNotice/searchAll?offset=1&limit=3', 'get'],
  guidePrice: ['/api/portal/GuidedPrice/searchSeven?offset=1&limit=10', 'get'],
  goldRecycle: ['/api/goldRecycle/token', 'get'],
  category: ['/api/homePage/categoryShow', 'get'],
  homeBanner: ['/api/homePage/bannerShow/1', 'get'],
  circleRecommend: ['/api/homePage/recommendation', 'get'],
  homeBackground: ['/api/backgroundImg/getbackgroundImg', 'get'],
  homePage: ['/app/homePage/new', 'get']
}
