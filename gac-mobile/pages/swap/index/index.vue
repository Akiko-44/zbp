<template>
<AppView class="Index">
  <AppHeaderSearch />
  <AppSwipe :imgs="data.banners" />
  <AppHomeNav />

  <AppHomeBlock title="为您推荐-宝贝互换" :link="{name: 'swap-exchange'}">
    <van-row gutter="10" v-if="!data.swap">
      <van-col span="12" v-for="i in 2" :key="i">
        <div class="app-card-item1-shell"></div>
      </van-col>
    </van-row>
    <van-row gutter="10" v-else>
      <van-col span="12" v-for="(item, i) in data.swap" :key="i">
        <AppCard1
          @click.native="$router.push({name: 'swap-exchange-detail', query: { id: item.goodsId }})"
          :imgUrl="item.imgUrl"
          :price="item.entity.price"
          :info="item.entity.deprecition + '成新'"
          :describe="item.entity.swapRemark"
          :title="item.goodsName"
        />
      </van-col>
    </van-row>
  </AppHomeBlock>

  <AppHomeBlock title="为您推荐-物品销售" :link="{name: 'swap-sales'}">
    <van-row gutter="10" v-if="!data.sale">
      <van-col span="12" v-for="i in 2" :key="i">
        <div class="app-card-item1-shell"></div>
      </van-col>
    </van-row>
    <van-row gutter="10" v-else>
      <van-col span="12" v-for="(item, i) in data.sale" :key="i">
        <AppCard1
          @click.native="$router.push({name: 'swap-sales-detail', query: { id: item.goodsId }})"
          :imgUrl="item.imgUrl"
          :price="item.entity.price"
          :info="''"
          :describe="item.entity.brandName + '·' + item.entity.categoryName"
          :title="item.goodsName"
        />
      </van-col>
    </van-row>
  </AppHomeBlock>

  <AppHomeBlock title="为您推荐-物品拍卖" :link="{name: 'swap-auction'}">
    <van-row gutter="10" v-if="!data.auction">
      <van-col span="12" v-for="i in 2" :key="i">
        <div class="app-card-item1-shell"></div>
      </van-col>
    </van-row>
    <van-row gutter="10" v-else>
      <van-col span="12" v-for="(item, i) in data.auction" :key="i">
        <AppCard1
          :imgUrl="item.imgUrl"
          :price="item.price"
          :info="item.entity.offerConut + '次出价'"
          :describe="'结束时间:' + item.entity.auctionEndTime"
          :title="item.goodsName"
          @click.native="$router.push({ name: 'swap-auction-detail', query: { id: item.goodsId } })"
        />
      </van-col>
    </van-row>
  </AppHomeBlock>

  <AppHomeBlock title="为您推荐-金银回收" :link="{name: 'swap-recycle'}">
    <template v-if="!data.recycle">
      <div class="app-card-item2-shell" v-for="i in 2" :key="i"></div>
    </template>
    <template v-else>
      <AppCard2
        class="margin"
        v-for="(item, i) in data.recycle" :key="i"
        :imgUrl="item.imgUrl"
        :describe="item.createTime"
        :title="item.goodsName"
        @click.native="$router.push({ name: 'swap-recycle-detail', query: { id: item.goodsId } })"
      />
    </template>
  </AppHomeBlock>
  <AppTabbar />
</AppView>
</template>

<script>
import AppHeaderSearch from '~/components/swap/goodsList/search'
import AppTabbar from '~/components/swap/tabbar'
import AppCard1 from '~/components/common/card/item1'
import AppCard2 from '~/components/common/card/item2'
import AppHomeNav from './modules/nav'
import AppHomeBlock from './modules/block'
import AppSwipe from './modules/swipe'

export default {
  data () {
    if (this.$data) return
    return {
      data: {
        banners: []
      }
    }
  },
  beforeMount () {
    this.$service('swapIndexRecommend').then(result => result.data).then(data => {
      this.data = data
    })
  },
  components: {
    AppHeaderSearch,
    AppSwipe,
    AppTabbar,
    AppHomeNav,
    AppHomeBlock,
    AppCard1,
    AppCard2
  }
}
</script>

<style lang="postcss">
.Index {
  & .margin {
    margin-bottom: 10px;
  }
}
</style>
