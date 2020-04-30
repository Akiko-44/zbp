import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/swap/goods/sale_goods/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/swap/goods/sale_goods/info/${id}`,
    method: 'get'
  })
}

export function getGoodsDesc(id) {
  return request({
    url: `/admin/swap/common/goods_desc/${id}`,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/swap/goods/sale_goods/del/${id}`,
    method: 'get'
  })
}

export function audit(data) {
  return request({
    url: '/admin/swap/goods/sale_goods/review',
    method: 'post',
    data
  })
}

export function putObj(data) {
  return request({
    url: '/admin/swap/goods/sale_goods/save',
    method: 'post',
    data
  })
}
