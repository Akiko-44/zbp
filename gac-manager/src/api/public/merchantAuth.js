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

// 会员列表账号冻结解冻
export function isFreezed(uid, status, data) {
  return request({
    url: `/api/userCenter/isFreezed/${uid}/${status}`,
    method: 'post',
    data
  })
}
