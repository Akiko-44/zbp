<template>
<AppView class="Base-goods-detail">
  <AppDetailImages
    :imgs="detail.imgs"
    :info="info"
    title="商品详情"
  />
  <template v-if="detail.id">
    <div class="detail-info">
      <h4 class="detail-goods-title word-break">{{detail.goodsName}}</h4>
      <div class="price row-between item-center">
        <div>
          <span class="gray">当前价 </span><strong>￥{{currentPrice}}</strong>
        </div>
        <span class="gray">{{detail.joinConut}}人报名</span>
      </div>
      <div class="detail-row row-between gray van-hairline--bottom">
        <span v-if="detail.freightPrice == 0">运费: 免运费</span>
        <span v-if="detail.freightPrice != 0">运费: {{detail.freightPrice}}</span>
      </div>
      <div class="detail-row row-between gray van-hairline--bottom">
        <span>拍卖状态: {{goodsState[detail.goodsStatus]}}</span>
        <template v-if="detail.goodsStatus == 10">
          <span>距离结束: {{countdownTime}}</span>
        </template>
        <template v-if="detail.goodsStatus == 2">
          <span>距离开始: {{countdownTime2}}</span>
        </template>
      </div>
      <div class="detail-row row-between gray">
        <span>起拍价: ￥{{detail.upsetPrice}}</span>
        <span>加价幅度: ￥{{detail.skipPrice}}</span>
      </div>
      <div class="detail-row row-between gray van-hairline--bottom">
        <span>保证金: ￥{{detail.deposit}}</span>
        <span>保留价: ￥{{detail.reservePrice}}</span>
      </div>
      <!--<van-cell title="保证金须知" is-link @click="productDetailShow = true" />
      <van-cell title="卖家承诺" is-link @click="productDetailShow = true" />-->
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
            <template v-if="detail.goodsAttrs.length > 0" v-for="item in detail.goodsAttrs">
              <van-cell :title="item.attrName" :value="item.attrValue" />
            </template>
          </van-cell-group>
        </van-tab>
        <van-tab title="出价记录">
          <!--<van-cell-group :border="false">
            <template v-if="detail.goodsAttrs.length > 0" v-for="item in detail.goodsAttrs">
              <van-cell :title="item.attrName" :value="item.attrValue" />
            </template>
          </van-cell-group>-->
          <div class="bidRecord" id="record">
	          <table class="table" border="1" >
	          	<tr>
	          		<th>出价金额</th>
	          		<th>出价人</th>
	          		<th>出价时间</th>
	          	</tr>
	          	<tr v-for="itme in swapGoodsAuctionList">
	          		<td>{{itme.auctionPrice}}</td>
	          		<td>{{itme.userName}}</td>
	          		<td>{{itme.createTime}}</td>
	          	</tr>
	          </table>
          </div>
        </van-tab>
    </van-tabs>
    <AppRecommended />
    <div class="van-submit-bar-space">
      <div class="van-submit-bar">
        
        <div class="van-submit-bar__bar" v-if="isJoin === 0">
          <van-goods-action-mini-btn icon="chat" @click="xiaoneng"/>
          <!--<van-goods-action-mini-btn class="collect" :icon="liked ? 'like' : 'like-o'" @click="collect"/>-->
          <div class="van-submit-bar__price">
            <span class="gray">保证金（未拍到全额退还）</span>
          </div>
          <van-button
            style="width: 138px"
            @click="$router.push({ name: 'swap-auction-apply', query: { id: detail.id } })"
            class="primary-btn"
            type="primary"
          >
            交保证金
          </van-button>
        </div>
        <div class="van-submit-bar__bar" v-if="isJoin === 1 && detail.goodsStatus == 10">
          <van-goods-action-mini-btn icon="chat" @click="xiaoneng"/>
          <!--<van-goods-action-mini-btn :icon="liked ? 'like' : 'like-o'" @click="collect"/>-->
          <div class="van-submit-bar__price">
            <van-stepper class="auction-stepper" :min="currentPrice" :step="detail.skipPrice" v-model="form.auctionPrice" />
          </div>
          <van-button
            style="max-width: 60px"
            :loading="loading"
            @click="offer"
            class="primary-btn"
            size="small"
            type="primary"
          >
            出价
          </van-button>
        </div>
        <div class="van-submit-bar__bar" v-if="isJoin === 2 && detail.goodsStatus == 11 && userId == detail.dealUserId">
          <div class="van-submit-bar__price">
            <p style="text-align: center;">成交价格：<span style="color: #FF0000;">￥{{detail.dealPrice}}</span></p>
          </div>
          <van-button
            style="width: 138px"
            :loading="loading"
            @click="payAuction"
            class="primary-btn"
            type="primary"
          >
            去支付
          </van-button>
        </div>
      </div>
    </div>
  </template>
  <van-dialog
    v-model="auctionShow"
    title="恭喜你竞拍成功！"
    :close-on-click-overlay="true"
    :show-confirm-button="false"
    style="padding: 10px 10px 0 10px;"
  >
    <div class="auction-show">
      <div class="auction-price item">
        <p><span>成交价</span><span class="price">￥{{detail.dealPrice | toRound }}</span></p>
        <p><span>待支付金额</span><span class="price">￥{{detail.dealPrice - detail.deposit | toRound }}</span></p>
      </div>
      <div class="state item" style="text-align: center;">（保证金已抵扣部分成交款）</div>
      <div class="button item">
        <van-button
            style="min-width: 88px"
            :loading="loading"
            @click="noPayAuction"
            class="default-btn"
            type="default"
          >
            暂不支付
          </van-button>
        <van-button
            style="min-width: 88px"
            :loading="loading"
            @click="buy"
            class="primary-btn"
            type="primary"
          >
            去支付
        </van-button>
      </div>
      <p class="state item">自拍卖结束48小时内未完成支付，订单将自动取消！ 保证金也会扣除，请及时支付！</p>
    </div>
  </van-dialog>
  <van-loading color="white" class="app-loading" v-show="detailLoading" />
