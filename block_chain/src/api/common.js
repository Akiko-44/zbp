import request from '@/utils/request'

export function getAllPlatformList() {
  return request({
    url: '/admin/platform/getAllPlatform',
    method: 'get'
  })
}

export function getBlockChainList() {
  return request({
    url: '/admin/eth/getBlockChains',
    method: 'get'
  })
}
