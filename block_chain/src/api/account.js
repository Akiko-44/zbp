import request from '@/utils/request'

export function accountList(params) {
  return request({
    url: '/admin/user/get',
    method: 'get',
    params
  })
}

export function addAccount(data) {
  return request({
    url: '/admin/user/registe',
    method: 'post',
    data
  })
}

export function deleteAccount(params) {
  return request({
    url: '/admin/user/delete',
    method: 'post',
    params
  })
}

export function bindGroupList() {
  return request({
    url: '/admin/group/getList',
    method: 'get'
  })
}

export function getAccountDetail(params) {
  return request({
    url: '/admin/user/getUserDetail',
    method: 'get',
    params
  })
}

export function getMnemonics() {
  return request({
    url: '/admin/user/getMnemonics',
    method: 'get'
  })
}
// 获取所有用户
export function getAllUser() {
  return request({
    url: '/admin/user/all',
    method: 'get'
  })
}
