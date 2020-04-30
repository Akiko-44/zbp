<template>
  <AppView
    class="Base-goods-detail"
    title="作品详情"
    :clickLeft="onClickLeft"
  >
    <AppDetailImages
      :imgs="imgs"
      :videoUrl="work.videoUrl"
      :info="info"
      title='作品详情'
    />
    <template v-if="work.caseName">
      <div class="detail-info jewelry-info">
        <div class="detail-label-box">
          <span class="detail-label">{{ work.tag }}</span>
        </div>
        <div class="goods-name">
          <h4 class="design-concept">{{ work.caseName }}</h4>
          <div
            class="share-box"
            @click="$refs.share.show()"
          >
            <i class="ico-share-goods"></i>
            <span class="share">分享</span>
          </div>
        </div>
        <div
          class="detail-cat-box"
          v-if="work.catList && work.catList.length"
        >
          <span class="detail-cat">{{ work.catList[0].catName }}/{{ work.catList[1].catName }}/{{ work.catList[2].catName }}</span>
        </div>
      </div>
      <div
        class="detail-merchant"
        @click="linkTo(work.userId)"
      >
        <div class="merchant-store">
          <img
            class="merchant-logo"
            :src="designerInfo.userLogo"
          />
          <div class="merchant-info">
            <h4 class="merchant-name">{{ designerInfo.userName }}</h4>
            <div class="score">
              <span>综合评分</span>
              <van-rate
                class="score-rate"
                v-model="designerInfo.multipleScore"
                disabled-color="#D57E6AFF"
                :size="12"
                disabled
              />
              <span>{{ designerInfo.multipleScore }}</span>
            </div>
          </div>
          <div class="enter">进店逛逛</div>
        </div>
      </div>
      <van-tabs
        sticky
        :offset-top="isApp ? 0 : 44"
        :line-width="58"
        :line-height="2"
      >
        <van-tab title="详情">
          <div class="detail-describe">
            <div
              class="word-break"
              v-lazy-container="{ selector: 'img' }"
              v-html="lazyImgHtml(work.caseInfo)"
            ></div>
          </div>
        </van-tab>
        <van-tab title="售后">
          <div class="security">
            <h3>权利声明</h3>
            <p>中宝协珠宝店内所有商品信息、客户评价、商品咨询、网友讨论等内容，是中宝协重要的经营资源，未经许可，禁止非法转载使用。</p>
            <p>注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</p>
            <h3>中宝协承诺</h3>
            <p>中宝协平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！</p>
            <p>注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>
            <h3>正品行货</h3>
            <p>中宝协商城向您保证所售商品均为正品行货，由商家开具机打发票或电子发票。</p>
          </div>
        </van-tab>
      </van-tabs>

      <div class="app-goods-action-space">
        <van-goods-action>
          <van-goods-action-icon
            icon="chat-o"
            text="客服"
            @click="xiaoneng"
          />
          <van-goods-action-icon
            :icon="liked ? 'like' : 'like-o'"
            text="收藏"
            @click="collect"
          />
          <van-goods-action-button
            primary
            class="buy"
            text="我要定制"
            @click="$router.push({name: 'design-work', query: {id: work.userId}})"
          />
        </van-goods-action>
      </div>
      <Share
        :info="info"
        ref="share"
      />
    </template>
  </AppView>
</template>

<script>
import AppDetailImages from '~/components/swap/goodsDetail/jewelrySwipe'
import Share from '~/components/common/share'
import { lazyImgHtml } from '~/utils/filters'
import { getToken } from '~/utils/auth'
import { setImg } from '~/utils/qiniu'

