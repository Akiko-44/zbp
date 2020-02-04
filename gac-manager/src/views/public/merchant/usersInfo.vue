
<template>
  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <label class="filter-label">手机号：</label>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 195px;"
        v-model="listQuery.mobilePhone"
      > </el-input>
      &emsp;
      <label class="filter-label">注册时间：</label>
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
      <el-button
        type="primary"
        icon="el-icon-search"
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
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column label="会员ID">
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账户名"
        class-name="blue"
      >
        <template slot-scope="{ row }">
          <!-- <span>{{row.nickname}}</span> -->
          <span @click="showUserInfo(row)">{{row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="{ row }">
          <span>{{row.realname || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="推荐用户数"
        class-name="blue"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'recommendUsersList', query: {id: row.id}})">{{row.recommendNumber || '0'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐人">
        <template slot-scope="{ row }">
          <span>{{row.referrerNickname || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐人手机号">
        <template slot-scope="{ row }">
          <span>{{row.referrerMobilePhone || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户流水">
        <template slot-scope="{ row }">
          <span class="marriageState">{{row.sum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源类型">
        <template slot-scope="{ row }">
          <span class="marriageState">{{souceTypeMap[row.sourceType]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
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
        :current-page.sync="listQuery.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>

    <userinfo-dialog ref="userinfoDialog" />

    <div
      v-if="showImg"
      class="mask"
      @click="imgScc"
    ></div>
    <img
      v-if="showImg"
      class="showImg"
      :src="imgSrc"
      @click="imgScc"
    />
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import { usersList } from '@/api/public/merchantAuth'
import userinfoDialog from './userinfoDialog'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    userinfoDialog
  },
  data() {
    return {
      showImg: false,
      imgSrc: '',
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        offset: 1,
        limit: 20,
        mobilePhone: undefined,
        beginTime: undefined,
        endTime: undefined
      },
      souceTypeMap: {
        0: '中宝平',
        1: '1县1特'
      },
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
        id: '会员ID',
        nickname: '账户名',
        realname: '用户姓名',
        mobilePhone: '手机号',
        userLogo: '头像',
        birthday: '出生年月',
        region: '所在城市',
        occupation: '职业',
        hobby: '爱好',
        email: '邮箱',
        sum: '账户流水',
        createTime: '注册时间'
      }]
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  watch: {
    dateValue(value) {
      this.listQuery.beginTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
    }
  },
  methods: {
    imgScc(e) {
      this.imgSrc = e.currentTarget.src
      this.showImg = !this.showImg
    },
    getList() {
      this.listLoading = true
      usersList(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
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
      this.listQuery.offset = val
      this.getList()
    },
    showUserInfo(row) {
      // this.userInfo = row
      const dialog = this.$refs.userinfoDialog
      dialog.userinfo = row
      dialog.dialogFormVisible = true
    },
    downloadFile() { // 点击导出按钮
      // const listData = this.list
      let listData = []
      this.listQuery.offset = 1
      this.listQuery.limit = 99999
      usersList(this.listQuery)
        .then(res => {
          listData = res.data.records
          const data = this.excelTitle.concat(listData)
          this.downloadExl(data, '会员列表')
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

<style scoped lang="scss">
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.userLogo {
  background-image: url(../../../assets/avatar_images/avatar.jpg);
  background-size: 100% 100%;
  border: 0;
}
.userLogo[src=""] {
  opacity: 0;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
.showImg {
  width: 400px;
  height: 400px;
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 200;
  margin-left: -200px;
  margin-top: -200px;
}
.mask {
  background: #000000;
  opacity: 0.5;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
