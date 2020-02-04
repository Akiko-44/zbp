<template>
  <div class="detail-recommended">
    <h4 class="detail-title">好货推荐</h4>
    <van-row gutter="10">
      <van-col span="12" v-for="(item, i) in list" :key="i">
        <AppCard
          @click.native="linkTo(item)"
          :imgUrl="item.imgUrl"
          :price="item.price"
          :info="''"
          :describe="item.brandName + '·' + item.categoryName"
          :title="item.goodsName"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import AppCard from '~/components/common/card/item1'

export default {
  components: {
    AppCard
  },
  data () {
    return {
      list: []
    }
  },
  beforeMount () {
    this.$service('swapHotList').then(result => {
      this.list = result.data
    })
  },
  methods: {
    linkTo (item) {
      this.$router.push({
        name: item.swapble === '1' ? 'swap-exchange-detail' : 'swap-sales-detail',
        query: { id: item.id }
      })
    }
  }
}
</script>
