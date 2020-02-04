<template>
	<AppView class="confirm-order" title="提交订单">
		<DefaultAddress ref="address" />
		<div class="block" v-if="cart.cartItemList.length" v-for="(item, index) in cart.cartItemList" :key="index">
			<div class="block-header row-between van-hairline--bottom">
				<div class="vertical">
					<i class="ico-business"></i> &nbsp;
					<span>{{item.merchant}}</span>
				</div>
			</div>
			<div class="block-item" v-for="(goods, i) in item.goods" :key="i">
				<AppCard :data="{
          imgUrl: goods.goodsLogo,
          title: goods.goodsName,
          price: '￥' + (goods.skuPrice),
          num: 'x' + goods.quantity,
          describe: goods.skuDescribe
        }" :class="{'no-border': item.goods.length - 1 === i}" />
				<!-- <AppCard :data="goods" /> -->
			</div>
			<!-- <van-cell-group style="margin-top: -2px;">
        <van-cell title="配送方式"
                  :value="'顺丰 ￥' + item.freightMoney" />
        <van-cell>
          <p>共{{item.goodsNumber}}件商品，总金额为: <span class="red">￥{{getTotal(item.freightMoney, item.goods)}}</span>，运费：<span class="red">￥{{item.freightMoney}}</span></p>
        </van-cell>
      </van-cell-group> -->
			<van-cell-group style="margin-top: -2px;">
				<van-cell class="free-freight" v-if="!(getFreight(item.goods))" title="运费" value="包邮" />
				<van-cell class="theme-color-value" v-else title="运费" :value="'￥' + (getFreight(item.goods))" />
				<van-cell class="theme-color-value" title="合计金额" :value="'￥' + (getTotal(getFreight(item.goods), item.goods)).toFixed(2)" />
				<van-cell class="theme-color-value" title="中宝平代收款" is-link :value="'￥' + (getTotal(getFreight(item.goods), item.goods)).toFixed(2)" @click="collectionShow = true" />
				<!-- <van-cell>
          <p>共一件商品，总金额为: <span class="red">￥{{(detail.price * num + detail.freightPrice).toFixed(2)}}</span>，运费：<span class="red">￥{{detail.freightPrice.toFixed(2)}}</span></p>
        </van-cell> -->
			</van-cell-group>
		</div>
		<van-collapse v-model="activeNames" accordion>
			<van-collapse-item title="开具发票" name="1">
				<van-radio-group v-model="invoiceRadio" @change="invoiceRadioChange" style="display: flex;">
					<van-radio name="1" style="margin-right: 10px;">开票</van-radio>
					<van-radio name="0">不开票</van-radio>
				</van-radio-group>
				<van-dialog v-model="invoiceShow" show-cancel-button :before-close="beforeClose" style="padding: 10px 10px 0 10px;">
					<van-radio-group v-model="receiptRadio" @change="receiptRadioChange" style="display: flex;line-height: 30px;">
						<van-radio name="1">企业</van-radio>
						<van-radio name="2" style="margin-left: 10px;">个人</van-radio>
					</van-radio-group>
					<van-field v-model="companyName" required clearable label="抬头名称" placeholder="请输入抬头名称" />
					<van-field v-show="isReceipt" v-model="code" required clearable label="纳税人识别号" placeholder="纳税人识别号" />
					<van-field v-show="!isReceipt" v-model="code" required clearable :maxlength="11" label="手机号" placeholder="请输入手机号" />
				</van-dialog>
			</van-collapse-item>
		</van-collapse>
		<van-cell-group>
			<van-field v-model="message" label="订单备注" type="textarea" placeholder="选填，先于商家协商一致" rows="1" autosize maxlength="150" />
		</van-cell-group>
		<van-dialog class="contract-dialog" title="电子合同" v-model="contractShow" show-cancel-button :before-close="beforeClose2" style="padding: 10px 10px 0 10px;">
			<ul>
				<li v-for="item in contractDetail" :key="item.id" v-if="item.caseType == 2">
					<p>用户{{item.buyUserName}}在商家{{item.sellName}}购买了如下商品：</p>
					<table border="1">
						<thead>
							<tr>
								<th>商品名称</th>
								<th>原价</th>
								<th>下单时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="citem in item.orderGoodVOList" :key="citem.goodId">
								<td>{{citem.skuName}}</td>
								<td>￥{{citem.unitPrice}}</td>
								<td>{{item.createTime}}</td>
							</tr>
						</tbody>
					</table>
					<div class="tr">
						<span>订单金额: ￥{{item.payMoney}}</span>
						<span>(含运费: ￥{{item.freightMoney}})</span>
					</div>
				</li>
			</ul>
			<p style="width: 100%;height: 200px;overflow-y: auto;">
				<img v-if='arrOrderType.indexOf(5) !== -1' style="width: 100%;" src="../../../assets/images/contract.png" />
				<br />
				<img v-if='arrOrderType.indexOf(6) !== -1' style="width: 100%;" src="../../../assets/images/contractMake.png" />
			</p>
		</van-dialog>
		<van-dialog v-model="collectionShow" class="collect" :show-confirm-button="false">
			<img class="collect-close" @click="collectionShow = false" src="../../../assets/images/collect_close.png" />
		</van-dialog>
		<template v-if="cart.id">
			<div class="height-span">
				<van-submit-bar :price="cart.totalPrice ? cart.totalPrice * 100 : 0" label="实付款：" button-text="提交订单" @submit="submit" :loading="loading" />
			</div>
		</template>
	</AppView>
