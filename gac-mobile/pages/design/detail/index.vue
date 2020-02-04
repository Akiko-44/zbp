<template>
  <AppView class="detail"
           title='设计师详情'>
    <header class="detail-header">

      <div class="header-main">
        <div class="user row-between">
          <div class="info">
            <h4>{{detail.userName}}</h4>
            <p>{{detail.province}} {{detail.city}} {{detail.area}}</p>
            <p>{{detail.cateFirst}} {{detail.cateSecond}}</p>
            <p>简介：{{detail.experience}}</p>
            <!-- <p>设计费用：￥{{detail.chargeStandard}}</p> -->
          </div>
          <div class="logo">
            <img v-if="detail.userLogo"
                 :src="detail.userLogo | setImg({ w: 180 })" />
          </div>
        </div>
        <!-- <div class="bottom row-between vertical">
        <ul class="focus row-between">
          <li>
            <p>关注</p>
            <p class="focus-count">515</p>
          </li>
          <li>
            <p>粉丝</p>
            <p class="focus-count">5152</p>
          </li>
        </ul>
        <van-button
          class="focus-btn"
          :loading="loading"
          @click="focus"
          type="default"
        >
          关注
        </van-button>
      </div> -->
      </div>
    </header>
    <ul class="achievement van-hairline--bottom flex-row">
      <li class="van-hairline--right">
        <p>商品</p>
        <strong>{{detail.dcpList.length}}</strong>
      </li>
      <li class="van-hairline--right">
        <p>签单</p>
        <strong v-if="detail.merVO">{{detail.orderNumber || 0}}</strong>
      </li>
      <li>
        <p>评价</p>
        <strong v-if="detail.merVO">{{detail.commentNumber || 0}}</strong>
      </li>
    </ul>
    <ul class="tabs row-center">
      <li v-for="(tab, index) in tabs"
          :key="index"
          :class="{'active': index === currentIndex}"
          @click="currentIndex = index">{{tab}}</li>
    </ul>
    <div class="content">
      <div class="works"
           v-show="currentIndex === 0">
        <van-row gutter="10">
          <van-col span="12"
                   v-for="(work, i) in detail.dcpList"
                   :key="i">
            <Card @click.native="$router.push({name: 'design-work', query: {id: work.caseId}})"
                  :data="{
              title: work.caseName,
              imgUrl: work.mainPic,
              desc: '￥' + work.price,
              caseType: work.caseType
            }" />
          </van-col>
        </van-row>
        <p class="status">我们是有底线的平台</p>
      </div>
      <!--<div class="comment" v-show="currentIndex === 1">
       <ul class="tags">
        <li>标签</li>
        <li>标签3</li>
        <li>标签2</li>
      </ul>
      <CommentItem
        v-for="(comment, index) in 5"
        :key="index"
        :comment="{
          userpic: 'pic_1hV0rWh54L8bh1m_1080_460.jpg',
          name: '12',
          date: '2015-03-05',
          rate: 1,
          content: '23',
          imgs: [{url:'banner_1ijBJgsI3WIhR3A_1918_480.jpg'}]
        }"
      /> 
    </div>-->
      <div class="designer-detail"
           v-show="currentIndex === 1">
        <video v-if="detail.videoUrl"
               controls="controls"
               class="video"
               :src="detail.videoUrl" />
        <ul class="info">
          <li class="flex-row">
            <label>设计年限</label>
            <p>{{detail.ageLimit}}</p>
          </li>
          <li class="flex-row">
            <label>所在地区</label>
            <p>{{detail.province}} {{detail.city}} {{detail.area}}</p>
          </li>
          <li class="flex-row">
            <label>行业资历</label>
            <p>{{detail.experience}}</p>
          </li>
          <li class="flex-row">
            <label>证书奖励</label>
            <p>{{detail.honor}}</p>
          </li>
        </ul>
      </div>
    </div>
  </AppView>
</template>

<script>
import Card from '~/components/dm/card/item2'
import CommentItem from '~/components/swap/goodsDetail/commentItem'
import { domain } from '@/utils/qiniu'

export default {
  components: {
    Card,
    CommentItem
  },
  head() {
    return {
      title: '设计师详情'
    }
  },
  data() {
    return {
      domain,
      /*tabs: ['作品', '评价', '详情'],*/
      tabs: ['商品', '详情'],
      currentIndex: 0,
      detail: {
        dcpList: []
      },
      loading: false
    }
  },
  beforeMount() {
    this.$loading(this.$service('designerInfo', { resources: [this.$route.query.id] }))
      .then(result => {
        this.detail = result.data
      })
    if (this.$native.isApp()) {
    	this.$native.getTitle('设计师详情')
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    focus() { }
  }
}
</script>

<style lang="postcss" scoped>
.detail-header {
  position: relative;
  height: 275px;
  background-color: #202223;
  box-sizing: border-box;
  & .header-main {
    padding: 20px;
    color: #ddd;
    font-size: 11px;
  }
  & .user {
    margin-bottom: 35px;
  }
  & .info {
    max-width: 80%;
    & h4 {
      margin-bottom: 10px;
      font-size: 24px;
      color: white;
    }
    & p {
      line-height: 24px;
      &:last-child {
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
      }
    }
  }
  & .logo {
    width: 66px;
    height: 66px;
    background-color: var(--light-gray);
    border-radius: 50%;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  & .focus-count {
    margin-top: 5px;
    font-size: 21px;
    color: white;
  }
  & .focus-btn {
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 15px;
    border: none;
  }
  & .focus {
    width: 110px;
  }
}
.achievement {
  & li {
    font-size: 11px;
    flex: 1;
    margin: 10px 0;
    padding: 0 20px;
    text-align: center;
    & strong {
      padding-top: 8px;
      display: block;
      font-size: 21px;
    }
  }
}
.content {
  /*background-color: #F5F5F5;*/
  padding: 0 10px;
  margin-bottom: 40px;
}
.tabs {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 16px;
  & li {
    margin-right: 30px;
    padding-bottom: 7px;
    color: #b5b5b5;
    &.active {
      color: var(--black);
      border-bottom: 3px solid var(--black);
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.tags {
  font-size: 0;
  & li {
    margin-right: 7px;
    margin-bottom: 7px;
    padding: 8px 15px;
    background-color: #e7dac7;
    font-size: 12px;
    border-radius: 14px;
    text-align: center;
    display: inline-block;
  }
}
.designer-detail {
  & .info {
    margin: 20px 0;
    padding: 20px;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 1px 9px -3px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    & label {
      padding-right: 12px;
      color: #b5b5b5;
    }
    & p {
      margin-top: -5px;
      flex: 1;
      line-height: 22px;
    }
    & li {
      margin-bottom: 15px;
    }
  }
  & .video {
    width: 100%;
  }
}
.status {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: var(--dark-gray);
}
</style>
