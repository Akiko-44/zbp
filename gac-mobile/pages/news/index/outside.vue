<template>
  <AppView class="home">
    <iframe :src="url" scrolling="auto" style="position:absolute;top: 46px;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;"></iframe>
  </AppView>
</template>

<script>
  export default {
    data() {
      return {
        url: this.$route.query.url,
      }
    },
    beforeMount() {
      if (this.$native.isApp()) {
	    	this.$native.getTitle('热点资讯')
	    }
    },
    activated () {
      let that = this
      window.onload = function(){
        setTimeout(function(){
          if (that.$native.isApp()) {
			    	that.$native.getTitle('热点资讯')
			    }
        },1)
      }
    },
    deactivated () {
      this.$destroy()
    },
  }
</script>

<style>
</style>