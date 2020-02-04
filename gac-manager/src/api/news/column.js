import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/industry/column/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/industry/column/detail/' + id,
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/industry/column/save',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: '/admin/industry/column/delete/' + id,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/industry/column/save',
    method: 'post',
    data
  })
}
