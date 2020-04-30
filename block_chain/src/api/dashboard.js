import request from '@/utils/request'

export function getCount() {
  return request({
    url: '/admin/task/getHandSetPublicChainRecordCount',
    method: 'get'
  })
}

export function getAllCost(params) {
  return request({
    url: '/admin/eth/getAllCostAndBalance',
    method: 'get',
    params
  })
}

export function getLedgerCount() {
  return request({
    url: '/admin/eth/getLedgerCount',
    method: 'get'
  })
}

export function getChartData() {
  return request({
    url: '/admin/eth/getKLineOfLedger',
    method: 'get'
  })
}

// 已上链数据
export function getPrivateChainData() {
  return request({
    url: '/admin/privateHomePage/chainData',
    method: 'get'
  })
}
// 私链账本数据
export function getPrivateAccountData() {
  return request({
    url: '/admin/privateHomePage/accountData',
    method: 'get'
  })
}
// 私链账本K线图
export function getPrivateaccountKLine() {
  return request({
    url: '/admin/privateHomePage/accountKLine',
    method: 'get'
  })
}
