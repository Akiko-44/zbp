import request from '@/utils/request'

// 诚信企业
export function honestPage(params) {
  return request({
    url: '/api/portal/honestEnterprises/searchAllByHonestDegeree',
    method: 'get',
    params
  })
}
export function deleteHonest(params) {
  return request({
    url: '/admin/portal/honestEnterprises/delete',
    method: 'post',
    params
  })
}
export function classify(params) {
  return request({
    url: '/api/portal/honestEnterprises/searchAllByClassify',
    method: 'get',
    params
  })
}
export function searchEnterprise(params) {
  return request({
    url: '/admin/portal/honestEnterprises/searchAllByName',
    method: 'get',
    params
  })
}
export function searchHonest(params) {
  return request({
    url: '/admin/portal/honestEnterprises/searchAllEnterprisesByName',
    method: 'get',
    params
  })
}
export function enterpriseList(params) {
  return request({
    url: '/admin/portal/honestEnterprises/searchAllEnterprises',
    method: 'get',
    params
  })
}
export function getHonest(params) {
  return request({
    url: '/admin/portal/honestEnterprises/searchEnterpriseById',
    method: 'get',
    params
  })
}
export function updateHonest(data) {
  return request({
    url: '/admin/portal/honestEnterprises/update',
    method: 'post',
    data
  })
}
export function addHonest(data) {
  return request({
    url: '/admin/portal/honestEnterprises/save',
    method: 'post',
    data
  })
}

// 投诉处理
export function myComplaint(params) {
  return request({
    url: '/api/portal/fightingFalse/searchMyComplaint',
    method: 'get',
    params
  })
}
export function complaintList(params) {
  return request({
    url: '/admin/portal/fightingFalse/searchAll',
    method: 'get',
    params
  })
}
export function searchComplaint(params) {
  return request({
    url: '/admin/portal/fightingFalse/searchAllByCondition',
    method: 'get',
    params
  })
}
export function handleComplaint(data) {
  return request({
    url: '/admin/portal/fightingFalse/complaintDeal',
    method: 'post',
    data
  })
}
export function complaintDetail(params) {
  return request({
    url: '/admin/portal/fightingFalse/complaintDealRightNow',
    method: 'get',
    params
  })
}

// 今日指导价
export function updateGuidedPrice(data) {
  return request({
    url: '/admin/portal/todayGuidedPrice/update',
    method: 'post',
    data
  })
}
export function deleteGuidedPrice(id) {
  return request({
    url: `/admin/portal/todayGuidedPrice/delete/${id}`,
    method: 'post'
  })
}
export function addGuidedPrice(data) {
  return request({
    url: '/admin/portal/todayGuidedPrice/save',
    method: 'post',
    data
  })
}
export function guidedPriceList(params) {
  return request({
    url: '/admin/portal/todayGuidedPrice/searchAll',
    method: 'get',
    params
  })
}
export function searchGuidedPriceList(params) {
  return request({
    url: '/admin/portal/todayGuidedPrice/search',
    method: 'get',
    params
  })
}
export function getGuidance(params) {
  return request({
    url: '/admin/portal/todayGuidedPrice/searchOneBysortNum',
    method: 'get',
    params
  })
}

// 平台公告
export function noticeList(params) {
  return request({
    url: '/admin/portal/platformNotice/searchAll',
    method: 'get',
    params
  })
}
export function searchNotice(params) {
  return request({
    url: '/admin/portal/platformNotice//searchAllByCondition',
    method: 'get',
    params
  })
}
export function getNotice(params) {
  return request({
    url: '/api/portal/platformNotice/searchById',
    method: 'get',
    params
  })
}
export function addNotice(data) {
  return request({
    url: '/admin/portal/platformNotice/save',
    method: 'post',
    data
  })
}
export function updateNotice(data) {
  return request({
    url: '/admin/portal/platformNotice/update',
    method: 'post',
    data
  })
}
export function deleteNotice(params) {
  return request({
    url: '/admin/portal/platformNotice/delete',
    method: 'post',
    params
  })
}

