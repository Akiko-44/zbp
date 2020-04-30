<template>
	<div class="details">
		<div class="address" v-show="addshow">
  			<h1>选择指定地区</h1>
	  		<div class="region">
	  			<p v-for="(item,index) in isData"><input type="checkbox" :value="item.regionName" v-model="region"/>{{item.regionName}}</p>
	  		</div>
	  		<div class="bottom">
	  			<input class="button success" value="确认" type="button" @click="cg">
	  		</div>
  		</div>
		<div class="named">
	  		<div class="named_name">
	  			<div class="items">
	  				<span @click="edit">添加指定区域运费</span>
	  			</div>
	  			<div class="dz">
	  				<p v-for="item in region">{{item}}</p>
	  			</div>
	  		</div>
	  		<div class="weights weight">
				    <el-input v-model="listQuery.regionstartWeight"></el-input><span>件/g内</span><el-input v-model="listQuery.regionstartPrice"></el-input><span>元；每增加</span><el-input v-model="listQuery.regionRenewWeight"></el-input>
				    <span>件/g,运费增加</span>
				    <el-input v-model="listQuery.regionRenewPrice"></el-input><span>元</span>
		    </div>
		    <button class="btn">保存</button>
	  	</div>
	</div>
</template>

<script>
	import {
		regions,
		address
	} from '@/api/designMerchant/freight'
    export default {
     data(){
			return {
				region:[],
				isData:'',
				addshow:false,
				isShow:false,
				listQuery:{
					regionstartWeight:null,
					regionstartPrice:null,
					regionRenewWeight:null,
					regionRenewPrice:null
				}
			}
			},
			created(){
	  			this.listregion()
	  		},
			methods:{
				edit(){
					var _this = this;
					_this.addshow = true;
				},
				listregion(){
	  				regions().then(data =>{
	  					this.isData = data.data;
	  				})
	  			},
				cg(){
	  				var _this = this;
	  				setTimeout(() => console.log(_this.region))
	  				if(_this.region == ''){
	  					alert('请选择指定地区')
	  				}else{
	  					_this.addshow = false;
	  				}
	  			}
			}
    }
  </script>
<style type="text/css" scoped="scoped">
	.details{
		width: 1000px;
    height: 100%;
    position: relative;
    top: 50%;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    margin-top: -300px;
	}
	.fh{
		display: block;
	    width: 80px;
	    background:rgba(22, 155, 213, 1);;
	    color: #fff;
	    text-decoration: none;
	    text-align: center;
	    height: 30px;
	    line-height: 30px;
	    margin: 20px 25px 30px;
	    border-radius: 5px;
	}
	.named{
		width: 1000px;
		height: 600px;
		border:1px solid #ccc;
		background: #fff;
		margin-left: 10%;
		margin-top: 40px;
		position: relative;
	}
	.named_name{
		display: flex;
		align-items: center;
		border-bottom:1px solid #ccc;
		background: rgba(242, 242, 242, 1);
	}
	.dz{
		flex: 2;
	}
	.dz p{
		display: inline-block;
		padding: 0 5px;
	}
	.items span{
		display: inline-block;
		padding: 14.5px 24px;
		color:rgba(22, 155, 213, 1);
	}
	.weight{
		margin: 55px 22px;
	}
	.address1{
		border-top: 1px solid #ccc;
		margin: 10px 0;
		color:rgba(22, 155, 213, 1);
	}
	.weights-input{
		width: 100px;
		height:30px;
		border:1px solid #ccc;
		border-radius: 10px;
		margin:0 5px;
	}
	.title{
		font-size: 16px;
		margin-left: 25px;
	}
	.address{
		width: 620px;
		height: 380px;
		border:1px solid #ccc;
		position: absolute;
		top:10%;
		left:50%;
		margin-left: -315px;
		background: #FFF;
		z-index: 33;
	}
	.address h1{
		font-size:20px;
		text-align: center;
		color: #666;
	}
	.address .region{
		border-top: 1px solid #ccc;
	}
	.region p{
		display: inline-block;
		padding: 0 24px;
		font-size: 16px;
		height: 0px;
	}
	.address .bottom{
		width: 100%;
		height: 50px;
		background: #ccc;
		position: absolute;
		bottom:0;
	}
	.bottom .button{
		float: right;
		width: 140px;
		height: 35px;
		margin:7.5px 5px 0;
		border:0;
		border-radius: 8px;
	}
	.success{
		background:rgba(22, 155, 213, 1);
		color:#fff;
	}
	.cancel{
		background: #fff;
		color:#333;
	}
	.btn{
		width: 150px;
	    height: 35px;
	    border: 0;
	    /*margin: 35px 26px;*/
	   	position: absolute;
	   	bottom: 33px;
	   	right: 33px;
	    color: #fff;
	    border-radius: 5px;
	    background: rgba(22, 155, 213, 1);
	}
	.el-input--medium{
		width: 100px;
	}
	.weight span{
		padding: 0 5px;
	}
</style>