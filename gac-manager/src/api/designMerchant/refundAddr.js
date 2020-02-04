import request from '@/utils/request'

export function page() {
  return request({
    url: '/admin/order/refund/getAddr',
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/order/refund/addAddr',
    method: 'post',
    data
  })
}