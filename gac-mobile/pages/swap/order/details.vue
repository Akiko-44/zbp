<template>
	<AppView title="订单详情">
		<div class="Order-detail-page" v-if="detail.orderNumber">
			<div class="detail-title">
				<!-- <div class="t-icon">
          <i class="ico-wait_time"></i>
        </div> -->
				<div class="t-cont">
					<p class="t-title">{{detail.state | orderState}}</p>
					<!-- <p class="t-desc">剩余23小时24分自动关闭订单</p> -->
				</div>
			</div>
			<div class="receiving-address-bar van-hairline--bottom">
				<i class="ico-address"></i>
				<div class="receiving-info">
					<p class="recipients">
						<span class="recipients-name">{{detail.userInfoVO.username}}</span>
						<span>{{detail.userInfoVO.mobile}}</span>
					</p>
					<p class="receiving-address">
						<span>收货地址：</span>
						<span>{{detail.userInfoVO.shippingAddr}}</span>
					</p>
				</div>
			</div>
			<div class="goods">
				<AppCard v-for="(goods, i) in detail.orderGoodVOList" :key="i" :data="{
            imgUrl: goods.skuMainPic,
            name: goods.skuName,
            keyword: '￥' + goods.unitPrice,
            describe: '',
            important: ''
          }" />
			</div>
			<div class="order-info">
				<ul class="van-hairline--bottom">
					<li>
						<span>订单编号</span>
						<span class="t-right">{{detail.orderNumber}}</span>
					</li>
					<li>
						<span>商家名称</span>
						<span class="t-right">{{detail.sellUserName}}</span>
					</li>
					<li>
						<span>商品总价</span>
						<span class="t-right">￥{{detail.goodsTotalMoney}}</span>
					</li>
					<li>
						<span>运费</span>
						<span class="t-right">￥{{detail.freightMoney}}</span>
					</li>
					<li>
						<span>订单总价</span>
						<span class="t-right">￥{{detail.payMoney}}</span>
					</li>
				</ul>
				<div class="Payment">
					<span>需付款</span>
					<span class="t-right red">￥{{detail.payMoney}}</span>
				</div>
			</div>
			<div class="contact-way">
				<div class="bg">联系买家</div>
				<!--        <div v-if="allowConfirmGoods($route.query.state)" @click="Okcargo">确认收货</div>-->
				<div v-if="allowFollOrder($route.query.state)" @click="getShow">发货</div>
				<div v-if="allowLogistics($route.query.state)" @click="logistics">查看物流</div>
			</div>
			<!-- <div class="Recommend">—— 为您推荐 ——</div> -->
			<!-- <div style="background:#ededed;line-height:100px;">商品信息栏</div> -->
			<!--<div class="actions">
        <van-button
          :loading="canceling"
          @click="cancel"
          class="primary-outline-btn min"
          type="primary"
        >
          取消订单
        </van-button>
        &#12288;
        <van-button
          :loading="editing"
          @click="edit"
          class="primary-btn min"
          type="primary"
        >
          修改订单
        </van-button>
      </div>-->
		</div>
	</AppView>
</template>

<script>
	import AppCard from '~/components/common/card/item3'
	import { allowCancelOrder, allowPayOrder, allowLogistics, allowConfirmGoods, allowComment, allowDeleteOrder, allowFollOrder } from '~/utils/status'
	export default {
		components: {
			AppCard
		},
		data() {
			return {
				canceling: false,
				editing: false,
				pdcargo: false,
				show: false,
				detail: {
					userInfoVO: {},
					orderGoodVOList: []
				}
			}
		},
		computed: {},
		middleware: 'auth',
		beforeMount() {
			this.$store.dispatch('user/checkLogin', this.$router)
		},
		activated() {
			this.$loading(this.$service('orderSwapInfo', {
					resources: [this.$route.query.orderNumber]
				}))
				.then(result => {
					this.detail = result.data
				})
		},
		methods: {
			getShow(){
				let orderNumber = this.detail.orderNumber
				this.$router.push({name: 'user-mine-newdetail-newfile',query:{id:this.$route.query.id,orderNumber}})
			},
			cancel() {},
			edit() {},
//			async Okcargo() {
//				let orderNo = await this.$service('orderReceive', {
//					resources: [this.detail.orderNumber]
//				})
//				if(orderNo.success) this.$router.go(-1)
//			},
			logistics() { // 查看物流
				this.$router.push({
					name: 'swap-order-logistics',
					query: {
						bar: this.$route.query.id,
						goods: this.$route.query.img
					}
				})
			},
			allowCancelOrder,
			allowPayOrder,
			allowLogistics,
			allowConfirmGoods,
			allowComment,
			allowDeleteOrder,
			allowFollOrder
		}
	}
</script>

<style lang="postcss">
	.Order-detail-page {
	  padding-bottom: 49px;
		& .detail-title {
			width: 100%;
			height: 70px;
			background: #8b0f1a;
			display: flex;
			justify-content: center;
			align-items: center;
			& .t-icon {
				width: 34px;
				height: 34px;
				margin-right: 10px;
				& .ico-wait_time {
					width: 100%;
					height: 100%;
				}
			}
			& .t-cont {
				color: #fff;
				& .t-title {
					font-size: 18px;
				}
				& .t-desc {
					margin-top: 4px;
					font-size: 12px;
				}
			}
		}
		& .receiving-address-bar {
			width: 100%;
			height: 90px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 10px;
			word-wrap: break-word;
			box-sizing: border-box;
			& .ico-address {
				width: 30px;
				height: 30px;
				margin-right: 10px;
			}
			& .receiving-info {
				width: calc(100% - 40px);
				font-size: 13px;
				color: #333;
				line-height: 15px;
				& .recipients {
					margin-bottom: 5px;
					& .recipients-name {
						margin-right: 10px;
					}
				}
				& .eceiving-address {}
			}
		}
		& .order-info {
			font-size: 15px;
			& ul li {
				padding: 0 10px;
				line-height: 30px;
				position: relative;
			}
			& .Payment {
				position: relative;
				padding: 0 10px;
				line-height: 40px;
			}
			& .t-right {
				position: absolute;
				right: 10px;
			}
		}
		& .contact-way {
			display: flex;
			& div {
				width: 50%;
				text-align: center;
				line-height: 40px;
				border-top: 1px solid #333;
				border-bottom: 1px solid #333;
				color: #333;
				font-size: 15px;
			}
			& .bg {
				background: #333;
				color: #fff;
			}
		}
		& .Recommend {
			line-height: 50px;
			color: #333;
			font-size: 18px;
			text-align: center;
		}
		& .goods {
			margin-bottom: 10px;
		}
		& .app-card-item3 .card-footer {
			padding: 0;
		}
		& .actions {
			padding: 20px 0;
			text-align: center;
		}
	}
</style>