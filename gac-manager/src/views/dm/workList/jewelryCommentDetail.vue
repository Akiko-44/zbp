<template>
	<div class="app-container calendar-list-container" v-loading="loading">
		<div class="title">
			<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
			<span>|</span>
			<span>评论详情</span>
		</div>
		
	  <div style="color: #999;margin: 20px 0 10px;">
	    <span style="color: #666;">{{form.userName}}</span>
	    <span style="margin: 0 5px;">于</span>
	    <span style="color: #666;">{{form.createTime}}</span>
	    对<span style="color: #333;font-weight: bolder;margin-left: 5px;">{{form.commentName}}</span>发表评论
	  </div>
	  <div class="imgBox" v-if="form.gallerys.length != 0">
	  	<img v-for="(item, index) in form.gallerys" :key="index" :src="item.imgUrl | setImg" alt="" />
	  </div>
	  <div style="font-size: 14px;color: #666;margin-bottom: 20px;">{{form.content}}</div>
	  <div class="rate" style="margin-bottom: 20px;" v-if="form.commentType == 1">
	  	<p class="clearfix"> 
	  		<span class="fl">商品评分：</span>
	  		<el-rate class="fl"
			  v-model="form.spmxxfScore"
			  disabled
			  show-score
			  text-color="#ff9900"
			  score-template="{value}">
			</el-rate>
	  	</p>
	  	<p class="clearfix"> 
	  		<span class="fl">物流评分：</span>
	  		<el-rate class="fl"
			  v-model="form.wlfhsdScore"
			  disabled
			  show-score
			  text-color="#ff9900"
			  score-template="{value}">
			</el-rate>
	  	</p>
	  	<p class="clearfix"> 
	  		<span class="fl">商家评分：</span>
	  		<el-rate class="fl"
			  v-model="form.mjfwtdScore"
			  disabled
			  show-score
			  text-color="#ff9900"
			  score-template="{value}">
			</el-rate>
	  	</p>
	  </div>
	  <div style="margin-bottom: 20px;" v-if="form.replayCommentList.length != 0">
	  	<span style="margin-bottom: 20px;">商家回复:</span>
	  	<p style="font-size: 14px;color: #666;margin-bottom: 10px;" v-for="(item,index) in form.replayCommentList">{{item.reply}}</p>
	  </div>
	  <div style="margin-bottom: 20px;" v-else>
	  	<span style="margin-bottom: 20px;">暂无商家回复</span>
	  </div>
	</div>
</template>

<script>
import { getJewelryCommentDetail } from '@/api/dm/works'
export default {
  name: 'jewelryCommentDetail',
  data() {
      return {
      	commentId: this.$route.query.commentId,
      	loading: false,
      	form:{
      		userName: '',
      		createTime: '',
      		commentName: '',
      		gallerys: [],
      		content: '',
      		commentType: '',
      		spmxxfScore: 0,
      		wlfhsdScore: 0,
      		mjfwtdScore: 0,
      		replayCommentList: []
      	}
      }
  },
  created (){
		this.getDetail()
  },
  methods: {
	  getDetail() {
	  	this.loading = true	  	
	  	getJewelryCommentDetail(this.commentId).then(data => {
        this.loading = false
        this.form = {
      		userName: data.data.userName,
      		createTime: data.data.createTime,
      		commentName: data.data.commentName,
      		gallerys: data.data.gallerys,
      		content: data.data.content,
      		commentType: data.data.commentType,
      		spmxxfScore: data.data.spmxxfScore,
      		wlfhsdScore: data.data.wlfhsdScore,
      		mjfwtdScore: data.data.mjfwtdScore,
      		replayCommentList: data.data.replayCommentList
      	}
     }).catch(() => this.loading = false)
	  }
  }
}
</script>

<style scoped>
	.imgBox{
		margin-bottom: 10px;
	}
	.imgBox img{
		width: 150px;
		height: 150px;
		margin-right: 10px;
	}
</style>