import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/gallery/subject/page',
    method: 'get',
    params
  })
}

export function getObj(id) {
  return request({
    url: '/admin/gallery/subject/detail/' + id,
    method: 'get'
  })
}

export function addObj(data) {
  return request({
    url: '/admin/gallery/subject/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/gallery/subject/delete/${id}/`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/gallery/subject/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getProps() {
  return request({
    url: '/admin/gallery/subject/prop/list',
    method: 'get'
  })
}

export function audit(id, auditState) {
  return request({
    url: `/admin/gallery/subject/audit/${id}/${auditState}`,
    method: 'post'
  })
}
