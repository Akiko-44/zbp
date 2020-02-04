<template>
  <AppView class="home" title="专利详情">
  	<div class="detail">
  		<p>名称:{{list.companyName}}</p>
	  	<p>服务价格:{{list.servePrice}}</p>
	  	<p>联系电话:{{list.phone}}</p>
	  	<p>公司地址:{{list.companyPath}}</p>
	  	<img :src="setImg(list.logoPath)" class="images"></img>
	  	<div class="content">
	  		<h1>公司简介</h1>
	  		<p v-html="list.companyIntroduce"></p>
	  	</div>
	  	<div class="content">
	  		<h1>服务内容</h1>
	  		<p v-html="list.serveContent"></p>
	  	</div>
  	</div>
  </AppView>
</template>
<script>
	import { setImg } from '~/utils/qiniu'
	import axios from 'axios'
export default {
  data () {
    if (this.$data) return
    return {
    	list:{}
    }
  },
   watch:{
  	$route(){
  		if(this.$route.query.id){
  			this.init()
  		}
  	}
  },
  beforeMount(){
  	this.init()
  },
  methods: {
  	setImg,
    back () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        history.back()
      }
    },
    async init(){
    	this.list = {}
    	let more = await axios.get('/pc/industry/patent/detail/'+this.$route.query.id)
    	this.list = more.data.data;
    }
  }
}
</script>

<style lang="postcss" scoped>
.detail{
	width: calc(100vw - 20px);
	padding: 0 10px;
	& p{
		font-weight:400;
		color:rgba(51,51,51,1);
		font-size: 14px;
		line-height: 30px;
	}
	& .images{
		width: calc(100vw - 20px);
		/*height: 200px;
		background-repeat: no-repeat;
		background-size: cover;*/
	}
	& .content{
		width: calc(100vw - 20px);
		margin-top: 15px;
		& h1{
			font-size: 16px;
			font-weight: 600;
		}
		& >>>p{
			font-size:14px;
			margin-top: 10px;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height: 20px;
		}
		& >>>img{
			width: calc(100vw - 20px);
		}
	}
}
</style>