</template>

<script>
	// import DefaultAddress from '~/components/swap/defaultAddress'
	import DefaultAddress from './defaultAddress'
	import AppCard from '~/components/common/card/item4'

	export default {
		components: {
			DefaultAddress,
			AppCard
		},
		middleware: 'auth',
		data() {
			return {
				loading: false,
				cart: {},
				skuIds: [],
				message: '',
				objCoupon: {},
				activeNames: '',
				isFrom: this.$route.query.from,
				//发票
				invoiceShow: false,
				isReceipt: true,
				invoiceRadio: '0',
				receiptRadio: '1',
				invoiceType: '0',
				companyName: '',
				code: '',
				contractShow: false,
				contractDetail: {},
				arrOrderType: [], //来自定制的商品来源
				isContract: false,
				billId: '',
				skuDescribe: '',
				collectionShow: false
			}
		},
		beforeMount() {
			this.$store.dispatch('user/checkLogin', this.$router)
			if (this.$native.isApp()) {
	    	this.$native.getTitle('提交订单')
	    }
		},
		head() {
			return {
				title: '提交订单'
			}
		},
		activated() {
			// try {
			//   if (localStorage.CartData) {
			//     this.cart = JSON.parse(localStorage.CartData)
			//   }
			// } catch (err) {
			// }
			this.skuIds = this.$route.query.skuIds.split(',')
			this.$loading(this.$service('orderCartList'))
				.then(result => {
					const cart = result.data
					let totalPrice = 0
					let freightPrice = 0
					cart.cartItemList = cart.cartItemList.filter(item => {
						item.goodsNumber = 0
						item.goods = item.goods.filter(goods => {
							if(this.skuIds.includes(goods.goodsSku)) {
								goods.skuDescribe = ''
								goods.skuList.forEach(sku => {
									goods.skuDescribe += sku.specsName + '：' + sku.attrValue + ' '
								})
								item.goodsNumber += goods.quantity
								totalPrice += (goods.quantity * goods.skuPrice)
								freightPrice += (goods.freightPrice * goods.quantity)
							}
							return this.skuIds.includes(goods.goodsSku)
						})
						if(item.goods.length) {
							// freightMoney += item.freightMoney
							return true
						}
					})
					cart.totalPrice = this.$toFixed(totalPrice + freightPrice)
					this.cart = cart
				})
				.catch(() => {})
		},
		beforeRouteEnter(to, from, next) {
			if(from.name === 'user-address' && sessionStorage.getItem('orderInfo')) {
				let orderObj = JSON.parse(sessionStorage.getItem('orderInfo'))
				next(vm => {
					vm.message = orderObj.message
					vm.invoiceShow = orderObj.invoiceShow
					vm.isReceipt = orderObj.isReceipt
					vm.invoiceRadio = orderObj.invoiceRadio
					vm.receiptRadio = orderObj.receiptRadio
					vm.invoiceType = orderObj.invoiceType
					vm.companyName = orderObj.companyName
					vm.code = orderObj.code
				})
			} else {
				next()
			}
		},
		deactivated() {
			let orderObj = {
				message: this.message,
				invoiceShow: this.invoiceShow,
				isReceipt: this.isReceipt,
				invoiceRadio: this.invoiceRadio,
				receiptRadio: this.receiptRadio,
				invoiceType: this.invoiceType,
				companyName: this.companyName,
				code: this.code
			}
			sessionStorage.setItem('orderInfo', JSON.stringify(orderObj))
			this.$destroy()
		},
		methods: {
			// success(detail) {
			//   this.detail = detail
			// },
			getAddressId() {
				let addressId = null
				const addressList = this.$refs.address.addressList
				addressList.forEach(address => {
					if(address.isDefault === 1) {
						addressId = address.id
					}
				})
				if(!addressId) {
					addressId = addressList[0].id
				}
				return addressId
			},
			getSkuList() {
				const data = []
				this.cart.cartItemList.forEach(cart => {
					cart.goods.forEach(goods => {
						data.push({
							skuId: goods.goodsSku,
							goodsNumber: goods.quantity,
							source: goods.goodsSource
						})
					})
				})
				return data
			},
			submit() {
				let that = this
				if(!this.$refs.address.addressList.length) {
					this.$toast('请先填写收货地址')
				}
				if(Number(this.invoiceType) == 1) {
					let TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
					if(this.companyName == '') {
						this.$toast('请填写抬头名称')
						return
					}
					if(this.code == '' & this.isReceipt) {
						this.$toast('请填写纳税人识别号')
						return
					} else if(this.code == '' & (!this.isReceipt)) {
						this.$toast('请填写手机号')
						return
					} else if(!TEL_REGEXP.test(this.code) & (!this.isReceipt)) {
						this.$toast('请填写正确的手机号')
						return
					}
				}
				this.loading = true
				this.$loading(this.$service('orderSubmit', {
						data: {
							'addrId': this.getAddressId(),
							'buySkuDTOList': this.getSkuList(),
							'source': 1,
							'invoiceType': Number(this.invoiceType),
							'companyName': this.companyName,
							'code': this.code,
							'payType': 2,
							'message': this.message
						}
					}), '提交中')
					.then(result => {
						this.loading = false
						that.billId = result.data.id
						sessionStorage.removeItem('orderInfo')
						if(result.success) {
							this.$loading(this.$service('orderContract', {
								resources: [that.billId]
							})).then(contractResult => {
								that.contractDetail = contractResult.data
								if(contractResult.data.length) {
									contractResult.data.forEach(function(item) {
										if(that.arrOrderType.indexOf(item.orderType) < 0) {
											that.arrOrderType.push(item.orderType)
										}
										if(item.caseType == 2) {
											that.contractShow = true
											that.isContract = true
											return null
										} else {
											if(that.$native.isApp()) {
												that.$native.goToPay({
													billID: that.billId,
													payOrderType: 0
												})
											} else {
												if(that.$native.isACity() == 2) {
													that.$native.goToPay({
														billID: that.billId,
														payOrderType: 0
													})
												} else {
													that.$router.replace({
														name: 'swap-order-pay',
														query: {
															id: that.billId
														}
													})
												}

											}
										}
									})
								} else {
									if(that.$native.isApp()) {
										that.$native.goToPay({
											billID: that.billId,
											payOrderType: 0
										})
									} else {
										if(that.$native.isACity() == 2) {
											that.$native.goToPay({
												billID: that.billId,
												payOrderType: 0
											})
										} else {
											that.$router.replace({
												name: 'swap-order-pay',
												query: {
													id: that.billId
												}
											})
										}

									}
								}
							})
						}
					})
					.catch(() => {
						this.loading = false
					})
			},
			getFreight(goods) {
				let freightPrice = 0
				goods.forEach(item => {
					freightPrice += item.freightPrice * item.quantity
				})
				return this.$toFixed(freightPrice)
			},
			getTotal(freightMoney, goods) {
				let goodsPrice = 0
				goods.forEach(item => {
					goodsPrice += item.skuPrice * item.quantity
				})
				return this.$toFixed(freightMoney + goodsPrice)
			},
			beforeClose(action, done) {
				if(action === 'confirm') {
					this.activeNames = ''
					setTimeout(done, 1000)
				} else {
					done();
				}
			},
			beforeClose2(action, done) {
				if(action === 'confirm') {
					if(this.$native.isApp()) {
						this.$native.goToPay({
							billID: this.billId,
							payOrderType: 0
						})
					} else {
						if(this.$native.isACity() == 2) {
							this.$native.goToPay({
								billID: this.billId,
								payOrderType: 0
							})
						} else {
							this.$router.replace({
								name: 'swap-order-pay',
								query: {
									id: this.billId
								}
							})
						}

					}
					setTimeout(done, 1000);
				} else {
					done();
					history.back()
				}
			},
			invoiceRadioChange(name) {
				this.invoiceType = name
				if(name == '0') {
					this.invoiceShow = false
				} else {
					this.invoiceShow = true
				}
			},
			receiptRadioChange(name) {
				this.companyName = ''
				this.code = ''
				this.invoiceType = name
				if(name == '2') {
					//个人发票
					this.isReceipt = false
				} else {
					//企业发票
					this.isReceipt = true
				}
			},
		}
	}
