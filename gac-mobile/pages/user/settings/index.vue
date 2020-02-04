<template>
  <AppView title="设置">
    <van-cell-group>
      <van-cell
        title="个人信息"
        is-link
        :to="{name: 'user-profile'}"
      />
      <!-- <van-cell
        title="我的实名认证"
        is-link
        :to="{name: 'user-auth', query: {id: id}}"
      /> -->
      <van-cell
        title="我的实名认证"
        is-link
        @click="toAuth"
      />
      <van-cell
        title="帮助与反馈"
        is-link
        :to="{name: 'user-help'}"
      />
    </van-cell-group>
    <div class="padding">
      <van-button
        :loading="loading"
        @click="logout"
        block
        type="danger"
      >退出登录</van-button>
    </div>
  </AppView>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      loading: false,
      id: ''
    }
  },
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.$service('userInfo').then((result) => {
      this.id = result.data.id
    })
  },
  methods: {
    toAuth() {
      if (this.id) {
        this.$router.push({ name: 'user-auth', query: { id: this.id } })
      }
    },
    logout() {
      this.$loading(this.$service('userLogout'), '退出登录').then(() => {
        this.$store.commit('user/removeToken')
        if (!window.navigator.userAgent.includes('MicroMessenger')) {
          this.$native.loginOrLogout('')
        }
        //    	localStorage.removeItem('fromUrl')
        //    	localStorage.removeItem('from1')
        //    	localStorage.removeItem('from2')
        localStorage.clear()

        this.$router.push({ name: 'index' })
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
.padding {
  padding: 30px 20px;
}
</style>
