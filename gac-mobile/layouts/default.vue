<template>
  <nuxt keep-alive />
</template>

<script>
import { getToken } from '~/utils/auth'

export default {
  beforeMount () {
    const token = this.$route.query.token
    // alert(token)
    if (token === '0') {
      // 无效token，清空 token
      // alert('token 0, 清除 token')
      this.$store.commit('user/removeToken')
    } else if (token) {
      // 有效的 token，存储到cookie和内存
      this.$store.commit('user/setToken', token)
      // alert(this.$store.state.user.token)
    }
    this.$store.commit('user/set', { name: 'token', data: getToken() })
  }
}
</script>
