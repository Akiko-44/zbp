<template>
  <div class="success tc">
    <p style="color: #333333;font-size: 24px;padding-top: 100px;font-weight: bolder;">恭喜您 注册 成功</p>
    <p style="margin-top: 25px;margin-bottom: 62px;font-size: 13px;">请下载APP开始您的珠宝之旅吧</p>
    <div class="qr">
    	<img src="./images/code.png" width="160"/>
    	<p style="margin: 18px auto 38px;">请长按识别二维码下载</p>
    	<p>或</p>
    </div>
    <div class="css_btn_class" style="margin-top: 31px;" @click="downLoad()">点击下载</div>
  </div>
</template>

<script>
export default {
  activated () {
    document.title = '成功'
  },
  methods: {
  	downLoad(){
  		location.href = "http://app.gacjc.com/app1/downloadApp.html"
  	}
  }
}
</script>

<style lang="postcss" scoped>
.success{
  height: 100%;
  min-height: 100vh;
	background: #FFFFFF;
}
.css_btn_class{
	width:50%;
	margin:0 auto;
	padding:16px 0;
	-moz-border-radius:25px;
	-webkit-border-radius:25px;
	border-radius:25px;
	background:#93232F;
	font-size:16px;
	color:#fff;
}
</style>
