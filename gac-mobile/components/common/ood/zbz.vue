<template>
	<div @click="check">
	 	<header v-lazy:background-image="this.setImg(this.jpg)"></header>
	 	<footer>
	 		<p>{{data.title}}</p>
	 		<p>{{data.describe}}</p>
	 	</footer>
	</div>
</template>
<script>
import { setImg } from '~/utils/qiniu'
export default {
	props: ['data','position'],
	computed:{
		jpg(){
			if(this.data.vrpicture){
				return this.data.vrpicture
			}else if(this.data.showPrint){
				return this.data.showPrint
			}else{
				return this.data.picture
			}
		},
		type(){
			if(this.position<4){
				return 1
			}else{
				return 2
			}
		}
	},
	methods:{
		setImg,
		check(){
			this.$router.push({
		        name: 'jewelryFair-detail',
		        query: { id:this.data.id ,type:this.type}
	      	})
		}
	}
}
</script>

<style lang="postcss" scoped>
div{
	width:calc(50vw - 4px);
	background:#fff;
	& header{
		height:calc(36vw - 4px);
		background-size:100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}
	& footer{
		padding:10px;
		background: #fff;
		& p{
			display: inline-block; 
			white-space: nowrap;
			width: 100%; 
			overflow: hidden; 
			text-overflow:ellipsis;
		}
		& p:first-child{
			font-size: 14px;
			font-weight: bold;
			line-height: 20px;
		}
		& p:nth-child(n+2){
			font-size: 12px;
		}
		& p:nth-child(2){
			margin-top:10px;
			margin-bottom:10px;
			line-height: 15px;
		}
		& p:nth-child(3){
			color:#999;
		}
	}
}
</style>