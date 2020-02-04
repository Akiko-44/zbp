<template>
  <AppCard
    class="app-info-item"
    :data="data"
    v-if="data.item.goodsStatus !== -1"
  >
    <template slot="btns">
      <button @click="reshelf" v-if="data.item.goodsStatus == 0" class="card-actions-btn van-hairline--surround">上架</button>
      <button @click="shelves" v-if="data.item.goodsStatus == 2" class="card-actions-btn van-hairline--surround">下架</button>
      <!--<button @click="edit" class="card-actions-btn van-hairline--surround">编辑</button>-->
      <!-- 审核未通过 -->
      <!--<button @click="release" v-if="data.item.goodsStatus == 3" class="card-actions-btn van-hairline--surround">重新发布</button>-->
      <button @click="remove" class="card-actions-btn van-hairline--surround">删除</button>
    </template>
  </AppCard>
</template>

<script>
import AppCard from '~/components/common/card/item3'

export default {
  props: {
    data: Object
  },
  components: {
    AppCard
  },
  methods: {
    reshelf () {
      this.$router.push(this.data.to)
    },
    shelves () {
      this.$service('swapSaleGoodsOffSell', {resources: [this.data.item.id]})
        .then(() => {
          this.data.item.goodsStatus = 0
          this.$toast('下架成功')
        })
    },
    edit () {
      this.$router.push(this.data.to)
    },
    release () {
      this.$router.push(this.data.to)
    },
    remove () {
      this.$service('swapUserSalesDelete', {resources: [this.data.item.id]})
        .then(() => {
          this.data.item.goodsStatus = -1
          this.$toast('删除成功')
        })
    }
  }
}
</script>

<style lang="postcss">
.app-info-item {
  margin-top: 5px;
}
</style>
