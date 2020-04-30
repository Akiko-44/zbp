<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :model="listParams"
        :inline="true"
      >
        <el-form-item>
          <el-input
            v-model="listParams.address"
            style="width: 800px;"
            placeholder="请输入内容"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-button
          type="primary"
          @click="handleFilter"
        >查询</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
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
        label="交易hash"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'transactionHash',query: { hash: row.transactionHash }})">{{ row.transactionHash }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="100"
        label="区块号"
        class-name="blue-column"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({name: 'blockHeight',query: { blockNumber: row.blockNumber }})">{{ row.blockNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="150"
        label="类型"
      >
        <template slot-scope="{ row }">
          <span>{{ typeMap[row.type] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="交易发起方地址"
      >
        <template slot-scope="{ row }">
          <span v-if="row.from === listParams.address">{{ row.from }}</span>
          <span
            v-else
            class="blue-link"
            @click="linkToAddress(row.from)"
          >{{ row.from }}</span>
          <!-- <span @click="$router.push({name: 'walletAddress',query: { address: row.from }})">{{ row.from }}</span> -->
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="交易接收方地址"
      >
        <template slot-scope="{ row }">
          <span v-if="row.to === listParams.address">{{ row.to }}</span>
          <span
            v-else
            class="blue-link"
            @click="linkToAddress(row.to)"
          >{{ row.to }}</span>
          <!-- <span>{{ row.to }}</span> -->
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        label="块内索引"
      >
        <template slot-scope="{ row }">
          <span>{{ row.transactionIndex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        label="矿工费"
      >
        <template slot-scope="{ row }">
          <span>{{ row.txFee }} Ether</span>
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
import { searchAddress, isContractAddress } from '@/api/browser'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        current: 1,
        size: 20,
        address: ''
      },
      typeMap: {
        0: '部署合约',
        1: '转账',
        2: '合约交易'
      }
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.query.address !== from.query.address) {
        this.listParams.address = to.query.address
        this.getList()
      }
    }
  },
  created() {
    if (this.$route.query.address) {
      this.listParams.address = this.$route.query.address
    }
    // if (this.listParams.address) {
    this.getList()
    // }
  },
  methods: {
    getList() {
      this.listLoading = true
      // if (!this.listParams.address) {
      //   this.$message({
      //     message: '请输入钱包地址查询',
      //     type: 'warning'
      //   })
      //   return
      // }
      searchAddress(this.listParams).then(data => {
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
    },
    linkToAddress(address) {
      isContractAddress({ address }).then(data => {
        if (data.data) {
          this.$router.push({
            name: 'contractAddress',
            query: { address: address }
          })
        } else {
          this.$router.push({
            name: 'walletAddress',
            query: { address: address }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
