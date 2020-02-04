<template>
  <AppView
    class="shop"
    title="我要开店"
    :clickLeft="clickLeft"
  >
    <div>
      <van-cell-group>
        <van-cell
          title="开店入口"
          is-link
          :to="{ name: 'user-shop-openShop' }"
        >
        </van-cell>
        <!-- <van-cell
          title="中宝协会员入驻专属通道"
          is-link
          :to="{ name: 'user-shop-membershipEntry' }"
        >
        </van-cell>
        <van-cell
          title="认证入口"
          is-link
          :to="{ name: 'user-shop-createShop' }"
        >
        </van-cell> -->
        <van-cell
          title="帮助视频"
          is-link
          @click.native="toHelpVideo"
        >
        </van-cell>
        <van-cell
          title="帮助手册"
          is-link
          :to="{ name: 'user-helpDoc' }"
        >
        </van-cell>
      </van-cell-group>
    </div>
  </AppView>
</template>

<style lang="postcss" scoped>
</style>

<script>
export default {
  head() {
    return {
      title: '我要开店'
    }
  },
  methods: {
    clickLeft() {
      this.$router.push({ name: 'user-mine' })
    },
    toHelpVideo() {
      if (!!window.Android) {
        this.$native.goToHelpVideo()
      } else {
        this.$router.push({ name: 'user-helpVideo' })
      }
    }
  }
}
</script>
