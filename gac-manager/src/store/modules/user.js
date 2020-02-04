import {
  loginByUsername,
  logout
} from '@/api/admin/login'
import {
  getUserInfo
} from '@/api/admin/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  Message
} from 'element-ui'
import Cookies from 'js-cookie'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '//o818xvhxo.qnssl.com/o_1cfhah5k11vl3f98mkp1h2c1n069.png',
    introduction: '',
    roles: [],
    permissionMenus: undefined,
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMISSION_MENUS', undefined)
      removeToken()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(data => {
          if (data.code !== 200) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            })
            return Promise.reject('error')
          } else {
            setToken(data.data.accessToken)
            Cookies.set('merchantId', data.data.merchantId)
            Cookies.set('merchantType', data.data.merchantType)
            Cookies.set('nickName', data.data.nickName)
            Cookies.set('userId', data.data.userId)
            Cookies.set('userParentId', data.data.userParentId)
            Cookies.set('logo', data.data.logo)
            Cookies.set('mobilePhone', data.data.mobilePhone)
            commit('SET_TOKEN', data.data.accessToken)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        let userLogo = Cookies.get('logo')
        if (userLogo && userLogo.indexOf('http://') == 0) {
          userLogo = Cookies.get('logo')
        } else if (userLogo) {
          userLogo = 'http://image.gacjc.com/' + Cookies.get('logo')
        } else {
          userLogo = 'http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png?imageView2/2/format/webp'
        }
        commit('SET_NAME', Cookies.get('nickName'))
        commit('SET_AVATAR', userLogo)
        getUserInfo().then(data => {
          if (!data.success) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          // 设置为管理员身份
          commit('SET_ROLES', ['admin'])
          // 设置用户资料
          //        commit('SET_NAME', data.data.username)
          //        commit('SET_AVATAR', '//o818xvhxo.qnssl.com/o_1cfhah5k11vl3f98mkp1h2c1n069.png')
          //        commit('SET_AVATAR', userLogo)
          commit('SET_INTRODUCTION', data.data.description)
          resolve(data)
        }).catch(error => {
          commit('SET_ROLES', ['merchants'])
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.tokenId)
    //       setToken(response.data.tokenId)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_INTRODUCTION', '')
          commit('SET_ROLES', [])
          removeToken()
          // localStorage.removeItem('userType')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_INTRODUCTION', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data

          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
