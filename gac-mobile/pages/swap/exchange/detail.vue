<template>
  <AppView class="Base-goods-detail" :title="orderToDetail==true ? '商品详情' : ''" :clickLeft="onClickLeft">
    <AppDetailImages
      :imgs="detail.imgs"
      :info="info"
      title="商品详情"
    />
    <template v-if="detail.goodsName">
      <div class="detail-info">
        <h4 class="detail-goods-title word-break">{{detail.goodsName}}</h4>
        <div class="price row-between item-center">
          <div>
            <strong>￥{{detail.price}}</strong>
          </div>
          <span class="gray">{{detail.finenessText}}</span>
        </div>
        <div class="detail-row row-between gray van-hairline--bottom">
          <span>分类: {{detail.categoryName}}</span>
          <span>品牌: {{detail.brandName}}</span>
          <span>已卖出{{detail.sellCount}}笔</span>
        </div>
        <div class="detail-row row-between gray van-hairline--bottom">
          <span v-if="detail.freightPrice == 0">运费: 免运费</span>
          <span v-if="detail.freightPrice != 0">运费: {{detail.freightPrice}}</span>
        </div>
        <!--<van-cell title="产品参数" is-link @click="productDetailShow = true" />-->
      </div>

      <div class="detail-merchant" @click="linkTo(detail.userId, detail.userType)" v-if="shopScore != ''">
        <img :src="setImg(shopScore.logo, { w: 44 })"/>
        <div style="margin-left: 50px;overflow: hidden;">
          <h4>{{detail.userName}}</h4> 
          <span class="enter">进入店铺</span>
        </div>
        <div class="rate">
          <span>宝贝描述<span class="red">{{shopScore.spmxxfWholeScore==''?0:shopScore.spmxxfWholeScore.toFixed(1)}}</span></span>
          <span>卖家服务<span class="red">{{shopScore.mjfwtdWholeScore==''?0:shopScore.mjfwtdWholeScore.toFixed(1)}}</span></span>
          <span>物流速度<span class="red">{{shopScore.wlfhsdWholeScore==''?0:shopScore.wlfhsdWholeScore.toFixed(1)}}</span></span>
        </div>
      </div>
      <div class="detail-merchant" @click="linkTo(detail.userId, detail.userType)" v-else>
        <img :src="defaultLogo" style="width: 44px;"/>
        <div style="margin-left: 50px;overflow: hidden;">
          <h4>{{detail.userName}}</h4> 
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
        :line-width="58"
        :line-height="2"
      >
        <van-tab title="商品描述">
          <div class="detail-describe">
            <div class="word-break" v-lazy-container="{ selector: 'img' }" v-html="lazyImgHtml(describe)"></div>
          </div>
        </van-tab>
        <van-tab title="商品参数">
          <van-cell-group :border="false">
            <van-cell title="发布时间" :value="detail.createTime" />
            <van-cell title="分类" :value="detail.categoryName" />
            <van-cell title="品牌" :value="detail.brandName" />
          </van-cell-group>
        </van-tab>
      </van-tabs>

      <!--<div class="detail-comments">
        <van-cell :title="'商品评价 ('+ comments.length +')'" />
        <AppDetailComment
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
        />
        <p class="text-align-center" v-if="!comments.length">暂无评价</p>
      </div>-->

      <!--<div class="detail-describe">
        <h4 class="detail-title text-align-center">商品详情</h4>
        <div class="word-break" v-lazy-container="{ selector: 'img' }" v-html="lazyImgHtml(describe)"></div>
      </div>-->

      <!--<AppRecommended />-->

      <AppGoodsActions :detail="detail" />

      <!--<van-actionsheet v-model="productDetailShow" title="产品参数">
        <van-cell-group :border="false">
          <van-cell title="发布时间" :value="detail.createTime" />
          <template v-if="detail.hsMark">
            <van-cell title="鉴定机构" :value="detail.hsMark.hsMarkName" />
          </template>
          <van-cell title="分类" :value="detail.categoryName" />
          <van-cell title="品牌" :value="detail.brandName" />
        </van-cell-group>
      </van-actionsheet>-->
    </template>

    <van-loading color="white" class="app-loading" v-show="detailLoading" />
  </AppView>
</template>

<script>
import AppDetailImages from '~/components/swap/goodsDetail/images'
import AppDetailComment from '~/components/swap/goodsDetail/commentItem'
import AppGoodsActions from './goodsActions'
import AppRecommended from '~/components/swap/goodsDetail/recommended'
import { lazyImgHtml, setImg } from '~/utils/filters'
import { finenessState } from '~/utils/status'
import { getToken } from '~/utils/auth'

export default {
  components: {
    AppDetailImages,
    AppDetailComment,
    AppGoodsActions,
    AppRecommended
  },
  head () {
    return {
      title: '商品详情'
    }
  },
  beforeRouteUpdate (to, from, next) {
    window.scrollTo(0, 0)
    this.getData(to.query.id)
    next()
  },
  beforeMount () {
    this.getData(this.$route.query.id)
    if(getToken()){
      this.$loading(this.$service('userCollectCheck', {resources: [this.$route.query.id, 2]}))
        .then(result => {
          this.liked = !result.data
        })
    }
    if(this.$route.query.orderToDetail){
      this.orderToDetail = true
    }
  },
  data () {
    return {
      detailLoading: false,
      detail: {
        imgs: [],
        finenessText: ''
      },
      shopScore: {},
      describe: '',
      comments: [],
      info: {},
      productDetailShow: false,
      liked:false,
      collectLoading: false,
      orderToDetail: false,
      defaultLogo: require('~/assets/images/avatar.png')
    }
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    setImg,
    lazyImgHtml,
    onClickLeft () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    getData (id) {
      this.reset()
      this.$service('swapGoodsDetail', {
        resources: [id]
      })
        .then(data => data.data)
        .then(this.success)
        .catch(this.fali)
    },
    reset () {
      this.detailLoading = true
      this.detail = { imgs: [] }
      this.describe = ''
      this.comments = []
      this.info = {}
    },
    async success (detail) {
      // 分享数据
      this.info = {
        title: detail.goodsName,
        imgUrl: setImg(detail.imgUrl, {w: 100, format: 'jpeg'}),
        link: location.href
      }
      if(this.liked){
        detail.liked = true
      }else{
        detail.liked = false
      }
      
      this.detail = detail
      this.shopScore = this.detail.shopScore
      this.detailLoading = false
      this.detail.finenessText = finenessState[this.detail.deprecition]

      const [ describe, comments ] = await Promise.all([
        // 商品描述数据
        this.$service('swapGoodsDesc', {
          resources: [this.$route.query.id]
        })
          .then(result => result.data ? result.data.goodsDesc : '')
          .catch(() => ('')),
        // 评论数据
        this.$service('userComment', { resources: [this.$route.query.id, 1], data: { offset: 1, limit: 8 } })
          .then(result => result.data ? result.data.records : [])
          .catch(() => ([]))
      ])
      this.comments = comments
      this.describe = describe.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
    },
    fali () {
      this.detailLoading = false
    },
    linkTo (id, type) {
      this.$native.toSwapDetail(id, type)
    }
  }
}
</script>

<style lang="postcss">
@import "../../../assets/css/swap/goodsDetail.css";
.detail-merchant img{
  width: 44px;
}
</style>
