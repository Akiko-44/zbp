<template>
	<div class="box" @click="details">
		<template >
			<header v-lazy:background-image="setImg(data.phonePath)"></header>
			<div class="left">
				<div class="activity_content">
						<h2 v-text="data.title"></h2>
						<div class="content" v-html="data.content"></div>
				</div>
				<div class="activity_browse">
					<div class="time">{{data.creationTime}}</div>
					<div class="browse_borw">
						<p><img src="~/static/icons/new4.png" alt="" /><span v-text="data.rate"></span></p>
						<p><img src="~/static/icons/praise.png" alt="" /><span class="browseNum" v-text="data.likeNum"></span></p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
	props: ['data','supType','url'],
  	methods: {
  		setImg,
  		details(){
  			this.$router.push({
  				name:this.url,
  				query:{id:this.data.id}
  			})
  		}
  	}
}
</script>
<style lang="postcss" scoped>
	.box{
		background:#fff;
		display: flex;
		margin: 6px 10px;
		border-bottom: 1px solid #f8f8f8;
		& header{
			width: calc(50vw - 70px);
			height:calc(50vw - 70px);
			background-size:cover;
			background-repeat: no-repeat;
			background-position: center;
			flex-shrink: 0;
		}
		& .left{
			width:calc(50vw + 40px);
			margin-left: 10px;
			& h2{
				width:100%;
				overflow: hidden; 
				text-overflow:ellipsis;
				margin-top: 16px;
			}
			& .content{
				margin-top: 10px;
				height:40px;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size:14px;
				color:rgba(102,102,102,1);
				line-height: 20px;
			}
			& .activity_browse{
				display: flex;
				justify-content: space-between;
				margin-top: 16px;
				& .time{
					font-weight:400;
					color:rgba(153,153,153,1);
					font-size: 12px;
				}
				& .browse_borw{
					display: flex;
					align-items: center;
					& p{
						margin-right: 5px;
					}
					& img{
						width: 12px;
						background-size: 12px;
						margin-right: 2px;
					}
					& span{
						font-weight:400;
						color:rgba(153,153,153,1);
						font-size: 12px;
					}
				}
			}
		}
	}
</style>