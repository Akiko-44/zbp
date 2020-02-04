import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: `/api/userCenter/info`,
    method: 'get',
    data
  })
}

export function updateInfo(data) {
  return request({
    url: `/api/userCenter/info/update`,
    method: 'post',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: `/api/userCenter/password/change`,
    method: 'post',
    data
  })
}

export function getMerchantExplain() {
  return request({
    url: `/admin/merchant/info`,
    method: 'get'
  })
}

export function putMerchantExplain(data) {
  return request({
    url: `/admin/merchant/updateMerExplain`,
    method: 'post',
    data
  })
}

export function accountVerify(data) {
  return request({
    url: `/admin/merchant/accountVerify`,
    method: 'post',
    data
  })
}

export function agreementSign() {
  return request({
    url: `/admin/merchant/agreementSign`,
    method: 'get'
  })
}

export function getCode(data) {
  return request({
    url: `/api/userCenter/smscode`,
    method: 'post',
    data
  })
}

export function validatePhone(data) {
  return request({
    url: `/api/userCenter/mobile-phone/validate`,
    method: 'post',
    data
  })
}

export function changePhone(data) {
  return request({
    url: `/api/userCenter/mobile-phone/change`,
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

// 商家认证
export function merchantCertification(data) {
  return request({
    url: `/api/userCenter/merchantInfo/saveOrUpdate`,
    method: 'post',
    data
  })
}
// 获取商家信息
export function getMerchantInfo() {
  return request({
    url: `/api/userCenter/merchantInfo/info`,
    method: 'get'
  })
}
// 获取商家注册状态
export function checkMerchant() {
  return request({
    url: `/api/userCenter/merchantInfo/checkUser`,
    method: 'get'
  })
}
