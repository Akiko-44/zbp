
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">标题：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.caseName"> </el-input>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    <el-button type="text" @click="resetQuery">清空条件</el-button>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="180px" align="center" label="订单编号">
      <template slot-scope="{ row }">
        <span>{{row.orderNumber}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="标题">
      <template slot-scope="{ row }">
          <span v-if="row.orderGoodVOList && row.orderGoodVOList.length">{{row.orderGoodVOList[0].skuName}}</span>
          <!--<span>{{row.orderGoodVOList[0].skuName}}</span>-->
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="图片">
      <template slot-scope="{ row }">
        <span v-if="row.orderGoodVOList && row.orderGoodVOList.length">
          <img :src="row.orderGoodVOList[0].skuMainPic | setImg" style="height: 100px;" />
        </span>
        <!--<img :src="row.orderGoodVOList[0].skuMainPic | setImg" style="height: 100px;" />-->
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="买家">
      <template slot-scope="{ row }">
        <span>{{row.buyUserName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="下单时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="付款时间">
      <template slot-scope="{ row }">
        <span>{{row.payTime}}</span>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page
} from '@/api/common/order'
import waves from '@/directive/waves' // 水波纹指令
import { orderState, payType } from '@/utils/mixins/order'

const getInitQuery = () => {
  return {
    caseName: undefined,
    orderType: 7,
    status: '2'
  }
}

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: getInitQuery(),
      tableKey: 0,
      orderState,
      payType
    }
  },
  computed: {
    orderStatus() {
      return Object.keys(this.orderState).map(key => {
        return { value: key, label: +key === 3 ? '设计中' : this.orderState[key] }
      })
    },
    src() {
      const data = Object.keys(this.srcState).map(key => {
        return { value: key, label: this.srcState[key] }
      })
      return data
    }
  },
  watch: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(2, this.listQuery, this.listParams)
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
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    resetQuery() {
      this.listQuery = getInitQuery()
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

