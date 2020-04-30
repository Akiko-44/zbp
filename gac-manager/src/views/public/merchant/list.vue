<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="merchantListQueryForm"
        label-width="101px"
        class="merchantListQueryForm"
      >
        <el-form-item
          label="店铺名称:"
          prop="merchantName"
        >
          <el-input
            class="search-input"
            placeholder="请输入店铺名称"
            :maxlength="20"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.merchantName"
          > </el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            v-model="listQuery.isCheck"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              v-for="(value, key) in auditState"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别:">
          <el-select
            v-model="listQuery.merchantType"
            clearable
            placeholder="请选择类别"
          >
            <el-option
              v-for="(value, key) in types"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="手机号:"
          prop="mobilePhone"
        >
          <el-input
            class="search-input"
            placeholder="请输入手机号"
            :maxlength="11"
            @keyup.enter.native="handleFilter"
            v-model="listQuery.mobilePhone"
          > </el-input>
        </el-form-item>
        <el-form-item label="开店入口:">
          <el-select
            v-model="listQuery.setshopType"
            clearable
            placeholder="请选择开店入口"
          >
            <el-option
              v-for="(value, key) in setshopTypeMap"
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
          class="export-btn fr"
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
        width="100px"
        align="center"
        label="商户编号"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="客服ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.userId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="类别"
      >
        <template slot-scope="{ row }">
          <span>{{types[row.merchantType]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="220px"
        align="center"
        label="店铺名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="220px"
        align="center"
        label="企业名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.companyName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="联系人"
      >
        <template slot-scope="{ row }">
          <span>{{row.linkman}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="手机号"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="开店入口"
      >
        <template slot-scope="{ row }">
          <span>{{setshopTypeMap[row.setshopType]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="160px"
        align="center"
        label="审核状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditState[row.isCheck]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="160px"
        align="center"
        label="备注"
      >
        <template slot-scope="{ row }">
          <span>{{row.checkDesc}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="申请时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
        width="240"
      >
        <template slot-scope="{ row, $index }">
          <!--<el-button size="small" type="info" @click="sign(row.userId)">查看签约</el-button>-->
          <el-button
            size="small"
            type="primary"
            @click="$router.push({ name: 'merchantDetail', query: { id: row.id } })"
          >详情</el-button>
          <el-dropdown
            style="margin-left:10px;"
            @command="handleCommand"
            v-if="row.isCheck == 0 || row.isCheck == 2 || row.isCheck == 11"
          >
            <span class="el-dropdown-link">
              审核操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="row.isCheck == 0 || row.isCheck == 2"
                :command="{row, state: 1, $index}"
              >审核通过</el-dropdown-item>
              <el-dropdown-item
                v-if="row.isCheck == 0"
                :command="{row, state: 2, $index}"
              >审核拒绝</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            size="small"
            v-if="row.isCheck === 1"
            type="primary"
            @click="uploadInfo(row.userId)"
          >上传资料到银联</el-button>
          <!-- <el-button size="small" type="danger" @click="handleDelete">删除</el-button> -->
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

    <audit-dialog
      ref="auditDialog"
      @success="auditSuccess"
    />
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  page,
  signQuery,
  merSign
} from '@/api/public/merchant'
import AuditDialog from './auditDialog'
import waves from '@/directive/waves' // 水波纹指令

const getInitQuery = () => {
  return {
    isCheck: undefined,
    merchantName: undefined,
    merchantType: undefined,
    startTime: undefined,
    endTime: undefined,
    mobilePhone: undefined,
    setshopType: undefined
  }
}

export default {
  directives: {
    waves
  },
  components: {
    AuditDialog
  },
  data() {
    return {
      auditState: {
        0: '待审核',
        1: '审核通过',
        2: '审核不通过',
        3: '签约中',
        4: '签约成功',
        5: '入网审核中',
        6: '入网成功',
        7: '入网失败',
        8: '对公账户待验证',
        9: '风控审核中',
        10: '资料验证失败',
        11: '开店待审核',
        // 12开店成功未进行企业认证
        12: '开店成功'
      },
      types: {
        1: '珠宝店',
        2: '设计师',
        3: '制造间'
      },
      signData: {
        '00': '签约中',
        '01': '签约成功',
        '02': '入网审核中',
        '03': '入网成功',
        '04': '入网失败',
        '99': '其它错误'
      },
      setshopTypeMap: {
        1: 'APP-安卓',
        2: 'APP-苹果',
        3: 'PC',
        4: 'H5',
        5: '招商短信'
      },
      list: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: getInitQuery(),
      tableKey: 0,
      dateValue: '',
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
        id: '商户编号',
        userId: '客服ID',
        mapMerchantType: '类别',
        name: '店铺名称',
        companyName: '企业名称',
        linkman: '联系人',
        mobilePhone: '手机号码',
        setshopType: '开店入口',
        auditState: '审核状态',
        checkDesc: '备注',
        createTime: '申请时间'
      }]
    }
  },
  computed: {
  },
  watch: {
    '$route': 'fetchData',
    dateValue(value) {
      this.listQuery.startTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.fetchData()
    // this.getList()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.listQuery.isCheck = this.$route.query.isCheck !== 'undefined' ? this.$route.query.isCheck : undefined
      this.listQuery.merchantType = this.$route.query.merchantType !== 'undefined' ? this.$route.query.merchantType : undefined
      this.listQuery.merchantName = this.$route.query.merchantName !== 'undefined' ? this.$route.query.merchantName : undefined
      this.listQuery.startTime = this.$route.query.startTime !== 'undefined' ? this.$route.query.startTime : undefined
      this.listQuery.endTime = this.$route.query.endTime !== 'undefined' ? this.$route.query.endTime : undefined
      this.dateValue = this.$route.query.endTime !== undefined ? [this.listQuery.startTime, this.listQuery.endTime] : ''
      this.listQuery.mobilePhone = this.$route.query.mobilePhone !== 'undefined' ? this.$route.query.mobilePhone : undefined
      this.listQuery.setshopType = this.$route.query.setshopType !== 'undefined' ? this.$route.query.setshopType : undefined
      this.getList()
    },
    getList() {
      this.listLoading = true
      page(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
          this.list.map(item => {
            item.mapMerchantType = this.types[item.merchantType]
            item.auditState = this.auditState[item.isCheck]
            item.companyName = item.companyName || '/'
            item.checkDesc = item.checkDesc || '/'
          })

        }).catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['merchantListQueryForm'].validate((valid) => {
        if (valid) {
          this.$router.replace({
            name: 'merchantList',
            query: {
              page: +this.listParams.offset,
              isCheck: this.listQuery.isCheck,
              merchantName: this.listQuery.merchantName,
              merchantType: this.listQuery.merchantType,
              startTime: this.listQuery.startTime,
              endTime: this.listQuery.endTime,
              mobilePhone: this.listQuery.mobilePhone,
              setshopType: this.listQuery.setshopType
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
      // this.listParams.offset = val
      // this.getList()
      this.$router.replace({
        name: 'merchantList',
        query: {
          page: val,
          isCheck: this.listQuery.isCheck,
          merchantName: this.listQuery.merchantName,
          merchantType: this.listQuery.merchantType,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime,
          mobilePhone: this.listQuery.mobilePhone
        }
      })
    },
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.merchantId = row.id
      dialog.form.auditState = state
      this.index = index
    },
    auditSuccess(form) {
      // this.list[this.index].isCheck = form.auditState
      this.getList()
    },
    handleCommand({ row, state, $index }) {
      this.audit(row, state, $index)
    },
    sign(id) {
      signQuery({ userId: id }).then(data => {
        let info = ''
        if (data.data.res_code === '0000') {
          const apply_status = data.data.apply_status
          info = apply_status === '03' ? data.data.mer_no : this.signData[apply_status]
        }
        this.$alert(info, '结果', {
          confirmButtonText: '确定',
          callback: action => {

          }
        })
      })
    },
    uploadInfo(id) {
      this.$confirm('是否上传资料到银联以获取商编', '上传', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        merSign({ userId: id }).then(data => {
          this.$notify({
            title: '成功',
            message: '操作成功，对公打款认证金额及验证码将于3个工作日内发送至贵公司的对公账户中',
            type: 'success'
          })
          this.getList()
        }).catch(() => {
          this.getList()
        })
      })
    },
    downloadFile() { // 点击导出按钮
      let listData = []
      // const listData = this.list
      this.listParams.offset = 1
      this.listParams.limit = 99999

      page(this.listQuery, this.listParams).then(res => {
        listData = res.data.records
        for (let i = 0;i < listData.length;i++) {
          listData[i].setshopType = this.setshopTypeMap[listData[i].setshopType]
          listData[i].mapMerchantType = this.types[listData[i].merchantType]
          listData[i].auditState = this.auditState[listData[i].isCheck]
        }
        const data = this.excelTitle.concat(listData)
        this.downloadExl(data, '商户列表')
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
      for (var i = 0;i !== s.length;++i) {
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
      for (;l < data.byteLength / w;++l) {
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
.export-btn {
  float: right;
  margin-bottom: 20px;
  width: 100px;
}
</style>

