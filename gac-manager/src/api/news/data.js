import request from '@/utils/request'


//获取数据管理列表数据
export function getDataList(params) {
  return request({
    url: '/admin/industry/advertise/page',
    method: 'get',
    params
  })
}

//获取数据管理列表总条数
export function getTotal(params) {
  return request({
    url: '/admin/industry/advertise/getNumCount',
    method: 'get',
    params
  })
}

//获取趋势图数据
export function getSeries(params) {
  return request({
    url: '/admin/industry/advertise/getSum',
    method: 'get',
    params
  })
}




