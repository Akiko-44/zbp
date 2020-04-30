<template>
  <div>
    <div class="block-container filter-container py-3">
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="-"
        start-placeholder="起始日期"
        end-placeholder="截至日期"
        :default-time="['00:00:00', '23:59:59']"
        align="right"
        style="width:200px"
      >
      </el-date-picker>
      <el-button
        type="primary"
        class="primary-btn-sm ml-2 mr-1"
        v-waves
        @click="handleFilter"
      >查询</el-button>
      <export-excel
        ref="exportExcel"
        excelTitleText="订单统计"
        :excelTitle="excelTitle"
        @click.native.stop="getExportList"
      ></export-excel>
    </div>

    <div
      class="statistics-container block-container pt-1"
      v-if="fixtotalData"
    >
      <h4>汇总统计</h4>
      <div class="d-flex flex-wrap">
        <div class="statistics-item">
          <p class="pl-1">￥{{fixtotalData.cumuTradeFlow || 0}}</p>
          <p class="statistics-value pl-1">累计交易流水（GMV）</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.cumuOrderNum || 0}}</p>
          <p class="statistics-value pl-1">累计订单数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.waitPayOrderNum || 0}}</p>
          <p class="statistics-value pl-1">累计待付款订单数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">￥{{fixtotalData.waitPayOrderAmount || 0}}</p>
          <p class="statistics-value pl-1">累计待付款订单金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.finishOrderNum || 0}}</p>
          <p class="statistics-value pl-1">累计已完成订单数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">￥{{fixtotalData.finishOrderAmount || 0}}</p>
          <p class="statistics-value pl-1">累计已完成订单金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.refundOrderNum || 0}}</p>
          <p class="statistics-value pl-1">累计退款订单数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">￥{{fixtotalData.refundOrderAmount || 0}}</p>
          <p class="statistics-value pl-1">累计退款订单金额</p>
        </div>
      </div>
    </div>

    <div class="block-container pt-3 pb-4">
      <el-table
        :data="listData"
        v-loading.body="listLoading"
        class="custom-table"
        highlight-current-row
      >
        <el-table-column
          align="center"
          width="90"
          label="日期"
        >
          <template slot-scope="{ row }">
            <span>{{row.statisticsDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待付款订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitPayOrderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待付款订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitPayOrderAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待确认订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitConfirmOrderNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待确认订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitConfirmOrderAmount || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待发货订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitDeliverOrderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待发货订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitDeliverOrderAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已发货订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitReceiveOrderNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已发货订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitReceiveOrderAmount || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已收货订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.receiveOrderNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已收货订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.receiveOrderAmount || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已完成订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.finishOrderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已完成订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.finishOrderAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款订单数"
        >
          <template slot-scope="{ row }">
            <span>{{row.refundOrderNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款订单金额"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.refundOrderAmount || 0}}</span>
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
          :page-sizes="[10,20,30,50]"
          :page-size="listParams.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        > </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  orderStatisticsList,
  orderStatisticsTotal
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令
import exportExcel from '@/components/app/exportExcel'

export default {
  directives: {
    waves
  },
  components: {
    exportExcel
  },
  data() {
    return {
      type: 0,
      listParams: {
        offset: 1,
        limit: 20,
        startTime: '',
        endTime: ''
      },
      startTime: undefined,
      endTime: undefined,
      isSummary: false,
      editableTabsValue: '0',
      editableTabsValue2: '0',
      fixtotalData: undefined,
      totalData: undefined,
      listData: [],
      total: null,
      listLoading: true,
      dateValue: '',
      exportList: [],
      excelTitle: [{
        statisticsDate: '日期',
        tradeOrderNum: '交易订单数',
        tradeFlow: '交易流水',
        waitPayOrderNum: '待付款订单数',
        waitPayOrderAmount: '待付款订单金额',
        waitConfirmOrderNum: '待确认订单数',
        waitConfirmOrderAmount: '待确认订单金额',
        waitDeliverOrderNum: '待发货订单数',
        waitDeliverOrderAmount: '待发货订单金额',
        waitReceiveOrderNum: '待收货订单数',
        waitReceiveOrderAmount: '待收货订单金额',
        receiveOrderNum: '已收货订单数',
        receiveOrderAmount: '已收货订单金额',
        finishOrderNum: '已完成订单数',
        finishOrderAmount: '已完成订单金额',
        cancelOrderNum: '已取消订单数',
        cancelOrderAmount: '已取消订单金额',
        refundOrderNum: '退款/货订单数',
        refundOrderAmount: '退款/货订单金额'
      }]
    }
  },
  watch: {
    dateValue(value) {
      this.startTime = value ? value[0] : undefined
      this.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getFixTotalData()
    this.getListData(0, 0, this.listParams)
  },
  methods: {
    getFixTotalData() {
      orderStatisticsTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
        })
    },
    getTotalData(type, params) {
      orderStatisticsTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params) {
      this.listLoading = true
      orderStatisticsList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      const oldLimit = this.listParams.limit
      orderStatisticsList(this.editableTabsValue2, 1, {
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.$refs.exportExcel.exportList = this.exportList
        this.$refs.exportExcel.downloadFile()
        this.listParams.limit = oldLimit
      })
    },
    handleFilter() {
      if (this.startTime != undefined) {
        this.isSummary = true
      } else {
        this.isSummary = false
      }
      this.listParams.startTime = this.startTime
      this.listParams.endTime = this.endTime
      this.listParams.offset = 1
      this.getTotalData(0, this.listParams)
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    }
  }
}
</script>

<style scoped>
</style>
