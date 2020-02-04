<template>
	<el-container style="padding:0 20px">
		<el-header class="header">
			<el-col :span="6" class="search">
				<el-input v-model="brandName" placeholder="输入品牌"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="search">查找</el-button>
			</el-col>
			<el-col :span="4" >
				<el-button icon="el-icon-plus" @click="details">添加品牌</el-button>
			</el-col>
		</el-header>
        <el-table :data="list" style="width:100%"   border v-loading="loading">
		    </el-table-column>
		    <el-table-column prop="id" label="id" >
		    </el-table-column>
		    <el-table-column prop="brandName"  label="品牌名称">
		    </el-table-column>
		    <el-table-column label="操作" >
		        <template slot-scope="scope">
		          <el-button type="text" size="small" @click="details(scope.row)">更改</el-button>
		          <el-button type="text" size="small" @click="deletes(scope.row.id)">删除</el-button>	
		        </template>
		    </el-table-column>
    	</el-table>
    	<el-footer class="footer">
			  <el-pagination
			  	:page-size="limit"
			    @current-change="chan"
			    layout="prev, pager, next"
			    :total="total">
			  </el-pagination>
    	</el-footer>
    </el-container>
</template>

<script>
	import { getBrandList, getTotal, removeItem} from '@/api/aggregate/brand'
	export default {
    	name: 'brand',
    	data(){
    		return {
    			brandName:'',
    			vvv:'',
    			offset:null,
    			limit:10,
    			total:null,
    			list:null,
    			loading:false,
    		}
    	},
	    methods:{
	    	getBrandList,
	    	getTotal,
	    	removeItem,
	    	//初始化
	    	async init(){
	    		this.loading = true
	    		let { data } = await this.getBrandList({brandName:this.brandName,offset:this.offset,limit:this.limit})
	    		this.loading = false
	    		this.list = data
	    	},
	    	//设置总条数
	    	async setTotal(){
	    		let { data } = await this.getTotal({brandName:this.brandName,offset:this.offset,limit:this.limit})
	    		this.total = data
	    		console.log(data)
	    	},
	    	chan(num){
	    		this.offset = num
	    		this.init()
	    	},   
	    	//删除
	    	async deletes(id){
	    		await this.removeItem({id:id})
	    		this.$message({
    				message:'删除成功',
    				type: 'success'
    			})
	    		if(this.list.length<=1){
	    			this.offset = (this.offset - 1) || 1
	    		}
	    		this.setTotal()
	    		this.init()
	    	},
	    	//搜索
	    	search(){
	    		this.offset = 1
	    		this.init()
	    		this.vvv = this.brandName
	      		this.setTotal()
	    	},
		    //进入详情页
		    details(row){
		    	let query
		    	console.log(row)
		    	if(row.id){
		    		query = {
		    			id: row.id,
		    			type:1,
		    			offset:this.offset,
		    			brandName:this.vvv
		    		}
		    	}else{
		    		query = {
		    			type:0
		    		}
		    	}
		    	this.$router.push({
		          name: 'brandAdd',
		          query:query
               })
		    }
	    },
	    created() {
	    	this.offset = this.$route.query.offset || 1
	    	this.brandName = this.$route.query.brandName || null 
	      	this.init()
	      	this.setTotal()
	    },
  	}
</script>
<style scoped>
	.header{
		margin:20px 0;
		display:flex;
		justify-content: space-between;;
	}
	.search{
		display:flex;
	}
	.search button{
		margin-left: 10px;
		height:36px;
	}
	table{
		margin:0 10px;
	}
	.footer{
		padding:10px 0;
		display:flex;
		justify-content: space-around;
	}
</style>