// 获取分类
export function getCategory(params) {
  return request({
    url: '/admin/goodsCategory/page',
    method: 'get',
    params
  })
}

// 测试用户和商家(type: 1.测试会员 2.测试商户)
export function getTestUser(type, params) {
  return request({
    url: `/admin/user/testUser/getTestUser/${type}`,
    method: 'get',
    params
  })
}
export function getMerchantByUserId(userId) {
  return request({
    url: `/admin/merchant/getMerchantByUserId/${userId}`,
    method: 'get'
  })
}
export function getMerchantByMobilePhone(mobilePhone) {
  return request({
    url: `/admin/merchant/getMerchantByMobilePhone/${mobilePhone}`,
    method: 'get'
  })
}
export function getUserById(id) {
  return request({
    url: `/admin/user/testUser/getUserById/${id}`,
    method: 'get'
  })
}
export function getUserByMobilePhone(mobilePhone) {
  return request({
    url: `/admin/user/testUser/getUserByMobilePhone/${mobilePhone}`,
    method: 'get'
  })
}
export function addTestUser(type, data) {
  return request({
    url: `/admin/user/testUser/add/${type}`,
    method: 'post',
    data
  })
}
export function delTestUser(type, userId) {
  return request({
    url: `/admin/user/testUser/delete/${type}/${userId}`,
    method: 'post'
  })
}

// SKU管理
export function skuPage(params) {
  return request({
    url: '/admin/specs/page',
    method: 'get',
    params
  })
}
export function saveSkuAttr(data) {
  return request({
    url: `/admin/specs/saveOrUpdate`,
    method: 'post',
    data
  })
}
export function delSkuAttr(id) {
  return request({
    url: `/admin/specs/delete/${id}`,
    method: 'post'
  })
}
export function skuAttrPage(id, params) {
  return request({
    url: `/admin/specsAttrs/page/${id}`,
    method: 'get',
    params
  })
}

export function saveSpecsAttrs(data) {
  return request({
    url: `/admin/specsAttrs/saveOrUpdate`,
    method: 'post',
    data
  })
}
export function delSpecsAttrs(id) {
  return request({
    url: `/admin/specsAttrs/delete/${id}`,
    method: 'post'
  })
}

