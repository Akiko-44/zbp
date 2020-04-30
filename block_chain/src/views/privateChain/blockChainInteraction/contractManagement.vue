<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item label="Group:">
          <el-select
            v-model="listParams.groupId"
            clearable
            placeholder="请选择Group"
          >
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合约名:">
          <el-input
            v-model="listParams.name"
            style="width: 195px;"
            placeholder="请输入合约名"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="合约类型:">
          <el-select
            v-model="listParams.type"
            clearable
            placeholder="请选择合约类型"
          >
            <el-option
              v-for="(value,key) in typeMap"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker
            v-model="createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
          />
        </el-form-item>
        <el-button
          type="primary"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          class="fr"
          type="warning"
          @click="$router.push({ name: 'privateAddContract' })"
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
        align="center"
        label="Group"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.group.join("，") || "--" }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="合约名"
      >
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="合约类型"
      >
        <template slot-scope="{ row }">
          <span>{{ typeMap[row.type] }}</span>
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
        fixed="right"
        align="center"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="!row.status"
            size="small"
            type="text"
            @click="updateContractStatus(row.id, row.status, $index)"
          >启用</el-button>
          <el-button
            v-if="row.status"
            size="small"
            type="text"
            @click="updateContractStatus(row.id, row.status, $index)"
          >禁用</el-button>
          <el-button
            size="small"
            type="text"
            :disabled="!row.status"
            @click="getAbi(row.id)"
          >ABI</el-button>
          <el-button
            size="small"
            type="text"
            :disabled="!row.status"
            @click="
              $router.push({
                name: 'privateContractDeployment',
                query: { data: JSON.stringify(row) }
              })
            "
          >合约部署</el-button>
          <el-button
            size="small"
            type="text"
            :disabled="!row.status"
            @click="
              $router.push({
                name: 'privateContractExampleList',
                query: { id: row.id, groupId: row.groupId }
              })
            "
          >合约实例列表</el-button>
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
import {
  contractList,
  updateContractStatus,
  getAbi
} from '@/api/chain-interaction'
import { getUserGroup } from '@/api/group'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      createTime: [],
      listParams: {
        current: 1,
        size: 20,
        name: '',
        groupId: '',
        type: undefined,
        startTime: '',
        endTime: ''
      },
      groupList: [],
      options: [],
      typeMap: {
        0: '公有合约',
        1: '私有合约'
      }
    }
  },
  created() {
    this.getList()
    this.getGroupList()
  },
  methods: {
    getGroupList() {
      this.listLoading = true
      getUserGroup().then(data => {
        this.groupList = data.data
        this.groupList.map(item => {
          item.label = item.group.join('-->')
        })
      })
    },
    groupChangeHandler(value) {
      this.listParams.groupId = value[value.length - 1]
    },
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      contractList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getAbi(id) {
      getAbi({ id }).then(data => {
        data.data = data.data.replace(/\n/g, '<br>')
        data.data = data.data.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        const nodeData =
          '<p style="max-height:300px;overflow-y:scroll;">' +
          data.data +
          '</p>'
        this.$alert(nodeData, {
          confirmButtonText: '关闭',
          dangerouslyUseHTMLString: true,
          customClass: 'width-dialog-600'
        })
      })
    },
    updateContractStatus(id, status) {
      const msg = status ? '禁用' : '启用'
      const updateStatus = status ? 0 : 1
      this.$confirm(`是否${msg}该合约？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        updateContractStatus({
          id: id,
          status: updateStatus
        })
          .then(data => {
            this.getList()
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

<style scoped lang="scss">
.no-btn-text {
  display: inline-block;
  width: 56px;
  text-align: center;
}
</style>
