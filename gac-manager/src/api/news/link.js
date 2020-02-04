import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/industry/friendship/link/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/industry/friendship/link/detail/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/industry/friendship/link/delete/' + id,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/industry/friendship/link/save',
    method: 'post',
    data
  })
}
