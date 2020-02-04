import request from '@/utils/request'

export function getBanners() {
  return request({
    url: `/admin/gallery/banner/list`,
    method: 'get'
    
  })
}

export function saveBanners(data) {
  return request({
    url: `/admin/gallery/banner/bannerSetting`,
    method: 'post',
    data
  })
}

export function getPhoto(params){
	return request({
		url: '/admin/gallery/homeSetting/getHomePage',
		method: 'get',
		params
	})
}
export function savePhoto(params){
	return request({
		url: '/admin/gallery/homeSetting/setHomePage',
		method: 'post',
		params
	})
}
