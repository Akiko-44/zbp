import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/extend/liveInfo/pageForAdmin',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/admin/extend/liveInfo/delete/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/admin/extend/liveInfo/detail/${id}`,
    method: 'get'
  })
}

export function audit(params) {
  return request({
    url: `/admin/extend/liveInfo/isCheck`,
    method: 'get',
    params
  })
}
