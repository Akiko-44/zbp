<template>
	<div class="app-order-item">
		<div class="card-bar row-between vertical van-hairline--bottom">
			<p>{{data.barLeftText}}</p>
			<p class="red">{{data.barRightText}}</p>
		</div>
		<p class="red fantright">{{data.swapoutState}}</p>
		<div class="card-header flex-row" v-for="(goods, index) in data.swapIn">
			<div class="card-image lazy-img-box" v-lazy:background-image="setImg(goods.skuMainPic, { w: 400 })"></div>
			<div class="card-info">
				<div class="row-between">
					<div class="card-name vertical ">{{goods.skuName}} </div>
					<div v-if="data.keyword" class="card-keyword red">{{data.keyword}}</div>
				</div>
				<div class="card-title">{{data.title}}</div>
				<div class="card-describe">
					<p class="gray">{{data.describe}}</p>
					<p class="red">￥{{goods.unitPrice}}</p>
				</div>
			</div>
		</div>
		<p class="red fantright borderTop">{{data.state2 != 8 ? (data.swapinState != '待换出人确认'? data.swapinState:''):'已取消' }}</p>
		<div class="card-header flex-row" v-for="(goods, index) in data.swapOutList">
			<div class="card-image lazy-img-box" v-lazy:background-image="setImg(goods.skuMainPic, { w: 400 })"></div>
			<div class="card-info">
				<div class="row-between">
					<div class="card-name">{{goods.skuName}}</div>
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
				<span class="card-price red">￥{{data.freightMoney}}</span>
			</p>
			<div class="card-actions">
				<button v-if="allowOpen(data.state3) && $route.query.type==2" @click.stop="Open" class="card-actions-btn van-hairline--surround">同意交换</button>
        <button v-if="allowSwapCancelOrder(data.state) && data.state2 != 8 && $route.query.type==1" @click.stop="cancelOrder" class="card-actions-btn van-hairline--surround">取消订单</button>
        <button v-if="allowSwapCancelOrder(data.state3) && data.state2 != 8 && $route.query.type==2" @click.stop="cancelOrder" class="card-actions-btn van-hairline--surround">取消订单</button>
        <button v-if="allowPayOrder(data.state) && data.state2 != 8 && $route.query.type==1" @click.stop="payOrder" class="card-actions-btn van-hairline--surround">支付保证金</button>
        <button v-if="allowPayOrder(data.state3)  && $route.query.type==2" @click.stop="payOrder" class="card-actions-btn van-hairline--surround">支付保证金</button>
        <button v-if="allowFollOrder(data.state) && (data.state == 43 || data.state == 47) && $route.query.type==1" @click.stop="getShow" class="card-actions-btn van-hairline--surround">发货</button>
        <button v-if="allowFollOrder(data.state3) && (data.state == 43 || data.state == 46) && $route.query.type==2" @click.stop="getShow" class="card-actions-btn van-hairline--surround">发货</button>
        <!--<button v-if="allowLogistics(data.state)" @click.stop="logistics" class="card-actions-btn van-hairline--surround">查看物流</button>-->
        <button v-if="allowConfirmGoods(data.state) && (data.state3 == 47 || data.state3 == 50) && $route.query.type==1" @click.stop="confirmGoods" class="card-actions-btn van-hairline--surround">确认收货</button>
        <button v-if="allowConfirmGoods(data.state3) && (data.state == 46 || data.state == 49) && $route.query.type==2" @click.stop="confirmGoods" class="card-actions-btn van-hairline--surround">确认收货</button>
        <button v-if="allowComment(data.state) && data.isCommented == 1" @click.stop="comment" class="card-actions-btn van-hairline--surround">评价</button>
				<!--<button v-if="allowDeleteOrder(data.state)" @click="comment" class="card-actions-btn van-hairline--surround">删除订单</button>-->
			</div>
		</div>
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
	</div>
