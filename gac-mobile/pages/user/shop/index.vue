<template>
  <AppView
    class="shop"
    title="我要开店"
    :clickLeft="clickLeft"
  >
    <div class="user-shop">
      <van-cell-group>
        <!--<van-cell
          title="开店入口"
          is-link
          :to="{ name: 'user-shop-openShop' }"
        >
        </van-cell>-->
        <van-cell
          title="开店入口"
          is-link
          @click.native="toShop"
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
.user-shop {
  padding: 10px;
  & >>> .van-cell-group {
    border-radius: 6px;
    overflow: hidden;
  }
  & >>> .van-cell:not(:last-child)::after {
    left: 0;
  }
  & >>> .van-cell {
    padding: 18px 12px;
    font-size: 17px;
  }
}
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
    },
    toShop() {
      let userType = localStorage.getItem('userType')
      if (userType == 3 || userType == 2) {
        this.$router.push({
          name: 'user-shop-createShop'
        })
      } else {
        this.$router.push({
          name: 'user-shop-openShop'
        })
      }
    }
  }
}
</script>
