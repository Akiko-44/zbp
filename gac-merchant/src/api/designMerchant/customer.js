import request from '@/utils/request'

export function getPurchasedCustomer(params) {
  return request({
    url: '/admin/customer/purchasedCustomer/getData',
    method: 'get',
    params
  })
}

export function getRecommendUser(params) {
  return request({
    url: '/api/userCenter/recommendUserFromMerchant',
    method: 'get',
    params
  })
}
