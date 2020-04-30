import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/designmanu/merchant/case/page',
    method: 'post',
    data,
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
    url: `/admin/designmanu/merchant/case/info/${id}`,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/merchant/case/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/designmanu/merchant/case/saveOrUpdate',
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
    url: `/admin/designmanu/merchant/case/onOrOff/${caseId}/${flag}`,
    method: 'post'
  })
}

export function auditReson(id) {
  return request({
    url: `/admin/designmanu/case/auditReson/${id}`,
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

/* 作品相关接口 */
export function opusList(params) {
  return request({
    url: '/admin/designmanu/displaywoks/infoList',
    method: 'get',
    params
  })
}

export function saveOrUpdateOpus(data) {
  return request({
    url: '/admin/designmanu/displaywoks/saveOrUpdate',
    method: 'post',
    data
  })
}

export function opusDetail(id) {
  return request({
    url: `/admin/designmanu/displaywoks/caseInfo/${id}`,
    method: 'get'
  })
}

export function delOpus(id) {
  return request({
    url: `/admin/designmanu/displaywoks/delete/${id}`,
    method: 'post'
  })
}

/* 作品上下架 */
export function opusOnOrOff(data) {
  return request({
    url: '/admin/designmanu/customgoods/isCheckOnsale',
    method: 'post',
    data
  })
}

/* 定制商品相关 */
export function saveOrUpdateCustom(data) {
  return request({
    url: '/admin/designmanu/customgoods/saveOrUpdate',
    method: 'post',
    data
  })
}

export function customDetail() {
  return request({
    url: `/admin/designmanu/customgoods/info`,
    method: 'get'
  })
}
