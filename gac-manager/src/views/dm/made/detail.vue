<template>
  <div class="app-container calendar-list-container">
    <div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>销售订单详情</span>
    	</div>
    <el-form :model="madeDetail" label-width="120px">
	    <el-form-item label="名称">
	      <span>{{madeDetail.name}}</span>
	    </el-form-item>
	    <el-form-item label="理想价格区间">
	      <span>{{madeDetail.lowPrice}}元-{{madeDetail.highPrice}}元</span>
	    </el-form-item>
	    <el-form-item label="参考图片">
	      <div>
	      	<a v-for="item in madeDetail.customsPic" :key="item.customsId" class="img"><img :src="item.picUrl | setImg" width="100" height="100"/></a>
	      </div>
	    </el-form-item>
	    <el-form-item label="需求描述">
	      <span>{{madeDetail.customsDesc}}</span>
	    </el-form-item>
	  </el-form>
  </div>
</template>

<script>
import { setImg } from '@/filters'
export default {
  data() {
    return {
      madeDetail: undefined
    }
  },
  created(){
  	this.madeDetail = JSON.parse(this.$route.query.madeDetail)
  },
  methods: {}
}
</script>

<style scoped>
	.img{margin-right: 10px;}
</style>

