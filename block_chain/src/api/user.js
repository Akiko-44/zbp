import request from '@/utils/request'
import {
  guid
} from '@/utils'

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/user/loginout',
    method: 'post'
  })
}

// 获取短信验证码
export function getSmsCode(params) {
  return request({
    url: `/admin/user/smscode`,
    method: 'get',
    params
  })
}

// 获取图片验证码
export function getVerifyCode() {
  const uuid = guid()
  return {
    uuid,
    url: `admin/user/getCode/${uuid}`
  }
}

// 忘记密码第一步
export function resetPasswordPre(data) {
  return request({
    url: `/admin/user/reset-password-pre`,
    method: 'post',
    data
  })
}

// 忘记密码第二步
export function resetPassword(data) {
  return request({
    url: `/admin/user/reset-password`,
    method: 'post',
    data
  })
}
