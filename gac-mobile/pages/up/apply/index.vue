<template>
	<AppView title="申请入住">
		<div class="apply">
			<h2>如何办理申请入驻?</h2>
			<ul class="list">
				<li class="item">
					<span class="seq">1</span>
					<span>需要在电脑端登录中宝协会官网，进入上下
游服务－申请成为服务商</span>
				</li>
				<li class="item">
					<span class="seq">2</span>
					<span>上传完确认书以及填写完资料</span>
				</li>
				<li class="item">
					<span class="seq">3</span>
					<span>预计3～5个工作日查看审核结果</span>
				</li>
			</ul>
			<div class="btn-box">
				<van-button type="primary" class="btn" @click="$router.go(-1)">我知道了</van-button>
			</div>

		</div>
	</AppView>
</template>

<script>
	import ListModule from '~/components/common/list'
	export default {
		data() {
			return {
				id: this.$route.query.id,
				
			}
		},
		beforeMount() {
			
		},
		methods: {
			
		},
		components: {

		}
	}
</script>

<style lang="postcss" scoped>
	.apply {
		padding: 15px;
		& h2{
			height: 50px;
			line-height: 50px;
			background-color: #C2A374;
			color: #fff;
			text-align: center;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			font-size: 15px;
		}
		& .list{
			padding: 0 20px;
			font-size: 14px;
			background-color: #E6E6E6;
			overflow: hidden;
			height: 250px;
			& .item{
				margin-top: 15px;
			}
			& .seq{
				display: inline-block;
				width: 16px;
				height: 16px;
				line-height: 16px;
				border-radius: 50%;
				background-color: #C2A374;
				color: #FFFFFF;
				text-align: center;
				margin-right: 5px;
			}
		}
		& .btn-box{
			text-align: center;
			margin-top: 20px;
			& .btn{
				background-color: #890f1c;
				border-radius: 50px;
				width: 150px;
				margin: auto;
			}
		}
		
	}
</style>