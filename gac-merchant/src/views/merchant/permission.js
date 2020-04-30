import router, { asyncRouterMap } from './router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/authredirect']// no redirect whitelist
let menuStatus = false

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 如果没有菜单则请求并生成路由
      if (!menuStatus) {
        menuStatus = true
        store.commit('SET_ROUTERS', asyncRouterMap)
        router.addRoutes(asyncRouterMap)
        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true })

        // 获取用户信息
        store.dispatch('GetUserInfo').catch((err) => {})
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
