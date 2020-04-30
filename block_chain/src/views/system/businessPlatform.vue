<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="平台名称:">
          <el-input
            v-model="listParams.platformName"
            style="width: 195px;"
            placeholder="请输入平台名称"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>

        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          class="fr"
          type="warning"
          @click="$router.push({ name: 'modifyBusiness' })"
        >添加</el-button>
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
        label="平台名称（中文）"
      >
        <template slot-scope="{ row }">
          <span>{{ row.displayName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="平台名称（英文）"
      >
        <template slot-scope="{ row }">
          <span>{{ row.platformName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="是否上链回调平台"
        width="150"
      >
        <template slot-scope="{ row }">
          <span>{{ row.callback == 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="请求回调地址URL"
      >
        <template slot-scope="{ row }">
          <span>{{ row.callbackUrl || "-" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="是否验证回调"
        width="150"
      >
        <template slot-scope="{ row }">
          <span>{{ row.checkCallback == 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="请求验证回调URL"
      >
        <template slot-scope="{ row }">
          <span>{{ row.checkCallbackUrl || "-" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="是否启用"
        width="100"
      >
        <template slot-scope="{ row }">
          <span>{{ row.enabled == 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="添加时间"
        width="160"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="最新上链时间"
        width="160"
      >
        <template slot-scope="{ row }">
          <span>{{ row.lastChainDate || "-" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="280"
        fixed="right"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            @click="
              $router.push({ name: 'modifyBusiness', query: { id: row.id } })
            "
          >修改</el-button>
          <el-button
            size="small"
            type="warning"
            @click="delSecond(row.id, $index)"
          >删除</el-button>
          <el-button
            v-if="!row.extractOrNot"
            size="small"
            type="success"
            @click="
              $router.push({ name: 'extracteData', query: { id: row.id } })
            "
          >补数</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10,20,30,50]"
        :total="total"
        :page-size="listParams.limit"
        :current-page.sync="listParams.offset"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </div>
</template>

<script>
import { delPlatform, getPlatformList } from '@/api/system'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        platformName: ''
      },
      createTime: [],
      buinessList: [],
      blockChainList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPlatformList(this.listParams).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    delSecond(id, index) {
      this.$confirm('是否确认删除该平台？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delPlatform(id)
          .then(data => {
            this.list.splice(index, 1)
          })
          .catch(() => { })
      })
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

<style lang="postcss" scoped>
/* /deep/ .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
</style>
