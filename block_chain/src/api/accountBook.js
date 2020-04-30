import request from '@/utils/request'

export function accountBookList(params) {
  return request({
    url: '/admin/eth/getLedgerDetails',
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

export function accountBookStatisticsList(params) {
  return request({
    url: '/admin/eth/getLedgerCountPage',
    method: 'get',
    params
  })
}
// 私链账本明细
export function getPrivateAccountDetail(params) {
  return request({
    url: '/admin/privateAccount/detail',
    method: 'get',
    params
  })
}
// 私链账本统计
export function getPrivateAccountStatistics(params) {
  return request({
    url: '/admin/privateAccount/statistics',
    method: 'get',
    params
  })
}
