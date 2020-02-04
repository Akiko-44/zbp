import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/gallery/atlas/commentList',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/gallery/atlas/detail/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/gallery/atlas/delcomment/' + id,
    method: 'post'
  })
}

export function getRegular() {
  return request({
    url: '/admin/industry/comment/regular/detail',
    method: 'get'
  })
}

export function setRegular(data) {
  return request({
    url: '/admin/industry/comment/regular/save',
    method: 'post',
    data
  })
}

