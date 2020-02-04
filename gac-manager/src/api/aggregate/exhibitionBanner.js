import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/extend/ad/listAd',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/admin/extend/ad/delete/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/admin/extend/ad/detail/${id}`,
    method: 'get'
  })
}

export function updateShowStatus(data) {
  return request({
    url: `/admin/extend/ad/updateShowStatus`,
    method: 'post',
    data
  })
}

export function putObj(data) {
  return request({
    url: `/admin/extend/ad/addAd`,
    method: 'post',
    data
  })
}
