import request from '@/utils/request'
// 交易hash查询
export function searchTransaction(params) {
  return request({
    url: '/admin/privateEtherScan/searchTransaction',
    method: 'get',
    params
  })
}
// 区块高度查询
export function searchBlock(params) {
  return request({
    url: '/admin/privateEtherScan/searchBlock',
    method: 'get',
    params
  })
}
// 钱包地址查询/合约地址查询
export function searchAddress(params) {
  return request({
    url: '/admin/privateEtherScan/searchAddress',
    method: 'get',
    params
  })
}
// 钱包地址查询/合约地址查询
export function isContractAddress(params) {
  return request({
    url: '/admin/privateEtherScan/isContractAddress',
    method: 'get',
    params
  })
}
// 上链数据查询
export function getContractTx(params) {
  return request({
    url: '/admin/privateEtherScan/getContractTx',
    method: 'get',
    params
  })
}
// 获取合约交易详情
export function getNewContractTxDetail(params) {
  return request({
    url: '/admin/event/getNewContractTxDetail',
    method: 'get',
    params
  })
}
