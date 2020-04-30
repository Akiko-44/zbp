import request from '@/utils/request'

export function page(data, params, type) {
  return request({
    url: '/api/customs/admin/page/' + type,
    method: 'get',
    data,
    params
  })
}

export function pageAll(params) {
  return request({
    url: '/api/customs/all/page',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: '/api/customs/delete/' + id,
    method: 'get'
  })
}

export function audit(data) {
  return request({
    url: '/api/customs/audit',
    method: 'post',
    data
  })
}