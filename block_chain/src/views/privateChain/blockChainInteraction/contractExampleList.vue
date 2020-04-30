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
            placeholder="请选择Group"
            @change="changeGroup"
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
          <el-select
            v-model="listParams.contractId"
            placeholder="请选择合约"
          >
            <el-option
              v-for="item in contractList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-button
          type="primary"
          @click="handleFilter"
        >查找</el-button>
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
        label="合约实例地址"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'contractAddress',query: { address: row.address }})">{{ row.address }}</span>
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
        width="100"
        label="默认选择"
      >
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.enable"
            @change="handleCheck(scope.row.id, scope.row.enable)"
          />
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
            type="primary"
            @click="
              $router.push({
                name: 'privateContractExampleCall',
                query: { data: JSON.stringify(row) }
              })
            "
          >合约调用</el-button>
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
  getContractInstance,
  getContractName,
  changeEnable
} from '@/api/chain-interaction'
import { getUserGroup } from '@/api/group'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        groupId: '',
        contractId: ''
      },
      groupList: [],
      contractList: []
    }
  },
  async created() {
    this.getGroupList()
    if (this.$route.query.groupId) {
      this.listParams.groupId = this.$route.query.groupId
      this.listParams.contractId = this.$route.query.id
      this.getList()
    } else {
      const groupList = await getUserGroup()
      this.listParams.groupId = groupList.data[0].id
      const contractList = await getContractName({
        groupId: this.listParams.groupId
      })
      this.listParams.contractId = contractList.data[0].id
      this.getList()
    }
    this.getContractList()
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
    getContractList() {
      this.listLoading = true
      getContractName({ groupId: this.listParams.groupId }).then(data => {
        this.contractList = data.data
      })
    },
    changeGroup() {
      this.listParams.contractId = ''
      this.getContractList()
    },
    handleCheck(id, check) {
      if (check) {
        this.$confirm(`确定修改合约实例默认选择？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeEnable({ id }).then(() => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        })
      }
    },
    getList() {
      this.listLoading = true
      getContractInstance(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
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
.el-table /deep/.DisabledSelection .cell .el-checkbox__inner {
  display: none;
  position: relative;
}
.el-table /deep/.DisabledSelection .cell:before {
  content: '默认选择';
  position: absolute;
  right: 11px;
}
</style>
