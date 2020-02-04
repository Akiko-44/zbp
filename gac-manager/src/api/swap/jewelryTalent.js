import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/jewelry_talent/userList',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/jewelry_talent/info/${id}`,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/jewelry_talent/saveOrUpdate',
    method: 'post',
    data
  })
}

export function audit(data) {
  return request({
    url: '/admin/merchant_auth/audit',
    method: 'post',
    data
  })
}