</script>

<style lang="postcss" scoped>
	.confirm-order {
		min-height: 100%;
		& /deep/ .van-button.van-button--danger {
			background: #d67d6b;
			border-color: #d67d6b;
		}
		& /deep/ .van-submit-bar__price {
			text-align: center;
		}
		& /deep/ .van-submit-bar__price-integer {
			color: #fb746e;
		}
		& /deep/ .van-submit-bar__price-decimal {
			color: #fb746e;
		}
		& /deep/ .theme-color-value .van-cell__value {
			color: #fb746e;
		}
		& /deep/ .free-freight .van-cell__value {
			color: #aaaaab;
		}
	}
	
	.block {
		margin-top: 10px;
		/* padding-bottom: 10px; */
		background-color: white;
	}
	
	.block-header {
		padding: 10px 0;
		font-size: 12px;
		& .cart-block-header {
			padding: 5px 0;
			font-size: 12px;
		}
		& .ico-business {
			margin-left: 10px;
		}
	}
	
	.height-span {
		height: 50px;
	}
	
	>>>.no-border .van-hairline--bottom {
		&:after {
			border: none;
		}
	}
	
	.contract-dialog {
		font-size: 14px;
		& p {
			margin-top: 10px;
		}
		& table {
			margin: 5px 0;
			width: 100%;
			border: 1px solid;
			text-align: center;
			& th,
			& td {
				padding: 5px;
			}
		}
	}
	
	.collect.van-dialog {
		overflow: visible;
		width: 311px;
		height: 460px;
		text-align: center;
		background: url("../../../assets/images/collect_bg.png") no-repeat;
		background-size: contain;
		& .collect-close {
			position: absolute;
			top: -34px;
			right: 8px;
			width: 28px;
			height: 53px;
		}
	}
</style>