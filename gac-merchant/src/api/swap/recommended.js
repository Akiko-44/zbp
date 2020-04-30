import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/swap/goods/swap_recommend/list',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/admin/swap/goods/swap_recommend/del/${id}`,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/swap/goods/swap_recommend/update',
    method: 'post',
    data
  })
}

export function saveObj(data) {
  return request({
    url: '/admin/swap/goods/swap_recommend/save',
    method: 'post',
    data
  })
}
