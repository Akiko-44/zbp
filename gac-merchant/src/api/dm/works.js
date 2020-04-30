import request from '@/utils/request'

export function audit(data) {
  return request({
    url: `/admin/designmanu/case/audit`,
    method: 'post',
    data
  })
}

export function page(data, params) {
  return request({
    url: '/admin/designmanu/case/page',
    method: 'post',
    data,
    params
  })
}

export function getObj(id) {
  return request({
    url: `/admin/designmanu/merchant/case/info/${id}`,
    method: 'get'
  })
}

export function jewelryPage(params) {
  return request({
    url: '/admin/goods/page',
    method: 'get',
    params
  })
}

export function jewelryAudit(params) {
  return request({
    url: `/admin/goods/isCheck`,
    method: 'post',
    params
  })
}

export function getJewelryDetail(id) {
  return request({
    url: `/admin/goods/detail/${id}`,
    method: 'get'
  })
}

export function getJewelryComment(id, params) {
  return request({
    url: `/api/userCenter/userComment/page/${id}/1`,
    method: 'get',
    params
  })
}

export function delJewelryComment(id) {
  return request({
    url: `/api/userCenter/userComment/delete/${id}`,
    method: 'post',
  })
}

export function getJewelryCommentDetail(id) {
  return request({
    url: `/api/userCenter/userComment/detail/${id}`,
    method: 'get',
  })
}

// flag 标志：0、设计室；1、制造间
export function category(data) {
  return request({
    url: `/admin/designmanu/merchant/cateCategory/list`,
    method: 'post',
    data
  })
}
