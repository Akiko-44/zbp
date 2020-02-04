<template>
  <AppView
    class="detail"
    :title="title"
    :clickRight="share"
  >
    <i
      class="ico-share-circle"
      slot="nav-bar-right"
    ></i>
    <header class="detail-header">

      <div class="header-main">
        <div class="user-cover">
          <div
            class="user"
            :style="detail.backgroundImg ? {backgroundImage: 'linear-gradient(rgba(54,63,104,.7),rgba(38,43,68,.7),rgba(255,255,255,0.7)),url(' + detail.backgroundImg + ')'} : ''"
          >
            <div class="logo">
              <img
                v-if="detail.logo"
                :src="detail.logo | setImg({ w: 180 })"
              />
            </div>
            <h4 class="merchant-name">{{detail.name}}</h4>
            <div class="address">{{detail.provinceName}} | {{detail.cityName}}</div>
            <div
              class="brand text-hidden"
              v-if="detail.brands"
            >经营品牌：{{detail.brands}}</div>
            <div class="btn-box">
              <van-button
                plain
                type="warning"
                class="kefu"
                @click="xiaoneng"
              >客服</van-button>
              <van-button
                v-if="!concerned"
                color="#DF735A"
                class="concern"
                @click.native="concernedShop(1)"
              >关注</van-button>
              <van-button
                v-if="concerned"
                color="#AAAAAA"
                class="concern"
                @click.native="concernedShop(0)"
              >已关注</van-button>
            </div>
          </div>
        </div>
        <div class="explain tc">
          <van-row>
            <van-col span="8">
              <p class="score value">{{ detail.multipleScore ? detail.multipleScore.toFixed(1) : ''}}</p>
              <p class="label">综合评分</p>
            </van-col>
            <van-col span="8">
              <p class="value">{{detail.goodsSaleCount}}</p>
              <p class="label">销量</p>
            </van-col>
            <van-col span="8">
              <p class="value">{{detail.concernNum}}</p>
              <p class="label">粉丝</p>
            </van-col>
          </van-row>
          <div
            class="notice"
            v-if="noticeList && noticeList.length"
          >
            <van-swipe
              class="assemble-swipe"
              :touchable="false"
              :autoplay="3000"
              :show-indicators="false"
              vertical
            >
              <van-swipe-item
                v-for="(item,i) in noticeList"
                :key="i"
                @click.native="$router.push({name: 'notice', query: {id: item.id}})"
              >
                <i class="ico-proclamation"></i>{{item.noticeName}}
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
    </header>
    <!-- <van-tabs
      v-model="activeName"
      sticky
      :offset-top="offsetTop"
    > -->
    <van-tabs
      v-model="activeName"
      sticky
      :offset-top="offsetTop"
    >
      <van-tab
        title="商品"
        name="goods"
      >
        <div class="content">
          <AppList
            emptyText="暂无商品"
            :query="query"
            :params="params"
            :getData="() => this.$service('jewelryProductList', { data: this.query, params: this.params })"
            ref="list"
          >
            <template slot-scope="{ list }">
              <van-row gutter="10">
                <van-col
                  span="12"
                  v-for="(item, i) in list"
                  :key="i"
                >
                  <AppCard
                    :imgUrl="item.goodsPic"
                    :discount="item.discount"
                    :lowPrice="item.lowPrice"
                    :hightPrice="item.hightPrice"
                    :navLowPrice="item.navLowPrice"
                    :navHightPrice="item.navHightPrice"
                    :title="item.goodsName"
                    :catName="item.catName"
                    @click.native="$router.push({name: 'jewelry-work', query: {id: item.goodsId}})"
                  />
                </van-col>
              </van-row>
            </template>
          </AppList>
        </div>
      </van-tab>
      <van-tab
        title="品牌故事"
        name="brandStory"
      >
        <div class="brand-story tabs-content ">
          <div
            class="main-content word-break"
            v-lazy-container="{ selector: 'img' }"
            v-html="lazyImgHtml(storyInfo)"
            v-if="storyInfo"
          >
          </div>
          <div
            class="main-content word-break"
            v-else
          >
            <div class="status status-no">
              <img src="../../../assets/images/emptylist.png" />
              <p>暂无品牌故事</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab
        title="店铺信息"
        name="shopInfo"
      >
        <div class="shop-info tabs-content">
          <div class="main-content">
            <p>
              <span class="info-label">名称</span>
              <span class="info-value">{{detail.companyName || detail.name}}</span>
            </p>
            <p v-if="detail.provinceName">
              <span class="info-label">地址</span>
              <span class="info-value explain-detail">{{detail.provinceName}}{{detail.cityName}}{{detail.address}}</span>
            </p>
            <p>
              <span class="info-label">电话</span>
              <span class="info-value mobile">{{detail.mobilePhone}}</span>
            </p>
            <p v-if="detail.wechat">
              <span class="info-label">微信</span>
              <span class="info-value">{{detail.wechat}}</span>
            </p>
            <p v-if="detail.qq">
              <span class="info-label">QQ</span>
              <span class="info-value">{{detail.qq}}</span>
            </p>
            <p v-if="detail.email">
              <span class="info-label">邮箱</span>
              <span class="info-value">{{detail.email}}</span>
            </p>
            <p v-if="detail.merchantExplain">
              <span class="info-label">简介</span>
              <span class="info-value explain-detail">{{detail.merchantExplain}}</span>
            </p>
          </div>

        </div>
      </van-tab>
    </van-tabs>
    <Share
      :info="info"
      ref="share"
    />
  </AppView>
