
<template>
  <div>
    <div class="block-container filter-container pt-3">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="designReportListQueryForm"
        label-width="81px"
        class="listQueryForm"
      >
        <el-form-item label="生成时间:">
          <el-date-picker
            v-model="createValue"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            style="width:200px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select
            v-model="listQuery.auditState"
            clearable
            placeholder="审核状态"
          >
            <el-option
              label="待审核"
              value="0"
            ></el-option>
            <el-option
              label="审核通过"
              value="1"
            ></el-option>
            <el-option
              label="审核不通过"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          class="primary-btn-sm mr-1"
          @click="handleFilter"
        >查询</el-button>
        <export-excel
          ref="exportExcel"
          excelTitleText="统计列表"
          :excelTitle="excelTitle"
          @click.native.stop="getExportList"
        ></export-excel>
        <!-- <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button> -->
      </el-form>
    </div>

    <div class="block-container pt-1">
      <h4>汇总统计</h4>
      <div class="d-flex flex-wrap">
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">账户余额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">待入账金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计交易流水（GMV）</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计销售金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计已完成金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计提现金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计提现手续费</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计优惠金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计退款金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计快递费用</p>
        </div>
      </div>
    </div>

    <div class="block-container pt-1">
      <h4>查询汇总</h4>
      <div class="d-flex flex-wrap">
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">交易流水（GMV）</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">销售金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">已完成金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">提现金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">提现手续费</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">优惠金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">退款金额</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">快递费用</p>
        </div>
      </div>
    </div>

    <div class="block-container pt-3">
      <el-table
        :data="list"
        v-loading.body="listLoading"
        class="custom-table"
        highlight-current-row
      >
        <el-table-column
          width="180px"
          align="center"
          label="日期"
        >
          <template slot-scope="{ row }">
            <span>{{row.createTime}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="订单号"
        >
          <template slot-scope="{ row }">
            <span>{{row.orderNumber}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="商品编号"
        >
          <template slot-scope="{ row }">
            <span>{{row.orderGoods[0].skuId}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="商品名称"
        >
          <template slot-scope="{ row }">
            <span>{{row.orderGoods[0].skuName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="商品数量"
        >
          <template slot-scope="{ row }">
            <span>{{row.orderGoods[0].goodsNumber}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="收货人姓名"
        >
          <template slot-scope="{ row }">
            <span>{{row.receiveName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="收货人电话"
        >
          <template slot-scope="{ row }">
            <span>{{row.mobile}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="收货人地址"
        >
          <template slot-scope="{ row }">
            <span>{{row.receiveArea}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="支付时间"
        >
          <template slot-scope="{ row }">
            <span>{{row.payTime}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="订单金额"
        >
          <template slot-scope="{ row }">
            <span>{{row.payMoney}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="优惠类型"
        >
          <template slot-scope="{ row }">
            <span>满减券</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="优惠金额"
        >
          <template slot-scope="{ row }">
            <span>{{row.couponsPrice}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="应收金额"
        >
          <template slot-scope="{ row }">
            <span>{{row.payMoney}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="运费"
        >
          <template slot-scope="{ row }">
            <span>{{row.freightMoney}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="审核状态"
        >
          <template slot-scope="{ row }">
            <span>{{auditState[row.auditState]}}</span>
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
          :current-page.sync="listQuery.offset"
          :page-sizes="[10,20,30,50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        > </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { page } from '@/api/designMerchant/report'
import exportExcel from '@/components/app/exportExcel'

export default {
  components: {
    exportExcel
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        orderNumber: undefined,
        receiveName: undefined,
        createBTime: undefined,
        createETime: undefined,
        payBTime: undefined,
        payETime: undefined,
        auditState: undefined
      },
      tableKey: 0,
      createValue: '',
      payValue: '',
      auditState: {
        0: '待审核',
        1: '审核通过',
        2: '审核不通过'
      },
      excelTitle: [{
        orderNumber: '订单号',
        skuId: '商品编号',
        skuName: '商品名称',
        goodsNumber: '商品数量',
        receiveName: '收货人姓名',
        mobile: '收货人电话',
        receiveArea: '收货人地址',
        createTime: '下单时间',
        payTime: '支付时间',
        payMoney: '订单金额',
        couponsType: '优惠类型',
        couponsPrice: '优惠金额',
        receivableMoney: '应收金额',
        freightMoney: '运费',
        state: '审核状态'
      }],
      exportList: [],
      rules: {
        orderNumber: [
          { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  watch: {
    createValue(value) {
      this.listQuery.createBTime = value ? value[0] : undefined
      this.listQuery.createETime = value ? value[1] : undefined
    },
    payValue(value) {
      this.listQuery.payBTime = value ? value[0] : undefined
      this.listQuery.payETime = value ? value[1] : undefined
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['designReportListQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    resetQuery() {
      this.listQuery.orderNumber = undefined
      this.listQuery.receiveName = undefined
      this.listQuery.createBTime = undefined
      this.listQuery.createETime = undefined
      this.listQuery.payBTime = undefined
      this.listQuery.payETime = undefined
      this.listQuery.auditState = undefined
      this.$refs['designReportListQueryForm'].resetFields()
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    getExportList() {
      const oldLimit = this.listQuery.limit
      this.listQuery.limit = 9999
      page(this.listQuery)
        .then(data => {
          this.exportList = data.data.records
          this.exportList.map(item => {
            item.couponsType = '满减券'
            item.state = this.auditState[item.auditState]
            item.skuId = item.orderGoods[0].skuId
            item.skuName = item.orderGoods[0].skuName
            item.goodsNumber = item.orderGoods[0].goodsNumber
            item.receivableMoney = item.payMoney
          })
          this.$refs.exportExcel.exportList = this.exportList
          this.$refs.exportExcel.downloadFile()
          this.listQuery.limit = oldLimit
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor /deep/ .el-range-separator {
  padding: 0;
}
h4 {
  margin-bottom: 20px;
  line-height: 42px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
}
.statistics-item {
  margin-right: 20px;
  margin-bottom: 30px;
  width: 220px;
  color: #333333;
  font-size: 20px;
  line-height: 50px;
  border: 1px solid #f0f3f9;
  .statistics-value {
    line-height: 34px;
    font-size: 12px;
    background: #efefef;
  }
}
.statistics-item:nth-child(4n) {
  margin-right: 0;
}
</style>

