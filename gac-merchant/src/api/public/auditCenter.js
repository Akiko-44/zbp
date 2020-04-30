import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/api/userCenter/auth/authList',
    method: 'get',
    params
  })
}

export function audit(data) {
  return request({
    url: '/api/userCenter/auth/audit',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: '/api/userCenter/auth/detail/' + id,
    method: 'get'
  })
}

