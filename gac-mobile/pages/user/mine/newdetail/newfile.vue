<template>
	<AppView title="发货">
		<div>
			<van-cell-group>
				<van-field v-model="aaa" label="物流公司" placeholder="请输入物流公司" @click="btnIN" />
			</van-cell-group>

			<van-cell-group>
				<van-field v-model="bbb" label="订单编号" placeholder="请输入订单编号" />
			</van-cell-group>

			<van-cell-group>
				<van-field v-model="ccc" label="备注" type="textarea" placeholder="请输入备注" rows="1" autosize />
			</van-cell-group>
			<van-button size="large" class="marTop" @click="btn">点击发货</van-button>
		</div>
		<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
	</AppView>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				actions: [],
				aaa: undefined,
				bbb: undefined,
				ccc: undefined,
				form: {},
				disabled: false,
			}

		},
		wacth: {
			$route() {
				this.act()
			}
		},
		beforeMount() {
			this.act()
		},
		activated(){
		  this.act()
		},
		methods: {
			btnIN() {
				this.show = true
			},
			act() {
				this.$service('orderExpress').then(res => {
					let actions = []
					res.data.map(item => {
						actions.push({
							name: item
						})
					})
					this.actions = actions
				})
			},
			btn() {
				if(this.aaa && this.bbb) {
					if(this.$route.query.id) {
						this.$service('orderSend', {
							resources: [this.$route.query.orderNumber],
							data: {
								expressCompany: this.aaa,
								expressNum: this.bbb,
								orderId: this.$route.query.id,
								remark: this.ccc
							}
						}).then(res => {
							if(res.success) {
								this.$router.go(-1)
							}
						})
					} else {
						this.$service('orderSwapSend', {
							resources: [this.$route.query.orderNumber, this.$route.query.type],
							data: {
								expressCompany: this.aaa,
								expressNum: this.bbb,
								orderId: this.$route.query.orderNumber, // this.$route.query.id,
								remark: this.ccc
							}
						}).then(res => {
							if(res.success) {
								this.$router.go(-1)
							}
						})
					}

				} else {
					console.log('前两项为必填项')
				}
			},
			onSelect(item) { // 点击选项时默认不会关闭菜单，可以手动关闭
				this.show = false;
				this.aaa = item.name
				if(this.aaa && this.bbb) {
					this.disabled = true
				}
			}
		}
	}
</script>

<style lang="postcss" scoped>
	.marTop {
		margin-top: 15px;
	}
</style>