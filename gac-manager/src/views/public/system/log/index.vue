<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="logListQueryForm"
        label-width="100px"
        class="logListQueryForm"
      >
        <el-form-item label="手机号码:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.mobilePhone"
            placeholder="请输入手机号码"
          > </el-input>
        </el-form-item>
        <el-form-item label="所属平台:">
          <el-select
            style="width: 195px;"
            v-model="listParams.platType"
            placeholder="请选择所属平台"
          >
            <el-option
              v-for="(item,i) in platformMap"
              :key="i"
              :label="item"
              :value="i+1"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属商户:">
          <el-select
            style="width: 195px;"
            v-model="listParams.merchantType"
            placeholder="请选择所属商户"
          >
            <el-option
              v-for="(item,i) in merchantTypeMap"
              :key="i"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <div class="filter-list">
          <el-button
            class="export-btn"
            @click="downloadFile"
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
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      >
      </el-table-column>

      <el-table-column
        align="center"
        width="200"
        property="mobilePhone"
        label="手机号码"
      >
        <template slot-scope="{ row }">
          <span> {{row.mobilePhone || '-'}} </span>
        </template>
      </el-table-column>

      <el-table-column
        width="200"
        align="center"
        property="userName"
        label="用户姓名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        property="platformName"
        label="所属平台"
      >
      </el-table-column>
      <el-table-column
        align="center"
        width="200"
        property="merchantName"
        label="所属商户"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="操作内容"
      >
        <template slot-scope="{ row }">
          <span>{{row.logInfo}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="操作时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
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
import { getOperationLog } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        mobilePhone: '',
        platType: undefined,
        merchantType: undefined,
        startTime: '',
        endTime: ''
      },
      platformMap: {
        undefined: '全部',
        1: '综合运营管理平台',
        2: '商户管理后台'
      },
      merchantTypeMap: {
        undefined: '全部',
        0: '运营',
        1: '珠宝店',
        2: '设计师',
        3: '制造间'
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        mobilePhone: '手机号码',
        userName: '用户姓名',
        platformName: '所属平台',
        merchantName: '所属商户',
        logInfo: '操作内容',
        createTime: '操作时间'
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
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      getOperationLog(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.list.map(item => {
          item.platformName = this.platformMap[item.platType]
          item.merchantName = this.merchantTypeMap[item.merchantType]
        })
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
      // this.$router.replace({ name: this.routerName, query: { page: val }})
    },
    downloadFile() { // 点击导出按钮
      // const listData = this.list
      let listData = []
      this.listParams.offset = 1
      this.listParams.limit = 9999999
      getOperationLog(this.listParams).then(data => {
        listData = data.data.records
        const downloadData = this.excelTitle.concat(listData)
        this.downloadExl(downloadData, '操作日志')
      })
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
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
}
table img {
  width: 100px;
  height: 100px;
}
.export-btn {
  float: right;
  margin-bottom: 20px;
  width: 100px;
}
</style>
