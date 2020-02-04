<template>
<AppView class="Base-goods-detail">
  <AppDetailImages
    :imgs="imgs"
    :info="info"
  />
  <template v-if="detail.id">
    <div class="detail-info" v-once>
      <h4 class="detail-goods-title word-break">{{detail.recycleName}}</h4>
      <div class="price row-between item-center">
        <div>
          <span class="dark-gray">发布时间：{{detail.onSaleTime || detail.createTime}}</span>
        </div>
        <span class="dark-gray">已有0人浏览</span>
      </div>
      <div class="detail-row row-between dark-gray">
        <span>回收类别: {{detail.categoryName}}</span>
        <span>回收商家: {{detail.userName}}</span>
      </div>
      <div class="detail-row row-between dark-gray van-hairline--bottom">
        <span>商家地址: {{detail.provinceName}}{{detail.cityName}}</span>
      </div>
      <!-- <van-cell title="保证金须知" is-link @click="productDetailShow = true" /> -->
      <!-- <van-cell title="卖家承诺" is-link @click="productDetailShow = true" /> -->
    </div>

    <div class="detail-describe">
      <h4 class="detail-title text-align-center">服务详情</h4>
      <div class="word-break" v-lazy-container="{ selector: 'img' }" v-html="lazyImgHtml(detail.recycleDesc)"></div>
    </div>
    <AppRecycleRecommended :userId="detail.userId" />
    <!-- <div class="van-submit-bar-space">
      <div class="van-submit-bar">
        <div class="van-submit-bar__bar" v-if="isJoin === 0">
          <div class="van-submit-bar__price">
            <span class="gray">保证金（未拍到全额退还）</span>
          </div>
          <van-button
            style="width: 138px"
            @click="$router.push({ name: 'swap-auction-apply', query: { id: detail.id } })"
            class="primary-btn"
            type="primary"
          >
            交保证金报名
          </van-button>
        </div>
      </div>
    </div> -->
  </template>
  <van-loading color="white" class="app-loading" v-show="detailLoading" />
</AppView>
</template>

<script>
import AppDetailImages from '~/components/swap/goodsDetail/images'
import AppRecycleRecommended from '~/components/swap/goodsDetail/recycleRecommended'
import { lazyImgHtml, setImg } from '~/utils/filters'

export default {
  components: {
    AppDetailImages,
    AppRecycleRecommended
  },
  beforeRouteUpdate (to, from, next) {
    window.scrollTo(0, 0)
    this.getDetail(to.query.id)
    next()
  },
  beforeMount () {
    this.getDetail(this.$route.query.id)
  },
  deactivated () {
    this.$destroy()
  },
  data () {
    return {
      detailLoading: true,
      detail: {},
      info: {},
      productDetailShow: false,
      imgs: []
    }
  },
  methods: {
    lazyImgHtml,
    getDetail (id) {
      this.reset()
      // 商品详情
      this.$service('swapRecycleDetail', { resources: [id] })
        .then(data => data.data)
        .then(this.success)
        .catch(this.fali)
    },
    reset () {
      this.detailLoading = true
      this.detail = {}
      this.info = {}
      this.imgs = []
    },
    async success (detail) {
      // 分享数据
      this.info = {
        title: detail.recycleName,
        imgUrl: setImg(detail.imgUrl, {w: 100, format: 'jpeg'}),
        link: location.href
      }
      this.detail = detail
      this.detailLoading = false
      this.imgs = [{imgUrl: detail.imgUrl}]
    },
    fali () {
      this.detailLoading = false
    }
  }
}
</script>

<style lang="postcss">
@import "../../../assets/css/swap/goodsDetail.css";
.van-submit-bar-space {
  height: 50px;
}
</style>
