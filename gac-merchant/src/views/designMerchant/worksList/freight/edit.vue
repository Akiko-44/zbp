<template>
	<div class="addlist">
		<el-form ref="form" :model="listQuery" label-width="80px">
		  <el-form-item label="模板名称">
		    <el-input v-model="listQuery.name" class="input-name"></el-input>
		  </el-form-item>
		  <el-form-item label="计价方式">
		    <el-radio-group v-model="listQuery.pricMethod">
			    <el-radio :label="1">按照件数</el-radio>
			    <el-radio :label="2">按照重量</el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="默认运费" >
		    <el-input v-model="listQuery.startWeight"></el-input><span>件/g内</span><el-input v-model="listQuery.startPrice"></el-input><span>元；每增加</span><el-input v-model="listQuery.renewWeight"></el-input>
		    <span>件/g,运费增加</span>
		    <el-input v-model="listQuery.renewPrice"></el-input><span>元</span>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">保存</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		editlist,
		getpull
	} from '@/api/designMerchant/freight'
	import waves from '@/directive/waves' // 水波纹指令
  export default {
    data() {
      return {
        listQuery: {
          name:'',
          pricMethod:1,
          template_type:2,
          startWeight: '',
          startPrice: '',
          renewWeight:'',
          renewPrice: '',
        }
      }
    },
    created(){
    	this.pull()
    },
    computed:{
		getTitle(){
			let res = location.href.split('/')
			return unescape(res[res.length-1].split('?')[1].split('=')[1])
		}
	},
    methods: {
    	pull(){
			getpull(this.getTitle).then(data =>{
    			console.log(data)
    			this.listQuery.name = data.data.name;
    			this.listQuery.startWeight = data.data.startWeight;
    			this.listQuery.startPrice = data.data.startPrice;
    			this.listQuery.renewWeight = data.data.renewWeight;
    			this.listQuery.renewPrice= data.data.renewPrice;
    		})
    	},
      onSubmit() {
      	if(this.listQuery.name == '' || this.listQuery.startWeight == '' || this.listQuery.startPrice == '' || this.listQuery.renewWeight == '' || this.listQuery.renewPrice == ''){
      		alert('输入框不可为空，请全部填写');
      	}else{
      		editlist(this.listQuery,this.getTitle).then(data =>{
	        	console.log(data)
	        	if(data.msg === '成功'){
	        		this.$router.push({name: 'freightList'});
	        	}else{
	        		alert('提交失败，请重试')
	        	}
	      	})
      	} 
      },
    }
  }
</script>

<style type="text/css" scoped="scoped">
	.addlist{
		margin-top: 20px;
	}
	.el-input--medium{
		width: 120px;
	}
	.input-name{
		width: 500px;
	}
	span{
		padding: 0 5px;
	}
</style>