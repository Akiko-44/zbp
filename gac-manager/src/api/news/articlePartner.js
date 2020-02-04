import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/partner/industry/article/AdList',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/partner/industry/article/detail/' + id,
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/partner/industry/article/save',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: '/admin/partner/industry/article/delete/' + id,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/partner/industry/article/save',
    method: 'post',
    data
  })
}

export function getProps() {
  return request({
    url: '/admin/partner/industry/article/prop/list',
    method: 'get'
  })
}
