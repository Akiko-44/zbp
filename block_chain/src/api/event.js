import request from '@/utils/request'
// 获取最新交易
export function getNewTxn() {
  return request({
    url: '/admin/event/getNewTxn',
    method: 'get'
  })
}
// 获取最新区块
export function getNewBlock() {
  return request({
    url: '/admin/event/getNewBlock',
    method: 'get'
  })
}
// 获取最新上链数据
export function getNewContractTx(params) {
  return request({
    url: '/admin/event/getNewContractTx',
    method: 'get',
    params
  })
}
