import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/swap/goods/swap_goods_auction/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/swap/goods/swap_goods_auction/info/${id}`,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/swap/goods/swap_goods_auction/del/${id}`,
    method: 'get'
  })
}

export function audit(id, goodsStatus) {
  return request({
    url: '/admin/swap/goods/swap_goods_auction/review',
    method: 'post',
    data: { id, goodsStatus }
  })
}

export function putObj(data) {
  return request({
    url: '/admin/swap/goods/swap_goods_auction/save',
    method: 'post',
    data
  })
}

export function getUsers(params) {
  return request({
    url: '/admin/swap/goods/swap_goods_auction/auction_user_list',
    method: 'get',
    params
  })
}

export function getAuctionList(params) {
  return request({
    url: '/admin/swap/goods/swap_goods_auction/auction_list',
    method: 'get',
    params
  })
}

