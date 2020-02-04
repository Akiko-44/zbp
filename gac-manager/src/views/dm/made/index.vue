<template>
	<div class="app-container calendar-list-container">
	  <div class="filter-container">
	    <label class="filter-label">名称：</label>
	    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listParams.search"> </el-input>
	     &nbsp;
	    <label class="filter-label">订单状态：</label>
	    <el-select v-model="listParams.auditState" clearable placeholder="订单状态">
	      <el-option
	        v-for="item in auditState"
	        :key="item.value"
	        :label="item.label"
	        :value="item.value">
	      </el-option>
	    </el-select>
	    <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
	  </div>
	
	  <el-table class="listTable" :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">	
	    <el-table-column width="80px" align="center" label="名称">
	      <template slot-scope="{ row }">
	        <span>{{row.name}}</span>
	      </template>
	    </el-table-column>
	
	    <el-table-column width="110px" align="center" label="发布人">
	      <template slot-scope="{ row }">
	        <span>{{row.userName}}</span>
	      </template>
	    </el-table-column>
	
	    <el-table-column align="center" label="期望价格区间">
	      <template slot-scope="{ row }">
	        <span>{{row.lowPrice}}-{{row.highPrice}}</span>
	      </template>
	    </el-table-column>
	
	    <el-table-column width="170px" align="center" label="参考图片">
	      <template slot-scope="{ row }">
	        <el-card style="width:150px;" :body-style="{ padding: '0px' }">
			        <img v-if="i == 0" v-for="(item, i) in row.customsPic" :src="item.picUrl | setImg" class="image" width="100%">
			    </el-card>
	      </template>
	    </el-table-column>
	
	    <el-table-column width="150px" align="center" label="需求描述">
	      <template slot-scope="{ row }">
	        <span>{{row.customsDesc}}</span>
	      </template>
	    </el-table-column>
	    
	    <el-table-column align="center" label="发布时间">
	      <template slot-scope="{ row }">
	        <span>{{row.createTime}}</span>
	      </template>
	    </el-table-column>
	    
	    
	         <!-- 审核状态1、待审核2、审核通过3、审核未通过 -->
	    <el-table-column align="center" label="审核状态">
	      <template slot-scope="{ row }">
	        <span v-if="row.auditState == 1">待审核</span>
	        <span v-if="row.auditState == 2">审核通过</span>
	        <span v-if="row.auditState == 3">审核未通过</span>
	      </template>
	    </el-table-column>
	    
	    <el-table-column  width="350px" fixed="right" align="left" label="操作">
	      <template slot-scope="{ row, $index }">
	        <el-button
	        	type="primary"
	          size="small"
	          @click="$router.push({ name: 'madeDetail', query: { madeDetail: JSON.stringify(row) } })"
	        >
	        详情
	        </el-button>
	        <el-button
	        	type="warning"
	          size="small"
	          @click="handleDelete(row.id, $index)"
	        >
	        删除
	        </el-button>
	        <el-button
	        	type="success"
	          size="small"
	          v-if="row.auditState == 1"
	          @click="handleAudit(row.id, $index, 2)"
	        >
	        审核通过
	        </el-button>
	        <el-button
	        	type="danger"
	          size="small"
	          v-if="row.auditState == 1"
	          @click="handleAudit(row.id, $index, 3)"
	        >
	        审核不通过
	        </el-button>
	        
	      </template>
	    </el-table-column>	
	  </el-table>
	  
	  <el-dialog title="审核操作" :visible.sync="dialogFormVisible">
	    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
	      <el-form-item label="审核意见"  v-if="form.auditState==3" prop="opinion">
	        <el-input v-model="form.opinion"></el-input>
	      </el-form-item>
	      <el-form-item label=""  v-if="form.auditState==2">
	        <span>是否审核通过该需求？</span>
	      </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="cancel('form')">取 消</el-button>
	      <el-button type="primary" :loading="loading" @click="success">确 定</el-button>
	    </div>
	  </el-dialog>
	
	  <div v-show="!listLoading" class="pagination-container">
	    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
	  </div>
	</div>
</template>

<script>
import {
  pageAll,
  delObj,
  audit
} from '@/api/makeMerchant/made'
import { setImg } from '@/filters'


export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      auditState: [
	  		{value: 1, label: '待审核'},
	  		{value: 2, label: '审核通过'},
	  		{value: 3, label: '审核未通过'}
	  	],
      listParams: {
        offset: 1,
        limit: 20,
        search: undefined,
        auditState: undefined
      },
      /*listQuery: {
      	search: undefined,
      	auditState: undefined
      },*/
      form: {
      	customsId:undefined,
      	opinion: undefined,
      	auditState: undefined
      },
      currIndex: 0,
      loading: false,
      dialogFormVisible: false,
      rules: {
        opinion: [
          { required: true, message: '请输入审核意见', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      tableKey: 0
    }
  },
  watch: {
		'$route': 'fetchData',
  },
  created() {
//  this.getList()
		this.fetchData()
  },
  methods: {
  	fetchData () {
       this.listParams.offset = +this.$route.query.page || 1   
       this.getList()
    },
    getList() {
      this.listLoading = true;
      pageAll(this.listParams, 3)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
//    this.listParams.offset = val
//    this.getList()
			this.$router.replace({ name: 'madeList', query: { page: val }})
    },
    handleDelete($id, $index){
    	this.$confirm('此操作将永久删除, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    	delObj($id).then(data =>{
	    		if(data.success){
		    		this.$message({
			        type: 'success',
			        message: '删除成功!'
			      })
			      this.list.splice($index, 1)
			    }else{
			    	this.$message({
			        type: 'info',
			        message: data.msg
			      });
			    }
	    	})
	    })
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.designerId = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    handleAudit(id, $index, auditState){
    	this.currIndex = $index
		this.form.customsId = id
	  	this.form.auditState = auditState
	  	this.dialogFormVisible = true
    },
    // 提交成功
    success() {
      this.$refs.form.validate((valid) => {
	      if (valid) {
	        audit(this.form).then(data => {
	        	if(data.success){
		    		this.$message({
			        type: 'success',
			        message: '提交成功!'
			      })
			      this.list[this.currIndex].auditState = this.form.auditState
			    }else{
			    	this.$message({
			        type: 'info',
			        message: data.msg
			      })
			    }
			    this.cancel()
	        })
	      } else {
	        this.cancel()
	        return false
	      }
	    })
    },
  }
}
</script>

<style lang="postcss" scoped>
	.filter-label {
	  font-size: 14px;
	  color: #909399;
	  font-weight: normal;
	}
	.el-dropdown-link {
	  cursor: pointer;
	  color: #409EFF;
	}
	.el-icon-arrow-down {
	  font-size: 12px;
	}
	.image {
	  display: block;
	  max-width: 100%;
	  background-size: cover;
	  background-repeat: no-repeat;
	  background-position: center;
	}
	.listTable button {
		margin-bottom: 10px;
	}
</style>

