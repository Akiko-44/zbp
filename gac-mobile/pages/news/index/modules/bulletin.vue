<template>
  <div class="patent" @click="getPetent()">
  	<h1>公示公告</h1>
  	<p>平台动态&最新消息</p>
  </div>
</template>
<script>
	import qr from 'qr-image'
export default {
  data () {
    if (this.$data) return
    return {
    	
    }
  },
  methods: {
    back () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        history.back()
      }
    },
    getPetent(){
    	this.$router.push({
	        name: 'news-bulletinModules',
	  	})
    }
  }
}
</script>

<style lang="postcss" scoped>
.patent{
	background: url(~/assets/images/banner6s.png) no-repeat;
	background-size: 100% 100%;
	display: inline-block;
	width: 45vw;
	height: 130px;
	margin-top: 15px;
	margin-left: 1.25vw;
	& h1{
		text-align: center;
		color:#fff;
		font-size: 16px;
		padding-top: 45px;
	}
	& p{
		color:#fff;
		text-align: center;
		margin-top: 10px;
		font-size: 12px;
	}
}
</style>
