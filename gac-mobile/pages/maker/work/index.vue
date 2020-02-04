<template>
  <!-- <AppView class="Base-goods-detail"
           :title="orderToDetail==true ? '商品详情' : ''"
           :clickLeft="onClickLeft"> -->
  <AppView
    class="Base-goods-detail"
    title="商品详情"
    :clickLeft="onClickLeft"
  >
    <AppDetailImages
      :imgs="imgs"
      :info="info"
      title="商品详情"
    />
    <template v-if="work.caseName">
      <div class="detail-info">
        <div class="price row-between item-center">
          <div>
            <strong>￥{{work.price}}</strong>
          </div>
          <span
            class="gray"
            v-if="work.freightPrice == 0"
          >运费: 免运费</span>
          <span
            class="gray"
            v-if="work.freightPrice != 0"
          >运费: {{work.freightPrice}}</span>
        </div>
        <h4 class="detail-goods-title word-break"><span
            class="case"
            v-if="work.caseType == 2"
          >定制</span>{{work.caseName}}</h4>
        <h4
          class="design-concept van-hairline--bottom"
          v-if="work.designConcept != ''"
        ><span>设计理念:&nbsp;</span>{{work.designConcept}}</h4>
        <div class="detail-row row-between gray van-hairline--bottom">
          <span>制造间: {{work.merchantName}}</span>
        </div>
        <goodSku
          @success="confirmSuccess"
          :detail="work"
          ref="mychild"
        />
        <goodsCoupon :couponsList="work.coupons" />
      </div>

      <div
        class="detail-merchant"
        @click="linkTo(shopScore.merchantId)"
        v-if="shopScore != ''"
      >
        <img
          :src="setImg(shopScore.logo, { w: 44 })"
          style="width: 44px;"
        />
        <div style="margin-left: 50px;overflow: hidden;">
          <h4>{{work.merchantName}}</h4>
          <span class="enter">进入店铺</span>
        </div>
        <div class="rate">
          <span>宝贝描述<span class="red">{{shopScore.spmxxfWholeScore==''?0:shopScore.spmxxfWholeScore.toFixed(1)}}</span></span>
          <span>卖家服务<span class="red">{{shopScore.mjfwtdWholeScore==''?0:shopScore.mjfwtdWholeScore.toFixed(1)}}</span></span>
          <span>物流速度<span class="red">{{shopScore.wlfhsdWholeScore==''?0:shopScore.wlfhsdWholeScore.toFixed(1)}}</span></span>
        </div>
      </div>
      <div
        class="detail-merchant"
        @click="linkTo(shopScore.merchantId)"
        v-else
      >
        <img
          :src="defaultLogo"
          style="width: 44px;"
        />
        <div style="margin-left: 50px;overflow: hidden;">
          <h4>{{work.merchantName}}</h4>
          <span class="enter">进入店铺</span>
        </div>
        <div class="rate">
          <span>宝贝描述<span class="red">0</span></span>
          <span>卖家服务<span class="red">0</span></span>
          <span>物流速度<span class="red">0</span></span>
        </div>
      </div>

      <van-tabs
        sticky
        :offset-top="isApp ? 0 : 44"
        :line-width="58"
        :line-height="2"
      >
        <van-tab title="商品描述">
          <div class="detail-describe">
            <div
              class="word-break"
              v-lazy-container="{ selector: 'img' }"
              v-html="lazyImgHtml(work.caseInfo)"
            ></div>
          </div>
        </van-tab>
        <van-tab title="商品参数">
          <van-cell-group>
            <template
              v-if="work.caseAttrsDTOList.length > 0"
              v-for="item in work.caseAttrsDTOList"
            >
              <van-cell
                :title="item.attrName"
                :value="item.attrValue"
              />
            </template>
          </van-cell-group>
        </van-tab>
        <van-tab title="用户评论">
          <div class="detail-comments">
            <AppDetailComment
              v-for="(comment, index) in comments"
              :key="index"
              :comment="comment"
            />
            <p
              class="text-align-center"
              style="margin: 10px 0;color: #999999;"
              v-if="!comments.length"
            >我们是有底线的平台</p>
          </div>
        </van-tab>
        <van-tab title="售后保障">
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
            @click="xiaoneng"
          />
          <van-goods-action-icon
            :icon="liked ? 'like' : 'like-o'"
            @click="collect"
          />
          <van-goods-action-button
            v-if="work.hasMerNo"
            text="加入购物车"
            class="addCart"
            @click="addCart"
          />
          <van-goods-action-button
            v-if="work.hasMerNo"
            text="立即购买"
            @click="buy"
            class="buy"
            primary
          />
          <van-goods-action-button
            v-if="!work.hasMerNo"
            class="waiting"
            disabled
            text="备货中，敬请期待"
          />
        </van-goods-action>
      </div>

    </template>
  </AppView>
