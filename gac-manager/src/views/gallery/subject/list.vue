
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="$router.push({name: 'addSubject'})" type="primary" icon="edit">添加专题</el-button>
  </div>
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入标题/发布人" v-model="listQuery.name"> </el-input>
    <el-select v-model="listQuery.auditState" clearable placeholder="审核状态">
      <el-option
        v-for="item in status"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="listQuery.type" clearable placeholder="全部专题">
      <el-option
        v-for="item in type"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="220px" align="left" label="文章标题">
      <template slot-scope="{ row }">
        <span>{{row.title}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="更新时间">
      <template slot-scope="{ row }">
        <span>{{row.updateTime || '-'}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="点击数">
      <template slot-scope="{ row }">
        <span>{{row.clickNum || '-'}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="发布人">
      <template slot-scope="{ row }">
        <span>{{row.authorName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{auditState[row.auditState]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="专题类别">
      <template slot-scope="{ row }">
        <span>{{statustype[row.type]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="center" label="操作" width="350">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          type="success"
          @click="$router.push({ name: 'addSubject', query: { id: row.id } })"
        >
          编辑
        </el-button>
        <el-button v-if="row.auditState !== 2" size="small" type="primary" @click="audit(row, 2)">审核通过</el-button>
        <el-button v-if="row.auditState !== 3" size="small" type="warning" @click="audit(row, 3)">审核拒绝</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page,
  delObj,
  audit
} from '@/api/gallery/subject'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'subjectList',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        name: undefined,
        auditState: null,
        type: null
      },
      tableKey: 0,
      status: [
        { value: 1, label: '待审核' },
        { value: 2, label: '已发布' }
      ],
      type: [
        { value: 1, label: '精品专题' },
        { value: 2, label: '玉雕臻选' },
        { value: 3, label: '流行风尚' }
      ],
      statustype: {
        1: '精品专题',
        2: '玉雕臻选',
        3: '流行风尚'
      },
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
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
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前专题？`, '提示', {
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
    audit(row, state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          audit(row.id, state).then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            row.auditState = state
          })
        })
    }
  }
}
</script>
