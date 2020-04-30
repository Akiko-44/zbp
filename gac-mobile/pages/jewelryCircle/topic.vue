<template>
  <AppView class="jewelry-circle">
    <transition name="fade">
      <HeaderModule
        v-show="showHeader"
        title="话题主页"
        :info="info"
        :fixed="true"
      />
    </transition>
    <div
      class="topic-info text-white font-12"
      :style="topicInfo.backImag ? {backgroundImage: 'linear-gradient(rgba(54,63,104,.7),rgba(38,43,68,.7),rgba(255,255,255,0.7)),url(' + topicInfo.backImag + ')'} : {backgroundImage: 'url(' + baseImg + ')'}"
    >
      <sticky class="sticky">
        <HeaderModule
          :info="info"
          :transparent="true"
        />
      </sticky>
      <div class="topic-top-container">
        <h4 class="font-16 mb-1"># {{topicInfo.topicName}}</h4>
        <p>{{topicInfo.topicAbstract}}</p>
        <div class="topic-info-bottom mt-3 d-flex j-sb a-end">
          <p class="topic-num">{{topicInfo.joinNum}}人参与话题</p>
          <van-button
            v-if="!topicInfo.attentionStatus"
            class="concern-btn"
            color="#DF735A"
            @click.native="concern(1)"
          >+ 关注</van-button>
          <van-button
            class="concern-btn"
            color="#AAAAAA"
            v-else
            @click.native="concern(0)"
          >已关注</van-button>
        </div>
      </div>
    </div>
    <template v-if="topicInfo.joinNum && topicInfo.joinNum !== '0'">
      <div class="goods-list-search">
        <AppFilter>
          <div
            class="app-filter-item"
            @click="synthesis(1)"
            :class="query.orderType === 1 ? 'sort' : ''"
          >
            <div class="item-name">
              综合排序
            </div>
          </div>
          <div
            class="app-filter-item"
            @click="synthesis(2)"
            :class="query.orderType === 2 ? 'sort' : ''"
          >
            <div class="item-name">
              最新
            </div>
          </div>
          <div
            class="app-filter-item price-filter-item"
            @click="synthesis(3)"
            :class="query.orderType === 3 ? 'sort' : ''"
          >
            <div class="item-name">
              最热
            </div>
          </div>
          <AppFilterItem
            name="筛选"
            :class="query.orderType === 4 ? 'sort' : ''"
            :topicId="$route.query.id"
            :data="filterObj"
            @confirm="confirm"
          />
        </AppFilter>
      </div>
      <div class="goods-list">
        <AppList
          name="jewelryCircleSearchContent"
          :query="query"
          :isDisabled="true"
          :getData="() => this.$service('jewelryCircleSearchContent', { data: this.query })"
          ref="list"
          @loadData="loadData"
        >
          <template slot-scope="{ list }">
            <div
              class="list-box"
              ref="listBox"
              id="listBox"
            >
              <div
                class="list-item"
                v-for="(item, i) in list"
                :key="i"
              >
                <card
                  :type="item.type"
                  :id="item.id"
                  :imgUrl="item.thumbnail"
                  :title="item.title"
                  :commentNumber="item.commentNumber"
                  :likeNumber="item.likeNumber"
                  :viewNumber="item.viewNumber"
                  :labelName="item.labelName"
                  :labelImg="item.labelImg"
                  :isLike="item.isLike"
                  :authorName="item.authorName"
                  :authorLogo="item.authorLogo"
                />
              </div>
            </div>
          </template>
        </AppList>
      </div>
    </template>
    <p
      v-if="topicInfo.joinNum === '0'"
      class="tc tips"
    >点击下方按钮，参与话题吧！</p>
    <div class="participate-box">
      <van-button
        class="participate-btn"
        color="#DF735A"
        @click="toPublish"
      >立即参与</van-button>
    </div>

  </AppView>
</template>
<script>
import HeaderModule from '~/components/jewelryCircle/header'
import Card from '~/components/jewelryCircle/cardItem'
import { setImg } from '~/utils/qiniu'
import AppList from '~/components/common/list'
import sticky from '~/components/common/sticky'
import { getToken } from '~/utils/auth'
import AppFilter from '~/components/common/filterMulti'
import AppFilterItem from '~/components/common/filterMulti/circle-item'
import { waterfall } from '~/utils/page'

