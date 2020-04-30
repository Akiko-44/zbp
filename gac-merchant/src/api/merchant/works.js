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
