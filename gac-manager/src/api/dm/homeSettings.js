import request from '@/utils/request'
// 0 设计室 1 制造间

// banner

export function getBanners(flag) {
  return request({
    url: `/admin/designmanu/banner/getHomeBannerIdList/${flag}`,
    method: 'get'
  })
}

export function saveBanners(flag, data) {
  return request({
    url: `/admin/designmanu/banner/bannerSetting/${flag}`,
    method: 'post',
    data
  })
}

export function getJewelryBanners(params) {
  return request({
    url: `/admin/banner/page`,
    method: 'get',
    params
  })
}

export function saveJewelryBanners(data) {
  return request({
    url: `/admin/banner/saveOrUpdate`,
    method: 'post',
    data
  })
}

export function delJewelryBanners(id) {
  return request({
    url: `/admin/banner/delete/${id}`,
    method: 'post'
  })
}

// 暂停 / 展示 珠宝店banner
export function pauseJewelryBanners(id, status) {
  return request({
    url: `/admin/banner/showStatus/${id}/${status}`,
    method: 'post'
  })
}

// 商品  / 工艺

export function getWorks(flag, caseType) {
  return request({
    url: `/admin/designmanu/case/getHomeCaseIdList/${flag}/${caseType}`,
    method: 'get'
  })
}

export function saveWorks(data, flag, caseType) {
  return request({
    url: `/admin/designmanu/case/excellectCaseSetting/${flag}/${caseType}`,
    method: 'post',
    data
  })
}

export function getDesigners() {
  return request({
    url: `/admin/designmanu/manu/exllentdesignerPage`,
    method: 'get'
  })
}

export function saveDesigners(data) {
  return request({
    url: `/admin/designmanu/manu/designerSetting`,
    method: 'post',
    data
  })
}

export function getManufacturers(flag) {
  return request({
    url: `/admin/designmanu/manu/getHomeManuIdList/${flag}`,
    method: 'get'
  })
}

export function saveManufacturers(data, type) {
  return request({
    url: `/admin/designmanu/manu/excellentManuSetting/${type}`,
    method: 'post',
    data
  })
}

export function getCrafts() {
  return request({
    url: `/admin/designmanu/craft/getHomeCraftIdList`,
    method: 'get'
  })
}

export function saveCrafts(data) {
  return request({
    url: `/admin/designmanu/craft/excellectCraftSetting`,
    method: 'post',
    data
  })
}

export function getJewelryGoods(id) {
  return request({
    url: `/admin/goods/querygoods/${id}`,
    method: 'get'
  })
}

export function getJewelryGoodsList(params) {
  return request({
    url: `/admin/goods/patentGoodsList`,
    method: 'get',
    params
  })
}

export function saveJewelryGoods(data) {
  return request({
    url: `/admin/goods/savePatentGoods`,
    method: 'post',
    data
  })
}

export function delJewelryGoods(id) {
  return request({
    url: `/admin/goods/delPatentGoods/${id}`,
    method: 'get'
  })
}

export function pauseJewelryGoods(id, status) {
  return request({
    url: `/admin/goods/updateStatus/${id}/${status}`,
    method: 'get'
  })
}

export function getJewelryMerchant(id) {
  return request({
    url: `/admin/merchant/queryMer/${id}`,
    method: 'get'
  })
}

export function getJewelryMerchantList(id, params) {
  return request({
    url: `/admin/merchant/merchantTypeList/${id}`,
    method: 'get',
    params
  })
}

export function saveJewelryMerchant(data) {
  return request({
    url: `/admin/merchant/addMerchant`,
    method: 'post',
    data
  })
}

export function delJewelryMerchant(id) {
  return request({
    url: `/admin/merchant/delMerchant/${id}`,
    method: 'get'
  })
}

export function pauseJewelryMerchant(id, status) {
  return request({
    url: `/admin/merchant/updateStatus/${id}/${status}`,
    method: 'get'
  })
}

// 珠宝圈广告位
export function listAdvertising(params) {
  return request({
    url: '/admin/jewelry/advertising/listAdvertising',
    method: 'get',
    params
  })
}

export function getAdvertising(id) {
  return request({
    url: `/admin/jewelry/advertising/getAdvertising/${id}`,
    method: 'get'
  })
}

export function saveOrUpdateAdvertising(data) {
  return request({
    url: '/admin/jewelry/advertising/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delAdvertising(id) {
  return request({
    url: `/admin/jewelry/advertising/deleteAdvertising/${id}`,
    method: 'post'
  })
}

// 暂停 / 展示 珠宝圈广告位
export function useOrStopAdvertising(id, status) {
  return request({
    url: `/admin/jewelry/advertising/useOrStop/${id}/${status}`,
    method: 'post'
  })
}
