<template>
	<div class="page-content" :class="this.scroll ? 'scroll' : 'hidden'">
		<div v-show="show && title" class="app-nav-bar-span">
			<component :is="navToggle ? 'scroll-toggle' : 'container'">
				<van-nav-bar :title="title" :z-index="99" left-arrow fixed @click-left="clickLeft" @click-right="clickRight">
					<div slot="right">
						<slot name="nav-bar-right"></slot>
					</div>
				</van-nav-bar>
			</component>
		</div>
		<slot></slot>

		<!--右侧悬浮扇形菜单-->
		<sectorMenu v-show="isShow" />
	</div>
</template>

<script>
	import ScrollToggle from '../scrollToggle'
	import Container from './container'
	import sectorMenu from '~/components/common/sectorMenu'

	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			scroll: {
				type: Boolean,
				default: true
			},
			clickLeft: {
				type: Function,
				default: () => {
					history.back()
				}
			},
			clickRight: {
				type: Function,
				default: () => {}
			},
			navToggle: {
				type: Boolean,
				default: false
			}

		},
		data() {
			return {
				show: false,
				isShow: false,
				tabbar: ['index', 'category', 'jewelrySearch-jewelryID', 'swap-cart', 'user-mine']
			}
		},
		// ssr 兼容处理，会报错但是不影响
		// beforeMount () {
		//   this.show = navHeight
		// },
		mounted() {
			this.setTitle()
			if(!this.$native.isApp() && !window.navigator.userAgent.includes('MicroMessenger')) {
				this.show = true
			}
		},
		activated() {
			this.setTitle()
			// 通过判断是否在app内,且是否是内置微信浏览器，动态加头部
			if(!this.$native.isApp() && !window.navigator.userAgent.includes('MicroMessenger')) {
				this.show = true
			}
			if(!this.$native.isApp() && !this.tabbar.includes(this.$route.name)){
				this.isShow = true
			}
		},
		methods: {
			setTitle() {
				document.title = this.title
			}
		},
		components: {
			ScrollToggle,
			Container,
			sectorMenu
		}
	}
</script>

<style lang="postcss">
	.page-content {
		&.hidden {
			overflow: hidden;
		}
	}
</style>