// 类目属性
export function categoryAttributesPage(params) {
  return request({
    url: `/admin/categoryAttributes/categoryAttributesPage`,
    method: 'get',
    params
  })
}
export function categoryAttrSaveOrUpdate(data) {
  return request({
    url: '/admin/categoryAttributes/saveOrUpdate',
    method: 'post',
    data
  })
}
export function delcategoryAttributes(id) {
  return request({
    url: `/admin/categoryAttributes/delete/${id}`,
    method: 'post'
  })
}
// 类目附属属性
export function selectSubsidiaryById(params) {
  return request({
    url: '/admin/categoryAttributes//selectSubsidiaryById',
    method: 'get',
    params
  })
}
export function subsidiarySaveOrUpdate(data) {
  return request({
    url: '/admin/categoryAttributes/subsidiarySaveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteBySubsidiaryAttributesId(id) {
  return request({
    url: `/admin/categoryAttributes/deleteBySubsidiaryAttributesId/${id}`,
    method: 'post'
  })
}

// 款式管理
export function stylePage(params) {
  return request({
    url: '/admin/style/page',
    method: 'get',
    params
  })
}
export function styleSaveOrUpdate(data) {
  return request({
    url: '/admin/style/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteStyle(id) {
  return request({
    url: `/admin/style/delete/${id}`,
    method: 'post'
  })
}

// 一级、二级、三级分类查询
export function categoryList(parentId, params) {
  return request({
    url: `/admin/category/getCategoryList/${parentId}`,
    method: 'get',
    params
  })
}
// 一级分类新增或修改
export function saveFirst(data) {
  return request({
    url: '/admin/category/saveOrUpdate/first',
    method: 'post',
    data
  })
}
// 一级分类删除
export function delFirst(id) {
  return request({
    url: `/admin/category/delete/1/${id}`,
    method: 'post'
  })
}
// 二级分类新增或修改
export function saveSecond(data) {
  return request({
    url: '/admin/category/saveOrUpdate/second',
    method: 'post',
    data
  })
}
// 二级分类删除
export function delSecond(id) {
  return request({
    url: `/admin/category/delete/2/${id}`,
    method: 'post'
  })
}
// 关联/解关类目属性
export function CatAttr(data) {
  return request({
    url: `/admin/category/saveSecondCatToCatAttr`,
    method: 'post',
    data
  })
}
// 三级分类新增或修改
export function saveThird(data) {
  return request({
    url: '/admin/category/saveOrUpdate/third',
    method: 'post',
    data
  })
}
// 三级分类删除
export function delThird(id) {
  return request({
    url: `/admin/category/delete/3/${id}`,
    method: 'post'
  })
}

// 企业名录
export function getCompanyDirectory(params) {
  return request({
    url: `/admin/portal/companyDirectory/getPage`,
    method: 'get',
    params
  })
}
// 新增修改企业名录
export function saveCompanyDirectory(data) {
  return request({
    url: `/admin/portal/companyDirectory/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 删除企业名录
export function deleteCompanyDirectory(id) {
  return request({
    url: `/admin/portal/companyDirectory/delete/${id}`,
    method: 'post'
  })
}
// 企业名录选择企业
export function getCompaniesByName(params) {
  return request({
    url: `/admin/portal/companyDirectory/getCompaniesByName`,
    method: 'get',
    params
  })
}

// 获取省市区
export function getRegion(id) {
  return request({
    url: `/admin/region/list/${id}`,
    method: 'get'
  })
}

// 获取所有的二级分类
export function getSecondCategoryList() {
  return request({
    url: `/admin/category/getSecondCategoryList`,
    method: 'get'
  })
}

// 参数设置
export function getParamSettings() {
  return request({
    url: `/admin/paramSettings/merchantParam/query`,
    method: 'get'
  })
}
export function saveParamSettings(data) {
  return request({
    url: `/admin/paramSettings/merchantParam/update`,
    method: 'post',
    data
  })
}

// 操作日志
export function getOperationLog(params) {
  return request({
    url: `/admin/operationLog/page`,
    method: 'get',
    params
  })
}

// 区块链获取回调列表
export function getAllCallback(params) {
  return request({
    url: `/admin/publicChain/getAllCallback`,
    method: 'get',
    params
  })
}

// 活动主题背景列表
export function getAllBackground(params) {
  return request({
    url: `/admin/backgroundImg/page`,
    method: 'get',
    params
  })
}
// 活动主题背景详情
export function getBackgroundDetail(params) {
  return request({
    url: `/admin/backgroundImg/detail`,
    method: 'get',
    params
  })
}
// 新增编辑活动主题背景
export function addBackground(data) {
  return request({
    url: `/admin/backgroundImg/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 删除活动主题背景
export function deleteBackground(id) {
  return request({
    url: `/admin/backgroundImg/delete/${id}`,
    method: 'post'
  })
}
// 背景图修改展示状态
export function changeBackgroundShow(id, status) {
  return request({
    url: `/admin/backgroundImg/change/show/${id}/${status}`,
    method: 'post'
  })
}

// 首页推荐列表
export function getRecommendation(params) {
  return request({
    url: `/admin/jewelryContent/getRecommendation`,
    method: 'get',
    params
  })
}

// 添加首页推荐
export function addRecommendation(id) {
  return request({
    url: `/admin/jewelryContent/recommendation/${id}`,
    method: 'post'
  })
}

// 删除首页推荐
export function deleteRecommendation(id) {
  return request({
    url: `/admin/jewelryContent/deleteRecommendation/${id}`,
    method: 'post'
  })
}

// 专区设置列表
export function getZoneList() {
  return request({
    url: `/admin/zone/getList`,
    method: 'get'
  })
}

// 修改专区设置
export function modifyZone(data) {
  return request({
    url: `/admin/zone/saveOrUpdate`,
    method: 'post',
    data
  })
}

// 专区设置详情
export function getZoneDetail(id) {
  return request({
    url: `/admin/zone/getZoneDetail/${id}`,
    method: 'get'
  })
}

// 专区绑定详情
export function getZoneBindGoods(zoneId, params) {
  return request({
    url: `/admin/zone/getBindGoodsPage/${zoneId}`,
    method: 'get',
    params
  })
}

// 首页模块列表
export function getHomeModuleList(params) {
  return request({
    url: `/admin/homeModule/list`,
    method: 'get',
    params
  })
}

// 新增首页模块内容
export function modifyHomeModule(data) {
  return request({
    url: `/admin/homeModule/saveById`,
    method: 'post',
    data
  })
}

// 首页模块详情
export function getHomeModule(params) {
  return request({
    url: `/admin/homeModule/detail`,
    method: 'get',
    params
  })
}

// 首页商家关联商品保存
export function saveHomeModuleMerchant(data) {
  return request({
    url: `/admin/homeModule/merchant/goods/save`,
    method: 'post',
    data
  })
}

// 首页获取商家关联商品
export function getHomeModuleMerchant(params) {
  return request({
    url: `/admin/homeModule/merchant/goods/list`,
    method: 'get',
    params
  })
}

// 获取广告列表
export function getAdvertisement() {
  return request({
    url: `/admin/advertise/getList`,
    method: 'get'
  })
}

// 修改广告设置
export function modifyAdvertisement(data) {
  return request({
    url: `/admin/advertise/saveOrUpdate`,
    method: 'post',
    data
  })
}

// 清空广告设置
export function delAdvertisement(id) {
  return request({
    url: `/admin/advertise/clear/${id}`,
    method: 'post'
  })
}

// APP应用图标，列表
export function application(params) {
  return request({
    url: `/admin/application/getPage`,
    method: 'get',
    params
  })
}

// APP应用图标，选中设置
export function setShowApplication(data) {
  return request({
    url: `/admin/application/setShow`,
    method: 'post',
    data
  })
}

// APP开屏页设置，列表
export function openingPage(params) {
  return request({
    url: `/admin/openingPage/getPage`,
    method: 'get',
    params
  })
}

// APP开屏页设置，详情
export function openingPageDetail(params) {
  return request({
    url: `/admin/openingPage/detail`,
    method: 'get',
    params
  })
}
// APP开屏页设置，新增编辑
export function saveOrUpdateOpeningPage(data) {
  return request({
    url: `/admin/openingPage/saveOrUpdate`,
    method: 'post',
    data
  })
}
// APP开屏页设置，删除
export function deleteOpeningPage(id) {
  return request({
    url: `/admin/openingPage/delete/${id}`,
    method: 'post'
  })
}

// 活动主题，列表
export function activityTheme(params) {
  return request({
    url: `/admin/activityTheme/getPage`,
    method: 'get',
    params
  })
}

// 活动主题，详情
export function activityThemeDetail(params) {
  return request({
    url: `/admin/activityTheme/detail`,
    method: 'get',
    params
  })
}

// 活动主题，获取抽奖下拉框
export function activityThemeDrawList(params) {
  return request({
    url: `/admin/draw/list`,
    method: 'get',
    params
  })
}

// 活动主题，新增编辑
export function saveOrUpdateActivityTheme(data) {
  return request({
    url: `/admin/activityTheme/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 活动主题，关联商品列表
export function activityThemeGetGoodsPage(params) {
  return request({
    url: `/admin/activityTheme/getGoodsPage`,
    method: 'get',
    params
  })
}
// 活动主题，关联解绑商品
export function activityThemeSetRelationGoods(data) {
  return request({
    url: `/admin/activityTheme/setRelation`,
    method: 'post',
    data
  })
}
// 活动主题，删除
export function deleteActivityThemeSetRelationGoods(id) {
  return request({
    url: `/admin/activityTheme/delete/${id}`,
    method: 'post'
  })
}
