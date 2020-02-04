import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/designmanu/designer/page',
    method: 'post',
    data,
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/designmanu/designer/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getObj(id) {
  return request({
    url: `/admin/designmanu/designer/info/${id}`,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/designer/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/designmanu/designer/saveOrUpdate',
    method: 'post',
    data
  })
}

export function audit(data) {
  return request({
    url: '/admin/designmanu/designer/audit',
    method: 'post',
    data
  })
}

export function edus() {
  return request({
    url: '/admin/designmanu/designer/educationMap',
    method: 'get'
  })
}

export function ageLimit() {
  return request({
    url: '/admin/designmanu/designer/ageLimitMap',
    method: 'get'
  })
}

export function getMerVO(merchantId) {
  return request({
    url: `/admin/designmanu/designer/getMerVO/${merchantId}`,
    method: 'post'
  })
}

export function categoryList(data) {
  return request({
    url: '/admin/designmanu/category/list',
    method: 'post',
    data
  })
}

