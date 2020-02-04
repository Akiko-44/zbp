<template>
	<div class="bigbox">
		<div class="bg">
			<div class="bg-content">
				<p class="bg-text">本活动仅限新用户参与</p>
				<van-cell-group>
					<van-field v-model="mobileForm.mobilePhone" clearable icon="question-o" placeholder="请输入手机号" @click-icon="$toast('question')" class="one" />
				</van-cell-group>
				<van-cell-group class="passtwo">
					<van-field v-model="mobileForm.dynamicVerifyCode" placeholder="请输入验证码" class="two" />
					<input type="button" :value="values" class="btn" @click="codelist" :disabled="dis">
				</van-cell-group>
				<van-button type="primary" @click="addlist">参与活动</van-button>
			</div>
		</div>
		<div class="tc-box" v-show="show1">
			<div class="dilong">
				<div class="box">
					<p>{{text1}}</p>
					<span @click="success" v-show="success1">确认</span>
					<span @click="succjump" v-show="success2">确认</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				mobileForm: {
					mobilePhone: "",
					dynamicVerifyCode: ""
				},
				nums: "",
				time1: 60,
				values: '获取验证码',
				dis: false,
				show1: false,
				text1: "",
				success1: true,
				success2: false,
				msg: ''
			}
		},
		methods: {
			codelist() {
				this.show1 = false;
				if(this.mobileForm.mobilePhone === '') {
					console.log('请输入正确的手机号')
					this.text1 = '请输入正确的手机号';
					this.show1 = true;
				} else {
					var regPhone = /^1[3456789]\d{9}$/
					if(!regPhone.test(this.mobileForm.mobilePhone)) {
						this.text1 = '请输入正确的手机号';
						this.show1 = true;
					} else {
						axios.post(`/api/userCenter/smscodetel?nub=${this.mobileForm.mobilePhone}`).then(data => {
							this.nums = data.data.data;
						})
						this.values = this.time1 + '秒后重新获取';
						this.dis = true;
						this.code();
					}
				}
			},
			code() {
				var sel = setInterval(() => {
					this.time1--;
					this.values = this.time1 + '秒后重新获取';
					this.dis = true;
					if(this.time1 === 0) {
						this.values = '获取验证码';
						clearInterval(sel);
						this.dis = false;
						this.time1 = 60;
					}
				}, 1000)
			},
			addlist() {
				this.show1 = false;
				axios.post(`/api/userCenter/registerTwo?tel=${this.mobileForm.mobilePhone}&msgId=${this.nums}&dynamicVerifyCode=${this.mobileForm.dynamicVerifyCode}&promotion_type=1`).then(data => {
					console.log(data.data.msg);
					this.msg = data.data.msg;
					if(data.data.msg == '短信验证码验证失败' || data.data.msg == '内部错误，服务器异常') {
						this.text1 = "短信验证码验证失败";
						this.show1 = true;
					} else if(data.data.msg == '消息id和短信验证码不能为空') {
						this.text1 = "消息id和短信验证码不能为空";
						this.show1 = true;
					} else if(data.data.msg == '1') {
						this.text1 = "您已经是会员,请前往APP查看更多珠宝";
						this.show1 = true;
						this.success1 = false;
						this.success2 = true;
					} else if(data.data.msg == '2') {
						this.text1 = "您已成功注册会员,请前往APP查看更多珠宝";
						this.show1 = true;
						this.success1 = false;
						this.success2 = true;
					}
				})
			},
			success() {
				console.log(1);
				this.show1 = false;
			},
			succjump() {
				console.log(this.msg);
				this.show1 = false;
				this.$router.push('/activity/download')
			}
		}
	}
</script>

<style lang="postcss">
	.bg {
		width: 100vw;
		height: 100vh;
		background: url(../../assets/images/bg1.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	
	.bg-content {
		position: absolute;
		bottom: 2vh;
		width: 100%;
	}
	
	.bg-text {
		font-size: 14px;
		text-align: center;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		-webkit-text-stroke: 1px undefined;
		text-stroke: 1px undefined;
	}
	
	.van-cell-group {
		background-color: rgba(255, 255, 255, 0);
		width: 80vw;
		margin: 0 auto;
	}
	
	.van-hairline--top-bottom::after {
		border-width: 0;
	}
	
	[class*=van-hairline]::after {
		content: 0;
	}
	
	.van-cell {
		margin-top: 2vh;
		border-radius: 4vh;
	}
	
	.passtwo {
		display: flex;
	}
	
	.one {
		width: 80vw!important;
		background-color: rgba(255, 255, 255, .9);
	}
	
	.two {
		width: 45vw!important;
		background-color: rgba(255, 255, 255, .9);
	}
	
	.btn {
		width: 30vw;
		border-radius: 4vh;
		margin-top: 2vh;
		margin-left: 5vw;
		color: #B9903B;
		background: linear-gradient(#FCEDEF, #FFCED3);
		border: 0;
		font-size: 14px;
	}
	
	.van-button.van-button--primary,
	.van-button.primary-btn {
		width: 80vw;
		color: #B9903B;
		background: linear-gradient(#FCEDEF, #FFCED3);
		border: 0;
		display: block;
		margin: 2vh auto;
		border-radius: 4vh;
	}
	
	input {
		padding-left: 10px!important;
	}
	
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: rgba(204, 204, 204, 1);
	}
	
	input:-moz-placeholder,
	textarea:-moz-placeholder {
		color: rgba(204, 204, 204, 1);
	}
	
	.tc-box {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: absolute;
		top: 0;
		left: 0;
		& .dilong {
			width: 100%;
			height: 100%;
			position: relative;
			& .box {
				width: 70vw;
				height: 20vh;
				background: #fff;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				border-radius: 3vh;
				& p {
					width: 50vw;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 14vh;
					margin: 0 auto;
					text-align: center;
					font-size: 15px;
					line-height: 20px;
				}
				& span {
					width: 100%;
					height: 5vh;
					border-top: 1px solid #ccc;
					display: block;
					text-align: center;
					line-height: 5vh;
				}
			}
		}
	}
</style>