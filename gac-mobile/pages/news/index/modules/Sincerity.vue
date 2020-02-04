<template>
  <div class="patent">
  	<!-- @click="getPetent()"-->
  	<h1>诚信体系</h1>
  	<p>打造行业诚信白名单</p>
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
        name: 'news-patentModules',
        query: {type:0}
  	})
    }
  }
}
</script>

<style lang="postcss" scoped>
.patent{
	background: url(~/assets/images/banner4s.png) no-repeat;
	background-size: 100% 100%;
	display: inline-block;
	width: 45.5vw;
	height: 130px;
	margin-top: 15px;
	margin-right: 1.25vw;
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
