<template>
  <AppView class="account" title="账号管理">
    <div class="block">
      <h4 class="title">我的主账号</h4>
      <div class="row-between">
        <div class="left item-center">
          <div class="image">
            <img v-if="user.userLogo" :src="user.userLogo | setImg({ w: 150 })" />
          </div>
          <span>{{user.nickname || user.mobilePhone}}</span>
        </div>
        <div class="right">
          <router-link class="brown" :to="{name: 'user-mobile-modify'}">更换手机号</router-link>
        </div>
      </div>
    </div>
    <div class="block margin">
      <h4 class="title">我的主账号</h4>
      <div class="row-between van-hairline--bottom">
        <div class="left item-center">
          <div class="image">
            <img width="50" src="~/assets/images/qq.png">
          </div>
          <span>QQ</span>
        </div>
        <div class="right">
          <van-button type="primary" class="primary-btn min">立即绑定</van-button>
        </div>
      </div>
      <div class="row-between van-hairline--bottom">
        <div class="left item-center">
          <div class="image">
            <img src="~/assets/images/wechat.png">
          </div>
          <span>微信</span>
        </div>
        <div class="right">
          <!-- <span class="dark-gray">已绑定</span> -->
          <van-button type="primary" class="primary-btn min">立即绑定</van-button>
        </div>
      </div>
      <div class="row-between van-hairline--bottom">
        <div class="left item-center">
          <div class="image">
            <img src="~/assets/images/weibo.png">
          </div>
          <span>新浪微博</span>
        </div>
        <div class="right">
          <van-button type="primary" class="primary-btn min">立即绑定</van-button>
        </div>
      </div>
    </div>
  </AppView>
</template>

<script>
export default {
  middleware: 'auth',
  beforeMount () {
    this.$store.dispatch('user/checkLogin', this.$router)
    this.$loading(this.$store.dispatch('user/getUserInfo'))
  },
  computed: {
    user () { return this.$store.state.user.info }
  }
}
</script>

<style lang="postcss" scoped>
.block {
  padding: 20px 12px 12px;
  font-size: 14px;
  & .row-between {
    padding: 15px 0;
    align-items: center;
  }
  & .image {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    background-color: var(--light-gray);
    border-radius: 50%;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &.margin {
    border-top: 10px solid var(--light-gray);
  }
}
</style>
