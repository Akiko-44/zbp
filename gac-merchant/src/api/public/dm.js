import request from '@/utils/request'

// 设计师作品列表
export function designWork(params) {
  return request({
    url: '/admin/designmanu/displaywoks/worksList',
    method: 'get',
    params
  })
}

// 设计师定制商品列表
export function customMadeWork(params) {
  return request({
    url: '/admin/designmanu/customgoods/list',
    method: 'get',
    params
  })
}

// 设计师作品/商品审核及上下架
export function auditdesignWork(data) {
  return request({
    url: '/admin/designmanu/customgoods/isCheckOnsale',
    method: 'post',
    data
  })
}

// // 设计师作品回显
// export function getDesignWork(caseId) {
//   return request({
//     url: `/admin/designmanu/displaywoks/caseInfo/${caseId}`,
//     method: 'get'
//   })
// }

// // 设计师定制商品回显
// export function getCustomMadeWork(caseId) {
//   return request({
//     url: `/admin/designmanu/displaywoks/caseInfo/${caseId}`,
//     method: 'get'
//   })
// }