</template>

<script>
import Card from '~/components/dm/card/item6'
import CommentItem from '~/components/swap/goodsDetail/commentItem'
import { domain } from '@/utils/qiniu'
import AppCard from '~/components/common/card/item1'
import AppList from '~/components/common/list'
import Share from '~/components/common/share'
import { lazyImgHtml } from '~/utils/filters'

export default {
  components: {
    Card,
    CommentItem,
    AppCard,
    AppList,
    Share
  },
  /* head() {
    return {
      title: '商家详情'
    }
  }, */
  head() {
    return {
      title: this.title,
      meta: [
        { itemprop: 'name', content: this.detail.name },
        { itemprop: 'image', content: this.detail.logo },
        { name: 'description', itemprop: "description", content: this.detail.merchantExplain }
      ]
    }
  },
  data() {
    return {
      activeName: 'goods',
      offsetTop: 46,
      concerned: false,
      title: '',
      domain,
      detail: {},
      goodsList: [],
      loading: false,
      params: {
        offset: 1,
        limit: 20,
      },
      query: {
        merchantId: this.$route.query.id
      },
      noticeList: [],
      storyInfo: '',
      info: {}
    }
  },
  beforeMount() {
    this.$loading(this.$service('jewelerInfo', { data: { id: this.$route.query.id } }))
      .then(result => {
        this.detail = result.data
        this.info.title = this.detail.name
        this.info.link = location.href
        this.info.imgUrl = this.detail.logo
        this.info.desc = '店铺简介：' + this.detail.merchantExplain
        this.concerned = !this.detail.shopCheck
        this.noticeList = this.detail.noticeList
        this.detail.storyList.map(item => {
          this.storyInfo += item.stroyDetail
        })
        if (this.detail.cityName.includes(this.detail.provinceName)) {
          this.detail.cityName = ''
        }
        this.title = this.detail.name
        document.title = this.detail.name
        let head = document.getElementsByTagName('head')
        let meta = document.createElement('meta')
        meta.content = this.detail.name
        head[0].appendChild(meta)
      })
    if (this.$native.isApp()) {
      this.$native.getTitle('商家详情')
    }
  },
  mounted() {
    if (window.navigator.userAgent.includes('MicroMessenger')) {
      this.offsetTop = 0
      document.getElementsByClassName('main-content').style.minHeight = window.innerHeight - 94 + 'px'
    }
  },
  activated() {
    document.title = this.detail.name
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    lazyImgHtml,
    concernedShop(state) {
      if (state) {
        this.$service('ShopConcern', { data: { merchantId: this.detail.userId } }).then((data) => {
          this.concerned = !!state
          this.$toast('关注成功')
        }).catch(() => { })
      } else {
        this.$service('removeShopConcern', { data: { merchantId: this.detail.userId } }).then((data) => {
          this.concerned = !!state
          this.$toast('您已取消关注')
        }).catch(() => { })
      }
    },
    xiaoneng() {
      if (this.$native.isApp()) {
        this.$native.goToXiaoNeng({
          keFuId: this.detail.keFuId
        })
      } else {
        NTKF.im_openInPageChat(this.detail.keFuId)
      }
    },
    share() {
      this.$refs.share.show()
    },
    focus() { }
  }
}
</script>

