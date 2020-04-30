<template>
	<div id="NoDraw">
		<div :class="[luckToastShow?'mask--show':'', 'mask']" @click="luckToastHide"></div>
		<div :class="[luckToastShow?'content--show':'','content tc']">
			<div class="content-title">{{status[nodrawData.status]}}</div>
			<div class="content-prize">
				<div class="content-bg">
					<img class="prize-bg" src="@/assets/images/luck/prize-bg.png"/>
					<img class="prize-left" src="@/assets/images/luck/left.png"/>
					<img class="prize-r" src="@/assets/images/luck/right.png"/>
				</div>
				<div>
					<img src="@/assets/images/luck/prize5.png" style="width: 30%;"/>
					<div class="prizeBtn" @click="luckToastHide">知道了</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'NoDraw',
  props: {
  	nodrawData: {
  		type: Object,
  		default:{
  			status: 1
  		}
  	}
  },
  data() {
  	return{
  		luckToastShow: false,
  		status: {
  			'0':'未开始',
  			'1':'进行中',
  			'2':'已暂停',
  			'3':'已结束',
  			'4':'已结束' // 其实是 已删除
  		}
  	}
  },
  methods: {
  	luckToastHide() {
  		if (this.$native.isApp()) {
	        this.$native.goToHome()
	     } else {
	  		this.$router.push({
		        name: "index"
		   	})
		  }
  	}
  }
}
</script>

<style lang="postcss" scoped>
#NoDraw{
	width: 100vw;
	height: 100vh;
	& .mask{
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 992;
		transition: all 0.5s;
		opacity: 0;
	}
	& .mask--show{
		opacity: 1;
	}
	& .content{
		width: 72vw;
		position: fixed;
		top: 50%;
		left: 14vw;
		z-index: 993;
		border-radius: 16px;
		background: #FFF7D7;
		transform: translateY(-50%) scale(0.8);
		opacity: 0;
		transition: all 0.3s;
		& .content-title{
			width: 100%;
			height: 50px;
			line-height: 50px;
			background: red;
			color: #FFFFFF;
			font-size: 20px;
			letter-spacing: 3px;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
		}
		& .content-prize{
			padding-top: 10px;
			padding-bottom: 25px;
			& .content-bg{
				& img{
					position: absolute;
					z-index: 995;
				}
				& .prize-bg{
					width: 78vw;
					top: 0;
					left: 0;
					transform: translateY(-30%);
					z-index: 996;
				}
				& .prize-left{
					width: 25px;
					top: 30px;
					left: -24px;
				}
				& .prize-r{
					width: 25px;
					top: 30px;
					right: -24px;
				}
			}
			& .prizeBtn{
				width: 60%;
				height: 36px;
				line-height: 36px;
				color: #EF5124;
				font-size: 20px;
				margin: 0 auto;
				background-color: #FDE73A;
				border-radius: 18px;
				box-shadow: 0 4px 0px 0px #ECAE0F;
				letter-spacing: 3px;
			}
		}
	}
	& .content--show{
		transform: translateY(-50%) scale(1);
		opacity: 1;
	}
}
</style>