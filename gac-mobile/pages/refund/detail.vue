<template>
  <div class="refund-detail">
		<!--<NavBar title="服务详情"/>-->
		<van-nav-bar
      title="服务详情"
      left-arrow
      @click-left="onClickLeft"
    />
	  <div class="app-order-item">
			<div class="card-bar row-between vertical van-hairline--bottom">
				<p>订单号：{{detail.orderNumber}}</p>
				<p class="red">{{refundState[detail.auditState]}}</p>
			</div>
			<div class="card-header flex-row" v-for="(goods, index) in detail.revoList" :key="index">
				<div class="card-image lazy-img-box" v-lazy:background-image="setImg(goods.skuMainPic, { w: 400 })"></div>
				<div class="card-info row-between">
					<div>
						<div class="card-name">{{goods.skuName}}</div>
					</div>
					<div class="card-price">
						<p class="red">￥{{goods.unitPrice}}</p>
					</div>
				</div>
				<div class="card-number">
					<p>x{{goods.goodsNumber}}</p>
				</div>
			</div>
			<div class="refundAmount">
				退款金额：{{detail.refundAmount}}
			</div>
			<div class="comment">
				退款描述：{{detail.comment}}
			</div>
			<div class="pic" v-if="detail.picList">
	      <a v-for="pic in detail.picList"><img style="width: 100%;" :src="setImg(pic)"/></a>
	    </div>
		</div>
  </div>
</template>
<script>
import { refundState } from '~/utils/status'
import NavBar from '~/components/dm/navbar/noAppIndex'
import { setImg } from '~/utils/qiniu'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      refundState,
      detail: {}
    }
  },
  deactivated () {
    this.$destroy()
  },
  mounted() {
	  this.$service('refundInfo', { resources: [ this.$route.query.id ] })
	  .then(result => {
	  	this.detail = result.data
	  })
  },
  methods: {
    onClickLeft () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    setImg
  }
}
</script>

<style lang="postcss" scoped>
.refund-detail {
  & .app-order-item {
		border-top: 10px solid #F8F8F8;
		font-size: 13px;
		color: var(--black);
		background-color: white;
		line-height: 18px;
		& .card-bar,
		& .card-header {
			padding: 10px;
			position: relative;
		}
		& .card-image {
			width: 100px;
			height: 100px;
		}
		& .card-info {
			flex: 1;
			margin-left: 10px;
		}
		& .card-name {
			flex: 1;
			margin-bottom: 5px;
		}
		& .card-price {
			font-size: 15px;
		}
		& .card-number{
			position: absolute;
			right: 10px;
			bottom: 10px;
		}
		& .refundAmount{
			font-size: 16px;
			padding: 10px;
			border-top: 10px solid #F8F8F8;
		}
		& .comment{
			font-size: 16px;
			padding: 10px;
		}
		& .pic{
			padding: 16px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			& a{
				display: block;
				width: 100px;
				height: 100px;
				position: relative;
				border-radius: 6px;
				overflow: hidden;
				background: #F8F8F8;
				margin-bottom: 10px;
				& img{
					position: absolute;
					width: 100%;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
}
</style>
