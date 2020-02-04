<template>
	<div class="doing">
		<!--<dl>
			<dt>
				<img src="../../../assets/images/more.png"/>
			</dt>
			<dd>
				<p>经典象征</p>
				<span>JUSTE UN CLOU系列促销</span>
			</dd>
		</dl>
		<div class="doing_more">
			<button @click="activity">更多活动</button>
		</div>-->
		<img src="../../../assets/images/more2.png" @click="activity" width="100%"/>
	</div>
</template>

<script>
export default {
	props: ['url','supType'],
  	methods: {
	   activity(){
	   		this.$router.push({
	   			name: this.url,
	   			query: { supType:this.supType }
	   		})
	   }
  	}
}
</script>
<style lang="postcss" scoped>
dl{
	width: 100%;
	display: flex;
	align-items: center;
	background: #fff;
	margin-top: 40px;
	& dt{
		width:139px;
		& img{
			width: 100%;
		}
	}
	& dd{
		margin-left: 30px;
		text-align: center;
	}
}
.doing_more{
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 20px;
	& button{
		width: 100px;
		height: 30px;
		background: #fff;
		border:1px solid rgba(153,153,153,1);
		border-radius:20px;
		font-size: 12px;
		color:rgba(102,102,102,1);
		margin-bottom: 10px;
	}
}
</style>