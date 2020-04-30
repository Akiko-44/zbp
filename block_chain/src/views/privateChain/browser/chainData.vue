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
            clearable
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
            clearable
          >
            <el-option
              v-for="item in contractList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="数据类型:">
          <el-select
            v-model="listParams.type"
            clearable
            placeholder="请选择数据类型"
          >
            <el-option
              v-for="(value,key) in typeMap"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item> -->
        <el-button
          type="primary"
          @click="handleFilter"
        >查询</el-button>
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
        label="组织"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.groupName }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="合约名"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.contractName }}
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        align="center"
        label="数据类型"
      >
        <template slot-scope="{ row }">
          <span>{{ typeMap[row.type] }}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        label="时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="数据详情"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="$router.push({name: 'chainDataDetail',query: {id: row.id}})"
          >查看</el-button>
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
import { getContractTx } from '@/api/browser'
import { getContractName } from '@/api/chain-interaction'
import { getUserGroup } from '@/api/group'

export default {
  data() {
    return {
      groupList: [],
      contractList: [],
      listParams: {
        current: 1,
        size: 20,
        groupId: '',
        contractId: '',
        type: ''
      },
      total: null,
      list: null,
      listLoading: false
      // typeMap: {
      //   '1': '商品',
      //   '2': '订单'
      // }
    }
  },
  watch: {
    $route: 'fetchData'
  },
  async created() {
    this.getGroupList()
    // if (this.$route.query.groupId) {
    //   this.listParams.groupId = this.$route.query.groupId
    //   this.listParams.contractId = this.$route.query.id
    // }
    this.fetchData()
    if (this.$route.query.groupId && this.$route.query.contractId) {
      this.getContractList()
    }
  },
  methods: {
    fetchData() {
      this.listParams.current = +this.$route.query.current || 1
      this.listParams.size = +this.$route.query.size || 20
      this.listParams.groupId = this.$route.query.groupId
      this.listParams.contractId = this.$route.query.contractId
      // this.listParams.type = this.$route.query.type
      this.getList()
    },
    getGroupList() {
      getUserGroup().then(data => {
        this.groupList = data.data
        this.groupList.map(item => {
          item.label = item.group.join('-->')
        })
      })
    },
    getContractList() {
      getContractName({ groupId: this.listParams.groupId }).then(data => {
        this.contractList = data.data
      })
    },
    changeGroup() {
      this.listParams.contractId = ''
      if (this.listParams.groupId) {
        this.getContractList()
      } else {
        this.contractList = []
      }
    },
    getList() {
      this.listLoading = true
      getContractTx(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs.listQueryForm.validate(valid => {
        if (valid) {
          this.$router.replace({
            name: 'chainData',
            query: {
              current: this.listParams.current,
              size: this.listParams.size,
              groupId: this.listParams.groupId,
              contractId: this.listParams.contractId
              // type: this.listParams.type
            }
          })
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      // this.listParams.size = val
      // this.getList()
      this.$router.replace({
        name: 'chainData',
        query: {
          current: this.listParams.current,
          size: val,
          groupId: this.listParams.groupId,
          contractId: this.listParams.contractId
          // type: this.listParams.type
        }
      })
    },
    handleCurrentChange(val) {
      // this.listParams.current = val
      // this.getList()
      this.$router.replace({
        name: 'chainData',
        query: {
          current: val,
          size: this.listParams.size,
          groupId: this.listParams.groupId,
          contractId: this.listParams.contractId
          // type: this.listParams.type
        }
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
