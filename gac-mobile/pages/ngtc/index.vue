<template>
<div>
	<NavBar title="检测机构" />
  	<div class="tc" style="margin-top: 20px;">
  		<img src="../../assets/images/pic_hjtc.png" @click="$router.push({name: 'ngtc-hjtc'})"/>
  		<img src="../../assets/images/pic_ngtc.png" @click="$router.push({name: 'ngtc-ngtc'})"/>
  	</div>
</div>
</template>
<script>
import NavBar from '~/components/dm/navbar/noAppIndex'
export default {
  components: {
    NavBar
  },
  head () {
    return {
      title: '中宝协云平台珠宝溯源码查询'
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
    	this.$native.getTitle(this.title)
    }
  },
  activated () {
    let that = this
    window.onload = function(){
      setTimeout(function(){
      	if (that.$native.isApp()) {
        	that.$native.getTitle(that.title)
        }
      },1)
    }
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang="postcss" scoped>
img{
	width: 45%;
}
</style>