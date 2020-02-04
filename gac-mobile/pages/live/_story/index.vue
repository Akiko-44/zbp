<template>
	<ListModule class="detail list-module" :query="query" ref="list" :getData="() => this.$service('liveShowList', { data: this.query })">
		<template slot-scope="{ list }">
			<div class="video-box">
				<div class="video">
					<img :src="firstDetail.userLogo" />
				</div>
				<div class="live-info">
					<span class="status"><i class="point succ"></i>直播中</span><span class="num">{{firstDetail.watchNum}}观看</span>
				</div>
			</div>
			<dl class="user-box clearfix">
				<dt class="fl">
				<img :src="firstDetail.userLogo?firstDetail.userLogo:'http://img4.imgtn.bdimg.com/it/u=3702557683,740671603&fm=27&gp=0.jpg'">
			</dt>
				<dd class="" style="">
					<p>
						<span class="title ellipsis" v-text="firstDetail.userName">周大生独立设计师</span>
						<span class="identify">实名认证</span>
					</p>
					<p class="describe live-num">直播号：{{firstDetail.userId}} {{firstDetail.liveTitle}}</p>
				</dd>
			</dl>
			<dl class="goods-box clearfix">
				<dt class="fl">
				<img src="http://pa95ui71l.bkt.clouddn.com/gallery_1dWExmSGQjY2Ft7_441_235.png?imageView2/2/format/webp/w/800">
			</dt>
				<dd class="" @click="$route.push(firstDetail.storeUrl)">
					<p class="title ellipsis-two" v-text="firstGoods.goodsName">和田玉吊坠金镶玉项链凤凰吊坠女士白玉吊 坠天然玉石挂坠</p>
					<p class="goods-details clearfix">
						<span class="price">￥<span v-text="firstGoods.goodsPirce">868</span></span>
						<span class="fr">
						<i class="icon icon1">五星认证</i><i class="icon icon2">官方认证</i>
					</span>

					</p>
				</dd>
			</dl>
			<div class="recommendation">
				<p class="clearfix title">
					<span class="high-quality">精彩推荐</span>
				</p>
				<ul class="recommendation-list clearfix">

					<li class="item fl" v-for="item in list">
						<img :src="item.liveLogo">
						<div class="title">{{item.liveTitle}}</div>
						<div class="live-num">{{item.watchNum}}播放</div>
					</li>

				</ul>
			</div>
		</template>
	</ListModule>
</template>

<script>
	import ListModule from '~/components/common/list'
	const time_range = (beginTime, endTime) => {
						var strb = beginTime.split(":");
						if(strb.length != 2) {
							return false;
						}

						var stre = endTime.split(":");
						if(stre.length != 2) {
							return false;
						}

						var b = new Date();
						var e = new Date();
						var n = new Date();

						b.setHours(strb[0]);
						b.setMinutes(strb[1]);
						e.setHours(stre[0]);
						e.setMinutes(stre[1]);

						if(n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
							return true;
						} else {
//							alert("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
							return false;
						}
					
				}
	export default {
		data() {
			var livTime
			if(time_range("9:00", "11:00")){
				livTime = 1
			}else if(time_range("11:30", "14:00")){
				livTime = 2
			}else if(time_range("14:00", "18:00")){
				livTime = 3
			}else if(time_range("18:00", "24:00")){
				livTime = 4
			}
			return {
				query: {
					offset: 1,
					limit: 10,
					catId: this.$route.params.story,
					livTime: livTime
				},
				firstDetail:{},
				firstGoods: {},
				id: this.$route.params.story
			}
		},
		beforeMount () {
		    this.getLiveDetail()
		    console.log(this.$route.params.story,"this.$route.params.story")
		},
		methods: {
			linkTo(index, title) {
				console.log('live-' + this.tabList[index].id)
				if(index == 0) {
					this.$router.push('/live/index')
				} else {
					this.$router.push({
						path: '/live/' + this.tabList[index].id,
						params: {
							id: this.tabList[index].id
						}
					})
				}

			},
			getLiveDetail() {
				this.$service('liveShowList', {
					data: {
						offset: 1,
						limit: 5,
						catId: this.id,
						isByWatchNum: true
					}
				}).then(result => result.data).then(data => {
					if(data.records.length){
						this.firstDetail = data.records[0]
						this.firstGoods = this.firstDetail.goodsList[0]
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
	.detail {
		padding-top: 15px;
	}
	
	.user-box {
		height: 40px;
		padding: 10px;
		border-bottom: 1px solid #BFBFBF;
		& dt {
			& img {
				width: 40px;
				height: 40px;
			}
		}
		& dd {
			margin-left: 51px;
			& .title {
				font-size: 14px;
				color: #000;
				display: inline-block;
				max-width: 220px;
			}
			& .identify {
				border: 1px solid #C2A374;
				border-radius: 15px;
				padding: 0px 10px;
				position: relative;
				font-size: 12px;
				margin-left: 5px;
				color: #666666;
			}
			& .describe {
				color: #999;
				margin-top: 9px;
				font-size: 11px;
			}
		}
	}
	
	.video-box {
		padding: 0 15px;
		position: relative;
		& .title {
			font-size: 14px;
			margin-top: 13px;
			margin-bottom: 11px;
			color: #000;
		}
		& .video {
			height: 200px;
			& img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
		& .live-info {
			position: absolute;
			bottom: 10px;
			color: #fff;
			font-size: 12px;
			padding: 0 11px;
			& .status {
				border: 1px solid #fff;
				border-radius: 15px;
				padding: 3px 12px;
				position: relative;
				& .point {
					width: 5px;
					height: 5px;
					border-radius: 50%;
					position: absolute;
					left: 5px;
					top: 9px;
					&.succ {
						background: #00FF00;
					}
				}
			}
			& .num {
				margin-left: 6px;
			}
		}
	}
	
	.goods-box {
		height: 50px;
		padding: 10px;
		position: relative;
		& dt {
			& img {
				width: 50px;
				height: 50px;
			}
		}
		& dd {
			margin-left: 61px;
			& .title {
				font-size: 14px;
				line-height: 1.2;
				height: 35px;
				color: #000;
			}
			& .goods-details {
				font-size: 12px;
				position: absolute;
				left: 71px;
				right: 0;
				bottom: 10px;
				color: #666666;
				padding-right: 10px;
				& .price {}
				& .icon {
					margin-right: 5px;
					color: #fff;
					padding: 0 5px;
					border-radius: 5px;
					&.icon1 {
						background-color: #C2A374;
					}
					&.icon2 {
						background-color: #8d1522;
					}
				}
			}
		}
	}
	
	.recommendation {
		padding: 15px;
		position: relative;
		color: #fff;
		& p {
			&.title {
				position: absolute;
				top: 20px;
				z-index: 5;
				font-size: 14px;
				padding: 2px 5px;
				background-color: #8d1522;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
			}
		}
		& .recommendation-list {
			margin-right: -5px;
			& li {
				box-sizing: border-box;
				width: 170px;
				height: 100px;
				margin-right: 5px;
				margin-bottom: 5px;
				position: relative;
				border-radius: 5px;
				font-size: 12px;
				line-height: 1.4;
				overflow: hidden;
				& img {
					width: 100%;
					height: 100%;
					display: block;
				}
				& .title {
					position: absolute;
					bottom: 0;
					text-align: center;
					left: 0;
					right: 0;
					background-color: rgba(0, 0, 0, .3);
				}
				& .live-num {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					text-align: right;
					padding-right: 5px;
					background-color: rgba(0, 0, 0, .2);
				}
			}
		}
	}
</style>