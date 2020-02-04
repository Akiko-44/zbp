
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">标题：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.title"> </el-input>

    &nbsp;
    <label class="filter-label">状态：</label>
    <el-select v-model="listQuery.showStatus" clearable placeholder="状态">
      <el-option
        v-for="(item, index) in showStatus"
        :key="index"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>

    &nbsp;
    <label class="filter-label">时间：</label>
    <el-date-picker
      v-model="dateValue"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    >
    </el-date-picker>

  </div>

  <div class="filter-container">
    <el-button type="primary" v-waves @click="handlerAdd">新建广告图</el-button>
    <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
    <el-button type="text" @click="resetQuery">清空条件</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="200px" align="center" label="序号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="标题">
      <template slot-scope="{ row }">
        <span>{{row.title}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="权重">
      <template slot-scope="{ row }">
        <span>{{row.grade}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="图片">
      <template slot-scope="{ row }">
        <img :src="row.imgUrl | setImg({w: 300})" style="max-width: 100%" />
      </template>
    </el-table-column>
    
    <el-table-column width="300px" align="center" label="展示周期">
      <template slot-scope="{ row }">
        <span>{{row.startTime}} - {{row.endTime}}</span>
      </template>
    </el-table-column>
  
    <el-table-column width="300px" align="center" label="链接">
      <template slot-scope="{ row }">
        <span>{{row.url}}</span>
      </template>
    </el-table-column>
  
    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{showState[row.showStatus]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作" width="200">
      <template slot-scope="{ row, $index }">
        <el-button size="small" @click="handleUpdate(row)" type="primary">编辑</el-button>
        <el-button size="small" @click="handleDelete(row)" type="danger">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

  <AddBannerDialog ref="dialog" @success="success" />
</div>
</template>

<script>
import {
  page,
  delObj
} from '@/api/aggregate/exhibitionBanner'
import waves from '@/directive/waves' // 水波纹指令
import AddBannerDialog from './addBannerDialog'

const getInitQuery = () => {
  return {
    offset: 1,
    limit: 20,
    showStatus: undefined,
    title: undefined,
    startTime: undefined,
    endTime: undefined
  }
}

export default {
  directives: {
    waves
  },
  components: {
    AddBannerDialog
  },
  data() {
    return {
      showStatus: [
        { name: '待展示', value: 0 },
        { name: '展示中', value: 1 },
        { name: '已过期', value: 2 }
      ],
      showState: {
        0: '待展示',
        1: '展示中',
        2: '已过期'
      },

      list: null,
      total: null,
      listLoading: true,
      listQuery: getInitQuery(),
      tableKey: 0,
      dateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
  },
  watch: {
    dateValue(value) {
      this.listQuery.startTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
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
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = ''
    },
    success() {
      this.getList()
    },
    handlerAdd() {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
    },
    handleUpdate(data) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
        dialog.dateValue = [dialog.form.startTime, dialog.form.endTime]
      })
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前广告图？`, '提示', {
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

