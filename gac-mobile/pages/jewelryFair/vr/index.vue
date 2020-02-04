<template>
	<AppView class="home" title="vr展示" :clickLeft="back">
		<iframe class="vrbanner" :src="$route.query.src" style="" frameborder="0"></iframe>
	</AppView>
</template>

<script>
	export default {
		methods:{
			back () {
		      if (this.$native.isApp()) {
		        this.$native.goToHome()
		      } else {
		        history.back()
		      }
		    },
		}
	}
</script>

<style lang="postcss" scoped>
.vrbanner{
	width:100vw;
	height:calc(100vh - 44px);
}
</style>