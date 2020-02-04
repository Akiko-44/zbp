import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/industry/advertise/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/industry/advertise/detail/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/industry/advertise/delete/' + id,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/industry/advertise/save',
    method: 'post',
    data
  })
}
