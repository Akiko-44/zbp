
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="$router.push({name: 'editDesigner'})" type="primary" icon="edit">添加设计师</el-button>
  </div>
  <div class="filter-container">
  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="designerListQueryForm" label-width="101px" class="listQueryForm">
		  <el-form-item label="设计师姓名:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.userName"> </el-input>
		  </el-form-item>
		  <el-form-item label="联系方式:" prop="mobile">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.mobile"> </el-input>
		  </el-form-item>
		  <el-form-item label="设计师地区:">
		  	<v-city
		      @change="cityChange"
		      ref="city"
		    />
		  </el-form-item>
		  <el-form-item label="审核状态:">
		  	<el-select v-model="listQuery.auditState" clearable placeholder="审核状态">
		      <el-option
		        v-for="item in status"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value"
		      >
		      </el-option>
		    </el-select>
		  </el-form-item>
    	<el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
    	<el-button type="text" @click="resetQuery">清空条件</el-button>
    </el-form>
  </div>
  
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="100px" align="left" label="ID">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="姓名">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="120px" align="center" label="联系方式">
      <template slot-scope="{ row }">
        <span>{{row.mobile}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.auditState]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: 'designerDetail', query: { id: row.id } })"
        >
          查看
        </el-button>
        <el-button
          size="small"
          type="success"
          @click="$router.push({ name: 'editDesigner', query: { id: row.id } })"
        >
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

</div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/merchant/designer'
import waves from '@/directive/waves' // 水波纹指令
import VCity from '@/components/app/city'

export default {
  directives: {
    waves
  },
  components: {
    VCity
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      dialogFormVisible: false,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: {
        mobile: undefined,
        userName: undefined,
        auditState: undefined,
        province: undefined,
        city: undefined,
        area: undefined,
        flag: 0
      },
      tableKey: 0,
      status: [
        { value: 1, label: '审核中' },
        { value: 2, label: '审核通过' },
        { value: 3, label: '审核不通过' }
      ],
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      },
      index: undefined,
      rules: {      	
      	mobile: [
	        { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
	      ]
      }
    }
  },
  watch: {
		'$route': 'fetchData'
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
      page(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['designerListQueryForm'].validate((valid) => {
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
      this.$router.replace({ name: 'designerList', query: { page: val }})
    },
    resetQuery() {
      this.listQuery.mobile = undefined
      this.listQuery.userName = undefined
      this.listQuery.auditState = undefined
      this.listQuery.province = undefined
      this.listQuery.city = undefined
      this.listQuery.area = undefined
      this.$refs['designerListQueryForm'].resetFields()
      this.$router.replace({ name: 'designerList' })
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前设计师？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
        })
    },
    cityChange(cities) {
      const fields = ['province', 'city', 'area']
      fields.forEach((value, index) => {
        this.listQuery[value] = cities[index] && cities[index].regionName
      })
    }
  }
}
</script>

<style scoped>
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
