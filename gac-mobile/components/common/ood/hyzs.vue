<template>
	<div @click="check">
	 	<header v-lazy:background-image="setImg(data.thumbnail)"></header>
	 	<footer>
	 		<p>{{data.title}}</p>
	 		<p>{{data.summary}}</p>
	 		<div>
	 			<span>
	 				<img src="~/static/icons/new4.png" alt="" />
	 				{{data.readNum}}
	 			</span>
	 			<span>
	 				<img src="~/static/icons/new3.png" alt="" />
	 				{{data.commentNum}}
	 			</span>
	 			<span>
	 				<img src="~/static/icons/new2.png" alt="" />
	 				{{data.praiseNum}}
	 			</span>
	 		</div>
	 	</footer>
	</div>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
	props: ['data'],
	methods:{
		setImg,	
		check(){
			this.$router.push({
		        name: 'news-detail',
		        query: { id:this.data.id }
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
		background-size:cover;
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
		&>div{
			margin-top:10px;
			color:#999;
			font-size: 12px;
			width: calc(50vw - 14px);
			& img{
				width:12px;
				height:10px;
			}
			& span:nth-child(2){
				margin:0 6px;
			}
		}
	}
}
</style>