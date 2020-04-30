<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="调度名称:">
          <el-input
            v-model="listParams.name"
            style="width: 195px;"
            placeholder="请输入调度名称"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="调度类型:">
          <el-select
            v-model="listParams.scheduleType"
            placeholder="请选择调度类型"
          >
            <el-option
              v-for="item in scheduleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上链平台:">
          <el-select
            v-model="listParams.platformId"
            placeholder="请选择上链平台"
          >
            <el-option
              v-for="item in platformList"
              :key="item.id"
              :label="item.displayName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行状态:">
          <el-select
            v-model="listParams.status"
            placeholder="请选择执行状态"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行结果:">
          <el-select
            v-model="listParams.result"
            placeholder="请选择执行结果"
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
        >
          查找
        </el-button>
        <el-button
          class="fr"
          type="warning"
          @click="$router.push({ name: 'modifyDispatch' })"
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
        label="调度名称"
      >
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="调度类型"
      >
        <template slot-scope="{ row }">
          <span>{{ scheduleMap[row.scheduleType] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="上链平台"
      >
        <template slot-scope="{ row }">
          <span>{{ row.displayName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="执行操作"
      >
        <template slot-scope="{ row }">
          <span>{{ actionMap[row.action] || "-" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="执行状态"
      >
        <template slot-scope="{ row }">
          <span>{{ statusMap[row.status] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="执行结果"
      >
        <template slot-scope="{ row }">
          <span>{{ resultMap[row.result] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="创建时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="260"
        fixed="right"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            @click="
              $router.push({ name: 'modifyDispatch', query: { id: row.id } })
            "
          >修改</el-button>
          <el-button
            size="small"
            type="warning"
            @click="delDispatch(row.id, $index)"
          >删除</el-button>
          <el-button
            size="small"
            @click="showDetailDialog(row.log)"
          >执行详情</el-button>
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

    <el-dialog
      title="执行详情"
      :visible.sync="dialogVisible"
      width="40%"
      custom-class="detail-dialog"
    >
      <div class="detail-dialog-body">
        <p
          v-for="(item, i) in detailList"
          :key="i"
        >{{ item }}</p>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delDispatch, getDispatchList } from "@/api/dispatch"
import { getAllPlatformList } from "@/api/common"

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        name: '',
        scheduleType: undefined,
        platformId: undefined,
        status: undefined,
        result: undefined
      },
      platformList: [],
      dialogVisible: false,
      detailList: [],
      scheduleList: [
        { label: '全部', value: undefined },
        { label: '表达式调度', value: 1 },
        { label: '定时器调度', value: 2 }
      ],
      statusList: [
        { label: '全部', value: undefined },
        { label: '未执行', value: 0 },
        { label: '正在执行中', value: 1 },
        { label: '执行完成', value: 2 }
      ],
      resultList: [
        { label: '全部', value: undefined },
        { label: '无结果', value: 0 },
        { label: '成功', value: 1 },
        { label: '失败', value: 2 }
      ],
      scheduleMap: {
        1: '表达式调度',
        2: '定时器调度'
      },
      actionMap: {
        0: 'DB数据抽取',
        1: '上链',
        2: 'DB篡改校验',
        3: 'DB补数',
        4: 'SFTP数据抽取',
        5: 'SFTP补数申请',
        6: 'SFTP补数',
        7: 'SFTP篡改验证申请',
        8: 'SFTP篡改验证'
      },
      statusMap: {
        0: '未执行',
        1: '正在执行中',
        2: '执行完成'
      },
      resultMap: {
        0: '无结果',
        1: '成功',
        2: '失败'
      }
    };
  },
  created() {
    this.getList()
    this.getAllPlatformList()
  },
  methods: {
    getAllPlatformList() {
      getAllPlatformList().then(data => {
        this.platformList = data.data
        this.platformList.unshift({ id: undefined, displayName: '全部' })
      })
    },
    getList() {
      this.listLoading = true
      getDispatchList(this.listParams).then(data => {
        this.list = data.data.records
        this.listLoading = false
        this.total = data.data.total
      })
    },
    delDispatch(id, index) {
      this.$confirm('是否确认删除该调度？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delDispatch(id)
          .then(data => {
            this.list.splice(index, 1)
          })
          .catch(() => { })
      })
    },
    showDetailDialog(log) {
      if (!log) {
        this.$alert('该调度暂无执行详情', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            return
          }
        })
      } else {
        this.detailList = log.split('|')
        this.dialogVisible = true
      }
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      });
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

<style lang="scss" scoped>
.detail-dialog .detail-dialog-body {
  overflow: auto;
  padding-left: 10px;
  max-height: 500px;
  border: $border-1;
  border-radius: 5px;
  & p {
    line-height: 20px;
  }
}
</style>
