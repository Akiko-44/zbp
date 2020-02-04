import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/serv/provider/list',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/serv/provider/info/${id}`,
    method: 'get'
  })
}

export function audit(params) {
  return request({
    url: `/admin/serv/provider/check`,
    method: 'get',
    params
  })
}

