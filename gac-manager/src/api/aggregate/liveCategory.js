import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/api/extend/liveCategory/page',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/api/extend/liveCategory/delete/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/api/extend/liveCategory/detail/${id}`,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: `/api/extend/liveCategory/saveOrUpdate`,
    method: 'post',
    data
  })
}

export function updateShowStatus(catId, isShow) {
  return request({
    url: `/api/extend/liveCategory/updateShowStatus/${catId}/${isShow}`,
    method: 'post'
  })
}
