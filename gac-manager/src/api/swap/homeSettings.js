import request from '@/utils/request'

export function getBanners() {
  return request({
    url: `/admin/swap/banner/list`,
    method: 'get'
  })
}

export function saveBanners(data) {
  return request({
    url: `/admin/swap/banner/bannerSetting`,
    method: 'post',
    data
  })
}

export function getJewelryTalent() {
  return request({
    url: `/admin/jewelry_talent/list`,
    method: 'get'
  })
}

export function saveJewelryTalent(data) {
  return request({
    url: `/admin/jewelry_talent/saveOrUpdate`,
    method: 'post',
    data
  })
}

export function page(params) {
  return request({
    url: '/admin/goodsBrand/page/2',
    method: 'get',
    params
  })
}

export function putObj(data) {
  return request({
    url: '/admin/goodsBrand/saveOrUpdate',
    method: 'post',
    data
  })
}

export function delObj(id) {
  return request({
    url: `/admin/goodsBrand/delete/${id}`,
    method: 'post'
  })
}

export function getQiniu(data) {
  return request({
    url: 'http://up-z2.qiniup.com/',
    method: 'post',
    data
  })
}
