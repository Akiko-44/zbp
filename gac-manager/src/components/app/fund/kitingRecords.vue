
<template>
  <div class="app-container calendar-list-container">
    <el-row
      :gutter="20"
      class="total"
    >
      <el-col :span="5">
        <h4>总金额</h4>
        <p class="red">￥{{info.amount || 0}}</p>
      </el-col>
      <el-col :span="5">
        <div style="display:inline-block;">
          <h4>账户余额</h4>
          <p class="red">￥{{balance | round}}</p>
        </div>
        <el-button
          plain
          type="primary"
          v-waves
          @click="kiting"
          v-if="balance<100"
          disabled
        >提现</el-button>
        <el-button
          plain
          type="primary"
          v-waves
          @click="kiting"
          v-else
        >提现</el-button>
        <el-tooltip
          placement="right"
          effect="light"
        >
          <i class="el-icon-question"></i>
          <div slot="content">
            <div style="color: #FF0000;font-size: 12px;margin-bottom: 15px;line-height: 20px;">
              <div>温馨提示：</div>
              <div>1.最低提现金额为100元</div>
              <div>2.可提现时间为工作日的14:00至17:00</div>
              <div>3.平台手续费为每笔订单金额的1%</div>
              <div>4.提现手续费为提现金额的0.02%</div>
              <div>5.银联还会根据不同的支付方式对每笔完成订单收取对应的手续费，具体费率如下：</div>
              <div style="padding-left:10px;">a、微信公众号、小程序、H5、PC扫码支付，费率为0.38%</div>
              <div style="padding-left:10px;">b、APP支付（包含微信支付、支付宝支付），费率为0.63%</div>
              <div style="padding-left:10px;">c、如果您是以个人身份入驻平台，那么每笔订单的交易费率会统一为0.63%</div>
              <div>6.银联手续费=交易手续费+提现手续费</div>
            </div>
          </div>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <h4>银联手续费</h4>
        <p class="red">￥{{info.freeMoney || 0}}</p>
      </el-col>
      <el-col :span="5">
        <h4>平台服务费</h4>
        <p class="red">￥{{info.platServiceFee || 0}}</p>
      </el-col>
      <el-col :span="4">
        <h4>待入账金额</h4>
        <p class="red">￥{{info.lockAmount || 0}}</p>
      </el-col>
    </el-row>
    <div class="filter-container">
      <label class="filter-label">时间：</label>
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      &nbsp;
      <el-button
        type="primary"
        icon="el-icon-search"
        v-waves
        @click="handleFilter"
      >查询</el-button>
      <!--<el-button type="text" @click="resetQuery">清空条件</el-button>-->
    </div>

    <div class="filter-container">

      <!--<el-button type="text" @click="$router.push({ name: 'cardList' })">添加银行卡</el-button>-->
    </div>

    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column
        align="center"
        label="交易号"
      >
        <template slot-scope="{ row }">
          <span>{{row.sysOrderId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="提现金额"
      >
        <template slot-scope="{ row }">
          <span>￥{{transformMoney(row.transAmt)}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        align="center"
        label="应到帐金额"
      >
        <template slot-scope="{ row }">
          <span>￥{{transformMoney(row.transAmt)}}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        label="银行卡号"
      >
        <template slot-scope="{ row }">
          <span>{{row.cardNo}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="提现状态"
      >
        <template slot-scope="{ row }">
          <span>{{payState[row.status]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="提现时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.trxTime}}</span>
        </template>
      </el-table-column>

    </el-table>

    <!-- <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div> -->

    <KitingDialog
      ref="dialog"
      :dwMoney="dwMoney"
      @success="success"
    />
  </div>
</template>

<script>
import {
  page,
  drawMoney
} from '@/api/common/fund'
import waves from '@/directive/waves' // 水波纹指令
import KitingDialog from './kitingDialog'
import { round } from '@/filters'

export default {
  directives: {
    waves
  },
  components: {
    KitingDialog
  },
  data() {
    return {
      auditState: {
        1: '待审核', 2: '审核通过', 3: '审核不通过'
      },
      payState: {
        '0': '处理中',
        '4': '成功',
        '5': '失败'
      },
      balance: 0,
      info: {
        amount: 0,
        lockAmount: 0,
        freeMoney: 0,
        platServiceFee: 0
      },
      dwMoney: undefined,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        beginDate: '2019-05-01',
        endDate: undefined
      },
      tableKey: 0,
      dateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
  },
  watch: {
    dateValue(value) {
      this.listQuery.beginDate = value ? value[0] : undefined
      this.listQuery.endDate = value ? value[1] : undefined
    }
  },
  created() {
    const d = new Date()
    let month
    let day
    if (d.getMonth() < 10) {
      month = '0' + (d.getMonth() + 1)
    } else {
      month = (d.getMonth() + 1)
    }
    if (d.getDate() < 10) {
      day = '0' + d.getDate()
    } else {
      day = d.getDate()
    }
    this.listQuery.endDate = d.getFullYear() + '-' + month + '-' + day
    this.getList()
    this.getInfo()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          if (data.data.responseCode == '000000') {
            this.list = JSON.parse(data.data.recordList)
            this.total = Number(data.data.totalTransNum)
          }
          this.listLoading = false
        })
    },
    getInfo() {
      drawMoney().then(result => {
        this.info = result.data || {}
        this.info.freeMoney = this.info.freeMoney.toFixed(2)
        this.dwMoney = this.info.amount - this.info.lockAmount - this.info.freeMoney
        this.info.platServiceFee = this.info.platServiceFee || 0
        this.balance = this.info.amount - this.info.lockAmount - this.info.freeMoney - this.info.platServiceFee
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = undefined
    },
    kiting() {
      const dialog = this.$refs.dialog
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
    },
    success(form) {
      this.getList()
    },
    transformMoney(val) {
      let stringVal = val.toString()
      const arr = stringVal.toString().split('')
      if (arr.length === 2) {
        stringVal = '0' + stringVal
        arr.splice(0, 0, '0')
      }
      return stringVal.substr(0, arr.length - 2) + '.' + stringVal.substr(arr.length - 2)
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
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.total {
  text-align: center;
}
.total h4 {
  margin-bottom: 0;
}
.red {
  margin-top: 10px;
  margin-bottom: 40px;
  color: #f56c6c;
}
</style>

