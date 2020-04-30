<template>
<div id="luckDraw">
	<div
      class="wechat"
      v-if="wechatShareShow"
    >
      <img
        class="pig"
        src="../../assets/images/queen/pig.png"
      />
      <p>请点击右上角...<br />进行分享</p>
      <img
        class="arrow"
        src="../../assets/images/queen/arrow.png"
      />
      <img
        class="know"
        src="../../assets/images/queen/know.png"
        @click="closewechat"
      />
    </div>
    <NoDraw ref="nodraw" v-show="nodrawShow" :nodrawData="nodrawData"/>
	<div class="luckDraw" v-if="data" :style="{'background-color': data.backgroundPic}">
		<div class="luckHead">
			<img :src="data.titlePic" alt="">
			<div>
				<h4>{{data.luckyDrawName}}</h4>
				<p>您今日的抽奖机会剩余<span>{{drawTimes}}次</span></p>
			</div>
		</div>
		<div class="luckWrap">
			<div class="nineGrid">
				<img :src="data.latticePic" class="luck-bg"/>
				<div class="nineGridWrap">
					<div :class="['row', winType==index?'row--win':'']" v-for="(item, index) in data.prizeShowVOList" v-if="index<3" :key="item.id">
						<img :src="item.prizePic"/>
						<div :class="['rowMask', winType==index?'rowMask--win':'']"></div>
					</div>
					<div :class="['row', winType==7?'row--win':'']">
						<img :src="data.prizeShowVOList[7].prizePic"/>
						<div :class="['rowMask', winType==7?'rowMask--win':'']"></div>
					</div>
					<div :class="['row', drawAway && drawAwayShow?'getLuck':'']">
						<img :src="data.drawingPic" v-if="data.status==1" @click="luckDrawBtn"/>
						<img src="~/assets/images/luck/luckBtn0.png" v-if="data.status==0"/>
						<img src="~/assets/images/luck/luckBtn3.png" v-else/>
					</div>
					<div :class="['row', winType==3?'row--win':'']">
						<img :src="data.prizeShowVOList[3].prizePic"/>
						<div :class="['rowMask', winType==3?'rowMask--win':'']"></div>
					</div>
					<div :class="['row', winType==6?'row--win':'']">
						<img :src="data.prizeShowVOList[6].prizePic"/>
						<div :class="['rowMask', winType==6?'rowMask--win':'']"></div>
					</div>
					<div :class="['row', winType==5?'row--win':'']">
						<img :src="data.prizeShowVOList[5].prizePic"/>
						<div :class="['rowMask', winType==5?'rowMask--win':'']"></div>
					</div>
					<div :class="['row', winType==4?'row--win':'']">
						<img :src="data.prizeShowVOList[4].prizePic"/>
						<div :class="['rowMask', winType==4?'rowMask--win':'']"></div>
					</div>
					<p class="nineGrid-t">距离活动结束还剩<span>{{countdown[0]}}</span>天<span>{{countdown[1]}}</span>时<span>{{countdown[2]}}</span>分<span>{{countdown[3]}}</span>秒</p>
				</div>
			</div>
			<div class="prize">
				<img :src="data.marginPic" class="luck-bg"/>
				<div class="title"><img :src="data.labelPic" class="luck-bg"/><p>奖品展示</p></div>
				<div class="prizeWrap">
					<img :src="data.prizePic"/>
				</div>
			</div>
			<div class="winners">
				<img :src="data.marginPic" class="luck-bg"/>
				<div class="title"><img :src="data.labelPic" class="luck-bg"/><p>中奖公示</p></div>
				<div class="winnersWrap">
					<div style="height: 5rem;overflow: hidden;position: relative;">
						<div class="winnerBox" :style="{top: winnerBoxTop + 'rem'}">
							<div class="winner" v-for="(item, index) in logShowVOList" :key="index">
								<span>{{item.mobile}}</span>
								<span>抽中</span>
								<span>{{item.prizeName}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="myPrize">
				<img :src="data.marginPic" class="luck-bg"/>
				<div class="myPrizeWrap">
					<div class="myPrize-tab">
						<p :class="[tabActiveIndex==0?'tabActive':'']" @click="onTab">我的奖品 ></p>
						<p :class="[tabActiveIndex==1?'tabActive':'']" @click="onTab">活动规则 ></p>
					</div>
					<div class="tabBox">
						<div class="tabContent">
							<div class="myPrize-box" v-if="tabActiveIndex==0">
								<div class="allMyPrize" v-if="prizeList && prizeList.length">
									<div class="allMyPrize-tab">
										<p>中奖时间</p>
										<p>获得奖品</p>
									</div>
									<div style="height: 4rem;overflow: auto;">
										<div class="allMyPrizeList">
											<div class="allMyPrizeItem" v-for="item in prizeList" :key="item.id">
												<p>{{ item.createTime }}</p>
												<p v-if="item.prizeType==0" style="color: #2D69C3;" @click="toGift(item)">小礼品></p>
												<p v-if="item.prizeType!=0">{{ prizeTypeObj[item.prizeType] }}</p>
											</div>
										</div>
									</div>
								</div>
								<div class="noPrize" v-else>
									<p class="img-box"><img src="@/assets/images/luck/noPrize.png"/></p>
									<p>暂无中奖信息</p>
								</div>
							</div>
							<div class="rule-box" v-if="tabActiveIndex==1">
	                            <div class="rule" v-for="(item, index) in data.luckyDrawRuleList" :key="index">
	                            	<span>{{ index+1 }}</span>
	                            	{{item.rule}}
	                            </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tc" style="padding-bottom: 30px;">
			<div class="share" @click="getShare">分 享</div>
			<div style="color: #F8B3AD;font-size: 14px;margin-top: 16px;margin-bottom: 20px;">分享给好友，可获得抽奖机会噢~</div>
			<div style="color: #F8B3AD;font-size: 12px;">版权归中宝协（北京）珠宝文化有限公司所有</div>
		</div>
		<LuckToast ref="toast" @shareSuccss="shareSuccss" @luckToastHide="luckToastHide" :prizeObj="prizeObj" :luckToastForm="luckToastForm" v-show="prizeToastShow"/>
		<Share :info="info" ref="share"/>
	</div>
</div>
</template>

<script>
import LuckToast from './components/LuckToast'
import NoDraw from './components/noDraw'
import Share from "~/components/common/share"
import { browser } from '~/utils/shared'
import { getToken } from "~/utils/auth"
export default {
  name: 'luckDraw',

  components: {
  	NoDraw,
    LuckToast,
    Share
  },
  data() {
  	return{
  		info: {},
  		isWeixin: browser && browser.weixin,
  		countdown: [0,0,0,0],
  		drawTimes: 0,
  		drawAway: true,
  		drawAwayShow: true,
  		winnerBoxTop: 0,
  		allMyPrizeTop: 0,
  		tabActiveIndex: 0,
  		wechatShareShow: false,
  		prizeToastShow: false,
  		
  		nodrawShow: false,
  		nodrawData: { status: 2 },
  		
  		data: undefined,
  		prizeParams: {
  			id: this.$route.query.id,
  			limit: 99999,
  			offset: 1
  		},
  		prizeList: [],
  		logShowVOList: [
  			{ mobile: '136*****6487', prizeName: '再来一次' },
  			{ mobile: '187*****2723', prizeName: '精美奖品' },
  			{ mobile: '135*****6427', prizeName: '精美奖品' },
  			{ mobile: '155*****4675', prizeName: '再来一次' },
  			{ mobile: '139*****4678', prizeName: '再来一次' }
  		],
  		prizeObj: {},
  		prizeTypeObj: {
  			'0':'小礼品',
  			'1':'再来一次',
  			'2':'感谢参与'
  		},
  		status: {
  			'0':'未开始',
  			'1':'进行中',
  			'2':'已暂停',
  			'3':'已结束',
  			'4':'已结束' // 其实是 已删除
  		},
  		luckToastForm: {
  			id: this.$route.query.id,
  			topLimit: 2, //分享获取抽奖次数是否上限1、是2、否
  			surplusNum: undefined,
  			drawNum: 0,
  			winId: ''
  		},
  		defaultTime: 0, // 接口数据返回前的值
  		winType: -1, // 效果站位
  		winPosition: -1 // 实际中奖位置
  	}
  },
  head() {
    return {
      title: '抽奖专区'
    }
  },
  deactivated() {
    this.$destroy()
  },
  watch: {
  	drawTimes(value){
  		this.drawTimes = value < 0 ? 0 : this.drawTimes
  		this.drawAway = value == 0 ? false : true
  	}
  },
  async beforeMount() {
  	let self = this
  	this.isWeixin = browser.weixin
  	this.$loading(this.$service('drawShow', {
        resources: [this.$route.query.id]
    })).then((result)=>{
     	if(!result.success){
     		// 不存在的抽奖
     		self.nodrawData.status = 3
			self.nodrawToast()
			return 
		}
     	self.nodrawData.status = result.data.status
     	self.drawTimes = result.data.drawTimes
     	if(result.data.status != 1){
     		self.drawTimes = 0
     		self.drawAwayShow = false
     	}
     	self.data = result.data
     	self.info = {
     		link: location.href,
     		title: result.data.luckyDrawName,
     		desc: result.data.luckyDrawDesc,
     		imgUrl: result.data.sharePic
     	}
     	this.rotimer(result.data.endTime)
     	let timer = setInterval(()=>{
     		var EndTime = +new Date(Date.parse(result.data.endTime.replace(/-/g,"/")))
	        var NowTime = new Date()
			var nd = EndTime - NowTime
     		if(nd <= 0){
     			clearInterval(timer)
     			this.drawAwayShow = false
     			this.data.status = 3
     			this.countdown = [0,0,0,0]
     		}else{
     			this.rotimer(result.data.endTime)
     		}
     	},1000)
     	if(result.data.logShowVOList && result.data.logShowVOList.length<5){
     		self.logShowVOList = self.logShowVOList.concat(result.data.logShowVOList)
     	}
     	if(result.data.logShowVOList && result.data.logShowVOList.length>=5){
     		self.logShowVOList = result.data.logShowVOList
     	}
     	self.winnerBoxTo()
     })
     this.getPrize()
  },
  methods: {
  	winnerBoxTo() {
  		let that = this
  		let timer = setInterval(()=>{
  			let timeLen = that.logShowVOList.length-5
  			that.winnerBoxTop = that.winnerBoxTop - 0.01
  			if(Math.abs(that.winnerBoxTop) >= timeLen){
  				that.logShowVOList = that.logShowVOList.concat(that.logShowVOList)
  				setTimeout(()=>{
  					that.logShowVOList.splice(0, that.logShowVOList.length / 2)
  					that.winnerBoxTop = 0
  				},5000)
  			}
  		},10)
  	},
  	getPrize(){
  		let self = this
  		if(getToken()){
		     this.$service('drawPrize', {
		        params: this.prizeParams
		     }).then((result)=>{
		     	self.prizeList = result.data.records
		     })
	     }
  	},
  	luckDrawBtn(){
  		if(!this.drawAwayShow || this.data.status != 1) return
  		let timer = setInterval(()=>{
  			this.winType += 1
  			this.defaultTime += 100
  			if(this.winType==8){
  				this.winType = 0
  			}
  		},100)
  		this.drawAwayShow = false
  		this.$service('drawClick', {
	        resources: [this.$route.query.id]
	   	}).then((result)=>{
	   		if(!result.success){
	   			this.luckToastForm.topLimit = 1
		     	this.luckToastForm.surplusNum = 0
		     	this.luckToastForm.drawNum = 0
		     	this.drawTimes = 0
	   			this.prizeObj = {}
	     		this.onToast()
	     		this.init(timer)
	     		return
	   		}
			this.luckToastForm.topLimit = result.data.topLimit
	     	this.luckToastForm.surplusNum = result.data.surplusNum
	     	this.luckToastForm.drawNum = result.data.drawNum
	     	this.drawTimes = result.data.drawNum
	     	if(result.data.topLimit == 1 && result.data.drawNum == 0 && !result.data.winId){
	     		this.prizeObj = {}
	     		this.onToast()
	     		this.init(timer)
	     		return
	     	}
	     	this.prizeObj = this.data.prizeShowVOList[result.data.winPosition-1]
	     	this.winPosition = result.data.winPosition
	     	this.luckToastForm.winId = result.data.winId
	     	this.startRoll(timer)
	     	this.getPrize()
	     }).catch(()=>{
	     	// 初始化位置
	     	this.drawAwayShow = true
	     	this.init(timer)
	     })
  	},
  	startRoll(timer) {
  		let time = 3 * 800 + this.winPosition * 100 + ( 800 - this.defaultTime )
  		setTimeout(()=>{
  			this.init(timer)
  			this.onToast()
  		},time)
  	},
  	init(timer){
  		// 初始化位置
		clearInterval(timer)
		this.defaultTime = 0
		this.winType = -1
  	},
  	luckToastHide(prizeType) {
  		this.$refs.toast.luckToastShow = false
  		setTimeout(()=>{
  			this.prizeToastShow = false
  			if(prizeType == 1){
  				this.luckDrawBtn()
  			}
  		},500)
  	},
  	onToast() {
  		this.prizeToastShow = true
  		setTimeout(()=>{
  			this.$refs.toast.luckToastShow = true
			this.drawAwayShow = true
  		},100)
  	},
  	nodrawToast(){
  		this.nodrawShow = true
  		setTimeout(()=>{
  			this.$refs.nodraw.luckToastShow = true
  		},100)
  	},
  	onTab(){
  		this.tabActiveIndex = this.tabActiveIndex==0?1:0
  	},
  	getShare(){
  		if(this.isWeixin){
  			this.wechatShareShow = true
  		}else{
  			this.$refs.share.show()
  		}
  		if(this.data.status != 1) return
  		this.$service('drawShare', {
	        resources: [this.$route.query.id]
	     }).then((result)=>{
	     	this.drawTimes = result.data.drawNum
	     	this.luckToastForm.drawNum = result.data.drawNum
	     	this.luckToastForm.surplusNum = result.data.surplusNum
	     	this.luckToastForm.topLimit = result.data.topLimit
	     	if(result.data.drawNum > 0){
				this.drawAwayShow = true
			}
	     })
  	},
  	shareSuccss(data){
  		if(this.isWeixin){
  			this.wechatShareShow = true
  		}else{
  			this.$refs.share.show()
  		}
  		this.luckToastForm.drawNum = data.drawNum
     	this.luckToastForm.surplusNum = data.surplusNum
     	this.luckToastForm.topLimit = data.topLimit
  		this.drawTimes = data.drawNum
  		if(data.drawNum > 0){
  			this.luckToastHide()
  			this.drawAwayShow = true
  		}
  	},
  	toGift(item){
  		if(item.hasReceiveAddr == 1){
  			this.$router.push({name:'luckDraw-logistics',query: {id:item.id}})
  		}else{
  			this.$router.push({name:'luckDraw-myPrize',query: {id:item.id}})
  		}
  	},
  	// 倒计时
    rotimer(e) {
    	var EndTime = +new Date(Date.parse(e.replace(/-/g,"/")))
        var NowTime = new Date()
		var nd = EndTime - NowTime
		var _day = this.addZero(parseInt(nd / 3600 / 24/1000)),
		  _hour = this.addZero(parseInt((nd / 3600/1000) % 24)),
		  _minute = this.addZero(parseInt((nd / 60/1000) % 60)),
		  _second = this.addZero(parseInt((nd / 1000) % 60));
		this.countdown = [_day, _hour, _minute, _second]
	},
	addZero(n) {
		return n<10?"0"+n:n
	},
	closewechat() {
      this.wechatShareShow = false
    }
  }
}
</script>

<style lang="postcss" scoped>
#luckDraw{
	width: 100vw;
	height: 100vh;
	overflow: auto;
	& .luckDraw{
		& img{
			width: 100% !important;
		}
	}
	& .luck-bg{
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	& .luckHead{
		position: relative;
		& div{
			width: 100%;
			text-align: center;
			color: #FFFFFF;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
		}
		& h4{
			text-shadow: #CCCCCC 1px 2px 3px;
			font-size:36px;
			font-family: 'Noto Serif CJK SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', '宋体', 'serif';
			margin-bottom: 10px;
		}
		& p{
			font-size:21px;
			& span{
				color: #FCE701;
			}
		}
	}
	& .title{
		width: 46vw;
		height: 9vw;
		line-height: 9vw;
		margin: 0 auto;
		position: absolute;
		left: 50%;
		top: 0;
		margin-left: -23vw;
		& p{
			color: #FFE2DA;
			font-size: 15px;
			text-align: center;
			position: relative;
			z-index: 6;
		}
	}
	& .luckWrap{
		padding: 0 10px;
		& .nineGrid{
			position: relative;
			margin-bottom: 35px;
			& .nineGridWrap{
				width: 75vw;
				padding-top: 10vh;
				padding-bottom: 5vh;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				position: relative;
				z-index: 6;
				& .row{
					width: 23vw;
					height: 23vw;
					margin-bottom: 3vw;
					overflow: hidden;
					border-radius: 10px;
					-moz-border-radius: 10px;
					position: relative;
					& img{
						height: 100% !important;
					}
					& .rowMask{
						width: 100%;
						height: 100%;
						background-color: #FFD58C;
						opacity: 0;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 888;
					}
					& .rowMask--win{
						opacity: 0.5;
					}
				}
				& .row--win{
					& img{
						transform: scale(1.1);
					}
				}
				& .getLuck{
					animation: getLuck 1s linear infinite;
				}
				& .nineGrid-t{
					width: 100%;
					margin-top: 25px;
					color: #FFFFFF;
					text-align: center;
					font-size: 14px;
					& span{
						color: #FCE701;
					}
				}
			}
		}
		& .prize{
			position: relative;
			margin-bottom: 35px;
			& .prizeWrap{
				width: 75vw;
				padding-top: 7vh;
				padding-bottom: 5vh;
				margin: 0 auto;
				position: relative;
				z-index: 6;
				overflow: hidden;
			}
		}
		& .winners{
			position: relative;
			margin-bottom: 35px;
			& .winnersWrap{
				width: 82vw;
				padding-top: 7vh;
				padding-bottom: 5vh;
				margin: 0 auto;
				position: relative;
				z-index: 99;
				& .winnerBox{
					width: 100%;
					position: absolute;
					left: 0;
				}
				& .winner{
					padding: 0 10px;
					font-size: 14px;
					color: #FFFFFF;
					height: 1rem;
					line-height: 1rem;
					display: flex;
					justify-content: space-between;
				}
				& .winner span:nth-child(1){
					width: 40%;
					text-align: left;
				}
				& .winner span:nth-child(2){
					width: 20%;
					text-align: center;
				}
				& .winner span:nth-child(3){
					width: 40%;
					text-align: right;
				}
				& .winner:nth-child(odd){
					background-color: rgba(0,0,0,0.1);
				}
			}
		}
		& .myPrize{
			position: relative;
			margin-bottom: 35px;
			& .myPrizeWrap{
				width: 85vw;
				padding-top: 7vh;
				padding-bottom: 5vh;
				margin: 0 auto;
				position: relative;
				z-index: 6;
				& .myPrize-tab{
					display: flex;
					justify-content: space-around;
					& p{
						width:3rem;
						height:1rem;
						text-align: center;
						line-height: 1rem;
						border-radius: 1rem;
						border: 1px solid #FFE2DA;
						color: #FFE2DA;
						font-size: 16px;
					}
					& .tabActive{
						background-color: #FFE2DA;
						color: #DC3424;
					}
				}
				& .tabBox{
					border-radius: 10px;
					padding: 5px;
					background:linear-gradient(to top,#FFF2F2,#FFFFFF);
					margin-top: 20px;
				}
				& .tabContent{
					border: 1px dashed #FF7F5F;
					border-radius: 10px;
					background: #FFFFFF;
					height: 5rem;
					padding: 5px;
					overflow: auto;
					& .myPrize-box{
						height: 5rem;
						position: relative;
						& .noPrize{
							width: 100%;
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							& p{
								width: 63%;
								margin: 0 auto;
								text-align: center;
								font-size: 12px;
								color: #525252;
							}
						}
					}
					& .rule-box{
						& .rule{
							position: relative;
							padding-left: 22px;
							line-height: 20px;
							font-size: 12px;
							color: #333333;
							text-align: justify;
							margin-top: 8px;
							& span{
								display: inline-block;
								width: 16px;
								height: 16px;
								color: #FFFFFF;
								text-align: center;
								line-height: 16px;
								border-radius: 50%;
								background: #E74435;
								position: absolute;
								left: 2px;
								top: 2px;
							}
						}
					}
					& .allMyPrize-tab{
						height: 0.8rem;
						line-height: 0.8rem;
						display: flex;
						justify-content: space-between;
						background: #F5F5F5;
						& p{
							width: 50%;
							text-align: center;
							color: #666666;
							font-size: 14px;
						}
					}
					& .allMyPrizeList{
						& .allMyPrizeItem{
							height: 0.8rem;
							line-height: 0.8rem;
							display: flex;
							justify-content: space-between;
							border-bottom: 1px solid #ECECEC;
							& p{
								width: 50%;
								text-align: center;
								color: #999999;
								font-size: 14px;
							}
						}
						& .allMyPrizeItem{
							border-bottom: none;
						}
					}
				}
			}
		}
	}
	& .share{
		width: 90vw;
		height: 48px;
		line-height: 48px;
		border-radius: 24px;
		margin: 0 auto;
		color: #DC3424;
		font-size: 20px;
		box-shadow:0px 7px 16px 0px rgba(158, 37, 17, 0.35);
		background: linear-gradient(to top,#ffd58c,#fde2c7);
	}
}
.wechat {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999;
  & .pig {
    position: absolute;
    top: 130px;
    left: 68px;
  }
  & p {
    position: absolute;
    top: 161px;
    left: 163px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
  }
  & .arrow {
    position: absolute;
    right: 20px;
    top: 60px;
  }
  & .know {
    position: absolute;
    top: 366px;
    left: 110px;
  }
}
@keyframes getLuck{
	from{transform: scale(1);}
	50%{transform: scale(1.2);}
	to{transform: scale(1)}
}
</style>