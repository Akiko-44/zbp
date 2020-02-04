<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { removeToken, getToken } from '@/utils/auth'
export default {
  name: 'App',
  mounted() {
  	let self = this
    /* 区分关闭和刷新，关闭退出登录 start*/
    window.onload = function() {
      if (!window.sessionStorage['tempFlag']) {
        removeToken()
        self.$router.push({'path': '/login'})
      } else {
        window.sessionStorage.removeItem('tempFlag')
      }
    }
    window.onunload = function() {
      window.sessionStorage['tempFlag'] = true
    }
    window.onbeforeunload = function() {
      window.sessionStorage['tempFlag'] = true
    }
  }
}
</script>
