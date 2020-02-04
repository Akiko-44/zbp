import request from '@/utils/request'

export function getObj(parentId) {
  return request({
    url: `/admin/swap/common/categorys/${parentId}`,
    method: 'get'
  })
}

/*export function gteCategories() {
  return request({
    url: `/admin/swap/common/categorys`,
    method: 'get'
  })
}*/


export function gteCategories(data) {
  return request({
    url: `/admin/designmanu/merchant/cateCategory/list`,
    method: 'post',
    data
  })
}
