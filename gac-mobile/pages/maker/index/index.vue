<template>
  <AppView class="maker-index"
           title="寻代工">
    <!-- <AppHeaderSearch /> -->
    <AppSwipe v-if="data.dmBannerVOList && data.dmBannerVOList.length"
              :imgs="data.dmBannerVOList" />
    <template v-if="data.emvoList && data.emvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="8">
            <h3>制造商展示</h3>
          </van-col>
          <van-col span="4"
                   class="more"
                   @click.native="$router.push({ name: 'maker-list' })">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <Card v-for="(item, index) in data.emvoList"
              :key="index"
              :data="{
	        	id: item.manuid,
	          logo: item.merLogo,
	          title: item.namuName,
	          info: item.province + ' ' + item.city,
	          imgs: item.caseList,
            link: 'maker-detail',
            caseLink: 'maker-work'          
	        }" />
      </div>
    </template>
    <template v-if="data.caseList && data.caseList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="8">
            <h3>商品展示</h3>
          </van-col>
          <van-col span="4"
                   class="more"
                   @click.native="$router.push({ name: 'maker-product' })">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row style="margin-top: 20px;padding: 0 10px;"
                 gutter="10">
          <van-col span="12"
                   v-for="(item, i) in data.caseList"
                   :key="i"
                   v-if="i<2">
            <Card5 class="margin"
                   :imgUrl="item.mainPic"
                   :title="item.caseName"
                   :price="item.price"
                   @click.native="$router.push({ name: 'maker-work', query: { id: item.caseId } })" />
          </van-col>
        </van-row>
      </div>
    </template>
    <template v-if="data.ecfvoList && data.ecfvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="8">
            <h3>工艺展示</h3>
          </van-col>
          <van-col span="4"
                   class="more"
                   @click.native="$router.push({ name: 'maker-art-list' })">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row style="margin-top: 20px;padding: 0 10px;"
                 gutter="10">
          <van-col span="12"
                   v-for="(item, i) in data.ecfvoList"
                   :key="i">
            <Card5 class="margin"
                   :imgUrl="item.craftLogo"
                   :title="item.craftName"
                   @click.native="$router.push({ name: 'maker-art', query: { id: item.craftId } })" />
          </van-col>
        </van-row>
      </div>
    </template>
    <div class="doing">
      <img src="../../../assets/images/more2.png"
           @click="activity"
           width="100%" />
    </div>
  </AppView>
</template>
<script>
// import AppHeaderSearch from '~/components/swap/goodsList/search'
import AppSwipe from '~/components/dm/swipe'
import Card from '~/components/dm/card/item1'
import Card5 from '~/components/dm/card/item5'

export default {
  components: {
    // AppHeaderSearch,
    AppSwipe,
    Card,
    Card5
  },
  data() {
    return {
      data: {}
    }
  },
  activated() {
    this.$service('makerHome').then(result => {
      this.data = result.data
      // this.data.emvoList.map(item => {
      //   item.caseList.map(subItem => {
      //     subItem.img = subItem.mainPic
      //   })
      // })
    })
  },
  methods: {
    linkTo(id) {
      this.$router.push({
        name: 'maker-detail',
        query: { id }
      })
    },
    linkMakerList() {
      this.$router.push({
        name: 'maker-list'
      })
    },
    activity() {
      if (this.$native.isApp()) {
        this.$native.gotoActivityView()
      } else {
        this.$router.push({
          name: 'maker-activity'
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.maker-index {
  background-color: var(--light-gray);
  & .list {
    margin-top: 15px;
    & .head-title {
      padding: 0 10px;
      & h3 {
        color: #333333;
        font-weight: 600;
      }
      & .more {
        color: #999999;
        font-size: 12px;
        text-align: right;
      }
    }
    & .margin {
      margin-bottom: 10px;
    }
  }
}
</style>
