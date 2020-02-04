
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">工艺名称：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.craftName"> </el-input>
    &nbsp;
    <label class="filter-label">工艺ID：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.number="listQuery.id" @keyup.native="proving1"> </el-input>
    &nbsp;
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
    &nbsp;
    <el-button type="primary" v-waves @click="$router.push({ name: 'addCraft' })">新增</el-button>
  </div>
  <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="100px" align="left" label="工艺ID">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="180px" align="center" label="工艺名称">
      <template slot-scope="{ row }">
        <span>{{row.craftName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <!--<span>{{row.isDraft == 0 ? '已发布' : '草稿'}}</span>-->
        <span>{{auditState[row.auditState]}}</span>
      </template>
    </el-table-column>

    <el-table-column align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          type="success"
          @click="$router.push({ name: 'addCraft', query: { id: row.id } })"
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
} from '@/api/merchant/craft'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
  },
  
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: {
        id: undefined,
        craftName: undefined
      },
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      },
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
  	 proving1(e){
  	 		let data = this.listQuery.id.toString();
        this.listQuery.id = data.replace(/[^\.\d]/g,'');
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
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前工艺？`, '提示', {
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
</style>