export default {
  data() {
    return {
      showHeader: false,
      data: {},
      query: {
        // 排序（1：综合，2：最新，3：最热，4：筛选）
        orderType: 1,
        content: '',
        type: undefined,
        columnId: undefined,
        labelId: undefined,
        topicId: this.$route.query.id,
        offset: 1,
        limit: 20
      },
      topicId: '',
      categoryId: '',
      titleShow: false,
      info: {},
      topicInfo: {},
      baseImg: require('../../assets/images/topic-bg.png'),
      bySale: false,
      byPrice: false,
      inH5: false,
      filterObj: {}
    }
  },
  created() {
    this.topicId = this.$route.query.id
    this.getTopicInfo()
  },
  activated() {
    if (!window.navigator.userAgent.includes('MicroMessenger')) {
      window.addEventListener('scroll', this.handleScroll)
    }
    this.getFilterList()
  },
  deactivated() {
    this.$destroy()
  },
  destroyed() {
    if (!window.navigator.userAgent.includes('MicroMessenger')) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    setImg,
    synthesis(orderType) {
      this.query.orderType = orderType
      this.getFilterList()
      this.getList()
    },
    confirm(data) {
      this.query.orderType = data.orderType
      this.query.type = data.type
      this.query.columnId = data.columnId
      this.query.labelId = data.labelId
      // this.query.topicId = data.topicId
      this.getFilterList()
      this.getList()
    },
    getFilterList() {
      this.$service('jewelryCircleListFilter', { data: this.query }).then(result => {
        this.filterObj = result.data
      })
    },
    getList() {
      this.query.offset = 1
      this.$refs.list.onRefresh()
    },
    handleScroll() {
      let scrollY = document.documentElement.scrollTop
      if (scrollY > 100) {
        this.showHeader = true
      }
      else {
        this.showHeader = false
      }
    },
    getTopicInfo() {
      this.$service("topicHome", { resources: [this.topicId] }).then(result => {
        this.topicInfo = result.data
        this.info.title = this.topicInfo.name + '个人主页'
        this.info.link = location.href
        this.info.imgUrl = this.topicInfo.userLogo
        this.info.desc = this.topicInfo.description
      })
    },
    concern(attentionStatus) {
      if (getToken()) {
        this.$service('setAttentionOrNot', {
          resources: [this.topicId, attentionStatus]
        }).then(result => {
          this.topicInfo.attentionStatus = !this.topicInfo.attentionStatus
        })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          this.$router.push({
            name: 'user-login'
          })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
    },
    back() {
      this.$router.push({
        name: 'jewelryCircle',
      })
    },
    toPublish() {
      if (getToken()) {
        const form = {
          topicId: this.topicId,
          topicName: this.topicInfo.topicName
        }
        this.$router.push({ name: 'jewelryCircle-publish', query: { data: JSON.stringify(form) } })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          this.$router.push({
            name: 'user-login'
          })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
    },
    loadData(data) {
      setTimeout(() => {
        waterfall('#listBox', 'list-item')
      }, 500)
    }
  },
  components: {
    HeaderModule,
    AppList,
    Card,
    sticky,
    AppFilter,
    AppFilterItem
  }
}
</script>

<style lang="postcss" scoped>
.jewelry-circle {
  padding-bottom: 95px;
  & .topic-info {
    position: relative;
    width: 100%;
    height: 185px;
    background-size: cover;
    & .topic-top-container {
      position: absolute;
      bottom: 20px;
      padding: 0 20px 0 25px;
      width: 100%;
      box-sizing: border-box;
    }
    & .topic-num {
      color: rgba(255, 255, 255, 0.8);
    }
    & .concern-btn {
      width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
    }
  }
  & .goods-list-search {
    position: relative;
    height: 37px;
    width: 100%;
    z-index: 1;
    &.h5Class {
      top: 46px;
    }
    & .price-filter-item {
      & img {
        width: 8px;
      }
    }
    & .sort {
      color: #d5735a;
      & .ico-down {
        transform: rotate(180deg);
        transform-origin: 50% 36%;
      }
    }
  }
  & .goods-list {
    padding: 10px;
    & .list-box {
      margin-left: -5px;
      margin-right: -5px;
      height: 265px;
      position: relative;
      & .list-item {
        padding-left: 5px;
        padding-right: 5px;
        width: 50%;
        float: left;
        box-sizing: border-box;
      }
    }
  }
  & .tips {
    margin-top: 100px;
  }
  & .participate-box {
    position: fixed;
    bottom: 0;
    padding: 25px 26px 26px 30px;
    background: var(--white);
    & .participate-btn {
      width: 320px;
      height: 44px;
      line-height: 44px;
      box-shadow: -1px 7px 11px 0px rgba(223, 115, 90, 0.32);
      border-radius: 5px;
    }
  }
}
>>> .tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-filter {
  padding-top: 10px;
  background: #f2f2f2 !important;
}
/deep/ .status-no img {
  margin-top: 45px !important;
}
/* 顶部nav淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
