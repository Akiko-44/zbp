<template>
	<el-container style="padding:0 20px">
		<el-header class="header">
			<el-col :span="6" class="search">
				<el-input v-model="title" placeholder="输入公告标签"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="search">查找</el-button>
			</el-col>
			<el-col :span="4" >
				<el-button icon="el-icon-plus" @click="details">添加公告</el-button>
				<el-button type="danger" icon="el-icon-delete" @click="deletionQuery">删除</el-button>
			</el-col>
		</el-header>
        <el-table :data="list" style="width:100%"  @selection-change="handleSelectionChange" border v-loading="loading">
        	 <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column prop="id" label="id" width="100">
		    </el-table-column>
		    <el-table-column prop="title"  label="公告标签">
		    </el-table-column>
		    <el-table-column prop="content"  label="公告内容">
		    </el-table-column>
		    <el-table-column prop="createTime"  label="公告时间">
		    </el-table-column>
		    <el-table-column prop="lookNum" width="140" label="查看">
		    </el-table-column>
		    <el-table-column label="操作" width="200">
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
	import { getAnniuncentList, getTotal, removeItem} from '@/api/news/anniuncent'
	export default {
    	name: 'list',
    	data(){
    		return {
    			title:'',
    			vvv:'',
    			offset:null,
    			limit:10,
    			total:null,
    			list:null,
    			loading:false,
    			multipleSelection:[]
    		}
    	},
	    methods:{
	    	getAnniuncentList,
	    	getTotal,
	    	removeItem,
	    	//初始化
	    	async init(){
	    		this.loading = true
	    		let { data } = await this.getAnniuncentList({title:this.title,offset:this.offset,limit:this.limit})
	    		this.loading = false
	    		this.list = data
	    	},
	    	//设置总条数
	    	async setTotal(){
	    		let { data } = await this.getTotal({title:this.title,offset:this.offset,limit:this.limit})
	    		this.total = data
	    		console.log(data)
	    	},
	    	chan(num){
	    		this.offset = num
	    		this.init()
	    	},   
	    	//批量删除
	    	deletionQuery(){
	    		if(this.multipleSelection.length){
	    			let ids = this.multipleSelection.join(',')
					this.deletes(ids)
	    		}
				let ids = this.multipleSelection.join(',')
	    	},
	    	//删除
	    	async deletes(ids){
	    		await this.removeItem({ids:ids})
	    		this.$message({
    				message:'删除成功',
    				type: 'success'
    			})
	    		if(this.list.length<=1 || this.multipleSelection.length>=this.list.length){
	    			this.offset = (this.offset - 1) || 1
	    		}
	    		this.setTotal()
	    		this.init()
	    	},
	    	//搜索
	    	search(){
	    		this.offset = 1
	    		this.init()
	    		this.vvv = this.title
	      		this.setTotal()
	    	},
	    	//过滤
	    	handleSelectionChange(val) {
		        this.multipleSelection = val.map(item=>item.id)
		    },
		    //进入详情页
		    details(row){
		    	let query
		    	if(row.id){
		    		query = {
		    			id: row.id,
		    			type:1,
		    			offset:this.offset,
		    			title:this.vvv
		    		}
		    	}else{
		    		query = {
		    			type:0
		    		}
		    	}
		    	this.$router.push({
		          name: 'anniuncentAdd',
		          query:query
               })
		    }
	    },
	    created() {
	    	this.offset = this.$route.query.offset || 1
	    	this.title = this.$route.query.title || null 
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