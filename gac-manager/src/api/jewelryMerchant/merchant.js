import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/designmanu/merchant/designer/page',
    method: 'post',
    data,
    params
  })
}

export function addObj(data) {
  return request({
    url: '/admin/designmanu/merchant/designer/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getObj() {
  return request({
    url: `/admin/designmanu/designer/info`,
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/api/userCenter/merchantInfo/info',
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: `/admin/designmanu/designer/delete/${id}`,
    method: 'post'
  })
}

export function putObj(data) {
  return request({
    url: '/admin/designmanu/merchant/designer/saveOrUpdate',
    method: 'post',
    data
  })
}

export function edus() {
  return request({
    url: '/admin/designmanu/designer/educationMap',
    method: 'get'
  })
}

export function ageLimit() {
  return request({
    url: '/admin/designmanu/designer/ageLimitMap',
    method: 'get'
  })
}

export function getMerVO(merchantId) {
  return request({
    url: `/admin/designmanu/designer/getMerVO/${merchantId}`,
    method: 'post'
  })
}

// 品牌故事
export function storyPage(params) {
  return request({
    url: '/admin/merchant/story/page',
    method: 'get',
    params
  })
}

export function storyDetail(id) {
  return request({
    url: `/admin/merchant/story/detail/${id}`,
    method: 'post'
  })
}

export function saveOrUpdateStory(data) {
  return request({
    url: '/admin/merchant/story/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delStory(id) {
  return request({
    url: `/admin/merchant/story/delete/${id}`,
    method: 'post'
  })
}

// 店铺公告
export function shopNoticePage(params) {
  return request({
    url: '/admin/portal/platformNotice//searchAllByCondition',
    method: 'get',
    params
  })
}

export function shopNoticeDetail(params) {
  return request({
    url: '/api/portal/platformNotice/searchById',
    method: 'get',
    params
  })
}

export function saveShopNotice(data) {
  return request({
    url: '/admin/portal/platformNotice/save',
    method: 'post',
    data
  })
}

export function updateShopNotice(data) {
  return request({
    url: '/admin/portal/platformNotice/update',
    method: 'post',
    data
  })
}

export function delShopNotice(params) {
  return request({
    url: '/admin/portal/platformNotice/delete',
    method: 'post',
    params
  })
}
