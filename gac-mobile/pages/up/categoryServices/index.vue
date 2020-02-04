<template>
	<AppView class="up-and-down" :title="title">
		<van-row gutter="50">
			<van-col span="12">
				<div class="record-box">
					<span class="serve">服务</span>
					<p>{{servService.detail}}</p>
				</div>
			</van-col>
			<van-col span="12">
				<div class="record-box">
					<span class="serve">服务</span>
					<p>{{servService.detail1}}</p>
				</div>
			</van-col>
		</van-row>
		<div class="summary">
			为您找到{{servProviderRel.length}}家服务商，带有 <i class="icon"></i>标识为中宝协会担保交易 的服务商
		</div>
		<div class="consulting">
			<div class="means" v-for="item in servProviderRel">
				<dl class="organization clearfix">
					<dt class="fl"><img :src="domain+'/'+item.logo"/></dt>
					<dd class="organization-box">
						<p class="title">{{item.companyName}}<i class="icon"></i></p>
						<p class="text"><i class="icon"></i>已实名审核认证</p>

					</dd>
				</dl>
				<div class="introduce clearfix">
					<p class="detail" v-html="item.serviceTimeDesc">
						专业的律师团队，执业17年，深圳市政府决策咨询专家以及政协委员的精英团队组成
					</p>
					<button class="btn fr" @click="handleOrdRes(item)">订单申请</button>
					<button class="btn fr" @click="handleGo(item)">查看详情</button>
					<button class="btn fr">在线咨询</button>
				</div>
			</div>
		</div>
	</AppView>
</template>

<script>
	import ListModule from '~/components/common/list'
	import { domain } from '@/utils/qiniu'
	export default {
		data() {
			return {
				domain,
				servService: {},
				id: this.$route.query.id,
				title: this.$route.query.title,
				servProviderRel: [],
				activeKey: 0,
				categorysList: [],
				categoryServices: [],
			}
		},
		beforeMount() {

			this.getServiceInfo(this.id)
		},
		methods: {
			handleCategory() {
				this.activeKey = key;
			},
			getServiceInfo(id) { //服务信息
				this.$service('serviceInfo', {
					resources: [id],
				}).then(result => {
					var data = result.data;
					console.log(data)
					this.servService = data
					this.getProviderList(data.id)
				}).catch(() => {

				})
			},
			getProviderList(id) {
				this.$service('provider', {
					resources: [id],
				}).then(result => {
					var data = result.data;
					this.servProviderRel = data
				}).catch(() => {

				})
			},
			handleOrdRes(item) {
				this.$router.push({
					path:"/up/apply",
					query:{
						
					}
				})
			},
			handleGo(item) {
				this.$router.push({
					path:"/up/detail",
					query:{
						id:item.id
					}
				})
			}
		},
		components: {
			ListModule
		}
	}
</script>

<style lang="postcss" scoped>
	.up-and-down {
		padding: 0 10px;
		& .record-box {
			border: 1px solid #eee;
			position: relative;
			height: 71px;
			font-size: 13px;
			padding: 10px;
			line-height: 1.4;
			& .serve {
				position: absolute;
				right: 0;
				top: 0;
				width: 32px;
				height: 15px;
				line-height: 15px;
				font-size: 12px;
				background-color: #c2a374;
				text-align: center;
			}
		}
	}
	
	.summary {
		font-size: 12px;
		border: 2px solid #890F1C;
		padding: 5px;
		border-radius: 20px;
		margin-top: 10px;
		& .icon {
			width: 14px;
			height: 14px;
			background: url(/icons/bao.png) center center / contain no-repeat;
			display: inline-block;
			vertical-align: middle;
		}
	}
	
	.consulting {
		& .means {
			margin-top: 20px;
			& .organization {
				& .fl {
					width: 50px;
					& img {
						max-width: 100%;
					}
				}
				& .organization-box {
					padding-left: 60px;
					
					& p {
						padding: 0;
						margin: 0;
						line-height: 1.4;
					}
					& .title {
						& .icon {
							width: 14px;
							height: 14px;
							background: url(/icons/bao.png) center center / contain no-repeat;
							display: inline-block;
							vertical-align: middle;
						}
					}
					& .text {
						font-size: 12px;
						color: #1D1D1D;
						& .icon {
							width: 16px;
							height: 16px;
							background: url(/icons/phoneSuccess.png) center center / contain no-repeat;
							display: inline-block;
							vertical-align: middle;
						}
					}
				}
			}
			& .introduce {
				& .detail {
					min-height: 30px;
				}
				& .btn {
					padding: 0;
					border-radius: 10px;
					width: 76px;
					height: 25px;
					line-height: 19px;
					border: 2px solid #890f1c;
					background-color: #fff;
					margin-right: 10px;
					font-size: 14px;
				}
			}
		}
	}
</style>