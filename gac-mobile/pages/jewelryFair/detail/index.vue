<template>
	<AppView class="home" title="详情">
		<div class="bigbox">
			<particular :datas="datas" :imgs="imgs" v-if="$route.query.type == 1"></particular>
			<vrdetail :datas="datas" v-if="$route.query.type == 2"></vrdetail>
			<Activity class="dodo" url="gallery-activity" :supType="7"/>
		</div>
	</AppView>
</template>

<script>
	import Particular from './modules/particular'
	import Activity from '@/components/common/activity'
	import Vrdetail from './modules/vrdetail'
	export default {
	data() {
		return {
			datas: {},
			imgs: []
		}
	},
	watch:{
		$route(){
			if(this.$route.query.id){
				this.getData()
			}
		}
	},
	beforeMount() {
		this.getData()
		if (this.$native.isApp()) {
    	this.$native.getTitle('详情')
    }
	},
	activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        if (that.$native.isApp()) {
		    	that.$native.getTitle('详情')
		    }
      },1)
    }
  },
  deactivated () {
    this.$destroy()
  },
	methods: {
		async getData() {
			if(this.$route.query.type == 1) {
				let datas = await this.$service('jewelryDetail', {
					data: {
						id: this.$route.query.id
					}
				})
				this.datas = datas.data
				let imgs = await this.$service('jewelryDetailimage', {
					data: {
						id: this.$route.query.id
					}
				})
				this.imgs = imgs.data
			} else {
				let data = await this.$service('jewelryVRdetail',{
					data: {
						id: this.$route.query.id
					}
				})
				this.datas = data.data
			}

		}
	},
	components: {
		Particular,
		Activity,
		Vrdetail
	}
}</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.bigbox{
	min-height: calc(100vh - 46px);
	display:flex;
	flex-direction: column;
}
.dodo{
	margin-top:auto;
}
</style>