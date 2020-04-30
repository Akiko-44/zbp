import request from '@/utils/request'

// ===任务管理模块===

// 查询任务管理
export function getTaskPage(params) {
  return request({
    url: '/admin/task/getPage',
    method: 'get',
    params
  })
}

// 查询任务详情
export function getTaskDetail(params) {
  return request({
    url: '/admin/task/getTaskDetail/',
    method: 'get',
    params
  })
}

// 结果统计
export function getStatisticsResult() {
  return request({
    url: '/admin/task/getStatisticsResult',
    method: 'get'
  })
}
