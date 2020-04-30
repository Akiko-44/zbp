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
        excelTitleText="商品统计"
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
          <p class="pl-1">￥{{fixtotalData.stockNum || 0}}</p>
          <p class="statistics-value pl-1">库存数量</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.cumuSaleGoodsNum || 0}}</p>
          <p class="statistics-value pl-1">累计销售商品数量</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.cumuWaitSaleGoodsNum || 0}}</p>
          <p class="statistics-value pl-1">累计下架商品数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">￥{{fixtotalData.cumuGoodsCollectNum || 0}}</p>
          <p class="statistics-value pl-1">当前商品收藏数量</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.finishOrderNum || 0}}</p>
          <p class="statistics-value pl-1">当前上架商品数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">￥{{fixtotalData.cumuWaitAuditGoodsNum || 0}}</p>
          <p class="statistics-value pl-1">当前待审核商品数</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">{{fixtotalData.cumuSaleOutGoodsNum || 0}}</p>
          <p class="statistics-value pl-1">当前已售罄商品数</p>
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
          label="日期"
        >
          <template slot-scope="{ row }">
            <span>{{row.statisticsDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="上架商品数"
        >
          <template slot-scope="{ row }">
            <span>{{row.saleGoodsNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待审核商品数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitAuditGoodsNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待上架商品数"
        >
          <template slot-scope="{ row }">
            <span>{{row.waitSaleGoodsNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已售罄商品数"
        >
          <template slot-scope="{ row }">
            <span>{{row.saleOutGoodsNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="下架商品数"
        >
          <template slot-scope="{ row }">
            <span>{{row.saleOutGoodsNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="新增商品收藏数量"
        >
          <template slot-scope="{ row }">
            <span>{{row.goodsCollectNum || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="取消商品收藏数量"
        >
          <template slot-scope="{ row }">
            <span>{{row.goodsCollectNum || 0}}</span>
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
  goodsStatisticsList,
  goodsStatisticsTotal
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
      tableKey: 0,
      editableTabsValue: '0',
      editableTabsValue2: '0',
      editableTabs: [{
        title: '全部',
        name: '0'
      }, {
        title: '珠宝店',
        name: '1'
      }, {
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      editableTabs2: [{
        title: '全部',
        name: '0'
      }, {
        title: '珠宝店',
        name: '1'
      }, {
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      fixtotalData: undefined,
      totalData: undefined,
      listData: [],
      exportList: [],
      total: null,
      listLoading: true,
      dateValue: '',
      excelTitle: [{
        statisticsDate: '日期',
        saleGoodsNum: '销售商品数',
        customGoodsNum: '定制商品数',
        stockNum: '库存总数',
        waitAuditGoodsNum: '待审核商品数',
        waitSaleGoodsNum: '待上架商品数',
        saleOutGoodsNum: '已售罄商品数',
        goodsCollectNum: '商品收藏数'
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
    this.getTotalData(0)
    this.getListData(0, 0, this.listParams)
  },
  methods: {
    getFixTotalData() {
      goodsStatisticsTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
        })
    },
    getTotalData(type, params) {
      goodsStatisticsTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params) {
      this.listLoading = true
      goodsStatisticsList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      const oldLimit = this.listParams.limit
      goodsStatisticsList(this.editableTabsValue2, 1, {
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
