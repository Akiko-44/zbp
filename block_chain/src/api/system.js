import request from '@/utils/request'

export function getGlobalConfig() {
  return request({
    url: '/admin/globalConfig/getList',
    method: 'get'
  })
}

export function saveGlobalConfig(data) {
  return request({
    url: '/admin/globalConfig/saveOrUpdate',
    method: 'post',
    data
  })
}

export function initializePlatformDate(params) {
  return request({
    url: '/admin/dispatchingManagement/initializePlatformDate',
    method: 'get',
    params
  })
}

// 平台
export function savePlatform(data) {
  return request({
    url: '/admin/platform/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delPlatform(id) {
  return request({
    url: `/admin/platform/delete/${id}`,
    method: 'post'
  })
}

export function getPlatformList(params) {
  return request({
    url: '/admin/platform/getList',
    method: 'get',
    params
  })
}

export function getPlatform(id) {
  return request({
    url: `/admin/platform/getPlatform/${id}`,
    method: 'get'
  })
}

// 区块链平台
export function saveEthPlatform(data) {
  return request({
    url: '/admin/eth/platform/addOrUpdate',
    method: 'post',
    data
  })
}

export function delEthPlatform(params) {
  return request({
    url: '/admin/eth/platform/delete',
    method: 'post',
    params
  })
}

export function getEthPlatformList(params) {
  return request({
    url: '/admin/eth/platform/get',
    method: 'get',
    params
  })
}

export function getEthPlatform(params) {
  return request({
    url: '/admin/eth/platform/getDetail',
    method: 'get',
    params
  })
}

export function getBlockChainConfiguration(params) {
  return request({
    url: '/admin/eth/getBlockChainConfiguration',
    method: 'get',
    params
  })
}

export function updateBlockChainConfiguration(data) {
  return request({
    url: '/admin/eth/updateBlockChainConfiguration',
    method: 'post',
    data
  })
}

// 数据抽取
export function extracteData(data) {
  return request({
    url: '/admin/dispatchingManagement/initializePlatformDate',
    method: 'post',
    data
  })
}
