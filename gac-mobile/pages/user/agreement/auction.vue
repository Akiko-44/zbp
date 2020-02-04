<template>
<div>
	<img :src="img" width="100%"/>
</div>
</template>

<style lang="postcss" scoped>

</style>

<script>
export default {
  data() {
  	return {
  		img: require('~/assets/images/auction.jpg')
  	}
  },
  head () {
    return {
      title: '竞拍协议'
    }
  }
}
</script>
