
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="customerQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item
          label="手机号码:"
          prop="mobilePhone"
        >
          <el-input
            class="search-input"
            clearable
            placeholder="请输入手机号码"
            :maxlength="11"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.mobilePhone"
          > </el-input>
        </el-form-item>
        <el-form-item label="注册时间:">
          <el-date-picker
            v-model="listQuery.createTime"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            placeholder="请选择注册时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
        <el-button
          class="fr"
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
      </el-form>
    </div>

    <!-- <div class="summary">
      <span class="summary-title">汇总统计</span>
      <span class="label">累计订单数量：</span>
      <span class="money">{{cumuOrderNum}}</span>
      <span class="label">累计交易金额：</span>
      <span class="money">{{cumuTradeAmount}}</span>
    </div> -->

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
        width="180px"
        align="center"
        label="昵称"
      >
        <template slot-scope="{ row }">
          <span>{{row.nickname}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="180px"
        align="center"
        label="头像"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.userLogo"
            width="100"
          >
        </template>
      </el-table-column> -->

      <el-table-column
        width="180px"
        align="center"
        label="手机号码"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="180px"
        align="center"
        label="所在城市"
      >
        <template slot-scope="{ row }">
          <span>{{row.region || '--'}}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        width="180px"
        align="center"
        label="消费次数"
      >
        <template slot-scope="{ row }">
          <span
            class="blue"
            @click="$router.push({name: 'purchaseHistory', query: {id: row.id}})"
          >{{row.orderNum}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="消费金额/元"
      >
        <template slot-scope="{ row }">
          <span>{{row.tradeAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="最后一次购买时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.recentTradeTime}}</span>
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
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  getPurchasedCustomer
} from '@/api/designMerchant/customer'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      cumuOrderNum: '',
      cumuTradeAmount: '',
      listQuery: {
        offset: 1,
        limit: 20,
        mobilePhone: undefined,
        createTime: undefined
      },
      tableKey: 0,
      rules: {
        mobilePhone: [
          { pattern: /^[0-9]{11}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        nickname: '昵称',
        mobilePhone: '手机号',
        orderNum: '消费次数',
        tradeAmount: '消费金额/元',
        recentTradeTime: '最后一次购买时间'
      }]
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.mobilePhone = this.listQuery.mobilePhone || undefined
      getPurchasedCustomer(this.listQuery).then(data => {
        if (!this.listQuery.mobilePhone && !this.listQuery.createTime) {
          this.cumuOrderNum = data.data.cumuOrderNum
          this.cumuTradeAmount = data.data.cumuTradeAmount
        }
        this.list = data.data.buyUserPage.records
        this.total = data.data.buyUserPage.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['customerQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
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
      getPurchasedCustomer({
        offset: 1,
        limit: 999999,
        mobilePhone: this.listQuery.mobilePhone,
        createTime: this.listQuery.createTime
      }).then(data => {
        this.exportList = data.data.buyUserPage.records
        this.downloadFile()
      })
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '我的顾客')
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
    },
    moreState(tab, event) {
      if (tab === 'more') {
        console.log('/////', tab, event)
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  position: relative;
  margin-bottom: 20px;
  padding: 30px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  & .summary-title {
    position: absolute;
    top: -7px;
    left: 20px;
    width: 70px;
    font-size: 14px;
    text-align: center;
    background: #fff;
  }
  & .money {
    margin-right: 60px;
    color: red;
  }
}
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
.el-date-editor /deep/ .el-range-separator {
  padding: 0;
}
</style>

