<template>
	<ListModule :query="query" :getData="() => this.$service('galleryAtlasPage', { data: this.query })" class="list-module" ref="list">
		<template slot-scope="{ list }">
			<div class="item" v-for="(item, index) in list" :key="index" @click="linkTo(item.id)">
				<dl class="user-box clearfix">
					<dt class="fl">
							<img src="http://pa95ui71l.bkt.clouddn.com/gallery_1dWExmSGQjY2Ft7_441_235.png?imageView2/2/format/webp/w/800">
						</dt>
					<dd class="fl" style="">
						<p><span class="title">周大生独立设计师</span><span class="identify">实名认证</span></p>
						<p class="describe live-num">直播号：201852374 感谢每一次就遇见</p>
					</dd>
				</dl>
				<div class="video-box">
					<div class="title">早春新品看大喜</div>
					<div class="video">
						<img src="http://pa95ui71l.bkt.clouddn.com/gallery_1dWExmSGQjY2Ft7_441_235.png?imageView2/2/format/webp/w/800" />
					</div>
					<div class="live-info">
						<span class="status"><i class="point succ"></i>直播中</span><span class="num">15351观看</span>
					</div>
				</div>
			</div>
		</template>
	</ListModule>

</template>

<script>
	import ListModule from '~/components/common/list'
	export default {
		data() {
			return {
				query: {
					offset: 1,
					limit: 10
				},

			}
		},
		beforeMount() {

		},
		methods: {
			change() {
				this.query.offset = 1
				this.$refs.list.onRefresh()
			},
			linkTo(index, title) {
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

			}
		},
		components: {
			ListModule
		}
	}
</script>

<style lang="postcss" scoped>
	.home {
		height: 100%;
	}
	
	.item {
		border-bottom: 1px solid #BFBFBF;
		padding-bottom: 15px;
		& .user-box {
			height: 40px;
			padding: 10px;
			& dt {
				& img {
					width: 40px;
					height: 40px;
				}
			}
			& dd {
				margin-left: 11px;
				& .title {
					font-size: 14px;
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
		& .user-box {
			height: 40px;
		}
		& .video-box {
			padding: 0 15px;
			position: relative;
			& .title {
				font-size: 14px;
				margin-top: 13px;
				margin-bottom: 11px;
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
	}
</style>