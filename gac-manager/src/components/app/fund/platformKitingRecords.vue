
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="contentlistParamsForm"
        label-width="100px"
        class="contentlistParamsForm"
      >
        <el-form-item
          label="商家名称"
          v-if="type === 2"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入商家名称"
            v-model="listParams.merchantName"
          > </el-input>
        </el-form-item>
        <el-form-item label="提现状态">
          <el-select
            style="width: 150px;"
            v-model="listParams.responseCode"
            placeholder="请选择提现状态"
            clearable
          >
            <el-option
              v-for="item in responseCodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现金额区间">
          <el-form-item prop="smallMoney">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 80px;"
              v-model="listParams.smallMoney"
            > </el-input>
          </el-form-item>
          <span style="margin-right:10px;">-</span>
          <el-form-item prop="bigMoney">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 80px;"
              v-model="listParams.bigMoney"
            > </el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="提现时间">
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
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
      </el-form>
    </div>
    <div class="statistics-container">
      <div>汇总统计</div>
      <el-row
        :gutter="20"
        class="total"
      >
        <el-col :span="5">
          <h4>累计提现金额：<span class="red">￥{{info.withdrawals || 0}}</span></h4>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 1"
        >
          <div style="display:inline-block;">
            <h4>账户余额：<span class="red">￥{{balance | round}}</span></h4>
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
                <div>数据说明：</div>
                <div>1、累计提现金额：平台已经提现到账的金额</div>
                <div>2、账户余额：当前可提现金额</div>
                <div>3、提现手续费：累计提现成功的手续费，提现金额的万分之二</div>
                <div>4、待入账金额：未完成订单的服务费总和</div>
              </div>
            </div>
          </el-tooltip>
        </el-col>
        <el-col
          :span="5"
          v-else
        >
          <div style="display:inline-block;">
            <h4>账户余额：<span class="red">￥{{balance | round}}</span></h4>
          </div>
          <el-tooltip
            placement="right"
            effect="light"
          >
            <i class="el-icon-question"></i>
            <div slot="content">
              <div style="color: #FF0000;font-size: 12px;margin-bottom: 15px;line-height: 20px;">
                <div>数据说明：</div>
                <div>1、累计提现金额：全部商家已经提现到账的金额</div>
                <div>2、账户余额：全部商家当前可提现金额</div>
                <div>3、平台服务费：全部商家已完成订单产生的平台服务费，平台服务费率为1%</div>
                <div>4、待入账金额：全部商家未完成订单的服务费总和</div>
                <div>5、银联手续费：包含交易手续费、提现手续费</div>
                <div style="padding-left:10px;">a、微信公众号、H5、小程序、C扫B的交易手续费率为0.38%</div>
                <div style="padding-left:10px;">b、APP支付的交易手续费率为0.63%</div>
                <div style="padding-left:10px;">c、以个人身份入驻的商家，交易手续费率统一为0.63%</div>
                <div style="padding-left:10px;">d、提现手续费率为0.02%</div>
              </div>
            </div>
          </el-tooltip>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 1"
        >
          <h4>提现手续费：<span class="red">￥{{info.freeMoney || 0}}</span></h4>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 2"
        >
          <h4>银联手续费：<span class="red">￥{{info.freeMoney || 0}}</span></h4>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 2"
        >
          <h4>平台服务费：<span class="red">￥{{info.platServiceFee || 0}}</span></h4>
        </el-col>
        <el-col :span="4">
          <h4>待入账金额<span class="red">￥{{info.lockAmount || 0}}</span></h4>
        </el-col>
      </el-row>
    </div>

    <div
      class="statistics-container"
      v-if="isSummary"
    >
      <div>汇总统计</div>
      <el-row
        :gutter="20"
        class="total"
      >
        <el-col :span="5">
          <h4>累计提现金额：<span class="red">￥{{info.withdrawals || 0}}</span></h4>
        </el-col>
        <el-col :span="5">
          <h4>账户余额：<span class="red">￥{{balance | round}}</span></h4>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 1"
        >
          <h4>提现手续费：<span class="red">￥{{info.freeMoney || 0}}</span></h4>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 2"
        >
          <h4>银联手续费：<span class="red">￥{{info.freeMoney || 0}}</span></h4>
        </el-col>
        <el-col
          :span="5"
          v-if="type === 2"
        >
          <h4>平台服务费：<span class="red">￥{{info.platServiceFee || 0}}</span></h4>
        </el-col>
        <el-col :span="4">
          <h4>待入账金额<span class="red">￥{{info.lockAmount || 0}}</span></h4>
        </el-col>
      </el-row>
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
        label="商家名称"
        v-if="type === 2"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
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
          <!-- <span>{{payState[row.status]}}</span> -->
          <span>{{responseCodeMap[row.responseCode]}}</span>
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

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>

    <KitingDialog
      ref="dialog"
      :dwMoney="dwMoney"
      @success="success"
    />
  </div>
</template>

<script>
import {
  withdrawalPage,
  withdrawalTotal
} from '@/api/common/fund'
import waves from '@/directive/waves' // 水波纹指令
import KitingDialog from './kitingDialog'
import { round } from '@/filters'

export default {
  props: {
    type: Number
  },
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
      responseCodeMap: {
        '000001': '成功',
        '111111': '失败'
      },
      isSummary: false,
      balance: 0,
      info: {
        amount: 0,
        lockAmount: 0,
        freeMoney: 0,
        platServiceFee: 0,
        withdrawals: 0
      },
      dwMoney: undefined,
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        page: 1,
        limit: 20,
        startTime: '2019-05-01',
        endTime: undefined,
        // type: 1, // 1、平台记录列表2、商家记录列表
        merchantName: '',
        responseCode: '', // 提现状态：000001成功、111111失败
        smallMoney: '',
        bigMoney: ''
      },
      responseCodeList: [
        { value: '000001', label: '成功' },
        { value: '111111', label: '失败' }
      ],
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
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.listParams.type = this.type
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
    this.listParams.endTime = d.getFullYear() + '-' + month + '-' + day
    this.getList()
    this.getTotal()
  },
  methods: {
    getList() {
      this.listLoading = true
      withdrawalPage(this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    getTotal() {
      withdrawalTotal({
        type: this.type
      }).then(result => {
        this.info = result.data || {}
        this.info.freeMoney = this.info.freeMoney.toFixed(2)
        this.dwMoney = this.info.amount - this.info.lockAmount - this.info.freeMoney
        this.info.platServiceFee = this.info.platServiceFee || 0
        this.balance = this.info.amount - this.info.lockAmount - this.info.freeMoney - this.info.platServiceFee
      })
    },
    handleFilter() {
      /* if (this.listParams.startTime !== '2019-05-01' || this.listParams.merchantName != '' || this.listParams.responseCode != '' || this.listParams.smallMoney != '' || this.listParams.bigMoney != '') {
        this.isSummary = true
      } else {
        this.isSummary = false
      } */
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.page = val
      this.getList()
    },
    resetQuery() {
      this.listParams = getInitQuery()
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
.statistics-container {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a1a1a1;
  color: #666666;
  border-radius: 10px;
}
.total h4 {
  font-weight: normal;
}
.red {
  margin-top: 10px;
  margin-bottom: 40px;
  color: #f56c6c;
}
</style>

