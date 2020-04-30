import request from '@/utils/request'

export function page(data, params) {
  return request({
    url: '/admin/merchant/page',
    method: 'post',
    data,
    params
  })
}

// export function delObj(id) {
//   return request({
//     url: `/admin/extend/liveInfo/delete/${id}`,
//     method: 'post'
//   })
// }

// export function getObj(id) {
//   return request({
//     url: `/admin/extend/liveInfo/detail/${id}`,
//     method: 'get'
//   })
// }

export function audit(data) {
  return request({
    url: `/admin/merchant/audit`,
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/admin/merchant/queryMer/${id}`,
    method: 'get'
  })
}

export function designcategory(data) {
  return request({
    url: `/api/designmanu/menufact/designcategory/list`,
    method: 'post',
    data
  })
}

export function signQuery(data) {
  return request({
    url: `/admin/merchant/signQuery`,
    method: 'post',
    data
  })
}

export function merSign(params) {
  return request({
    url: `/admin/merchant/merSign`,
    method: 'get',
    params
  })
}

// 专委会入驻申请
export function getIntentionJoinPage(params) {
  return request({
    url: `/api/intention/getIntentionJoinPage`,
    method: 'get',
    params
  })
}
// 商家、专委会新增修改及修改入驻状态
export function saveIntentionJoin(data) {
  return request({
    url: `/api/intention/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 专委会入驻操作记录
export function getIntentionJoinLog(params) {
  return request({
    url: `/api/intention/intentionJoinLog/page`,
    method: 'get',
    params
  })
}
// 新增修改专委会入驻操作记录
export function saveIntentionJoinLog(data) {
  return request({
    url: `/api/intention/intentionJoinLog/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 删除专委会入驻操作记录
export function deleteIntentionJoinLog(id) {
  return request({
    url: `/api/intention/intentionJoinLog/delete/${id}`,
    method: 'post'
  })
}

// 修改中宝协会员等级
export function saveMerchantLevel(data) {
  return request({
    url: `/api/userCenter/merchantInfo/merchantLevel/update`,
    method: 'post',
    data
  })
}

// 自媒体管理
export function weMediaList(params) {
  return request({
    url: `/admin/user/weMediaUser/list`,
    method: 'get',
    params
  })
}

export function getWeMedia(params) {
  return request({
    url: `/admin/user/weMediaUser/get`,
    method: 'get',
    params
  })
}

export function saveOrUpdateWeMedia(data) {
  return request({
    url: `/admin/user/weMediaUser/saveOrUpdate`,
    method: 'post',
    data
  })
}

export function weMediaChangeStatus(id, status) {
  return request({
    url: `/admin/user/weMediaUser/changeStatus/${id}/${status}`,
    method: 'post'
  })
}

export function weMediaFans(params) {
  return request({
    url: `/admin/user/weMediaUser/list/fans`,
    method: 'get',
    params
  })
}

// 自媒体账户修改密码
export function weMediaUserUpdatePwd(data) {
  return request({
    url: `/admin/user/weMediaUser/password/change`,
    method: 'post',
    data
  })
}

// 会员推荐用户列表
export function recommendUserFromMember(referrerUserId, params) {
  return request({
    url: `/api/userCenter/recommendUserFromMember/${referrerUserId}`,
    method: 'get',
    params
  })
}
