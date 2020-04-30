
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="listQueryForm"
        class="listQueryForm"
      >
        <el-form-item label="敏感词">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model.trim="listParams.keyWord"
            placeholder="请输入敏感词名称"
          > </el-input>
        </el-form-item>
        <el-form-item label="更新时间:">
          <el-date-picker
            v-model="dateValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="-"
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
        >查询</el-button>
        <el-button
          class="fr"
          type="info"
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
        <el-upload
          class="fr"
          style="margin-left: 10px;"
          action="string"
          :http-request="httpRequest"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="danger">导入</el-button>
        </el-upload>
        <el-button
          class="fr"
          type="primary"
          @click="showDialog"
        >添加</el-button>
      </el-form>
      <span class="tips fr">导入格式：doc、docx、txt</span>
    </div>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="敏感词"
        prop="keyWord"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        prop="createTime"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
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
      title="添加敏感词"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item prop="keyWord">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="请输入敏感词，如有多个敏感词，请以英文逗号分开"
            v-model="form.keyWord"
          > </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          type="primary"
          @click="update('form')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  addSensitiveWordByFile,
  getSensitiveWordList,
  saveSensitiveWord,
  deleteSensitivWord
} from '@/api/gallery/comment'

import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      exportList: [],
      total: null,
      listLoading: false,
      tableKey: 0,
      dateValue: '',
      dialogFormVisible: false,
      listParams: {
        offset: 1,
        limit: 20,
        keyWord: '',
        startTime: '',
        endTime: ''
      },
      form: {
        keyWord: ''
      },
      rules: {
        keyWord: [
          {
            required: true,
            message: '请输入过滤词汇',
            trigger: 'blur'
          }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        index: '序号',
        keyWord: '敏感词',
        createTime: '更新时间'
      }]
    }
  },
  watch: {
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
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
      getSensitiveWordList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getExportList() {
      getSensitiveWordList({
        keyWord: this.listParams.keyWord,
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    handleFilter() {
      this.$refs['listQueryForm'].validate(valid => {
        if (valid) {
          this.listLoading = true
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前敏感词？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSensitivWord(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
        })
        .catch(() => { })
    },
    async showDialog() {
      this.form.keyWord = ''
      this.dialogFormVisible = true
    },
    cancel(formName) {
      this.dialogFormVisible = false
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          saveSensitiveWord(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        } else {
          return false
        }
      })
    },
    beforeAvatarUpload(file) {
      let isDocOrTxt = false
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword' || file.type === 'text/plain') {
        isDocOrTxt = true
      }
      if (!isDocOrTxt) {
        this.$message.error('上传的文件只能是doc、docx以及txt格式!')
      }
      return isDocOrTxt
    },
    httpRequest(params) {
      const formdata = new FormData()
      formdata.append('file', params.file)
      addSensitiveWordByFile(formdata).then(res => {
        if (res.success) {
          this.$notify({
            title: '成功',
            message: `成功导入/添加${res.data.succeedCount}个敏感词，过滤${res.data.failCount}个重复敏感词`,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '导入失败',
            type: res.msg,
            duration: 2000
          })
        }
        this.getList()
      }).catch(() => { })
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const data = this.excelTitle.concat(listData)
      for (let i = 0; i < listData.length; i++) {
        listData[i].index = i + 1
      }
      this.downloadExl(data, '敏感词')
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
.tips {
  font-size: 12px;
  color: #999;
}
</style>
