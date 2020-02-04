<template>
	<AppView class="home" title="预约" :clickLeft="back">
		<div class="bigbox">
			<div class="form_box">
			<van-cell-group>
				<van-field
				    v-model="username"
				    label="姓名"
				    placeholder="请输入用户名"
			
				  />
			</van-cell-group>
			<van-cell-group>
				<van-field
				    v-model="phone"
				    label="手机号"
				    placeholder="请输入手机号"
		
				  />
			</van-cell-group>
			<van-cell-group>
				<van-field
				    v-model="idNum"
				    label="身份证"
				    placeholder="请输入身份证"
				
				  />
			</van-cell-group>
			<div class="sex">
				<van-cell-group  @click="showSex">
					<van-field
						@click="showSex"
					    v-model="asex"
					    label="性别"
					    placeholder="请选择性别"
					    readonly
					
					/>
				</van-cell-group>
				<van-actionsheet
				  v-model="show"
				  :actions="actions"
				  cancel-text="取消"
				  @select="onSelect"
				  @cancel="onCancel"
				/>
			</div>
			<van-cell-group>
				<van-field
				    v-model="email"
				    label="邮箱"
				    placeholder="请输入邮箱"
				
				  />
			</van-cell-group>
			<van-cell-group style="margin-top:20px;">
				<van-field
				    v-model="kind"
				    label="关注珠宝种类"
				    placeholder="请输入关注珠宝种类"
				
				  />
			</van-cell-group>
			<div class="way">
				<van-cell-group  @click="showWay">
					<van-field
						@click="showWay"
					    v-model="myway"
					    label="展会信息途径"
					    placeholder="请输入信息途径"
					    readonly
					
					/>
				</van-cell-group>
				<van-actionsheet
				  v-model="wayshow"
				  :actions="ways"
				  cancel-text="取消"
				  @select="Select"
				  @cancel="Cancel"
				/>
			</div>
			<van-cell-group style="margin-top:20px;">
				<van-field
				    v-model="address"
				    label="个人地址"
				    placeholder="请输入个人地址(选填)"
				
				  />
			</van-cell-group>
			<van-cell-group>
				<van-field
				    v-model="zipcode"
				    label="所在地邮编"
				    placeholder="请输入所在地邮编(选填)"
				
				  />
			</van-cell-group>
			<div class="car">
				<van-cell-group  @click="showCar">
					<van-field
						@click="showCar"
					    v-model="areCar"
					    label="是否预约车位"
					    placeholder="是否预约车位(选填)"
					    readonly
					
					/>
				</van-cell-group>
				<van-actionsheet
				  v-model="wayCar"
				  :actions="cars"
				  cancel-text="取消"
				  @select="CarSelect"
				  @cancel="CarCancel"
				/>
			</div>
			<div class="button" @click="getFrom">预约</div>
		</div>
			<div class="mark" v-show="marks">
				<div class="image">
					<div v-html="imageSync"></div>
					<div class="content">
						<p>姓名:<span>{{username}}</span></p>
						<p>时间:<span>{{$route.query.time}}</span></p>
						<p>地址:<span>{{$route.query.dir}}</span></p>
					</div>
				</div>
			</div>
		</div>
	</AppView>
</template>

