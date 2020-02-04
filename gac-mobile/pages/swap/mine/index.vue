<template>
  <AppView class="Mine">
    <div class="mine-header">
      <h4 class="title">个人中心0</h4>
      <div class="inner">
        <div class="user">
          <div class="user-pic">
            <img v-if="user.userLogo" :src="user.userLogo | setImg({ w: 150 })" />
          </div>
          <p class="user-name">{{user.nickname || user.mobilePhone}}</p>
        </div>
        <ul class="menu row-between">
          <li>
            <i class="ico-message"></i>
            <p>我的消息</p>
          </li>
          <li @click="$router.push({name: 'swap-mine-collect'})">
            <i class="ico-collection"></i>
            <p>我的收藏</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu-block">
      <h4 class="title">
        <i class="ico-settings"></i>
        信息管理
      </h4>
      <van-cell-group :border="false">
        <van-cell title="销售信息" is-link :to="{name: 'swap-mine-info-sales'}" />
        <van-cell title="互换信息" is-link :to="{name: 'swap-mine-info-exchange'}" />
        <van-cell title="拍卖信息" is-link :to="{name: 'swap-mine-info-auction'}"/>
        <van-cell title="回收信息" is-link :to="{name: 'swap-mine-info-recycle'}" />
      </van-cell-group>
    </div>
    <div class="menu-block">
      <h4 class="title">
        <i class="ico-settings"></i>
        我的订单
      </h4>
      <van-cell-group :border="false">
        <van-cell title="销售订单" is-link :to="{name: 'swap-mine-order-buy', query: {type: 1}}" />
        <van-cell title="互换订单" is-link :to="{name: 'swap-mine-order-buy', query: {type: 2}}" />
        <van-cell title="拍卖订单" is-link :to="{name: 'swap-mine-order-buy', query: {type: 3}}" />
        <van-cell title="回收订单" is-link :to="{name: 'swap-mine-order-buy', query: {type: 4}}" />
        <van-cell title="设计师订单" is-link :to="{name: 'swap-mine-order-buy', query: { type: 5 }}" />
        <van-cell title="制造间订单" is-link :to="{name: 'swap-mine-order-buy', query: { type: 6 }}" />
      </van-cell-group>
    </div>
    <!-- <div class="menu-block">
      <h4 class="title">
        <i class="ico-settings"></i>
        订单管理
      </h4>
      <van-cell-group :border="false">
        <van-cell title="购买订单" is-link :to="{name: 'swap-release-general', query: { type: 2 }}" />
        <van-cell title="互换订单" is-link :to="{name: 'swap-release-general', query: { type: 1 }}" />
        <van-cell title="拍卖订单" is-link :to="{name: 'swap-account'}"/>
      </van-cell-group>
    </div> -->
    <AppTabbar />
  </AppView>
</template>

<script>
import AppTabbar from '~/components/swap/tabbar'

export default {
  middleware: 'auth',
  async beforeMount () {
    await this.$store.dispatch('user/checkLogin', this.$router)
    this.$loading(this.$store.dispatch('user/getUserInfo'))
  },
  computed: {
    user () { return this.$store.state.user.info }
  },
  components: {
    AppTabbar
  }
}
</script>

<style lang="postcss">
.Mine {
  background-color: var(--light-gray);
  color: var(--black);
  & .mine-header {
    width: 100%;
    height: 200px;
    background-color: white;
    background-image: url("./images/minebackground.png");
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
    & .title {
      padding: 17px 0 14px;
      text-align: center;
      font-size: 18px;
    }
    & .inner {
      margin: 0 auto;
      padding: 10px;
      width: 270px;
      height: 130px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /*no*/
      box-sizing: border-box;
      background-color: white;
    }
    & .user-pic {
      display: block;
      margin: 0 auto 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--light-gray);
      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    & .user-name {
      text-align: center;
      font-size: 14px;
      height: 16px;
      line-height: 16px;
    }
    & .menu {
      margin-top: 5px;
      & li {
        width: 140px;
        text-align: center;
        & p {
          margin-top: 5px;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  & .menu-block {
    margin: 13px 0;
    & .title {
      padding-left: 13px;
      margin-bottom: 13px;
      display: flex;
      align-items: center;
      font-size: 14px;
      & i {
        padding-right: 5px;
      }
    }
  }
}
</style>
