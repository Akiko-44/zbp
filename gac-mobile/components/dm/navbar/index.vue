<template>
  <van-nav-bar
	  :title="title"
	  left-arrow
	  @click-left="onClickLeft"
	/>
</template>

<script>
export default {
  props: {
    title: String
  },
  data () {
    return {
      
    }
  },
  methods: {
    onClickLeft () {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.van-nav-bar .van-icon{
	color:#fff!important;
	}
</style>
