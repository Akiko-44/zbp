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
          <span class="gray" v-if="detail.freightPrice == 0">运费: 免运费</span>
          <span class="gray" v-if="detail.freightPrice != 0">运费: {{detail.freightPrice}}</span>
        </div>
        <div class="detail-row row-between gray van-hairline--bottom">
          <span>分类: {{detail.categoryName}}</span>
          <span>品牌: {{detail.brandName}}</span>
          <span>已卖出{{detail.sellCount}}笔</span>
        </div>
      </div>
      
      <goodSku @success="confirmSuccess" :detail="detail" ref="mychild"/>
      <goodsCoupon :couponsList="detail.coupons"/>

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
            <template v-if="detail.hsMark">
              <van-cell title="鉴定机构" :value="detail.hsMark.hsMarkName" />
            </template>
            <van-cell title="分类" :value="detail.categoryName" />
            <van-cell title="品牌" :value="detail.brandName" />
          </van-cell-group>
        </van-tab>
        <van-tab title="用户评论">
          <div class="detail-comments">
            <!--<van-cell :title="'商品评价 ('+ comments.length +')'" />-->
            <AppDetailComment
              v-for="(comment, index) in comments"
              :key="index"
              :comment="comment"
            />
            <p class="text-align-center" v-if="!comments.length" style="color: #999999;">我们是有底线的平台</p>
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
    </template>
    
    <div class="app-goods-action-space">
		  <van-goods-action>
		    <van-goods-action-mini-btn icon="chat" @click="xiaoneng"/>
		    <van-goods-action-mini-btn :icon="liked ? 'like' : 'like-o'" @click="collect"/>
		    <van-goods-action-big-btn text="加入购物车" @click="addCart" />
			  <van-goods-action-big-btn text="立即购买" @click="buy" primary />
		  </van-goods-action>
		</div>

    <van-loading color="white" class="app-loading" v-show="detailLoading" />
  </AppView>
</template>

<script>
import goodSku from './goodSku'
import goodsCoupon from './goodsCoupon'
import AppDetailImages from '~/components/swap/goodsDetail/images'
import AppDetailComment from '~/components/swap/goodsDetail/commentItem'
import AppRecommended from '~/components/swap/goodsDetail/recommended'
import { lazyImgHtml, setImg } from '~/utils/filters'
import { getToken } from '~/utils/auth'
import { finenessState } from '~/utils/status'

export default {
  components: {
    AppDetailImages,
    AppDetailComment,
    AppRecommended,
    goodSku,
    goodsCoupon
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
      sale:{},
      describe: '',
      comments: [],
      info: {},
      productDetailShow: false,
      liked:false,
      collectLoading: false,
      skuObj:{},
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
    xiaoneng(){
      this.$native.goToXiaoNeng({keFuId: this.detail.keFuId, id: this.$route.query.id})
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
    confirmSuccess(skuObj) {
      this.skuObj = skuObj
    },
    collect () {
      if (this.collectLoading) return
      this.collectLoading = true
      const serviceName = !this.liked ? 'userCollect' : 'userDeleteCollect'
      this.$service(serviceName, {
        resources: [this.detail.id, 2]
      }).then(() => {
        this.collectLoading = false
        this.liked = !this.liked
      }).catch(() => {
        this.collectLoading = false
      })
    },
    addCart () {
      if(getToken()){
        this.$refs.mychild.show = true
        if(!this.skuObj.id){
          this.$toast('请选择规格')
          return
        }
      }else{
        this.$native.goToLogin()
      }
      /*if (this.addLoading) return
      if(!this.skuObj.id){
      	this.$toast('请选择规格')
      	return
      }
      this.addLoading = true

      this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: this.detail.id,
          goodsSku: this.skuObj.id,
          number: this.skuObj.num,
          goodsSource: 2
        }
      }), '添加中').then(() => {
        this.$toast({ type: 'success', message: '添加成功' })
        this.addLoading = false
      }).catch(() => {
        this.addLoading = false
      })*/
    },
    buy () {
      if(getToken()){
        this.$refs.mychild.show = true
      	if(!this.skuObj.id){
        	this.$toast('请选择规格')
        	return
        }
        /*this.$router.push({
          name: 'swap-order-confirm',
          query: {
            id: this.detail.id,
            skuId: this.skuObj.id,
            from: this.$route.name
          }
        })*/
      }else{
        this.$native.goToLogin()
      }
    },
    linkTo (id, type) {
      this.$native.toSwapDetail(id, type)
    }
  }
}
</script>

<style lang="postcss">
@import "../../../assets/css/swap/goodsDetail.css";
body .van-tab.van-tab--active span{
  color: #333333;
}
body .van-tabs__line{
  background-color: #D0323D;
}
.detail-merchant img{
  width: 44px;
}
</style>
