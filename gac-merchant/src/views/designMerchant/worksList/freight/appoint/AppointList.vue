<template>
	<div class="appList">
		<button class="btn1" @click="addAppint()">添加指定地区运费</button>
		<div class="appointList">
			<el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="region"
		        label="指定地区"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="regionStartWeight"
		        label="单件/重量"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="regionStartPrice"
		        label="单价">
		      </el-table-column>
		      <el-table-column
		        prop="regionRenewWeight"
		        label="增加单间/重量">
		      </el-table-column>
		      <el-table-column
		        prop="regionRenewPrice"
		        label="增加单价">
		      </el-table-column>
		      <el-table-column label="操作" align="center">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="isedit(scope.$index, scope.row)">编辑</el-button>
			         <el-button
			          @click.native.prevent="deletes(scope.$index, scope.row,tableData)"
			          type="danger"
			          size="small">删除</el-button>
			      </template>
			    </el-table-column>
		    </el-table>
		</div>
		<div class="detail" v-show="shows">
			<span @click="qux" class="qux">X</span>
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
						    <el-input v-model="listQuery.regionStartWeight"></el-input><span>件/g内</span><el-input v-model="listQuery.regionStartPrice"></el-input><span>元；每增加</span><el-input v-model="listQuery.regionRenewWeight"></el-input>
						    <span>件/g,运费增加</span>
						    <el-input v-model="listQuery.regionRenewPrice"></el-input><span>元</span>
				    </div>
				    <button class="btn" @click="yes">保存</button>
			  	</div>
			</div>
		</div>
		
		
		<div class="detail" v-show="isshows">
			<span @click="qux" class="qux">X</span>
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
						    <el-input v-model="listQuery.regionStartWeight"></el-input><span>件/g内</span><el-input v-model="listQuery.regionStartPrice"></el-input><span>元；每增加</span><el-input v-model="listQuery.regionRenewWeight"></el-input>
						    <span>件/g,运费增加</span>
						    <el-input v-model="listQuery.regionRenewPrice"></el-input><span>元</span>
				    </div>
				    <button class="btn" @click="baoc">保存</button>
			  	</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		regions,
		Addaddress,
		freightAppointPage,
		delAppointFreightById,
		updateAppointFreight,
		selectAppoint
	} from '@/api/designMerchant/freight'
    export default {
    	computed:{
			getTitle(){
				let res = location.href.split('/')
				return unescape(res[res.length-1].split('?')[1].split('=')[1])
			}
		},
      data() {
        return {
          shows:false,
          tableData: [],
          region:[],
          isshows:false,
		  isData:'',
		  addshow:false,
		  isShow:false,
		  regionAll:'',
		  isid:'',
		  listQuery:{
			  regionStartWeight:'',
			  regionStartPrice:'',
			  regionRenewWeight:'',
			  regionRenewPrice:''
		  },
		  isaddress:0,
        }
      },
      created(){
  			this.listregion()
  		},
      methods:{
      	isedit(index,row){
      		this.isshows = true;
      		this.isid = row.id;
      		selectAppoint(row.id).then(data =>{
      			console.log(data)
      			this.region = data.data.region.split(',');
      			console.log(this.region)
      			this.listQuery.regionStartWeight=data.data.regionStartWeight;
	      		this.listQuery.regionStartPrice=data.data.regionStartPrice;
	      		this.listQuery.regionRenewWeight=data.data.regionRenewWeight;
	      		this.listQuery.regionRenewPrice=data.data.regionRenewPrice;
      		})
      		//this.$router.push({name: 'appointDetails',query:{ id:row.id}});
      	},
      	deletes(index, row,data) {
          delAppointFreightById(row.id).then(lis =>{
          	data.splice(index, 1);
          })
        },
      	addAppint(index){
      		this.shows = true;
      	},
      	qux(){
      		this.shows = false;
      		this.isshows = false;
      		this.addshow = false;
      		this.listQuery.regionStartWeight=''
      		this.listQuery.regionStartPrice=''
      		this.listQuery.regionRenewWeight=''
      		this.listQuery.regionRenewPrice=''
      		this.region = [];
      	},
      	edit(){
			this.addshow = true;
		},
		listregion(){
			freightAppointPage(this.getTitle).then(list =>{
				this.tableData = list.data;
			})
			regions(this.isaddress).then(data =>{
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
		},
		yes(){
			this.regionAll = this.region.join(',');
			Addaddress(this.listQuery,this.getTitle,this.regionAll).then(data =>{
				if(this.listQuery.regionStartWeight == '' || this.listQuery.regionStartPrice == '' || this.listQuery.regionRenewWeight == '' || this.listQuery.regionRenewPrice == ''){
		      		alert('输入框不可为空，请全部填写');
		      	}else{
		      		if(data.msg === '成功'){
		      			this.shows = false;
      					this.region = [];
      					this.$router.go(0);
		      		}else{
		        		alert('提交失败，请重试')
		        	}
		      	}
			})
		},
		baoc(){
			this.regionAll = this.region.join(',');
			console.log(this.regionAll)
			updateAppointFreight(this.listQuery,this.isid,this.regionAll,this.getTitle).then(data =>{
				if(this.listQuery.regionStartWeight == '' || this.listQuery.regionStartPrice == '' || this.listQuery.regionRenewWeight == '' || this.listQuery.regionRenewPrice == ''){
		      		alert('输入框不可为空，请全部填写');
		      	}else{
		      		if(data.msg === '成功'){
		      			this.isshows = false;
      					this.$router.go(0);
		      		}else{
		        		alert('提交失败，请重试')
		        	}
		      	}
			})
		}
      }
    }
  </script>
<style type="text/css" scoped="scoped">
.appList{
	width: 100%;
	height: 100%;
	margin-top: 26px;
	position: relative;
}
.appList .btn1{
	width: 150px;
	height: 40px;
	background:  rgba(22, 155, 213, 1);
	color:#FFF;
	border:0;
	outline: 0;
	border-radius: 10px;
	margin-left: 30px;
}
.appointList{
	margin-top: 20px;
}
.el-pagination{
	margin-left: 65%;
	margin-top: 30px;
}
.detail{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
	position: fixed;
	top:0;
	left:0;
	z-index: 222;
}
.detail .qux{
	font-size: 30px;
    color: #fff;
    position: absolute;
    top: 10px;
    right: 20px;
    cursor:pointer;
}
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