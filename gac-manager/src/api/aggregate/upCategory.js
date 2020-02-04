import request from '@/utils/request'

export function page(id) {
  return request({
    url: `/admin/serv/category/list/${id}`,
    method: 'get'
  })
}

export function getServiceList(id) {
  return request({
    url: `/admin/serv/category/service/list/${id}`,
    method: 'get'
  })
}

export function putService(data) {
  return request({
    url: `/admin/serv/category/service/save`,
    method: 'post',
    data
  })
}

export function getServiceInfo(id) {
  return request({
    url: `/admin/serv/category/service/info/${id}`,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: `/admin/serv/category/save`,
    method: 'post',
    data
  })
}

export function setCategoryStatus(id, status) {
  return request({
    url: `/admin/serv/category/status`,
    method: 'get',
    params: { id, status }
  })
}

export function setServiceStatus(id, status) {
  return request({
    url: `/admin/serv/category/service/status`,
    method: 'get',
    params: { id, status }
  })
}