</AppView>
</template>

<script>
import AppDetailImages from '~/components/swap/goodsDetail/images'
import AppRecommended from '~/components/swap/goodsDetail/recommended'
import { lazyImgHtml, setImg, toRound } from '~/utils/filters'
import { goodsState } from '~/utils/status'
import { getToken } from '~/utils/auth'
import { TimeDifference } from '~/utils/time'
export default {
  components: {
    AppDetailImages,
    AppRecommended
  },
  head () {
    return {
      title: '商品详情'
    }
  },
  beforeMount () {
    this.getDetail()
    if (this.$isLogin()) {
      // 是否报名
      this.$service('swapAuctionJoinCheck', { resources: [this.$route.query.id] })
        .then(result => {
          this.isJoin = +result.data
        })
    }
    if(getToken()){
      this.$loading(this.$service('userCollectCheck', {resources: [this.$route.query.id, 2]}))
        .then(result => {
          this.liked = !result.data
        })
      this.$loading(this.$service('userInfo')).then(result => {
        this.userId = result.data.id
//      this.userId = '2663'
      })
    }
   this.$loading(this.$service('swapGoodsAuctionList', {  data: { goodsId: this.$route.query.id } }))
   	.then(data => {
   		this.swapGoodsAuctionList = data.data.records
        console.log(this.swapGoodsAuctionList)
     })
  },
  watch: {
    auctioning(val) {
      this.auctioning = val
    },
    userId(val) {
    	this.userId = val
    },
    isJoin(val) {
    	this.isJoin = val
    }
  },
  activated() {
    if(this.auctioning){
      this.$router.go(0);
    }
  },
  deactivated () {
    this.$destroy()
  },
  mounted: function () {
    /*this.countdown()*/
  },
  data () {
    return {
    	swapGoodsAuctionList:[],
      goodsState,
      detailLoading: true,
      detail: {
        imgs: []
      },
      shopScore: {},
      info: {},
      describe: '',
      productDetailShow: false,
      form: {
        auctionPrice: 0,
        goodsId: this.$route.query.id
      },
      loading: false,
      isJoin: 0,
      liked:false,
      collectLoading: false,
      auctionShow: false,
      defaultLogo: require('~/assets/images/avatar.png'),
      userId: undefined,
      countdownTime: undefined,
      countdownTime2: undefined,
      auctioning: false
    }
  },
  computed: {
    currentPrice () {
      return this.detail.presentPrice || this.detail.upsetPrice
    }
  },
  methods: {
    setImg,
    lazyImgHtml,
    toRound,
    countdown(){
      let self = this
      const timeDifferenceInstance = new TimeDifference()
      const timeDifferenceInstance2 = new TimeDifference()
      setInterval(function(){
        self.countdownTime = timeDifferenceInstance.format(new Date(), new Date(self.detail.auctionEndTime.replace(/-/g,'/')))
        self.countdownTime2 = timeDifferenceInstance2.format(new Date(self.detail.auctionStartTime.replace(/-/g,'/')), new Date())
        if(self.countdownTime2 == '' || self.countdownTime2 == undefined){
          self.auctioning = true
        }
      }, 1000)
    },
    xiaoneng(){
      this.$native.goToXiaoNeng({keFuId: this.detail.keFuId, id: this.$route.query.id})
    },
    getDetail () {
      // 商品详情
      this.$service('swapAuctionDetail', { resources: [this.$route.query.id] })
        .then(data => data.data)
        .then(this.success)
        .catch(this.fali)
    },
    
    //收藏
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
    // 出价
    offer () {
      this.loading = true
      this.$service('swapAuctionOffer', {
        data: this.form
      })
        .then(() => {
          this.loading = false
          this.$toast({ type: 'success', message: '出价成功' })
          setTimeout(() => {
            location.reload()
          }, 1000)
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 竞拍成功，支付
    payAuction() {
      this.auctionShow = true
    },
    noPayAuction() {
      this.auctionShow = false
    },
    buy () {
      this.$router.push({
        name: 'swap-order-confirm',
        query: {
          skuId: this.detail.goodsSku.id,
          id: this.detail.id,
          number: 1,
          from: 'swap-auction-detail'
        }
      })
    },
    async success (detail) {
      // 分享数据
      this.info = {
        title: detail.goodsName,
        imgUrl: setImg(detail.imgUrl, {w: 100, format: 'jpeg'}),
        link: location.href
      }
      this.detail = detail
      this.countdown()
      this.shopScore = this.detail.shopScore
      this.detailLoading = false
      this.form.auctionPrice = this.currentPrice

      const [ describe ] = await Promise.all([
        // 商品描述数据 swapAuctionList
        this.$service('swapGoodsDesc', {
          resources: [this.$route.query.id]
        })
          .then(result => result.data ? result.data.goodsDesc.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc') : '')
          .catch(() => (''))
          
      ])
      this.describe = describe
      if(this.detail.goodsStatus == 12){
        this.isJoin = -1
      }else if(this.detail.goodsStatus == 11 && this.detail.orderState != null){
        this.isJoin = 2
      }
    },
    fali () {
      this.detailLoading = false
    },
    linkTo (id, type) {
      this.$native.toSwapDetail(id, type)
    },
    farmatDateTime (date) {
    	var y = date.getFullYear();
    	var m = date.getMonth()+1;
    	m = m < 10 ? ('0' + m) : m;
    	var d = date.getDate();
    	d = d < 10 ? ('0' + d) : d;
    	var h = date.getHours();
    	var min = date.getMinutes();
    	min = min < 10 ? ('0' + min) : min;
    	var s = date.getSeconds();
    	s = s < 10 ? ('0' + s) : s;
    	return y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s
    }
  }
}
</script>

<style lang="postcss">
@import "../../../assets/css/swap/goodsDetail.css";
.van-submit-bar-space {
  height: 50px;
}
.auction-stepper .van-stepper__input {
  width: 70px;
  color: var(--red);
}
.auction-show .item{
  padding-bottom: 15px;
}
.auction-show .state{
  font-size: 12px;
  color: #999;
  line-height: 16px;
}
.auction-show .auction-price{
  font-size: 15px;
  color: #333333;
}
.auction-show .auction-price p{
  padding-top: 10px;
}
.auction-show .auction-price p span:first-child{
  display: inline-block;
  margin-right: 58px;
  width: 120px;
  text-align: right;
}
.auction-show .auction-price .price{
  font-weight: bold;
  color: #E31436;
}
.auction-show .button{
  text-align: center;
}
.auction-show button{
  height:32px;
  line-height: 32px;
  border-radius:3px;
}
.auction-show button.van-button--default{
  margin-right: 58px;
  color: #c2a374;
  border:1px solid rgba(194,163,116,1);
}
.van-submit-bar{
  border-top: 1px solid #E5E5E5;
}
.van-goods-action-mini-btn.collect:after{
  border-width: 0.0267rem 0.0267rem 0 0.0267rem;
}
.detail-merchant img{
  width: 44px;
}
.bidRecord{
	padding: 20px 20px 0 20px;
}
.table{
	width:100%; 
	text-align:center;
	border-collapse: collapse; 
	border-spacing: 0; 
}
.table tr{
	height: 30px;
	line-height: 30px;
}
.table tr td{
	 border:1px solid #999;
}
.table tr th{
	border:1px solid #999;
	background: #999;
	color: #fff;
}
</style>
