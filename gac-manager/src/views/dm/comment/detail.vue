<template>
  <div class="app-container calendar-list-container">
  	<div class="title">
			<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
			<span>|</span>
			<span>评论详情</span>
		</div>
		
    <p><span style="color: #e5c6a1">{{form.userName}}</span>于<span>{{form.createTime}}</span>对<span style="color: #e5c6a1">{{form.commentName}}</span>发表评论</p>
    <p v-if="form.gallerys && form.gallerys.length" class="imgBox">
      <img v-for="item in form.gallerys" :src="item.imgUrl | setImg">
    </p>
    <p>{{form.content}}</p>
    <!--<p v-if="form.merchantContent !== ''">
      <h2>商家回复：</h2>
      <p>{{form.merchantContent}}</p>
    </p>-->
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
	  <div style="margin-bottom: 20px;" v-if="form.replayCommentList && form.replayCommentList.length != 0">
	  	<span style="margin-bottom: 20px;">商家回复:</span>
	  	<p style="font-size: 14px;color: #666;margin-bottom: 10px;" v-for="(item,index) in form.replayCommentList">{{item.reply}}</p>
	  </div>
	  <div style="margin-bottom: 20px;" v-else>
	  	<span style="margin-bottom: 20px;">暂无商家回复</span>
	  </div>
  </div>
</template>

<script>
import { getObjDetail } from '@/api/dm/comment'
import { setImg } from '@/filters'
export default {
  data() {
    return {
      form: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObjDetail(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
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