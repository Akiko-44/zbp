import { asyncRouterMap } from '@/router'
import { getMenus } from '@/api/admin/menu'
import {
  MessageBox
} from 'element-ui'

/**
 * 通过authority判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.authority) {
    if (menus[route.authority] !== undefined) {
      return menus[route.authority]
    } else {
      return false
    }
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      const menu = menus[route.authority] || { icon: route.icon }
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

const permission = {
  state: {
    routers: [] // 只作用于商户后台
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getMenus().then(data => {
          // 当前用户没有菜单清空token，退出登录
          if (!data.data) {
            MessageBox.confirm('当前用户没有菜单权限', '确定登出？', {
              confirmButtonText: '退出登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              dispatch('FedLogOut').then(() => {
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
          const accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
          resolve(accessedRouters)
        })
      })
    }
  }
}

export default permission
