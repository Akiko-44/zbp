import request from '@/utils/request'

// 获取省市区数据
export function getCities(id) {
  return request({
    url: `/admin/region/list/${id}`,
    method: 'get'
  })
}

// 获取省市区数据
export function getPCR() {
  return request({
    url: `/admin/region/getPCR`,
    method: 'get'
  })
}