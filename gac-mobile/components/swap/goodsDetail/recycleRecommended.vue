<template>
  <div class="detail-recommended">
    <h4 class="detail-title">卖家其它回收</h4>
    <van-row gutter="10">
      <van-col span="12" v-for="(item, i) in list" :key="i">
        <AppCard
          @click.native="linkTo(item)"
          :imgUrl="item.imgUrl"
          :price="item.price"
          :info="''"
          :describe="item.provinceName + '·' + item.cityName"
          :title="item.recycleName"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import AppCard from '~/components/common/card/item1'

export default {
  props: {
    userId: String
  },
  components: {
    AppCard
  },
  data () {
    return {
      list: []
    }
  },
  beforeMount () {
    this.$service('swapUserGoodsList', {data: {userId: this.userId}}).then(result => {
      this.list = result.data
    })
  },
  methods: {
    linkTo (item) {
      this.$router.push({
        name: 'swap-recycle-detail',
        query: { id: item.id }
      })
    }
  }
}
</script>
