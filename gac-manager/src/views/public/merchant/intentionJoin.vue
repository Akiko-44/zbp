<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="merchantlistForm"
        label-width="100px"
        class="merchantlistForm"
      >
        <el-form-item
          label="企业名称:"
          prop="companyName"
        >
          <el-input
            class="search-input"
            placeholder="请输入企业名称"
            :maxlength="20"
            @keyup.enter.native="handleFilter"
            v-model="listParams.companyName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="手机号码:"
          prop="contactMobile"
        >
          <el-input
            class="search-input"
            placeholder="请输入手机号码"
            :maxlength="11"
            @keyup.enter.native="handleFilter"
            v-model="listParams.contactMobile"
          > </el-input>
        </el-form-item>
        <el-form-item label="入驻类型:">
          <el-select
            v-model="listParams.joinType"
            clearable
            placeholder="请选择入驻类型"
          >
            <el-option
              label="全部"
              :value="undefined"
            >
            </el-option>
            <el-option
              v-for="(value, key) in typeList"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            v-model="listParams.joinState"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              label="全部"
              :value="undefined"
            >
            </el-option>
            <el-option
              v-for="(value, key) in statusList"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="申请时间:"
          prop="merchantName"
        >
          <el-date-picker
            v-model="dateValue"
            value-format="yyyy-MM-dd HH:mm:ss"
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
          icon="el-icon-search"
          v-waves
          @click="handleFilter"
        >查询</el-button>
        <el-button
          v-waves
          class="fr"
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
      </el-form>
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
        label="编号"
        type="index"
        width="50"
      >
      </el-table-column>

      <el-table-column
        align="center"
        property="companyName"
        label="企业名称"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="入驻类型"
      >
        <template slot-scope="{ row }">
          <span>{{typeList[row.joinType]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        property="contactsName"
        label="联系人"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="手机号码"
        property="contactMobile"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{statusList[row.joinState]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="申请时间"
        property="createTime"
      >
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row}">
          <el-button
            size="small"
            type="primary"
            v-if="!row.joinState"
            @click="showStateDialog(row)"
          >入驻状态</el-button>
          <el-button
            size="small"
            @click="$router.push({ name: 'intentionJoinLog', query: { id: row.id, name: row.companyName } })"
          >跟进记录</el-button>
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

    <el-dialog
      title="选择入驻状态"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-radio
        v-model="joinState"
        :label="0"
      >未入驻</el-radio>
      <el-radio
        v-model="joinState"
        :label="1"
      >已入驻</el-radio>
      <el-radio
        v-model="joinState"
        :label="2"
      >拒绝入驻</el-radio>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  getIntentionJoinPage, saveIntentionJoin
} from '@/api/public/merchant'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      dialogLoading: false,
      listParams: {
        companyName: '',
        contactMobile: '',
        joinType: undefined,
        joinState: undefined,
        startTime: undefined,
        endTime: undefined,
        offset: 1,
        limit: 20
      },
      tableKey: 0,
      dateValue: '',
      typeList: {
        0: '商家入驻',
        1: '专委会入驻'
      },
      statusList: {
        0: '未入驻',
        1: '已入驻',
        2: '拒绝入驻'
      },
      dialogVisible: false,
      joinState: 0,
      merchantForm: {},
      rules: {
        mobilePhone: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
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
        companyName: '企业名称',
        joinType: '入驻类型(0商家入驻1专委会入驻)',
        contactsName: '联系人',
        contactMobile: '手机号码',
        joinState: '状态(0未入驻1已入驻2拒绝入驻)',
        createTime: '申请时间'
      }]
    }
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  watch: {
    '$route': 'fetchData',
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.listParams.joinType = this.$route.query.joinType !== 'undefined' ? this.$route.query.joinType : undefined
      this.listParams.joinState = this.$route.query.joinState !== 'undefined' ? this.$route.query.joinState : undefined
      this.listParams.companyName = this.$route.query.companyName !== 'undefined' ? this.$route.query.companyName : undefined
      this.listParams.startTime = this.$route.query.startTime !== 'undefined' ? this.$route.query.startTime : undefined
      this.listParams.endTime = this.$route.query.endTime !== 'undefined' ? this.$route.query.endTime : undefined
      this.dateValue = this.$route.query.endTime !== undefined ? [this.listParams.startTime, this.listParams.endTime] : ''
      this.listParams.contactMobile = this.$route.query.contactMobile !== 'undefined' ? this.$route.query.contactMobile : undefined
      this.getList()
    },
    getList() {
      this.listLoading = true
      getIntentionJoinPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['merchantlistForm'].validate((valid) => {
        if (valid) {
          this.$router.replace({
            name: 'intentionJoin',
            query: {
              page: +this.listParams.offset,
              joinType: this.listParams.joinType,
              companyName: this.listParams.companyName,
              joinState: this.listParams.joinState,
              startTime: this.listParams.startTime,
              endTime: this.listParams.endTime,
              contactMobile: this.listParams.contactMobile
            }
          })
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.$router.replace({
        name: 'intentionJoin',
        query: {
          page: val,
          joinType: this.listParams.joinType,
          companyName: this.listParams.companyName,
          joinState: this.listParams.joinState,
          startTime: this.listParams.startTime,
          endTime: this.listParams.endTime,
          contactMobile: this.listParams.contactMobile
        }
      })
    },
    showStateDialog(row) {
      this.dialogVisible = true
      this.joinState = 0
      this.merchantForm = row
    },
    save() {
      this.merchantForm.joinState = this.joinState
      this.dialogLoading = true
      saveIntentionJoin(this.merchantForm).then(data => {
        this.dialogLoading = false
        this.dialogVisible = false
      }).catch(() => {
        this.dialogLoading = false
        this.dialogVisible = false
      })
    },
    downloadFile() { // 点击导出按钮
      // const listData = this.list
      let listData = []
      this.listParams.offset = 1
      this.listParams.limit = 99999
      getIntentionJoinPage(this.listParams)
        .then(res => {
          listData = res.data.records
          const data = this.excelTitle.concat(listData)
          this.downloadExl(data, '入驻申请列表')
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
</style>

