import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/goods/page',
    method: 'get',
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/designmanu/merchant/case/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: `/admin/goods/detail/${id}`,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/goods/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/goods/saveOrUpdate',
    method: 'post',
    data
  })
}

export function setPrice(caseId, price) {
  return request({
    url: `/admin/designmanu/merchant/case/fixedPrice/${caseId}/${price}`,
    method: 'post'
  })
}

export function onOrOff(caseId, flag) {
  return request({
    url: `/admin/goods/isOnSale/${caseId}/${flag}`,
    method: 'post'
  })
}

export function auditReson(id) {
  return request({
    url: `/admin/designmanu/case/auditReson/${id}`,
    method: 'post'
  })
}

// 去哪儿买商品审核不通过原因
export function auditResonJewelry(id) {
  return request({
    url: `/admin/goods/getCheckDesc/${id}`,
    method: 'post'
  })
}

export function updateSortNum(caseId, sortNum) {
  return request({
    url: `/admin/designmanu/merchant/case/updateSortNum/${caseId}/${sortNum}`,
    method: 'post'
  })
}

export function checkDesigner() {
  return request({
    url: `/admin/designmanu/merchant/checkDesigner`,
    method: 'get'
  })
}

export function getBrand() {
  return request({
    url: `/admin/goodsBrand/selectMerchantBrand`,
    method: 'get'
  })
}
// 团购列表
export function getGroupPage(params) {
  return request({
    url: `/admin/groupActivity/getGroupActivityData`,
    method: 'get',
    params
  })
}
// 下架团购商品
export function obtainGroup(id) {
  return request({
    url: `/admin/groupActivity/obtain/${id}`,
    method: 'post'
  })
}
// 团购获取商品
export function groupGetGoods(params) {
  return request({
    url: `/admin/activityGoods/getGoods`,
    method: 'get',
    params
  })
}
// 团购商品详情
export function groupDetail(params) {
  return request({
    url: `/admin/activityGoods/detail`,
    method: 'get',
    params
  })
}
// 添加编辑团购商品
export function saveGroup(data) {
  return request({
    url: `/admin/activityGoods/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 促销列表
export function getPromotionPage(params) {
  return request({
    url: `/admin/activityGoods/getPromotionActivityData`,
    method: 'get',
    params
  })
}
