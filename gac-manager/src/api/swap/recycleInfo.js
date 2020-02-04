import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/swap/goods/swap_recycle/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/swap/goods/swap_recycle/info/${id}`,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/swap/goods/swap_recycle/del/${id}`,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/swap/goods/swap_recycle/save',
    method: 'post',
    data
  })
}

export function audit(id, status) {
  return request({
    url: '/admin/swap/goods/swap_recycle/review',
    method: 'post',
    data: { id, status }
  })
}
