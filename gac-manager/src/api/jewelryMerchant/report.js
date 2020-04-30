import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/admin/report/merReport',
    method: 'get',
    params
  })
}

// 申诉列表
export function appealList(params) {
  return request({
    url: '/admin/jewelry/report/appealList',
    method: 'get',
    params
  })
}

// 立即申诉
export function reportUpdate(data) {
  return request({
    url: '/admin/jewelry/report/update',
    method: 'post',
    data
  })
}