</template>

<script>
  import { Toast } from 'vant'
	import { setImg } from '~/utils/qiniu'
	import { Dialog } from 'vant'
	import { allowSwapCancelOrder, allowPayOrder, allowLogistics, allowConfirmGoods, allowComment, allowDeleteOrder, allowFollOrder ,allowOpen} from '~/utils/status'

	export default {
		props: {
			data: Object,
			ids: [Number, String]
		},
		data() {
			return {
			  showPopup: false,
        columns: ['不想买了', '信息有误', '重新拍', '商家缺货', '其他原因']
			}
		},
		methods: {
			allowSwapCancelOrder,
			allowPayOrder,
			allowLogistics,
			allowConfirmGoods,
			allowComment,
			allowDeleteOrder,
			allowFollOrder,
			allowOpen,
			setImg,
			Open(){
				let orderNumber = this.data.barLeftText.split('订单编号：')[1];
				this.$router.push({name: 'user-address-newOindex',query:{orderNumber}})
			},
			getShow() {
				let orderNumber = this.data.barLeftText.split('订单编号：')[1];
				this.$router.push({
					name: 'user-mine-newdetail-newfile',
					query: {
						type: this.$route.query.type,
						orderNumber
					}
				})
			},
			onConfirm(value, index) {
        this.showPopup = false
        let that = this
        let bunber = this.data.barLeftText.split('订单编号：')[1];
        that.$service('orderSwapCancel', {
          resources: [bunber, this.$route.query.type]
        }).then(res => {
          Toast('取消成功')
          that.$router.go(0)
        })
      },
      onCancel() {
        this.showPopup = false
      },
			cancelOrder() {
        this.showPopup = true
        let tabulW = document.querySelectorAll('.van-pull-refresh__track')
        for(let i = 0; i < tabulW.length; i++){
          tabulW[i].style.transform = 'none'
        }
				/*let that = this
				let bunber = this.data.barLeftText.split('订单编号：')[1];
				Dialog.confirm({
					title: '是否取消订单',
				}).then(() => {
					// on confirmo
					that.$service('orderSwapCancel', {
						resources: [bunber, this.$route.query.type]
					}).then(res => {
						that.$router.go(0)
					})
				}).catch(() => {
					// on cancel
				});*/
			},
			payOrder() {
				let num = ['', 2, 1]
				let bunber = this.data.barLeftText.split('订单编号：')[1];
				this.$service('orderCaution', {
					resources: [bunber, this.$route.query.type]
				}).then(res => {
					this.$native.goToPay({
						billID: res.data.id,
						payOrderType: 0
					})
				})
				//				this.$native.goToPay({
				//					billID: this.ids,
				//					orderID: bunber
				//				})
			},
			logistics() {
				let bunber = this.data.barLeftText.split('订单编号：')[1];
				this.$router.push({
					name: 'swap-order-logistics',
					query: {
						bar: bunber,
						type: this.$route.query.type,
						goods: this.data.swapOutList[0].skuMainPic
					}
				})
			},
			confirmGoods() {
				let bunber = this.data.barLeftText.split('订单编号：')[1];
				Dialog.confirm({
					title: '是否确认收货',
					//message: '弹窗内容'
				}).then(() => {
					// on confirmo
					let nun = ['',2,1]
					this.$service('orderSwapReceive', {
						resources: [bunber,this.$route.query.type]
					}).then(res => {
						if(res.success) {
							this.$router.go(0)
						}
					})
				}).catch(() => {
					// on cancel
				});
				
			},
			comment() { // 评论
				this.$router.push({
					name: 'swap-order-comment',
					query: {
						id: this.ids
					}
				})
			},
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
		& .fantright {
			padding: 0 2.5%;
			text-align: right;
			height: 30px;
			line-height: 30px;
		}
		& .borderTop {
			border-top: 1px solid #f4f4f4;
		}
	}
</style>