import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/partner/extend/exhibition/list',
    method: 'get',
    params
  })
}

export function delObj(id) {
  return request({
    url: `/admin/partner/extend/exhibition/delete/${id}`,
    method: 'post'
  })
}

export function getObj(id) {
  return request({
    url: `/admin/partner/extend/exhibition/detail/${id}`,
    method: 'get'
  })
}

export function putObj(data) {
  return request({
    url: `/admin/partner/extend/exhibition/saveOrUpdateInfo`,
    method: 'post',
    data
  })
}

export function addPic(data) {
  return request({
    url: `/admin/partner/extend/exhibition/addMerPic`,
    method: 'post',
    data
  })
}

export function getDetailMerPic(id) {
  return request({
    url: `/admin/partner/extend/exhibition/detailMerPic/${id}`,
    method: 'get'
  })
}

export function delDetailMerPic(id) {
  return request({
    url: `/admin/partner/extend/exhibition/deleteMerPic/${id}`,
    method: 'post'
  })
}

