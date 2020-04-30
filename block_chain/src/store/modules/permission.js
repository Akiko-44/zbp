import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import {
  MessageBox
} from 'element-ui'
import {
  getUserMenu
} from '@/api/menu'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 将多级菜单数据拍平，方便后续通过 menus.code 直接获取某一级菜单的数据
 * @param {Object} menus 菜单数据存储对象，传空对象就行
 * @param {Array} data 原始数据
 */
function getMenusMap(menus, data) {
  data.forEach(item => {
    if (item.code) {
      // 拍平菜单数据
      const menuData = {}
      Object.keys(item).forEach(key => {
        if (key !== 'children') {
          menuData[key] = item[key]
        }
      })
      // 以 code 为过滤条件
      menus[item.code] = menuData
    }
    if (item.children && item.children.length) {
      getMenusMap(menus, item.children)
    }
  })
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      const menu = menus[route.authority] || {
        icon: route.icon
      }
      route.icon = menu.icon
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  permissionMenus: undefined
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSION_MENUS: (state, permissionMenus) => {
    // state.permissionMenus = permissionMenus[0].children
    state.permissionMenus = permissionMenus[0]
  }
}

const actions = {
  generateRoutes({
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)

      // const data = {
      //   'msg': '成功',
      //   'code': 200,
      //   'data': {
      //     'id': '301',
      //     'parentId': '-1',
      //     'children': [{
      //       'id': '302',
      //       'parentId': '301',
      //       'children': [{
      //         'id': '801',
      //         'parentId': '302',
      //         'children': [],
      //         'icon': 'massege',
      //         'title': '权限管理',
      //         'href': '/account/page',
      //         'spread': false,
      //         'path': '',
      //         'component': '',
      //         'authority': '',
      //         'redirect': '',
      //         'code': 'page',
      //         'label': ''
      //       }],
      //       'icon': 'user',
      //       'title': '账户管理',
      //       'href': ' ',
      //       'spread': false,
      //       'path': '',
      //       'component': '',
      //       'authority': '',
      //       'redirect': '',
      //       'code': 'account',
      //       'label': ''
      //     }, {
      //       'id': '441',
      //       'parentId': '301',
      //       'children': [{
      //         'id': '781',
      //         'parentId': '441',
      //         'children': [],
      //         'icon': 'massege',
      //         'title': '全局参数配置',
      //         'href': '/system/globalParams',
      //         'spread': false,
      //         'path': '',
      //         'component': '',
      //         'authority': '',
      //         'redirect': '',
      //         'code': 'globalParams',
      //         'label': ''
      //       }, {
      //         'id': '861',
      //         'parentId': '441',
      //         'children': [],
      //         'icon': 'chart',
      //         'title': '上链平台管理',
      //         'href': '/system/businessPlatform',
      //         'spread': false,
      //         'path': '',
      //         'component': '',
      //         'authority': '',
      //         'redirect': '',
      //         'code': 'businessPlatform',
      //         'label': ''
      //       }, {
      //         'id': '862',
      //         'parentId': '441',
      //         'children': [],
      //         'icon': 'chart',
      //         'title': '区块链平台管理',
      //         'href': '/system/blockChainPlatform',
      //         'spread': false,
      //         'path': '',
      //         'component': '',
      //         'authority': '',
      //         'redirect': '',
      //         'code': 'blockChainPlatform',
      //         'label': ''
      //       }],
      //       'icon': 'example',
      //       'title': '系统管理',
      //       'href': ' ',
      //       'spread': false,
      //       'path': '',
      //       'component': '',
      //       'authority': '',
      //       'redirect': '',
      //       'code': 'system',
      //       'label': ''
      //     }],
      //     'icon': 'management',
      //     'title': '综合运营管理后台',
      //     'href': ' /public',
      //     'spread': false,
      //     'path': '',
      //     'component': '',
      //     'authority': '',
      //     'redirect': '',
      //     'code': 'public',
      //     'label': ''
      //   },
      //   'success': true
      // }

      getUserMenu().then(data => {
        // 当前用户没有菜单清空token，退出登录
        if (!data.data) {
          MessageBox.confirm('当前用户没有菜单权限', '确定登出？', {
            confirmButtonText: '退出登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            dispatch('resetToken').then(() => {
              location.reload()
            })
          })
          reject()
          return
        }
        // 修改数据结构
        data = [data.data]
        // 设置当前用户可访问的菜单 Map，仅用于过滤前端路由表
        const menus = {}
        getMenusMap(menus, data)
        // 设置右侧菜单数据
        commit('SET_PERMISSION_MENUS', data)
        // 根据菜单数据和菜单Map过滤前端路由
        const accessedRouters = filterAsyncRouter(asyncRoutes, menus)
        resolve(accessedRouters)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
