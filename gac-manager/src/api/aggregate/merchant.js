import request from '@/utils/request'

export function isExist(merchantId) {
  return request({
    url: '/admin/extend/exhibition/getMerchantInfo',
    method: 'get',
    params: {
      merchantId
    }
  })
}

export function isgoodsExist(goodsId) {
  return request({
    url: '/admin/designmanu/merchant/case/info/' + goodsId,
    method: 'get'
  })
}
