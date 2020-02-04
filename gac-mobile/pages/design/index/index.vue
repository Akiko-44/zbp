<template>
  <AppView class="desing-index"
           title='设计师'>
    <!--<van-nav-bar title="设计师" class="home" />-->
    <AppSwipe v-if="data.dmBannerVOList && data.dmBannerVOList.length"
              :imgs="data.dmBannerVOList" />
    <template v-if="data.edrvoList && data.edrvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="6">
            <h3>首饰设计师</h3>
          </van-col>
          <van-col span="3"
                   class="more"
                   @click.native="linkList('首饰设计师')">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <Card v-for="(item, index) in data.edrvoList"
              :key="index"
              v-if="item.source === 1"
              :data="{
	        	id: item.designerId,
	          logo: item.thumbnail,
	          title: item.userName,
	          info: item.province + ' ' + item.city,
	          imgs: item.dcList,
            link: 'design-detail',
            caseLink: 'design-work'
	        }" />
      </div>
    </template>
    <template v-if="data.edrvoList && data.edrvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="6">
            <h3>玉雕大师</h3>
          </van-col>
          <van-col span="3"
                   class="more"
                   @click.native="linkList('玉雕大师')">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <Card v-for="(item, index) in data.edrvoList"
              :key="index"
              v-if="item.source == 2"
              :data="{
	        	id: item.designerId,
	          logo: item.thumbnail,
	          title: item.userName,
	          info: item.province + ' ' + item.city,
	          imgs: item.dcList,
            link: 'design-detail',
            caseLink: 'design-work'
	        }" />
      </div>
    </template>
    <template v-if="data.edrvoList && data.edrvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="6">
            <h3>国际设计师</h3>
          </van-col>
          <van-col span="3"
                   class="more"
                   @click.native="linkList('国外设计师')">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <Card v-for="(item, index) in data.edrvoList"
              :key="index"
              v-if="item.source == 3"
              :data="{
	        	id: item.designerId,
	          logo: item.thumbnail,
	          title: item.userName,
	          info: item.province + ' ' + item.city,
	          imgs: item.dcList,
            link: 'design-detail',
            caseLink: 'design-work'
	        }" />
      </div>
    </template>
    <template v-if="data.edrvoList && data.edrvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="6">
            <h3>设计爱好者</h3>
          </van-col>
          <van-col span="3"
                   class="more"
                   @click.native="linkList('设计爱好者')">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <Card v-for="(item, index) in data.edrvoList"
              :key="index"
              v-if="item.source == 4"
              :data="{
	        	id: item.designerId,
	          logo: item.thumbnail,
	          title: item.userName,
	          info: item.province + ' ' + item.city,
	          imgs: item.dcList,
            link: 'design-detail',
            caseLink: 'design-work'
	        }" />
      </div>
    </template>
    <template v-if="data.ecvoList && data.ecvoList.length">
      <div class="list van-hairline--bottom">
        <van-row class="head-title"
                 type="flex"
                 justify="space-between">
          <van-col span="6">
            <h3>优秀作品</h3>
          </van-col>
          <van-col span="3"
                   class="more"
                   @click.native="$router.push({ name: 'design-product' })">更多
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row style="margin-top: 20px;padding: 0 10px;"
                 gutter="10">
          <van-col span="12"
                   v-for="(item, i) in data.ecvoList"
                   :key="i"
                   v-if="i<2">
            <Card5 class="margin"
                   :imgUrl="item.mainPic"
                   :title="item.caseName"
                   :price="item.price"
                   @click.native="$router.push({ name: 'design-work', query: { id: item.caseId } })" />
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
import AppSwipe from '~/components/dm/swipe'
import Card from '~/components/dm/card/item1'
import Card5 from '~/components/dm/card/item5'
import { NavBar } from 'vant';
export default {
  components: {
    AppSwipe,
    Card,
    Card5,
    NavBar
  },
  head() {
    return {
      title: '设计师'
    }
  },
  data() {
    return {
      data: {}
    }
  },
  beforeMount() {
    this.$service('designerIndex').then(result => {
      this.data = result.data
    })
    if (this.$native.isApp()) {
    	this.$native.getTitle('设计师')
    }
  },
  updated() {
    if (this.$native.isApp()) {
    	this.$native.getTitle('设计师')
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    linkList(category) {
      this.$router.push({
        name: 'design-list',
        query: { category }
      })
    },
    onClickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    activity() {
      if (this.$native.isApp()) {
        this.$native.gotoActivityView()
      } else {
        this.$router.push({
          name: 'design-activity'
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.desing-index {
  background-color: var(--light-gray);
  & .list {
    margin-top: 15px;
    & .head-title {
      padding: 0 20px;
      & h3 {
        color: #333333;
        font-weight: 600;
      }
      & .more {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  & .margin {
    margin-bottom: 10px;
  }
}
</style>