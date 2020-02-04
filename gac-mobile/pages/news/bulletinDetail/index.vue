<template>
  <AppView class="home" title="公告详情" :navToggle="true">
  	<div class="bigbox">
  		<h1>{{list.title}}</h1>
	  	<div class="time">
	  		<p>{{list.createTime}}</p>
	  		<p><img src="~/static/icons/new4.png" alt="" /><span class="browseNum" v-text="list.lookNum"></span></p>
	  	</div>
	  	<img :src="setImg(list.path)" class="images"></div>
	  	<div v-html="list.content" class="con"></div>
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
   		list:[]
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
  	if (this.$native.isApp()) {
    	this.$native.getTitle('公告详情')
    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
        if (that.$native.isApp()) {
		    	that.$native.getTitle('公告详情')
		    }
      },1)
    }
  },
  deactivated () {
    this.$destroy()
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
   		let more = await axios.get('/pc/industry/notice/detail/'+this.$route.query.id)
   		this.list = more.data.data;
   	}
  }
}
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.bigbox{
	width: calc(100vw - 20px);
	padding: 0 10px;
	& h1{
		font-size: 16px;
		font-weight: 600;
		padding: 10px 0;
	}
	& .time{
		width: calc(100vw - 20px);
		display: flex;
		justify-content: space-between;
		& p{
			font-weight:400;
			color:rgba(153,153,153,1);
			font-size: 14px;
		}
		& p:nth-child(2){
			display: flex;
			align-items: center;
			& img{
				width: 14px;
				height:14px;
				background-size: 14px;
				margin-right: 3px;
			}
		}
	}
	& .images{
		width:calc(100vw - 20px);
		margin-top: 10px;
	}
}
.con{
		width: calc(100vw - 20px);
		margin-top: 15px;
		padding: 0 10px;
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
</style>
