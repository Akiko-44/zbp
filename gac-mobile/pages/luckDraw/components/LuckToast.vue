<template>
	<div id="LuckToast" v-if="luckToastForm.id">
		<div :class="[luckToastShow?'mask--show':'', 'mask']" @click="luckToastHide"></div>
		<div :class="[luckToastShow?'content--show':'','content tc']" v-if="luckToastForm.topLimit == 2  && luckToastForm.drawNum == 0">
			<div class="close" @click="luckToastHide"></div>
			<div class="content-title">今日机会已经用完</div>
			<div class="content-prize">
				<div class="content-bg">
					<img class="prize-bg" src="@/assets/images/luck/prize-bg.png"/>
					<img class="prize-left" src="@/assets/images/luck/left.png"/>
					<img class="prize-r" src="@/assets/images/luck/right.png"/>
				</div>
				<div>
					<img src="@/assets/images/luck/prize1.png" style="width: 30%;"/>
					<div class="prize-info">
						<p style="margin-bottom: 6px;font-size: 12px;" v-if="prizeObj.id && prizeObj.prizeType == 2">就差一点</p>
						今日再分享{{luckToastForm.surplusNum}}次，即可获得1次抽奖机会~
					</div>
					<div class="prizeBtn" @click="getShare">分享</div>
				</div>
			</div>
		</div>
		<div :class="[luckToastShow?'content--show':'','content tc']" v-if="prizeObj.id && luckToastForm.drawNum > 0 && prizeObj.prizeType == 2">
			<div class="close" @click="luckToastHide"></div>
			<div class="content-title">有点遗憾</div>
			<div class="content-prize">
				<div class="content-bg">
					<img class="prize-bg" src="@/assets/images/luck/prize-bg.png"/>
					<img class="prize-left" src="@/assets/images/luck/left.png"/>
					<img class="prize-r" src="@/assets/images/luck/right.png"/>
				</div>
				<div>
					<img src="@/assets/images/luck/prize1.png" style="width: 30%;"/>
					<div class="prize-info">
						就差一点，再来一次吧~
					</div>
					<div class="prizeBtn" @click="luckToastHide">再来一次</div>
					<div class="prizeBtn" @click="getShare" style="background: #EF5124;box-shadow: 0 4px 0px 0px #C33A13;color: #FDE73A;margin-top: 15px;">分享</div>
				</div>
			</div>
		</div>
		<div :class="[luckToastShow?'content--show':'','content tc']" v-if="luckToastForm.topLimit == 1 && luckToastForm.drawNum == 0">
			<div class="close" @click="luckToastHide"></div>
			<div class="content-title">今日机会已经用完</div>
			<div class="content-prize">
				<div class="content-bg">
					<img class="prize-bg" src="@/assets/images/luck/prize-bg.png"/>
					<img class="prize-left" src="@/assets/images/luck/left.png"/>
					<img class="prize-r" src="@/assets/images/luck/right.png"/>
				</div>
				<div>
					<img src="@/assets/images/luck/prize2.png" style="width: 30%;"/>
					<div class="prize-info">
						<p style="margin-bottom: 6px;font-size: 12px;">就差一点</p>
						今日抽奖机会已用完~
					</div>
					<div class="prizeBtn" @click="luckToastHide">我知道了</div>
				</div>
			</div>
		</div>
		<div :class="[luckToastShow?'content--show':'','content tc']" v-if="prizeObj.id && prizeObj.prizeType == 1">
			<div class="close" @click="luckToastHide"></div>
			<div class="content-title">恭喜你中奖了</div>
			<div class="content-prize">
				<div class="content-bg">
					<img class="prize-bg" src="@/assets/images/luck/prize-bg.png"/>
					<img class="prize-left" src="@/assets/images/luck/left.png"/>
					<img class="prize-r" src="@/assets/images/luck/right.png"/>
				</div>
				<div>
					<img src="@/assets/images/luck/prize3.png" style="width: 30%;"/>
					<div class="prize-info">
						抽中“再来一次”~
					</div>
					<div class="prizeBtn" @click="luckToastHide">再来一次</div>
					<div class="prizeBtn" @click="getShare" style="background: #EF5124;box-shadow: 0 4px 0px 0px #C33A13;color: #FDE73A;margin-top: 15px;">分享</div>
				</div>
			</div>
		</div>
		<div  :class="[luckToastShow?'content--show':'', 'content tc']" v-if="prizeObj.id && prizeObj.prizeType == 0">
			<div class="close" @click="luckToastHide"></div>
			<div class="content-title">恭喜你中奖了</div>
			<div class="content-prize">
				<div class="content-bg">
					<img class="prize-bg" src="@/assets/images/luck/prize-bg.png"/>
					<img class="prize-left" src="@/assets/images/luck/left.png"/>
					<img class="prize-r" src="@/assets/images/luck/right.png"/>
				</div>
				<div>
					<img src="@/assets/images/luck/prize4.png" style="width: 30%;"/>
					<p class="prize-info">获得“{{prizeObj.prizeName}}”~</p>
					<div class="prizeBtn" @click="$router.push({name:'luckDraw-myPrize',query: {id:luckToastForm.winId}})">立即领取</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'LuckToast',
  props: {
  	prizeObj: {
  		type: Object,
  		default: {}
  	},
  	luckToastForm: {
  		type: Object,
  		default: {}
  	}
  },
  data() {
  	return{
  		luckToastShow: false
  	}
  },
  created(){
  	
  },
  methods: {
  	getShare(){
  		this.$service('drawShare', {
	        resources: [this.$route.query.id]
	     }).then((result)=>{
	     	this.$emit("shareSuccss", result.data);
	     })
  	},
  	luckToastHide() {
  		this.$emit("luckToastHide", this.prizeObj.prizeType);
  	}
  }
}
</script>

<style lang="postcss" scoped>
#LuckToast{
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
		& .close{
			width: 25px;
		    height: 25px;
		    background: url(~/assets/images/icon/closeproclamation.png) no-repeat center;
		    background-size: 25px;
		    position: absolute;
		    right: 5px;
		    top: 12.5px;
			z-index: 997;
		}
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
			& .prize-info{
				margin-top: 10px;
				margin-bottom: 13px;
				color: #000000;
				font-size: 14px;
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