<style lang="postcss" scoped>
.detail-header {
  margin-bottom: 10px;
  position: relative;
  box-sizing: border-box;
  & .header-main {
    font-size: 11px;
  }
  & .user {
    /* margin-bottom: 10px; */
    width: 100%;
    height: 258px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    /* background: #c8a570; */
    background-image: linear-gradient(
        rgba(54, 63, 104, 0.7),
        rgba(38, 43, 68, 0.7),
        rgba(255, 255, 255, 0.7)
      ),
      url("../../../assets/images/merchant_bg.png");
    background-size: cover;
    background-position: center;
  }
  & .explain {
    margin: -50px 10px 0;
    padding: 0 10px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    & .value {
      padding: 14px 0 6px;
      color: #000;
      font-size: 20px;
    }
    & .score {
      color: #df735a;
    }
    & .label {
      font-size: 14px;
      color: #999;
      padding-bottom: 17px;
    }
    & .notice {
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      text-align: left;
      color: 666px;
      border-top: 1px solid #e5e5e5;
      & .assemble-swipe {
        height: 100%;
        line-height: 30px;
        font-size: 13px;
        color: var(--dark-gray);
      }
      & .ico-proclamation {
        margin-right: 5px;
      }
      & .van-swipe-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  & .logo {
    margin: 0 auto 6px;
    padding-top: 18px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  & .merchant-name {
    font-size: 17px;
  }
  & .address {
    margin: 5px 0 9px;
    color: rgba(255, 255, 255, 0.4);
  }
  & .brand {
    height: 36px;
    line-height: 1.2em;
  }
  & .btn-box {
    & button {
      margin: 0 7px;
      padding: 0;
      width: 65px;
      height: 30px;
      font-size: 13px;
      line-height: 30px;
    }
    & .kefu {
      background: transparent;
      color: #df735a;
      border-color: #df735a;
    }
    & .concern {
      background: #df735a;
      border-color: #df735a;
    }
  }
}
.content {
  padding: 10px;
}
.tabs-content {
  padding: 10px;
  & .main-content {
    padding: 15px;
    min-height: calc(100vh - 140px);
    background: #fff;
    border-radius: 5px;
  }
  & .info-label {
    display: inline-block;
    width: 54px;
    font-size: 13px;
    color: #999;
  }
  & .info-value {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 13px;
    color: #333;
    &.explain-detail {
      display: inline-block;
      width: 260px;
      line-height: 18px;
      vertical-align: top;
    }
  }
  & .mobile {
    color: #df735a;
    border-bottom: 1px solid #df735a;
  }
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
.status-no {
  line-height: 1;
  z-index: 0;
  & img {
    width: 331px;
    margin-top: 120px;
  }
}
.brand-story /deep/ img {
  width: 100%;
}
>>> .van-nav-bar--fixed {
  z-index: 3 !important;
}
</style>
