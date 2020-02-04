<template>
	<AppView title="服务商详情">
		<div class="detail">
			<h2 class="title">{{providerInfo.serviceName}}</h2>
			<div class="price-box">
				<span class="price-name"></span><span class="price">¥ {{providerInfo.serviceFee}}</span>
				<p class="price-description">＊此价格为参考价格，具体报价根据业务下单后， 工作人员会及时联系你
				</p>
				<div class="description">
					服务保障<i class="icon"></i>承诺按时按质保证完成
				</div>
			</div>
			<div class="introduce">
				<p class="brief">
					<span @click="handleIntroduction(1)" :class="{active:isIntroduction==1}">公司简介</span>
					<span @click="handleIntroduction(2)" :class="{active:isIntroduction==2}">业务简介</span>
				</p>
				<p class="detail" v-html="introduction"></p>
			</div>
			<div class="introduction-box">
				<img :src="providerInfo.serviceImg" />
			</div>
		</div>

	</AppView>
</template>

<script>
	import ListModule from '~/components/common/list'
	export default {
		data() {
			return {
				id: this.$route.query.id,
				providerInfo: {},
				introduction: "",
				isIntroduction: 1
			}
		},
		beforeMount() {
			this.getProviderInfo(this.id)
		},
		methods: {
			getProviderInfo(id) { //栏目列表
				this.$service('providerServiceInfo', {
					resources: [id],
				}).then(result => {
					var data = result.data;
					if(data) {
						this.providerInfo = data
						this.handleIntroduction(1)
					}
				}).catch(() => {

				})
			},
			handleIntroduction(type) {

				if(type == 1) {
					this.introduction = this.providerInfo.companyDesc
					this.isIntroduction = 1
				} else {
					this.introduction = this.providerInfo.serviceDesc
					this.isIntroduction = 2
				}
			}
		},
		components: {

		}
	}
</script>

<style lang="postcss" scoped>
	.detail {
		padding: 0 15px;
		& .title {
			color: #666;
			height: 45px;
			line-height: 35px;
		}
		& .price-box {
			color: #fff;
			background-color: #890f1c;
			padding: 11px;
			line-height: 1.5;
			& .price-name {
				/*font-size: 12px;*/
			}
			& .price-description {
				font-size: 12px;
			}
			& .description {
				margin: auto;
				width: 80%;
				background-color: #fff;
				color: #000;
				margin-top: 10px;
				font-size: 13px;
				padding: 5px 10px;
				& .icon {
					width: 14px;
					height: 14px;
					background: url(/icons/bao.png) center center / contain no-repeat;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		& .introduce {
			background-color: #E7E7E7;
			& .brief {
				height: 30px;
				padding: 10px 0;
				line-height: 30px;
				& .active {
					color: #890f1c;
				}
				& span {
					text-align: center;
					display: inline-block;
					box-sizing: border-box;
					width: 50%;
					&:first-child {
						border-right: 3px solid #fff;
					}
				}
			}
			& .detail {}
		}
		& .introduction-box {
			text-align: center;
			& img {
				width: 100%;
			}
		}
	}
</style>