</template>

<script>
import goodSku from './goodSku'
import goodsCoupon from './goodsCoupon'
import AppDetailComment from '~/components/swap/goodsDetail/commentItem'
import AppDetailImages from '~/components/swap/goodsDetail/images'
import { lazyImgHtml } from '~/utils/filters'
import { getToken } from '~/utils/auth'
import { setImg } from '~/utils/qiniu'

export default {
  components: {
    AppDetailImages,
    AppDetailComment,
    goodSku,
    goodsCoupon
  },
  head() {
    return {
      title: '商品详情'
    }
  },
  data() {
    return {
      work: {
        picList: []
      },
      shopScore: {},
      imgs: [],
      info: {},
      liked: false,
      collectLoading: false,
      addLoading: false,
      skuObj: {},
      productDetailShow: false,
      comments: [],
      orderToDetail: false,
      defaultLogo: require('~/assets/images/avatar.png'),
      isApp: false
    }
  },
  beforeMount() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.isApp = true
    }
    this.$loading(this.$service('commonDmWorkInfo', { resources: [this.$route.query.id] }))
      .then(result => {
        this.work = result.data
        this.shopScore = this.work.shopScore
        this.work.caseInfo = this.work.caseInfo.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
        this.imgs = this.work.picList.map(src => {
          return { imgUrl: src }
        })
      }).then(this.success)
    if (getToken()) {
      this.$loading(this.$service('userCollectCheck', { resources: [this.$route.query.id, 6] }))
        .then(result => {
          this.liked = !result.data
        })
    }
    if (this.$route.query.orderToDetail) {
      this.orderToDetail = true
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    lazyImgHtml,
    onClickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
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
    async success(detail) {
      const [comments] = await Promise.all([
        // 评论数据
        this.$service('userComment', { resources: [this.$route.query.id, 1], data: { offset: 1, limit: 8 } })
          .then(result => result.data ? result.data.records : [])
          .catch(() => ([]))
      ])
      this.comments = comments
    },
    collect() {
      if (this.collectLoading) return
      this.collectLoading = true
      const serviceName = !this.liked ? 'userCollect' : 'userDeleteCollect'
      this.$service(serviceName, {
        resources: [this.work.id, 6]
      }).then(() => {
        this.collectLoading = false
        this.liked = !this.liked
      }).catch(() => {
        this.collectLoading = false
      })
    },
    addCart() {
      if (getToken()) {
        this.$refs.mychild.show = true
        if (!this.skuObj.id) {
          this.$toast('请选择规格')
          return
        }
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          // this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
          this.$router.push({ name: 'user-login' })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
      /*if (this.addLoading) return
      if(!this.skuObj.id){
      	this.$toast('请选择规格')
      	return
      }
      this.addLoading = true

      this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: this.work.id,
          goodsSku: this.skuObj.id,
          number: this.skuObj.num,
          goodsSource: this.work.goodsSource
        }
      }), '添加中').then(() => {
        this.$toast({ type: 'success', message: '添加成功' })
        this.addLoading = false
      }).catch(() => {
        this.addLoading = false
      })*/
    },
    buy() {
      if (getToken()) {
        this.$refs.mychild.show = true
        if (!this.skuObj.id) {
          this.$toast('请选择规格')
          return
        }
        /*this.$router.push({
          name: 'swap-order-confirm',
          query: {
            id: this.work.id,
            skuId: this.skuObj.id,
            from: this.$route.name
          }
        })*/
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
        }
      }
    },
    linkTo(id) {
      this.$router.push({
        name: 'maker-detail',
        query: { id }
      })
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/swap/goodsDetail.css";
</style>

<style lang="postcss" scoped>
/*.header-images {
  position: relative;
  height: 275px;
  & .bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    z-index: 2;
    & i {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  & .detail-swipe {
    position: relative;
    height: 100%;
    background-color: var(--light-gray);
    & .background {
      height: 100%;
      width: 100%;
    }
  }
}*/
.case {
  display: inline-block;
  width: 35px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  color: #ffffff;
  text-align: center;
  background: #ff0000;
  border-radius: 10px;
}
.design-concept {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 20px;
  padding-bottom: 5px;
  & span {
    font-weight: bolder;
  }
}
.detail-merchant {
  height: 44px;
  & .merchant-logo {
    width: 45px;
    height: 45px;
  }
}
body .van-tab.van-tab--active span {
  color: #333333;
}
body .van-tabs__line {
  background-color: #d0323d;
}
>>> .van-button--default.waiting.van-goods-action-big-btn {
  background-color: #aaaaab;
}
>>> .van-button--default.van-goods-action-big-btn {
  background-color: #26273c;
}

.addCart {
  background: #333;
  color: white;
  border-radius: 0;
  height: 50px !important;
}

.buy {
  background: #c2a374;
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
</style>
