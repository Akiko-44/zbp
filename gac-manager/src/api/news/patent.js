import request from '@/utils/request'
// 专利管理
export function getPage(params) { // 分页查询 专利列表
	return request({
		url: '/admin/industry/patent/page',
		method: 'get',
		params
	})
}
export function getId(params) { //  ID获取专利信息
	return request({
		url: '/admin/industry/patent/getIndustryPatentById',
		method: 'get',
		params
	})
}
export function getAllPage(params) { // 查询总条数
	if(params) {
		return request({
			url: `/admin/industry/patent/getNumCount?title=${params}`,
			method: 'get'
		})
	} else {
		return request({
			url: '/admin/industry/patent/getNumCount',
			method: 'get'
		})
	}

}
export function getPatent(params) { // 获取编辑信息
	return request({
		url: `/admin/industry/patent/getIndustryById/${params}`,
		method: 'get',
	})
}

export function updataPatent(params) { // 编辑专利列表
	return request({
		url: '/admin/industry/patent/updateIndustryById',
		method: 'post',
		params
	})
}

export function delPatent({id}) { // 删除专利
	return request({
		url: `/admin/industry/patent/delIndustryById/${id}`,
		method: 'post',
	})
}

export function delPatents(ids) { // 批删专利
	return request({
		url: `/admin/industry/patent/delAllIndustryByIds/${ids}`,
		method: 'post',
	})
}

export function addPatent(params) { //  添加专利
	return request({
		url: '/admin/industry/patent/saveIndustryPatent',
		method: 'post',
		params
	})
}
export function addObj(params){
	return request({
		url:'/admin/industry/patent/addIndustryPatentBanner',
		method: 'post',
		params
	})
}

export function getObj(){
	return request({
		url:'/admin/industry/patent/getIndustryPatentBanner',
		method: 'get',
	})
}
