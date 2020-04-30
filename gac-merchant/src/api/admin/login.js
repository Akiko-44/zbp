import request from '@/utils/request'
import { guid } from '@/utils'

export function loginByUsername(data) {
  // const data = {
  //   name,
  //   password,
  //   loginType,
  //   verifyCode,
  //   flag
  // }

  // "loginType": 登录类型： 1、运营系统登录；2、前端登录；3、商户登录
  // "flag": 商户类型 1：设计室 2：制造间
  return request({
    url: '/api/userCenter/account-login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/userCenter/logout',
    method: 'post'
  })
}

export function getVerifyCode() {
  const uuid = guid()
  return {
    uuid,
    url: `/api/userCenter/verifyCode/getCode/${uuid}`
  }
}
