
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
  	<el-form :inline="true" :model="listParams" :rules="rules" ref="jewelryTalentListQueryForm" label-width="101px" class="listQueryForm">
		  <el-form-item label="用户ID:" prop="userid">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listParams.userid"> </el-input>
		  </el-form-item>
		  <el-form-item label="姓名:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listParams.userName"> </el-input>
		  </el-form-item>
		  <el-form-item label="企业名称:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listParams.companyName"> </el-input>
		  </el-form-item>
		  <el-form-item label="类型:">
		  	<el-select v-model="listParams.userType" clearable placeholder="请选择类型">
		      <el-option
		        v-for="item in type"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
    	<el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    	<el-button type="text" @click="resetQuery">清空条件</el-button>
    </el-form>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="80px" align="center" label="ID">
      <template slot-scope="{ row }">
        <span>{{row.userid}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="企业名称">
      <template slot-scope="{ row }">
        <span>{{row.companyName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="企业注册号">
      <template slot-scope="{ row }">
        <span>{{row.taxNumber}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="姓名">
      <template slot-scope="{ row }">
        <span v-if="row.userType != 4">{{row.userName}}</span>
        <span v-if="row.userType == 4">{{row.merchantName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="身份证号">
      <template slot-scope="{ row }">
        <span>{{row.idNumber}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="类型">
      <template slot-scope="{ row }">
        <span>{{typeMap[row.userType]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="审核状态">
      <template slot-scope="{ row }" v-if="row.userType == 4">
        <span v-if="row.status == 1">审核不通过</span>
        <span v-if="row.status == 2">未认证</span>
        <span v-if="row.status == 3">已认证</span>
      </template>
    </el-table-column>

    <el-table-column width="300px" fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: 'jewelryTalentDetail', query: { id: row.userid } })"
        >
          详情
        </el-button>
        <div style="display: inline-block;" v-if="row.userType == 4 && row.status != 3">
	        <el-button size="small" v-if="row.status == 1 || row.status == 2" type="primary" @click="audit(row, 3, $index)">审核通过</el-button>
	        <el-button size="small" v-if="row.status == 3 || row.status == 2" type="warning" @click="audit(row, 1, $index)">审核拒绝</el-button>
        </div>
        <el-button size="small" v-if="row.status == 3" type="primary" @click="uploadInfo(row.userid)">上传资料</el-button>
      </template>
    </el-table-column>

  </el-table>
  
  <audit-dialog ref="auditDialog" @success="auditSuccess" />

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  
</div>
</template>

<script>
import { page } from '@/api/swap/jewelryTalent'
import { merSign } from '@/api/public/merchant'
import auditDialog from './auditDialog'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components:{
  	auditDialog
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      index: 0,
      listParams: {
        userid: null,
        userName: null,
        companyName: null,
        userType: null,
        offset: 1,
        limit: 20
      },
      tableKey: 0,
      type: [
        {value: 1, label: '个人'},
        {value: 4, label: '商家'}
      ],
      typeMap: {
        1: '个人',
        4: '商家'
      },
      rules: {      	
      	userid: [
	        { pattern: /^[0-9]*$/, message: '用户ID需为纯数字', trigger: 'blur' }
	      ]
      }
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
      this.listLoading = true
      page(this.listParams)
        .then(succ => {
          this.list = succ.data.records
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['jewelryTalentListQueryForm'].validate((valid) => {
	      if (valid) {
	        this.getList()
	      } else {
	        return false
	      }
	    })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
//    this.listParams.offset = val
//    this.getList()
      this.$router.replace({ name: 'jewelryTalentList', query: { page: val }})
    },
    resetQuery() {
      this.listParams.userid = null
      this.listParams.userName = null
      this.listParams.companyName = null
      this.listParams.userType = null
      this.$refs['jewelryTalentListQueryForm'].resetFields()
			this.$router.replace({ name: 'jewelryTalentList' })
      this.getList()
    },
    audit(row, status, $index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.userAuthId = row.userid
      dialog.form.auditState = status
      this.index = $index
    },
    auditSuccess(form) {
      this.list[this.index].status = form.auditState
    },
    uploadInfo (id){
			this.$confirm('是否上传资料到银联以获取商编', '上传', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      beforeClose (action, instance, done){
	      	if(action == 'confirm'){
	      		merSign({userId: id}).then(data => {
			      	this.$notify({
			          title: '成功',
			          message: '操作成功，对公打款认证金额及验证码将于3个工作日内发送至贵公司的对公账户中',
			          type: 'success'
			        })
			      	done()
		        })
	      		setTimeout(() => {
	      			done()
	      		},3000)
	      	}else{
	      		done()
	      	}
	      }
	    })
    }
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
</style>

