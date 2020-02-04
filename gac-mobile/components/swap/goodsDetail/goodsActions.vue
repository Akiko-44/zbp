<template>
<div class="app-goods-action-space">
  <van-goods-action>
    <!-- <van-goods-action-mini-btn icon="chat" /> -->
    <van-goods-action-mini-btn :icon="detail.liked ? 'like' : 'like-o'" @click="collect" />
    <van-goods-action-big-btn text="加入购物车" @click="addCart" />
    <van-goods-action-big-btn text="立即购买" @click="buy" primary />
  </van-goods-action>
</div>
</template>

<style lang="postcss" scoped>
.app-goods-action-space {
  height: 50px;
}
</style>

<script>
export default {
  props: {
    detail: Object
  },
  data () {
    return {
      collectLoading: false,
      addLoading: false
    }
  },
  methods: {
    collect () {
      if (this.collectLoading) return
      this.collectLoading = true
      const status = !this.detail.liked
      const serviceName = status ? 'userCollect' : 'userDeleteCollect'
      this.$service(serviceName, {
        resources: [this.detail.id],
        data: {
          status
        }
      }).then(() => {
        this.collectLoading = false
        this.detail.liked = status
      }).catch(() => {
        this.collectLoading = false
      })
    },
    addCart () {
      if (this.addLoading) return
      this.addLoading = true

      const sku = this.detail.goodsSku
      this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: sku.goodsId,
          goodsSku: sku.goodsId,
          number: 1,
          goodsSource: sku.source
        }
      }), '添加中').then(() => {
        this.$toast({ type: 'success', message: '添加成功' })
        this.addLoading = false
      }).catch(() => {
        this.addLoading = false
      })
    },
    buy () {
      this.$router.push({
        name: 'swap-order-confirm',
        query: {
          id: this.detail.id
        }
      })
    }
  }
}
</script>
