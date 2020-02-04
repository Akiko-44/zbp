<template>
<div class="app-goods-action-space">
  <van-goods-action>
    <van-goods-action-mini-btn icon="chat" @click="xiaoneng"/> 
    <!--<van-goods-action-mini-btn :icon="detail.liked ? 'like' : 'like-o'" @click="collect" />-->
    <van-goods-action-big-btn text="加入购物车" @click="addCart" primary/>
    <van-goods-action-big-btn text="我要换" @click="toChange"/>
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
import { getToken } from '~/utils/auth'
export default {
  props: {
    detail: {
    	type: Object,
    	default: {}
    }
  },
  data () {
    return {
      collectLoading: false,
      addLoading: false
    }
  },
  methods: {
    xiaoneng(){
      if(getToken()){
        
      }else{
        this.$native.goToLogin()
      }
      this.$native.goToXiaoNeng({keFuId: this.detail.keFuId, id: this.$route.query.id})
    },
    collect () {
      if (this.collectLoading) return
      this.collectLoading = true
      if(getToken()){
        
      }else{
        this.$native.goToLogin()
      }
      const status = !this.detail.liked
      const serviceName = status ? 'userCollect' : 'userDeleteCollect'
      this.$service(serviceName, {
        resources: [this.detail.id, 2],
        data: {
          status
        }
      }).then(() => {
        this.collectLoading = false
        this.detail.liked = status
        if(this.detail.liked){
          this.$toast('收藏成功')
        }else{
          this.$toast('您已取消收藏')
        }
      }).catch(() => {
        this.collectLoading = false
      })
    },
    addCart () {
      if (this.addLoading) return
      this.addLoading = true
      if(getToken()){
        
      }else{
        this.$native.goToLogin()
      }
      const sku = this.detail.goodsSku
      this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: this.detail.goodsSku.goodsId,
          goodsSku: this.detail.goodsSku.id,
          number: 1,
          goodsSource: this.detail.goodsSku.source
        }
      }), '添加中').then(() => {
        this.$toast({ type: 'success', message: '添加成功' })
        this.addLoading = false
      }).catch(() => {
        this.addLoading = false
      })
    },
    buy () {
      if(getToken()){
        
      }else{
        this.$native.goToLogin()
      }
      this.$router.push({
        name: 'swap-order-confirm',
        query: {
        	skuId: this.detail.goodsSku.id,
        	number: 1,
          id: this.detail.id,
          from: 'swap-sales-detail'
        }
      })
    },
    toChange(){
      if(getToken()){
        
      }else{
        this.$native.goToLogin()
      }
    	this.$router.push({
        name: 'swap-interchange',
        query: {
          id: this.detail.id
        }
      })
    }
  }
}
</script>
