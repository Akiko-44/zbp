import request from '@/utils/request'

export function contractList(params) {
  return request({
    url: '/admin/contract/getPage',
    method: 'get',
    params
  })
}

export function saveContract(data) {
  return request({
    url: '/admin/contract/save',
    method: 'post',
    data
  })
}

export function updateContractStatus(data) {
  return request({
    url: '/admin/contract/updateStatus',
    method: 'post',
    data
  })
}

export function getAbi(params) {
  return request({
    url: '/admin/contract/getAbi',
    method: 'get',
    params
  })
}
//  合约部署
export function deployContract(data) {
  return request({
    url: '/admin/contract/deploy',
    method: 'post',
    data
  })
}
// 获取合约实例页
export function getContractInstance(params) {
  return request({
    url: '/admin/contractInstance/getPage',
    method: 'get',
    params
  })
}
// 获取合约选项
export function getContractName(params) {
  return request({
    url: '/admin/contractInstance/getContractName',
    method: 'get',
    params
  })
}
// 获取合约实例地址选项
export function getInstance(params) {
  return request({
    url: '/admin/contractInstance/getInstance',
    method: 'get',
    params
  })
}
// 获取合约实例方法选项
export function getMethod(params) {
  return request({
    url: '/admin/contractInstance/getMethod',
    method: 'get',
    params
  })
}
// 获取合约实例方法参数
export function getParam(params) {
  return request({
    url: '/admin/contractInstance/getParam',
    method: 'get',
    params
  })
}
// 获取已部署合约数
export function getDeployedContractCount(params) {
  return request({
    url: '/admin/contract/getDeployedContractCount',
    method: 'get',
    params
  })
}
// 修改合约实例默认选择
export function changeEnable(data) {
  return request({
    url: '/admin/contractInstance/changeEnable',
    method: 'post',
    data
  })
}
// 合约实例调用
export function callInstance(data) {
  return request({
    url: '/admin/contractInstance/callInstance',
    method: 'post',
    data
  })
}
// 获取from To 钱包信息
export function getFromToWallet() {
  return request({
    url: '/admin/transfer/getFromToWallet',
    method: 'get'
  })
}
// 转账交易
export function transfer(data) {
  return request({
    url: '/admin/transfer/transfer',
    method: 'post',
    data
  })
}
// 获取合约--添加合约时
export function getContract() {
  return request({
    url: '/admin/contract/getContract',
    method: 'get'
  })
}
// 获取数据类型
export function getDataType() {
  return request({
    url: '/admin/contractInstance/getDataType',
    method: 'get'
  })
}
