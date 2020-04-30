import request from '@/utils/request'

export function homeDesignroomSetting(data) {
  return request({
    url: '/admin/portal/home/homeDesignroomSetting',
    method: 'post',
    data
  })
}

export function homeGallerySetting(data) {
  return request({
    url: '/admin/portal/home/homeGallerySetting',
    method: 'post',
    data
  })
}

export function homeIndustrySetting(data) {
  return request({
    url: '/admin/portal/home/homeIndustrySetting',
    method: 'post',
    data
  })
}

export function homeLiveshowSetting(data) {
  return request({
    url: '/admin/portal/home/homeLiveshowSetting',
    method: 'post',
    data
  })
}

export function homeManuSetting(data) {
  return request({
    url: '/admin/portal/home/homeManuSetting',
    method: 'post',
    data
  })
}

export function saveBanners(data) {
  return request({
    url: `/admin/portal/home/bannerSetting`,
    method: 'post',
    data
  })
}

export function getBanners() {
  return request({
    url: `/admin/portal/home/list`,
    method: 'get'
  })
}

export function getHomeDesignroomList() {
  return request({
    url: '/admin/portal/home/getHomeDesignroomList',
    method: 'get'
  })
}

export function getHomeManuList() {
  return request({
    url: '/admin/portal/home/getHomeManuList ',
    method: 'get'
  })
}

export function getHomeGalleryList() {
  return request({
    url: '/admin/portal/home/getHomeGalleryList',
    method: 'get'
  })
}

export function getHomeIndustryList() {
  return request({
    url: '/admin/portal/home/getHomeIndustryList',
    method: 'get'
  })
}

export function getHomeLiveshowList() {
  return request({
    url: '/admin/portal/home/getHomeLiveshowList',
    method: 'get'
  })
}