export default {
  components: {
    AppDetailImages,
    Share
  },
  head() {
    return {
      title: '作品详情'
    }
  },
  data() {
    return {
      work: {
        imgUrlList: []
      },
      skuObj: {},
      imgs: [],
      info: {},
      designerInfo: {},
      liked: false,
      collectLoading: false,
      addLoading: false,
      tabs: [{
        name: '详情'
      }, {
        name: '售后'
      }],
      isApp: false
    }
  },
  beforeMount() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.isApp = true
    }
    this.$loading(this.$service('designerOpusInfo', { params: { caseId: this.$route.query.id } }))
      .then(result => {
        this.work = result.data
        this.work.caseInfo = this.work.caseInfo.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
        this.imgs = this.work.imgUrlList.map(src => {
          return { imgUrl: src }
        })
      }).then(() => {
        this.$loading(this.$service('designerDetail', { params: { userId: this.work.userId } }))
          .then(result => {
            this.designerInfo = result.data
            this.designerInfo.multipleScore = this.designerInfo.multipleScore ? this.designerInfo.multipleScore : 0
          })
      }).then(() => { })

    if (getToken()) {
      this.$loading(this.$service('userCollectCheck', { resources: [this.$route.query.id, 5] }))
        .then(result => {
          this.liked = !result.data.goodsCheck
        })
    }
    if (this.$native.isApp()) {
      this.$native.getTitle('商品详情')
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    lazyImgHtml,
    onClickLeft() {
      this.$router.go(-1)
    },
    swipeClick(item) {
    },
    confirmSuccess(skuObj) {
      this.skuObj = skuObj
    },
    xiaoneng() {
      if (this.$native.isApp()) {
        this.$native.goToXiaoNeng({
          keFuId: this.work.keFuId,
          id: this.$route.query.id
        })
      } else {
        NTKF.im_openInPageChat(this.work.keFuId)
      }
    },
    collect() {
      if (this.collectLoading) return
      this.collectLoading = true
      const serviceName = !this.liked ? 'userCollect' : 'userDeleteCollect'
      this.$service(serviceName, {
        resources: [this.work.id, 5]
      }).then(() => {
        this.collectLoading = false
        this.liked = !this.liked
        if (this.liked) {
          this.$toast('收藏成功')
        } else {
          this.$toast('您已取消收藏')
        }

      }).catch(() => {
        this.collectLoading = false
      })
    },
    linkTo(id) {
      this.$router.push({
        name: 'design-detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../../assets/css/swap/goodsDetail.css";
</style>

<style lang="postcss" scoped>
.Base-goods-detail {
  margin-bottom: 50px;
  & .detail-info {
    padding: 10px;
  }
}
.detail-merchant {
  margin-bottom: 0;
  padding: 10px;
  height: 50px;
  & .merchant-store {
    overflow: hidden;
    & .merchant-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    & .merchant-info {
      float: left;
      margin: 0 0 0 10px;
      & .merchant-name {
        float: none;
        margin: 2px 0 8px;
        color: #26273cff;
      }
      & .score {
        color: #585859ff;
        font-size: 13px;
        & .score-rate {
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
    & .enter {
      float: right;
      margin-top: 3px;
      width: 69px;
      height: 30px;
      line-height: 30px;
      color: #df735a;
      background: #fff;
      border: 1px solid;
      border-radius: 5px;
      font-size: 14px;
    }
  }
  & .rate {
    margin: 0;
    padding: 10px 10px 0;
  }
}

.jewelry-info {
  margin-bottom: 10px;
}

.detail-label-box {
  & .detail-label {
    display: inline-block;
    padding: 0 5px;
    margin: 0 10px 10px 0;
    line-height: 15px;
    font-size: 12px;
    color: #939292ff;
    border-radius: 3px;
    background: #e9ebf1ff;
  }
  & .brand-label {
    color: #fff;
    background: #d57e6aff;
  }
  & .cat-label {
    color: #fff;
    background: #f4b1a4ff;
  }
}
.detail-cat-box {
  font-size: 12px;
  color: #999;
}
.goods-name {
  min-height: 35px;
  max-height: 50px;
  & .share-box {
    float: right;
    padding-left: 12px;
    border-left: 1px solid #e9ebf1ff;
    & .ico-share-goods {
      margin-bottom: 4px;
      margin-left: 3px;
    }
    & .share {
      display: block;
      font-size: 11px;
      color: #919191ff;
    }
  }
  & .design-concept {
    float: left;
    width: 300px;
    line-height: 23px;
    color: #26273cff;
    font-size: 15px;
  }
}
.buy {
  background: #d67d6bff;
  color: white;
  border-radius: 0;
  height: 50px !important;
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.detail-describe {
  & /deep/ p {
    color: #585858;
    line-height: 1.5em;
  }
  & /deep/ div,
  & /deep/ ul,
  & /deep/ li,
  & /deep/ h2 {
    max-width: 335px !important;
    height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    position: static !important;
    line-height: 1.5em !important;
  }
  & /deep/ img {
    max-width: 335px !important;
    height: auto !important;
  }
  & /deep/ strong {
    font-weight: bold;
  }
  & /deep/ a {
    word-break: break-all;
  }
}
/deep/ .van-rate__item {
  display: inline-block;
}
</style>
