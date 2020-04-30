import request from '@/utils/request'

export function groupList(params) {
  return request({
    url: '/admin/group/getPage',
    method: 'get',
    params
  })
}

export function getGroup(params) {
  return request({
    url: '/admin/group/get',
    method: 'get',
    params
  })
}

export function addGroup(data) {
  return request({
    url: '/admin/group/saveOrUpdate',
    method: 'post',
    data
  })
}

export function deleteGroup(params) {
  return request({
    url: '/admin/group/delete',
    method: 'post',
    params
  })
}

export function getAllGroup() {
  return request({
    url: '/admin/group/getAllGroup',
    method: 'get'
  })
}
// 获取用户组织
export function getUserGroup() {
  return request({
    url: '/admin/group/getUserGroup',
    method: 'get'
  })
}
// 重上链查询
export function getDataHistory(params) {
  return request({
    url: '/admin/chain/getDataHistory',
    method: 'get',
    params
  })
}
// 重上链数据详情
export function getDataHistoryDetail(params) {
  return request({
    url: '/admin/chain/getDataHistoryDetail',
    method: 'get',
    params
  })
}
