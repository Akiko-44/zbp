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
        excelTitleText="运营数据统计"
        :excelTitle="excelTitle"
        @click.native.stop="getExportList"
      ></export-excel>
    </div>

    <div
      class="block-container pt-1 pb-2"
      v-if="fixtotalData"
    >
      <h4>汇总统计</h4>
      <div class="d-flex flex-wrap">
        <div class="statistics-item d-flex">
          <div class="blue-bg"></div>
          <div class="pl-1 d-flex flex-column py j-sb">
            <p>￥{{fixtotalData.cumuTradeFlow || 0}}</p>
            <p class="statistics-value">累计顾客数量</p>
          </div>
        </div>
        <div class="statistics-item d-flex">
          <div class="red-bg"></div>
          <div class="pl-1 d-flex flex-column py j-sb">
            <p>{{fixtotalData.cumuOrderNum || 0}}</p>
            <p class="statistics-value">累计粉丝数</p>
          </div>
        </div>
        <div class="statistics-item d-flex">
          <div class="gray-bg"></div>
          <div class="pl-1 d-flex flex-column py j-sb">
            <p>{{fixtotalData.waitPayOrderNum || 0}}</p>
            <p class="statistics-value">累计访客数（UV）</p>
          </div>
        </div>
        <div class="statistics-item d-flex">
          <div class="blue-bg"></div>
          <div class="pl-1 d-flex flex-column py j-sb">
            <p>￥{{fixtotalData.waitPayOrderAmount || 0}}</p>
            <p class="statistics-value">累计浏览量（PV）</p>
          </div>
        </div>
        <div class="statistics-item d-flex">
          <div class="red-bg"></div>
          <div class="pl-1 d-flex flex-column py j-sb">
            <p>{{fixtotalData.finishOrderNum || 0}}</p>
            <p class="statistics-value">订单转化率</p>
          </div>
        </div>
        <div class="statistics-item d-flex">
          <div class="gray-bg"></div>
          <div class="pl-1 d-flex flex-column py j-sb">
            <p>￥{{fixtotalData.finishOrderAmount || 0}}</p>
            <p class="statistics-value">退款率</p>
          </div>
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
          label="新增顾客数量"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitPayOrderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="新增粉丝数"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitPayOrderAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="取消关注数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitConfirmOrderNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="访客数（UV）"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitConfirmOrderAmount || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="浏览量（PV）"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitDeliverOrderNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单转化率"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.waitDeliverOrderAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款率"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitReceiveOrderNum || 0}}</span>
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
        tradeOrderNum: '新增顾客数量',
        tradeFlow: '新增粉丝数',
        waitPayOrderNum: '取消关注数',
        waitPayOrderAmount: '访客数（UV）',
        waitConfirmOrderNum: '浏览量（PV）',
        waitConfirmOrderAmount: '订单转化率',
        waitDeliverOrderNum: '退款率'
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

<style scoped lang="scss">
h4 {
  margin-bottom: 20px;
  line-height: 42px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
}

.statistics-item {
  width: 156px;
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  .statistics-value {
    font-size: 12px;
    color: #999999;
  }
  .blue-bg {
    width: 4px;
    height: 51px;
    background: linear-gradient(
      0deg,
      rgba(153, 229, 237, 1) 0%,
      rgba(220, 250, 254, 1) 100%
    );
    border-radius: 2px;
  }
  .red-bg {
    width: 4px;
    height: 51px;
    background: linear-gradient(
      0deg,
      rgba(253, 158, 145, 1) 0%,
      rgba(252, 222, 218, 1) 100%
    );
    border-radius: 2px;
  }
  .gray-bg {
    width: 4px;
    height: 51px;
    background: linear-gradient(
      0deg,
      rgba(201, 201, 201, 1) 0%,
      rgba(226, 226, 226, 1) 100%,
      rgba(226, 226, 226, 1) 100%,
      rgba(236, 236, 236, 1) 100%
    );
    border-radius: 2px;
  }
}
</style>
