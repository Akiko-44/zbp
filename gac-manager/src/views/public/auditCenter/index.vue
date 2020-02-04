
<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <label class="filter-label">姓名：</label>
            <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listParams.name"> </el-input>
        	<el-select v-model="listParams.authState" clearable placeholder="请选择">
		      <el-option
		        v-for="item in authState"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
            <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column width="110px" align="center" label="姓名">
                <template slot-scope="{ row }">
                    <span>{{row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column width="300px" align="center" label="身份证">
                <template slot-scope="{ row }">
                    <span>{{row.idNumber}}</span>
                </template>
            </el-table-column>
            
            <el-table-column width="300px" align="center" label="审核状态">
                <template slot-scope="{ row }">
                    <span v-if="row.authState == 1">认证中</span>
                    <span v-if="row.authState == 2">认证通过</span>
                    <span v-if="row.authState == 3">认证未通过</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" align="left" label="操作">
                <template slot-scope="{ row, $index }">
                    <el-button size="small" type="primary" @click="$router.push({ name: 'publicAuditDetail', query: { id: row.id } })">查看</el-button>
			        <el-button size="small" v-if="row.authState == 3 || row.authState == 1" type="primary" @click="audit(row, 2, $index)">审核通过</el-button>
			        <el-button size="small" v-if="row.authState == 1" type="warning" @click="audit(row, 3, $index)">审核拒绝</el-button>
			        
                </template>
            </el-table-column>

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
        
        <audit-dialog ref="auditDialog" @success="auditSuccess" />
    </div>
</template>

<script>
  import {
    page
  } from '@/api/public/auditCenter'
  import auditDialog from './auditDialog'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    directives: {
      waves
    },
    components: {
    	auditDialog
    },
    data() {
      return {
        list: [],
        total: null,
        listLoading: true,
        listParams: {
          offset: 1,
          limit: 20,
          authState: undefined,
          name: undefined
        },
        authState: [
        	{'value': 1, 'label':'认证中'},
        	{'value': 2, 'label':'认证通过'},
        	{'value': 3, 'label':'认证未通过'}
        ],
        tableKey: 0,
        index: 0
      }
    },
    computed: {
    },
    watch: {
		'$route': 'fetchData',
  	},
    created() {
    	this.fetchData()
//    this.getList()
    },
    methods: {
    	fetchData () {
	       this.listParams.offset = +this.$route.query.page || 1   
	       this.getList()
	    },
      getList() {
        this.listLoading = true
        page(this.listParams)
          .then(data => {
            this.list = data.data.records
            this.total = data.data.total
            this.listLoading = false
          }).catch(() => {
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
//      this.listParams.offset = val
//      this.getList()
		this.$router.replace({ name: 'publicAuditList', query: { page: val }})
      },
      audit(row, status, $index) {
	      const dialog = this.$refs.auditDialog
	      dialog.dialogFormVisible = true
	      dialog.form.userAuthId = row.id
	      dialog.form.auditState = status
	      this.index = $index
	  },
	  auditSuccess(form) {
	    this.list[this.index].authState = form.auditState
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
</style>