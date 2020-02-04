<template>
	<div class="freight_box">
		<div class="freight_button">
			<button class="btn1" @click="$router.push({ name: 'freightmodel' })">运费设置说明</button>
			<button class="btn2" @click="addlists()">添加运费模板</button>
		</div>
		<div class="freight_model">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="name"
			      label="模板名称"
			      width="950"
			      align="center">
			    </el-table-column>
			    <el-table-column label="操作" align="center">
			      <template slot-scope="scope">
			      	<el-button
			          size="mini"
			          @click="appoint(scope.$index, scope.row)">添加指定地区运费</el-button>
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			          <el-button
			          @click.native.prevent="handleDelete(scope.$index, scope.row,tableData)"
			          type="danger"
			          size="small">删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		getpage,
		del
	} from '@/api/designMerchant/freight'
	
  export default {
    data() {
      return {
        tableData:null,
        total:null,
        listParams: {
	        offset: 1,
        	limit: 10,
	      },
      }
    },
    created(){
    	this.getList()
    },
    methods: {
    	getList(){
    		getpage(this.listParams).then(data =>{
    			this.tableData = data.data.records;
    			this.total = data.data.total;
    		})
    	},
        handleEdit(index, row) {
          this.$router.push({name: 'editlist',query:{ id:row.id}});
        },
        handleDelete(index, row, data) {
          del(row.id).then(lis =>{
          	data.splice(index, 1);
          })
        },
        appoint(index, row){
      	  this.$router.push({name: 'appointlist',query:{ id:row.id}});
        },
        addlists(){
      	  this.$router.push({name: 'addlist'});
        },
        handleSizeChange(val) {
        	console.log(val)
		    this.listParams.limit = val
		    this.getList()
	    },
	    handleCurrentChange(val) {
	    	console.log(val)
		    this.listParams.offset = val
		    this.getList()
	    },
    }
  }
</script>

<style type="text/css" scoped="scoped">
	.freight_box{
		width: 100%;
		height: 100%;
	}
	.freight_button{
		width: 100%;
		margin-top: 26px;
	}
	.freight_button .btn1{
		width: 150px;
		height: 40px;
		background: rgba(153, 153, 153, 1);
		color:#FFF;
		border:0;
		outline: 0;
		border-radius: 10px;
		margin-left: 30px;
	}
	.freight_button .btn2{
		width: 150px;
		height: 40px;
		border: 0;
		background: rgba(22, 155, 213, 1);
		color: #fff;
		margin-left: 30px;
		border-radius: 10px;
		outline: 0;
	}
	.freight_model{
		width: 100%;
		margin-top: 20px;
	}
	.el-pagination{
		margin-left: 65%;
    	margin-top: 30px;
	}
</style>