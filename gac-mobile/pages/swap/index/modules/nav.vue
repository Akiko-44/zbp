<template>
  <nav class="app-home-nav">
    <van-row gutter="10">
      <van-col span="6" @click.native="go('swap-exchange')">
        <i class="ico-exchange"></i>
        <strong>宝贝互换</strong>
      </van-col>
      <van-col span="6" @click.native="go('swap-sales')">
        <i class="ico-sale"></i>
        <strong>物品销售</strong>
      </van-col>
      <van-col span="6" @click.native="go('swap-auction')">
        <i class="ico-auction"></i>
        <strong>物品拍卖</strong>
      </van-col>
      <van-col span="6" @click.native="go('swap-recycle')">
        <i class="ico-recovery"></i>
        <strong>金银回收</strong>
      </van-col>
    </van-row>
  </nav>
</template>

<script>
export default {
  methods: {
    go (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="postcss">
.app-home-nav {
  margin-top: 15px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: white;
  text-align: center;
  & strong {
    display: block;
    font-size: 13px;
    padding-top: 13px;
    color: var(--black);
  }
}
</style>
