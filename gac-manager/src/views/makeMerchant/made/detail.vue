<template>
  <div class="app-container calendar-list-container">
    <el-form :model="madeDetail" label-width="120px">
	    <el-form-item label="名称">
	      <span>{{madeDetail.name}}</span>
	    </el-form-item>
	    <el-form-item label="理想价格区间">
	      <span>{{madeDetail.lowPrice}}元-{{madeDetail.highPrice}}元</span>
	    </el-form-item>
	    <el-form-item label="参考图片">
	      <div>
	      	<a v-for="item in madeDetail.customsPic" :key="item.customsId" class="img"><img :src="item.picUrl" width="100" height="100"/></a>
	      </div>
	    </el-form-item>
	    <el-form-item label="需求描述">
	      <span>{{madeDetail.customsDesc}}</span>
	    </el-form-item>
	  </el-form>
  </div>
</template>

<script>
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

