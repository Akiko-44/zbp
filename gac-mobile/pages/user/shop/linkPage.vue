<template>
	<AppView title="开户行联行号查询">
		<iframe :src="url" scrolling="auto" style="position:absolute;top: 46px;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;"></iframe>
	</AppView>
</template>

<script>
export default {
  data() {
    return {
      url: this.$route.query.url,
      data: this.$route.query.data
    }
  }
}
</script>

<style>
</style>