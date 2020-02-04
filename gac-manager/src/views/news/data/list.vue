<template>
	<el-container style="padding:0 20px">
		<el-header class="header">
			<el-col :span="12" class="search">
				<el-date-picker
			        v-model="date1"
			        type="date" 
			        value-format="yyyy-MM-dd"
			        placeholder="开始日期">
			    </el-date-picker> 	
			    <el-date-picker
				    v-model="date2"
				    type="date"
				    value-format="yyyy-MM-dd"
				    placeholder="结束日期">
			    </el-date-picker>
				<el-button type="primary" icon="el-icon-search" @click="search">查找</el-button>
			</el-col>
			<el-col :span="2" class="bn">
				<el-button icon="el-icon-picture-outline" @click="chart">趋势变化图</el-button>
			</el-col>
		</el-header>
        <el-table :data="list" style="width:100%"  border v-loading="loading">
		    </el-table-column>
		    <el-table-column prop="title" label="文章标题" >
		    </el-table-column>
		    <el-table-column prop="createTime" width="180" label="最新评论时间">
		    </el-table-column>
		    <el-table-column prop="name"  label="栏目">
		    </el-table-column>
		    <el-table-column prop="content"  label="最新评论内容">
		    </el-table-column>
		    <el-table-column prop="readNum" width="140" label="浏览数">
		    </el-table-column>
		    <el-table-column prop="praiseNum" width="140" label="点赞数">
		    </el-table-column>
		    <el-table-column prop="collectionNum" width="140" label="收藏数">
		    </el-table-column>
		    <el-table-column prop="shareNum" width="140" label="分享数">
		    </el-table-column>
		    <el-table-column prop="followNum" width="140" label="关注量">
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
	import { getDataList, getTotal } from '@/api/news/data'
	export default {
    	name: 'list',
    	data(){
    		return {
    			startTime:null,
    			endTime:null,
    			date1:null,
    			date2:null,
    			offset:1,
    			limit:10,
    			total:0,
    			list:null,
    			loading:false
    		}  
    	},
	    methods:{
	    	getDataList,
	    	getTotal,
	    	async init(){
	    		this.loading = true
	    		let { data } = await this.getDataList({startTime:this.startTime,endTime:this.endTime,offset:this.offset,limit:this.limit})
	    		this.loading = false
	    		this.list = data
	    	},
	    	async setTotal(){
	    		let { data } = await this.getTotal({startTime:this.startTime,endTime:this.endTime})
	    		this.total = data
	    	},
	    	chan(num){
	    		this.offset = num
	    		this.init()
	    	},
	    	search(){
	    		this.offset = 1
	    		this.startTime = this.date1
	    		this.endTime = this.date2
	    		this.init()
	      		this.setTotal()
	    	},
	    	chart(){
	    		this.$router.push('dataChart')
	    		
	    	}
	    },
	    created() { 
	      	this.init()
	      	this.setTotal()
	    },
  	}
</script>

<style scoped>
	.header{
		margin:20px 0;
	}
	.bn{
		float:right;
	}
	.footer{
		padding:10px 0;
		display:flex;
		justify-content: space-around;
	}
</style>