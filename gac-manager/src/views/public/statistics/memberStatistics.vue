<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="paramsForm"
        label-width="135px"
        class="listParamsForm"
      >
        <el-form-item prop="memberId">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 120px;"
            v-model="listParams.memberId"
            placeholder="请输入会员ID"
          > </el-input>
        </el-form-item>
        <el-form-item prop="mobilePhone">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.mobilePhone"
            placeholder="请输入手机号码"
          > </el-input>
        </el-form-item>
        <el-form-item label="所在城市:">
          <v-city
            @change="cityChange"
            ref="city"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listParams.auth"
            clearable
            placeholder="是否实名认证"
          >
            <el-option
              v-for="(value, key) in authState"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最近一次访问时间:">
          <el-date-picker
            v-model="dateValue"
            value-format="yyyy-MM-dd"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            align="right"
          />
        </el-form-item>
        <el-form-item label="最近一次购物时间:">
          <el-date-picker
            v-model="dateValue2"
            value-format="yyyy-MM-dd"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            align="right"
          />
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          v-waves
          @click="handleFilter"
        >查询</el-button>
        <!--<el-button type="text" @click="resetParams">清空条件</el-button>-->
      </el-form>

    </div>
    <div
      class="statistics-container"
      v-if="fixtotalData"
    >
      <div>汇总统计
        <el-tooltip
          placement="right"
          effect="light"
        >
          <i class="el-icon-info"></i>
          <div slot="content">
            <p><strong>购买订单数：</strong>已付款-销售订单数量总和；</p>
            <p><strong>购买订单金额：</strong>已付款-销售订单金额总和；</p>
            <p><strong>定制订单数：</strong>已付款-定制订单数量总和；</p>
            <p><strong>定制订单金额：</strong>已付款-定制订单金额总和；</p>
            <!--<p><strong>互换订单数：</strong>所有状态-互换订单数量总和；</p>
            <p><strong>互换订单金额：</strong>所有状态-互换订单保证金总和；</p>
            <p><strong>拍卖订单数：</strong>所有状态-拍卖订单数量总和；</p>
            <p><strong>拍卖订单金额：</strong>所有状态-拍卖订单金额总和；</p>-->
            <p><strong>退款/货订单数：</strong>所有退款、退货订单数量总和；</p>
            <p><strong>退款/货订单金额：</strong>所有退款、退货订单金额总和；</p>
          </div>
        </el-tooltip>
      </div>
      <ul>
        <li>购买订单数:<span>{{fixtotalData.cumuBuyOrderNum || 0}}</span></li>
        <li>购买订单金额:<span>￥{{fixtotalData.cumuBuyOrderAmount || 0}}</span></li>
        <li>定制订单数:<span>{{fixtotalData.cumuCustomOrderNum || 0}}</span></li>
        <li>定制订单金额:<span>￥{{fixtotalData.cumuCustomOrderAmount || 0}}</span></li>
        <!--<li>互换订单数:<span>{{fixtotalData.cumuSwapOrderNum || 0}}</span></li>
      </ul>
      <ul>
        <li>互换订单保证金:<span>￥{{fixtotalData.cumuSwapOrderAmount || 0}}</span></li>
        <li>拍卖订单数:<span>{{fixtotalData.cumuAuctionOrderNum || 0}}</span></li>
        <li>拍卖订单金额:<span>￥{{fixtotalData.cumuAuctionOrderAmount || 0}}</span></li>-->
        <li>退款/货订单数:<span>{{fixtotalData.cumuRefundOrderNum || 0}}</span></li>
        <li>退款/货订单金额:<span>￥{{fixtotalData.cumuRefundOrderAmount || 0}}</span></li>
      </ul>
    </div>
    <div
      class="statistics-container"
      v-if="isSummary && totalData"
    >
      <div>查询汇总：
        <template v-if="listParams.accessStartTime">最近一次访问时间（{{listParams.accessStartTime}}至{{listParams.accessEndTime}}）</template>
        <template v-if="listParams.buyStartTime">最近一次购物时间（{{listParams.buyStartTime}}至{{listParams.buyEndTime}}）</template>
      </div>
      <ul>
        <li>购买订单数:<span>{{totalData.cumuBuyOrderNum || 0}}</span></li>
        <li>购买订单金额:<span>￥{{totalData.cumuBuyOrderAmount || 0}}</span></li>
        <li>定制订单数:<span>{{totalData.cumuCustomOrderNum || 0}}</span></li>
        <li>定制订单金额:<span>￥{{totalData.cumuCustomOrderAmount || 0}}</span></li>
        <!--<li>互换订单数:<span>{{totalData.cumuSwapOrderNum || 0}}</span></li>
      </ul>
      <ul>
        <li>互换订单保证金:<span>￥{{totalData.cumuSwapOrderAmount || 0}}</span></li>
        <li>拍卖订单数:<span>{{totalData.cumuAuctionOrderNum || 0}}</span></li>
        <li>拍卖订单金额:<span>￥{{totalData.cumuAuctionOrderAmount || 0}}</span></li>-->
        <li>退款/货订单数:<span>{{totalData.cumuRefundOrderNum || 0}}</span></li>
        <li>退款/货订单金额:<span>￥{{totalData.cumuRefundOrderAmount || 0}}</span></li>
      </ul>
    </div>
    <div class="filter-list">
      <el-button
        class="button fr"
        type="primary"
        @click="getExportList"
      >导出</el-button>
      <a id="downlink"></a>
      <!--错误信息提示-->
      <el-dialog
        title="提示"
        v-model="errorDialog"
        size="tiny"
      >
        <span>{{errorMsg}}</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="errorDialog=false"
          >确认</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table
      :key='tableKey'
      :data="listData"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="会员ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="会员昵称"
      >
        <template slot-scope="{ row }">
          <span>{{row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="手机号码"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所在城市"
      >
        <template slot-scope="{ row }">
          <span>{{row.cityName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否实名认证"
      >
        <template slot-scope="{ row }">
          <span>{{authState[row.auth]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="购买订单数"
      >
        <template slot-scope="{ row }">
          <span>{{row.buyOrderNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="购买订单金额"
        :sortable="true"
        sort-by="buyOrderAmount"
      >
        <template slot-scope="{ row }">
          <span>{{row.buyOrderAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="定制订单数"
      >
        <template slot-scope="{ row }">
          <span>{{row.customOrderNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="定制订单金额"
        :sortable="true"
        sort-by="customOrderAmount"
      >
        <template slot-scope="{ row }">
          <span>{{row.customOrderAmount || 0}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="互换订单数">
        <template slot-scope="{ row }">
          <span>{{row.swapOrderNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="互换保证金" :sortable="true" sort-by="swapOrderAmount">
        <template slot-scope="{ row }">
          <span>{{row.swapOrderAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="拍卖订单数">
        <template slot-scope="{ row }">
          <span>{{row.auctionOrderNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="拍卖订单金额" :sortable="true" sort-by="auctionOrderAmount">
        <template slot-scope="{ row }">
          <span>{{row.auctionOrderAmount || 0}}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        align="center"
        label="退款/货数"
      >
        <template slot-scope="{ row }">
          <span>{{row.refundOrderNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="退款/货金额"
        :sortable="true"
        sort-by="refundOrderAmount"
      >
        <template slot-scope="{ row }">
          <span>{{row.refundOrderAmount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="注册时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="最近一次访问时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.recentLoginTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="最近一次购物时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.recentBuyTime}}</span>
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
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  memberData
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令
import VCity from '@/components/app/city/getPCR'

export default {
  directives: {
    waves
  },
  components: {
    VCity
  },
  data() {
    return {
      type: 0,
      authState: {
        1: '未认证',
        2: '已认证'
      },
      isCheck: undefined,
      listParams: {
        offset: 1,
        limit: 20,
        isExport: 0,
        memberId: undefined,
        mobilePhone: undefined,
        cityId: undefined,
        auth: undefined,
        accessStartTime: undefined,
        accessEndTime: undefined,
        buyStartTime: undefined,
        buyEndTime: undefined
      },
      province: undefined,
      city: undefined,
      area: undefined,
      detailAddr: undefined,
      accessStartTime: undefined,
      accessEndTime: undefined,
      buyStartTime: undefined,
      buyEndTime: undefined,
      isSummary: false,
      tableKey: 0,
      tabIndex: 0,
      fixtotalData: undefined,
      totalData: undefined,
      listData: [],
      exportList: [],
      total: null,
      listLoading: true,
      dateValue: '',
      dateValue2: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
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
      },
      rules: {
        memberId: [
          { pattern: /^[0-9]*$/, message: '请输入正确的会员ID', trigger: 'blur' }
        ],
        mobilePhone: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        id: '会员ID',
        nickname: '会员昵称',
        mobilePhone: '手机号码',
        cityName: '所在城市',
        auth: '是否实名认证',
        buyOrderNum: '购买订单数',
        buyOrderAmount: '购买订单金额',
        customOrderNum: '定制订单数',
        customOrderAmount: '定制订单金额',
        refundOrderNum: '退款/货数',
        refundOrderAmount: '退款/货金额',
        createTime: '注册时间',
        recentLoginTime: '最近一次访问时间',
        recentBuyTime: '最近一次购物时间'
      }]
    }
  },
  watch: {
    dateValue(value) {
      this.accessStartTime = value ? value[0] : undefined
      this.accessEndTime = value ? value[1] : undefined
    },
    dateValue2(value) {
      this.buyStartTime = value ? value[0] : undefined
      this.buyEndTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getFixTotalData()
    /* this.getTotalData(0)*/
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixTotalData() {
      memberData(0)
        .then(succ => {
          this.fixtotalData = succ.data
          this.getListData(0, this.listParams)
        })
    },
    getTotalData() {
      memberData(0, this.listParams)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(isExport, params) {
      this.listLoading = true
      memberData(isExport, params)
        .then(succ => {
          this.totalData = succ.data
          this.listData = succ.data.list.records
          this.total = succ.data.list.total
          this.listLoading = false
        })
    },
    getExportList() {
      memberData(1, {
        accessStartTime: this.listParams.accessStartTime,
        accessEndTime: this.listParams.accessEndTime,
        buyStartTime: this.listParams.buyStartTime,
        buyEndTime: this.listParams.buyEndTime
      }).then(data => {
        this.exportList = data.data.list.records
        this.downloadFile()
      })
    },
    handleFilter() {
      if (this.accessStartTime != undefined || this.buyStartTime != undefined) {
        this.isSummary = true
      } else {
        this.isSummary = false
      }
      this.listParams.accessStartTime = this.accessStartTime
      this.listParams.accessEndTime = this.accessEndTime
      this.listParams.buyStartTime = this.buyStartTime
      this.listParams.buyEndTime = this.buyEndTime
      this.listParams.offset = 1
      this.$refs['paramsForm'].validate((valid) => {
        if (valid) {
          /* this.getTotalData(0, this.listParams)*/
          this.getListData(0, this.listParams)
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getListData(0, this.listParams)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getListData(0, this.listParams)
    },
    cityChange(cities) {
      this.listParams.cityId = cities[cities.length - 1]
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      let data = this.excelTitle.concat(listData)
      data = data.filter(res => { return res !== undefined })
      this.downloadExl(data, '统计')
    },
    downloadExl(json, downName, type) { // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      const tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      const tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      }) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      this.outFile.download = downName + '.xlsx' // 下载名称
      this.outFile.href = href // 绑定a标签
      this.outFile.click() // 模拟点击实现下载
      setTimeout(function() { // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab(s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata(data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    }
  }
}
</script>
<style scoped>
.statistics-container {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a1a1a1;
  color: #666666;
  border-radius: 10px;
}
.statistics-container ul,
.statistics-container li {
  list-style: none;
  font-size: 14px;
  padding: 0;
}
.statistics-container li {
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
.statistics-container li span {
  color: #ff0000;
}
</style>
