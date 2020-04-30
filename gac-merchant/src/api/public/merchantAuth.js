import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/merchant_auth/list',
    method: 'get',
    params
  })
}
export function usersList(params) {
  return request({
    url: '/api/userCenter/usersInfo',
    method: 'get',
    params
  })
}
