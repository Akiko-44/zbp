<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="时间区间:">
          <el-date-picker
            v-model="createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
          />
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            v-model="listParams.status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="结果:">
          <el-select
            v-model="listParams.result"
            placeholder="请选择结果"
          >
            <el-option
              v-for="item in resultList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <!-- <el-button @click="$router.push({ name:'addAccount' })">添加</el-button>-->
      </el-form>
    </div>

    <el-table
      v-loading.body="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        align="center"
        width="50"
        label="序号"
      />

      <el-table-column
        align="center"
        label="ID"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="任务名"
      >
        <template slot-scope="{ row }">
          <span>{{ row.taskName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{
            row.result == 0 ? "无结果" : row.result == 1 ? "成功" : "失败"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="结果"
      >
        <template slot-scope="{ row }">
          <span>{{
            row.status == 0 ? "未执行" : row.status == 1 ? "执行中" : "执行完成"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="开始时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.beginTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="结束时间"
      >
        <template slot-scope="{ row }">
          <span v-if="row.endTime">{{ row.endTime }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="耗时"
      >
        <template slot-scope="{ row }">
          <span v-if="row.consumeTime">{{ row.consumeTime + "ms" }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="接口名"
      >
        <template slot-scope="{ row }">
          <span v-if="row.apiName">{{ row.apiName }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="创建时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="warning"
            @click="$router.push({ name: 'taskDetail', query: { id: row.id } })"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        :page-size="listParams.size"
        :current-page.sync="listParams.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getTaskPage } from '@/api/task-manager'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        beginTime: undefined,
        endTime: undefined,
        status: undefined,
        result: undefined
      },
      createTime: [],
      statusList: [
        {
          label: '全部',
          value: undefined
        },
        {
          label: '未执行',
          value: 0
        },
        {
          label: '正在执行中',
          value: 1
        },
        {
          label: '执行完成',
          value: 2
        }
      ],
      resultList: [
        {
          label: '全部',
          value: undefined
        },
        {
          label: '无结果',
          value: 0
        },
        {
          label: '成功',
          value: 1
        },
        {
          label: '失败',
          value: 2
        }
      ]
    }
  },
  created() {
    if (this.$route.query.result === '成功') {
      this.listParams.result = 1
    } else if (this.$route.query.result === '失败') {
      this.listParams.result = 2
    } else if (this.$route.query.result === '无结果') {
      this.listParams.result = 0
    }
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      this.listParams.beginTime = this.createTime
        ? this.createTime[0]
        : undefined
      this.listParams.endTime = this.createTime
        ? this.createTime[1]
        : undefined
      getTaskPage(this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
        .catch(() => { })
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.current = val
      this.getList()
    }
  }
}
</script>
