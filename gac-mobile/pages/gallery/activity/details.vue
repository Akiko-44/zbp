<template>
	<AppView class="home" title="活动详情">
		<Details :data="list"></Details>
	</AppView>
</template>

<script>
import Details from '@/components/common/activityItem/details'
export default {
	props: ['url'],
	data(){
		return {
			list:[]
		}
	},
  	methods: {
	   activity(){
	   		this.$router.push({
	   			name: this.url,
	   			query: { id:this.id }
	   		})
	   },
	   	async mores(){
	   		let res = await this.$service('gallerydetails',{
	   			resources:[this.$route.query.id]
	   		})
	   		this.list = res.data;
	   	},
  	},
  	watch:{
  		$route(){
  			if(this.$route.query.id){
  				this.mores()
  			}
  		}
  	},
  	beforeMount(){
  		this.mores()
  	},
  	components: {
	    Details,
	},
}
</script>
<style lang="postcss" scoped>

</style>