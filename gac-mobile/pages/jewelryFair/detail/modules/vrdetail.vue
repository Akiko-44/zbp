<template>
	<div class="boxDiv">
		<div class="boxVr">
			<iframe class="vrbanner" :src="datas.vrsite" v-if="datas.vrsite == ''? vrData : vrdata"></iframe>
		</div>
		<div class="boxcontent">
			<h4>{{datas.title}}</h4>
			<p v-html="datas.content"></p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				vrData:false,
				vrdata:true
			}
		},
		props: {
			datas: Object
		}
	}
</script>

<style lang="postcss" scoped>
    .boxDiv{
    	width: 100%;
    	background: #f8f8f8;
    }
	.vrbanner{
		width: 100vw;
		height:60vw;
	}
	.boxcontent{
		width: 95%;
		padding: 2.5%;
		& h4{
			font-size: 16px;
			color:#333333;
			padding: 15px 0;
		}
		& p{
			width: 100%;
			line-height: 20px;
			font-size: 14px;
			color: #666666;
		}
		& >>> img{
				width: 100%;
			}
	}
</style>