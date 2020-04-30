import request from '@/utils/request'

export function getBrandList(params) {
  return request({
    url: '/admin/goodsBrand/page/1',
    method: 'get',
    params
  })
}

export function saveBrand(data) {
  return request({
    url: '/admin/goodsBrand/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delBrands(ids) {
  return request({
    url: `/admin/goodsBrand/delete/${ids}`,
    method: 'post'
  })
}

export function getCategory() {
  return request({
    url: `/api/homePage/categoryShow/0`,
    method: 'get'
  })
}