<script>
	import { Toast } from 'vant'
	import qr from 'qr-image'
	export default {
		data(){
			return{
				username:'',
				phone:'',
	          	idNum:'',
	          	email:'',
	          	zipcode:'',
				address:'',
				show: false,
				wayshow:false,
				wayCar:false,
				sex:null,
				asex:null,
				myway:null,
				reCar:null,
				areCar:null,
				marks:false,
				kind:'',
			    actions: [
			        {
			          name: '男',
			          value:1,
			        },
			        {
			          name: '女',
			          value:2,
			        },
			     ],
			     ways:[
				     {
				     	name:"请帖",
				     	className:'noactive'
				     },{
				     	name:"云平台网站",
				     	className:'noactive'
				     },{
				     	name:"中宝协",
				     	className:'noactive'
				     },{
				     	name:"杂志",
				     	className:'noactive'
				     },{
				     	name:"其他",
				     	className:'noactive'
				     }
			     ],
			     cars:[
				     {
				     	name:"是",
				     	value:1,
				     },{
				     	name:"否",
				     	value:2,
				     }
			     ],
			     imageSync:null
			}
		},
		beforeMount() {
      if (this.$native.isApp()) {
	    	this.$native.getTitle('预约')
	    }
    },
    activated () {
      let that = this
      window.onload = function(){
        setTimeout(function(){
          if (that.$native.isApp()) {
			    	that.$native.getTitle('预约')
			    }
        },1)
      }
    },
    deactivated () {
      this.$destroy()
    },
		methods:{
			back () {
		      if (this.$native.isApp()) {
		        this.$native.goToHome()
		      } else {
		        history.back()
		      }
		    },
		    onSelect(item) {
		    	this.asex = item.name
				this.sex = item.value
		      	this.show = false
		    },
		    Select(item){
				let res = this.ways.map(i=>i.name)
				let index = res.indexOf(item.name)
				if(item.className =="noactive"){
					this.ways[index] = {
						name:item.name,
						className:"active"
					}
				}else{
					this.ways[index] = {
						name:item.name,
						className:"noactive"
					}
				}
				this.myway = this.ways
					.filter(i=>i.className=="active"?true:false)
					.map(i=>i.name)
					.join(',')
				this.ways = [...this.ways]
		    },
		    showSex(){
		    	this.show = true
		    },
		    showWay(){
		    	this.wayshow = true
		    },
		    onCancel(){
		    	this.show = false
		    },
		    Cancel(){
		    	this.wayshow = false
		    },
		    showCar(){
		    	this.wayCar = true
		    },
		    CarCancel(){
		    	this.wayCar = false
		    },
		    CarSelect(item){
		    	this.areCar = item.name
		    	this.reCar = item.value
		      	this.wayCar = false
		    },
		    async getFrom(){
		    	var regPhone = /^1[3456789]\d{9}$/
				var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				if(this.username == ''|| this.phone == '' || this.idNum  == ''|| 
						this.email  == ''|| this.sex == ''){
							Toast('请填写未标注选填的内容')
						}else if(!regPhone.test(this.phone)){
							Toast('请输入正确的手机号')
						}else if(!regEmail.test(this.email)){
							Toast('请输入正确的邮箱地址')
						}else{
							let res = await this.$service('jewelryForm',{
					   			params:{
					   				reName:this.username,             //姓名
									rePhone:this.phone,               //手机号
									reIdcard:this.idNum,              //身份证号
									reSex:this.sex,                   //性别
									reEmail:this.email,               //邮箱
									reFollow:this.kind,               //珠宝种类
									reInfo:this.myway,      		  //展会信息
									reAdress:this.address,            //地址
									reZipcode:this.zipcode,           //邮编
									reCar:this.reCar,                 //预约车位
									reExhibition:1
					   			}
					  	 })
							this.marks = true
							this.imageSync = qr.imageSync(this.username, { type: 'svg' })
						}
		    }
		}
	}
</script>

<style lang="postcss">
	.active{
		color:#409EFF;
	}
</style>
<style lang="postcss" scoped>
.form_box{
	min-height:calc(100vh - 46px);
	display:flex;
	flex-direction: column;
	& .button{
		width: 100vw;
		height: 40px;
		border:0;
		background: #FF0000;
		color:#FFFFFF;
		text-align: center;
		line-height: 40px;
		margin-top: auto;
	}
}
.bigbox{
	position: relative;
}
.mark{
	width: 100vw;
	height: calc(100vh - 46px);
	position: absolute;
	top:0;
	left:0;
	background: rgba(0,0,0,0.3);
	display: flex;
	& .image{
		background: url(../../../assets/images/backimg.png) no-repeat;
		width: calc(100vw - 50px);
		height: calc((100vw - 50px) / 0.72);
		background-size: 100%;
		margin: auto;
		& div:first-of-type{
			height:40vw;
			width:40vw;
			background: #ffffff;
			margin:42px auto;
		}
		& .content{
			margin-top: 60px;
			text-align: center;
			& p{
				color: #fff;
				font-size: 16px;
				line-height: 28px;
			}
		}
	}
}
</style>