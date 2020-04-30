<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        align="right"
      >
      </el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-search"
        v-waves
        @click="handleFilter"
      >查询</el-button>
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
    <div
      class="statistics-container"
      v-if="fixtotalData"
    >
      <div>汇总统计</div>
      <ul>
        <li>发送数量:<span>{{fixtotalData.sendNum || 0}}</span></li>
        <li>发送成功数量:<span>{{fixtotalData.succeedSendNum || 0}}</span></li>
        <li>发送失败数量:<span>{{fixtotalData.failSendNum || 0}}</span></li>
        <li>链接点击次数:<span>{{fixtotalData.clickLikeNum || 0}}</span></li>
        <li>开店按钮点击次数:<span>{{fixtotalData.setshopClickNum || 0}}</span></li>
        <li>开店成功商家数:<span>{{fixtotalData.succeedSetshopNum || 0}}</span></li>
      </ul>
    </div>
    <div
      class="statistics-container"
      v-if="isSummary && totalData"
    >
      <div>查询汇总</div>
      <ul>
        <li>发送数量:<span>{{totalData.sendNum || 0}}</span></li>
        <li>发送成功数量:<span>{{totalData.succeedSendNum || 0}}</span></li>
        <li>发送失败数量:<span>{{totalData.failSendNum || 0}}</span></li>
        <li>链接点击次数:<span>{{totalData.clickLikeNum || 0}}</span></li>
        <li>开店按钮点击次数:<span>{{totalData.setshopClickNum || 0}}</span></li>
        <li>开店成功商家数:<span>{{totalData.succeedSetshopNum || 0}}</span></li>
      </ul>
    </div>
    <el-table
      :data="listData"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="日期"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime.split(' ')[0]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发送数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.sendNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发送成功数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.succeedSendNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发送失败数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.failSendNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="链接点击次数"
      >
        <template slot-scope="{ row }">
          <span>{{row.clickLikeNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="开店按钮点击次数"
      >
        <template slot-scope="{ row }">
          <span>{{row.setshopClickNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="开店成功商家数"
      >
        <template slot-scope="{ row }">
          <span>{{row.succeedSetshopNum || 0}}</span>
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
  getAttractSMSAnalysis
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {

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
      fixtotalData: undefined,
      totalData: undefined,
      listData: [],
      exportList: [],
      total: null,
      listLoading: true,
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
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        createTime: '日期',
        sendNum: '发送数量',
        succeedSendNum: '发送成功数量',
        failSendNum: '发送失败数量',
        clickLikeNum: '链接点击次数',
        setshopClickNum: '开店按钮点击次数',
        succeedSetshopNum: '开店成功商家数'
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
    this.getListData(this.listParams)
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getListData(params) {
      this.listLoading = true
      getAttractSMSAnalysis(params)
        .then(succ => {
          this.fixtotalData = succ.data.allTotalMap
          this.totalData = succ.data.partTotalMap
          this.listData = succ.data.page.records
          this.total = succ.data.page.total
          this.listLoading = false
        })
    },
    getExportList() {
      getAttractSMSAnalysis({
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.page.records
        this.downloadFile()
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
      this.getListData(this.listParams)
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getListData(this.listParams)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getListData(this.listParams)
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      for (let i = 0; i < listData.length; i++) {
        listData[i].createTime = listData[i].createTime.split(' ')[0]
      }
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '招商短信')
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
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
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
      setTimeout(function () { // 延时释放
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
      if (tab == 'more') {
        console.log('/////', tab, event)
        return false
      }
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
ul,
li {
  list-style: none;
  font-size: 14px;
  padding: 0;
}
li {
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
li span {
  color: #ff0000;
}
.el-date-editor .el-range-separator {
  padding: 0;
}
</style>
