<template>
	<AppView class="home" title="直播">
		<van-tabs @click="linkTo" v-model="activeIndex">
			<van-tab v-for="item in tabList" :key="item.id" :title="item.catName">

			</van-tab>
		</van-tabs>
		<nuxt />
	</AppView>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					"catName": "全部",
					"grade": 0,
					"id": "1001",
					"isShow": 0,
					"liveCount": 0
				}],
				activeIndex: 0,
			}
		},
		beforeMount() {
			this.getTabList()
		},
		methods: {
			getTabList() {
				this.$service('liveCategoryList').then(result => result.data).then(data => {
					this.tabList = this.tabList.concat(data)
					this.tabList.forEach((sub,index) => {
						if(sub.id == this.$route.params.story){
							this.$nextTick(()=>{
								this.activeIndex = index
							})
						}
					})
				})

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
	}
</script>

<style lang="postcss" scoped>

</style>