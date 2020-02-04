<template>
	<div>
		<div class="app-order-item">
			<div class="card-bar row-between vertical van-hairline--bottom">
				<p>{{data.barLeftText}}</p>
				<p class="red">{{data.barRightText}}</p>
			</div>
			<div class="card-header flex-row" v-for="(goods, index) in data.goodsList" :key="index">
				<div class="card-image lazy-img-box" v-lazy:background-image="setImg(goods.skuMainPic, { w: 400 })"></div>
				<div class="card-info">
					<div class="row-between">
						<div class="card-name">{{goods.skuName}} </div>
						<div v-if="data.keyword" class="card-keyword red">{{data.keyword}}</div>
					</div>
					<div class="card-title">{{data.title}}</div>
					<div class="card-describe">
						<p class="gray">{{data.describe}}</p>
						<p class="red">￥{{goods.unitPrice}}</p>
					</div>
				</div>
			</div>
			<div class="card-footer row-between van-hairline--top">
				<p>
					<span class="card-price red">{{data.price}}</span>
					<span> (含运费:￥{{data.freightMoney}})</span>
				</p>
				<div class="card-actions">
					<!--<button v-if="allowCancelOrder(data.state)" @click="cancelOrder" class="card-actions-btn van-hairline--surround">取消订单</button>-->
					<!--<button v-if="allowPayOrder(data.state)" @click="payOrder" class="card-actions-btn van-hairline--surround">付款</button>-->
					<button v-if="allowFollOrder(data.state)" @click.stop="getShow" class="card-actions-btn van-hairline--surround">发货</button>
					<button v-if="allowLogistics(data.state)" @click.stop="logistics" class="card-actions-btn van-hairline--surround">查看物流</button>
					<!--<button v-if="allowConfirmGoods(data.state)" @click.stop="confirmGoods" class="card-actions-btn van-hairline--surround">确认收货</button>-->
					<!--<button v-if="allowComment(data.state)" @click="comment" class="card-actions-btn van-hairline--surround">评价</button>-->
					<!--<button v-if="allowDeleteOrder(data.state)" @click="comment" class="card-actions-btn van-hairline--surround">删除订单</button>-->
				</div>
			</div>

		</div>
		<!--<van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
			<van-field v-model="username" label="用户名" placeholder="请输入用户名" />
			<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
		</van-dialog>-->
	</div>

</template>

<script>
	import { setImg } from '~/utils/qiniu'
	import { Dialog } from 'vant'
	import { allowCancelOrder, allowPayOrder, allowLogistics, allowConfirmGoods, allowComment, allowDeleteOrder, allowFollOrder } from '~/utils/status'

	export default {
		props: {
			data: Object,
			ids: [Number, String]
		},
		data() {
			return {
				show: false,
				username: '',
				password: '',
			}
		},
		methods: {
			allowCancelOrder,
			allowPayOrder,
			allowLogistics,
			allowConfirmGoods,
			allowComment,
			allowDeleteOrder,
			allowFollOrder,
			setImg,
			getShow() {
				let orderNumber = this.data.barLeftText.split('订单编号：')[1];
				this.$router.push({name: 'user-mine-newdetail-newfile',query:{id:this.ids,orderNumber}})
			},
			beforeClose(action, done) {
				if(action === 'confirm') {
					setTimeout(done, 1000);
				} else {
					done();
				}
			},
			cancelOrder() {},
			payOrder() {},
			logistics() {
				this.$router.push({
					name: 'swap-order-logistics',
					query: {
						bar: this.ids,
						goods: this.data.goodsList[0].skuMainPic
					}
				})
			},
			async confirmGoods() {
				let bunber = this.data.barLeftText.split('订单编号：')[1];
				Dialog.confirm({
					title: '是否确认收货',
					//message: '弹窗内容'
				}).then(() => {
					// on confirmo
					this.$service('orderReceive', {
						resources: [bunber]
					}).then(res => {
						if(res.success) {
							this.$router.go(0)
						}
					})
				}).catch(() => {
					// on cancel
				});
			},
			comment() {},
			deleteOrder() {}
		}
	}
</script>

<style lang="postcss">
	.app-order-item {
		margin-top: 10px;
		font-size: 13px;
		color: var(--black);
		background-color: white;
		line-height: 18px;
		& .card-bar,
		& .card-header {
			padding: 10px;
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
		& .card-keyword {
			margin-left: 5px;
			width: 90px;
			text-align: right;
		}
		& .card-describe {
			line-height: 22px;
		}
		& .card-price {
			font-size: 15px;
		}
		& .card-footer {
			padding: 10px;
			align-items: center;
		}
		& .card-actions-btn {
			margin-right: 10px;
			padding: 4px 14px;
			background-color: var(--light-gray);
			border: none;
			border-radius: 3px;
			line-height: normal;
			&:after {
				border-radius: 4px;
			}
			&:last-child {
				margin-right: 0;
			}
		}
	}
</style>