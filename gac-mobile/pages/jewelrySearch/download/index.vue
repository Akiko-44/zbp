<template>
</template>

<script>
export default {
	activated () {
		if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
			window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.hsz88.zbx"
		}else {
			window.location.href = "https://itunes.apple.com/cn/app/%E4%B8%AD%E5%AE%9D%E5%8D%8F%E4%BA%91%E5%B9%B3%E5%8F%B0/id1448463516?mt=8"
		}
	}
}
</script>

<style>
</style>