<template>
    <div class="app-container calendar-list-container">
    	<!-- 导航 -->
    	<div>
    		<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    			<template v-for="(item,index) in menus">
    				<el-menu-item :index="item.id" v-if="item.ssm.length == 0 && item.menuUrl == ''">{{item.menuName}}</el-menu-item>
    				<el-submenu :index="item.id+1000" v-if="item.ssm.length != 0 && item.menuUrl == ''">
					    <template slot="title">{{item.menuName}}</template>
					    <el-menu-item :index="citem.id" v-for="citem in item.ssm" :key="item">{{citem.menuName}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-if="item.menuUrl != ''"><a :href="item.menuUrl" target="_blank">{{item.menuName}}</a></el-menu-item>
    			</template>
			</el-menu>
    	</div>
    	<!-- 轮播 -->
    	<div style="margin: 30px 0;">
	    	<el-carousel class="banner" height="240px">
		      <el-carousel-item v-for="(banner, index) in bannerList" :key="index">
		        <div class="inner">
		          <img :src="banner.imgUrl | setImg" />
		        </div>
		      </el-carousel-item>
		    </el-carousel>
	    </div>
	    <!-- 自定义 -->
	    <div>
	    	<div v-html="showContent"></div>
	    </div>
	    <!-- 选中商品 -->
	    <div>
	    	<ul class="clearfix">
				<li class="fl" v-for="item in goodsFloor" :key="item.caseId" style="margin: 5px;">
					<el-card :body-style="{ padding: '0px' }">
				        <img :src="item.mainPic | setImg" class="image" width="250" height="250">
				        <div style="padding: 14px;">
				          <div class="bottom clearfix">
				          	<span class="fl">{{item.caseName}}</span>
				          	<span class="fr">￥{{item.price}}</span>
				          </div>
				        </div>
				    </el-card>
				</li>
			</ul>
	    </div>
    </div>
</template>

<script>
import { detailStore } from '@/api/merchant/decorationShop'
import { setImg } from '@/filters'
export default {
	data() {
	  return {
	  	bannerList: [],
	  	goodsFloor: [],
	  	showContent:'',
	  	menus: []
	  }
	},
	created(){
		detailStore(this.$route.query.storeId).then(data => {
			const form = data.data
			this.menus = form.menus
	      	const layouts = form.layouts
	      	layouts.map((data) => {
	      		if(data.layoutType == 1){
	      			this.bannerList = data.obj.imgs
	      		}else if(data.layoutType == 2){
	      			this.showContent = data.obj.showContent
	      		}else if(data.layoutType == 3){
	      			this.goodsFloor = data.obj.dcps
	      		}
	      	})
		})
	},
	methods: {
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      }
    }
}
</script>

<style>
</style>