<template>
	<h2>
		<span>{{title}}</span>
		<span @click="more">更多<van-icon name="arrow"/></span>
	</h2>
</template>

<script>
export default {
	props: ['title','url','id','position'],
  	methods: {
	   more(){
	   		console.log(this.url)
	   		this.$router.push({
		        name: this.url,
		        query: { id:this.id ,title:this.title,position:this.position}
	      	})
	   }
  	}
}
</script>
<style lang="postcss" scoped>
	h2{
		line-height: 40px;
		padding:10px 10px 0;
		display:flex;
		justify-content: space-between;
		vertical-align:middle;
		font-weight: 600;
		& span:first-child{
			font-weight: bol                                                                                                     d;
		}
		& span:last-child{
			color:#999;
			font-size: 14px;
			font-weight: 400;
		}
		& i:before{
			font-size:10px;
		}
	}
</style>