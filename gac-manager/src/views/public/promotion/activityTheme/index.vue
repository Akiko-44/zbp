<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item label="主题名称">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入主题名称"
            v-model="listParams.name"
          > </el-input>
        </el-form-item>

        <el-form-item label="更新时间">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
        <el-button
          class="fr"
          type="primary"
          v-waves
          @click="$router.push({name: 'activityThemeModify'})"
        >添加</el-button>
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="主题名称"
      >
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="关联商品数"
      >
        <template slot-scope="{ row }">
          <span>{{ row.goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="关联店铺数"
      >
        <template slot-scope="{ row }">
          <span>{{ row.merchantNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="有效期"
      >
        <template slot-scope="{ row }">
          <span>{{ row.showStartDate }} ~ {{ row.showEndDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            @click="$router.push({name: 'activityThemeModify', query: {id: row.id, type: 'detail'}})"
          >详情</el-button>
          <el-button
            class="auditBtn"
            size="small"
            @click="$router.push({name: 'activityThemeModify', query: {id: row.id}})"
          >编辑</el-button>
          <el-button
            class="auditBtn"
            size="small"
            @click="$router.push({name: 'activityThemeRelationGoods', query: {activityThemeId: row.id, activityThemeName: row.name}})"
          >关联商品</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delTheme(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  activityTheme,
  deleteActivityThemeSetRelationGoods
} from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      createTime: '',
      listParams: {
        offset: 1,
        limit: 20,
        name: '',
        updateStartTime: '',
        updateEndTime: ''
      },
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.updateStartTime = this.createTime ? this.createTime[0] : ''
      this.listParams.updateEndTime = this.createTime ? this.createTime[1] : ''
      activityTheme(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delTheme(row) {
      const tip =
        (new Date().getTime() > new Date(row.showStartDate).getTime()) && (new Date().getTime(row.showEndDate) < new Date().getTime()) ? '当前活动标识处于有效期内，确定要删除吗？' : '确定要删除当前活动标识吗？'
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteActivityThemeSetRelationGoods(row.id)
          .then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
          .catch(() => { })
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
.auditBtn {
  margin-left: 0;
}
</style>
