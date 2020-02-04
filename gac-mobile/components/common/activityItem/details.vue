<template>
	<div class="box">
		<h1>{{data.title}}</h1>
		<div class="time">
			<span>{{data.creationTime}}</span>
			<p @click="like(data.id)"><img src="~/static/icons/praise.png"/>{{likeNum}}</p>
		</div>
		<div v-html="data.content" class="imgs"></div>
	</div>
</template>

<script>
import { setImg } from '~/utils/qiniu'
import { Toast } from 'vant'
import axios from 'axios'
export default {
	props: ['data','supType'],
	data(){
		return {
			likeNum:null,
			list:{},
		}
	},
	watch:{
		data(){
			this.likeNum = this.data.likeNum
		}
	},
	beforeMount() {
		if (this.$native.isApp()) {
    	this.$native.getTitle('活动详情')
    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        that.$native.getTitle('活动详情')
      },1)
    }
  },
  deactivated () {
    this.$destroy()
  },
	methods: {
		setImg,
		like(id){
		if(!this.list[id]){
			this.likeNum ++
			this.list[id] = 1
			axios.post(`/app/gallery/activity/updateIncrLikeNum?id=${id}`)
		}else{
			Toast('你已经点赞过了')
		}
		}
	}
}
</script>
<style lang="postcss" scoped>
.box{
	width: 100%;
	& h1{
		font-weight:600;
		color:rgba(51,51,51,1);
		font-size: 18px;
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	& .time{
		display: flex;
		justify-content: space-between;
		padding: 10px;
		color:rgba(153,153,153,1);
		font-size: 14px;
		& p{
			display: flex;
			align-items: center;
			color:rgba(153,153,153,1);
			& img{
				margin-right: 5px;
			}
		}
	}
}
.imgs{
	margin: 0 10px;
}
	.imgs >>> img{
		width: 100%;
	}
	.imgs >>> p{
		font-size: 14px;
		color: #333;
		line-height: 25px;
	}
</style>