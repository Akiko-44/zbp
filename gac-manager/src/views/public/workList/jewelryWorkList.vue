<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="jewelryParams"
        ref="workListQueryForm"
        label-width="100px"
        class="listQueryForm"
      >
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="jewelryParams.goodsName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="店铺名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="jewelryParams.merchantName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select
            v-model="jewelryParams.isCheck"
            clearable
            placeholder="审核状态"
            style="width: 195px;"
          >
            <el-option
              v-for="item in jewelryAuditState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态:">
          <el-select
            v-model="jewelryParams.isOnSale"
            clearable
            placeholder="上架状态"
            style="width: 195px;"
          >
            <el-option
              v-for="item in jewelrySaleState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button>
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
          <span>{{ errorMsg }}</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="errorDialog = false"
            >确认</el-button>
          </span>
        </el-dialog>
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
        width="100px"
        align="center"
        label="商品ID"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span
            class="table-link"
            @click="
              $router.push({
                name: 'publicJewelryDetail',
                query: { id: row.id, auditState: row.isCheck }
              })
            "
          >{{ row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="商品主图"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.imgUrl"
            alt=""
            width="100"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="店铺名称"
      >
        <template slot-scope="{ row }">
          <span>{{ row.merchantName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="所在地"
      >
        <template slot-scope="{ row }">
          <span>{{ row.provinceName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="所属品牌"
      >
        <template slot-scope="{ row }">
          <span>{{ row.brandName || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="商品价格"
      >
        <template slot-scope="{ row }">
          <span>￥{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="总库存"
      >
        <template slot-scope="{ row }">
          <span>{{ row.stockNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="累计销售数量"
      >
        <template slot-scope="{ row }">
          <span>{{ row.saleCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="评论数量"
      >
        <template slot-scope="{ row }">
          <span
            class="table-link"
            @click="
              $router.push({
                name: 'publicjewelryComment',
                query: { id: row.id }
              })
            "
          >{{ row.commentNum || "0" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="审核状态"
      >
        <template slot-scope="{ row }">
          <span>{{ auditStateMap[row.isCheck] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="上架状态"
      >
        <template slot-scope="{ row }">
          <span>{{ saleStateMap[row.isOnSale] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="发布时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="200"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            v-if="row.isCheck == 0"
            size="small"
            type="primary"
            @click="audit(row, 1, $index)"
          >审核通过</el-button>
          <el-button
            class="auditBtn"
            v-if="row.isCheck == 0"
            size="small"
            type="warning"
            @click="audit(row, 2, $index)"
          >审核拒绝</el-button>
          <el-button
            class="auditBtn"
            v-if="row.isCheck == 1 && row.isOnSale == 0"
            size="small"
            @click="audit(row, 3, $index)"
          >下架</el-button>
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
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <audit-dialog
      ref="auditDialog"
      :goodsSource="0"
      @success="auditSuccess"
    />
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import { page, jewelryPage } from '@/api/dm/works'
import waves from '@/directive/waves' // 水波纹指令
import auditDialog from './auditDialog'

export default {
  directives: {
    waves
  },
  components: {
    auditDialog
  },
  data() {
    return {
      list: null,
      exportList: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      // 珠宝店搜索参数
      jewelryParams: {
        offset: 1,
        limit: 20,
        goodsName: '',
        isCheck: '',
        isOnSale: '',
        merchantName: undefined
      },
      jewelryAuditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' }
      ],
      jewelrySaleState: [
        { value: 0, label: '上架' },
        { value: 1, label: '下架' },
        { value: 3, label: '强制下架' }
      ],
      // auditState: [
      //   { value: 0, label: '待审核' },
      //   { value: 1, label: '审核通过' },
      //   { value: 2, label: '审核不通过' },
      //   { value: 3, label: '上架' },
      //   { value: 4, label: '下架' },
      //   { value: 5, label: '强制下架' }
      // ],
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架',
        5: '强制下架'
      },
      saleStateMap: {
        0: '上架',
        1: '下架',
        3: '强制下架'
      },
      index: undefined,
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [
        {
          goodsName: '商品名称',
          imgUrl: '商品主图',
          merchantName: '店铺名称',
          provinceName: '所在地',
          brandName: '所属品牌',
          price: '商品价格',
          stockNum: '总库存',
          saleCount: '累计销售数量',
          commentNum: '评论数量',
          isCheck: '审核状态',
          isOnSale: '上架状态',
          startTime: '发布时间'
        }
      ]
    }
  },
  watch: {
    $route: 'fetchData'
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    fetchData() {
      this.jewelryParams.offset = +this.$route.query.page || 1
      this.listParams.offset = +this.$route.query.page || 1
      this.jewelryParams.limit = +this.$route.query.size || 20
      this.listParams.limit = +this.$route.query.size || 20
      this.getList()
    },
    getList() {
      this.listLoading = true
      jewelryPage(this.jewelryParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getExportList() {
      jewelryPage({
        offset: 1,
        limit: 9999,
        goodsName: this.jewelryParams.goodsName,
        isCheck: this.jewelryParams.isCheck,
        isOnSale: this.jewelryParams.isOnSale,
        merchantName: this.jewelryParams.merchantName
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    handleFilter() {
      this.$refs['workListQueryForm'].validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.$router.replace({
        name: 'publicJewelryWork',
        query: { page: this.listParams.offset, size: val }
      })
    },
    handleCurrentChange(val) {
      this.$router.replace({
        name: 'publicJewelryWork',
        query: { page: val, size: this.listParams.limit }
      })
    },
    resetQuery() {
      this.jewelryParams.isCheck = ''
      this.jewelryParams.isOnSale = ''
      this.jewelryParams.goodsName = ''
      this.jewelryParams.merchantName = ''
      this.$refs['workListQueryForm'].resetFields()
      this.$router.replace({ name: 'publicJewelryWork' })
      this.getList()
    },
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.designerId = row.caseId ? row.caseId : row.id
      dialog.form.auditState = state
      dialog.form.opinion = ''
      this.index = index
    },
    auditSuccess() {
      this.getList()
    },
    downloadFile() {
      // 点击导出按钮
      const listData = this.exportList
      listData.map((item, index) => {
        item.isCheck = this.auditStateMap[item.isCheck]
        item.isOnSale = this.saleStateMap[item.isOnSale]
      })
      const downloadData = this.excelTitle.concat(listData)
      this.downloadExl(downloadData, '商品列表')
    },
    downloadExl(json, downName, type) {
      // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      const tmpdata = [] // 用来保存转换好的json
      json
        .map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign(
              {},
              {
                v: v[k],
                position:
                  (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +
                  (i + 1)
              }
            )
          )
        )
        .reduce((prev, next) => prev.concat(next))
        .forEach(function(v) {
          tmpdata[v.position] = {
            v: v.v
          }
        })
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            }
          )
        }
      }
      const tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type === undefined ? 'xlsx' : type,
                bookSST: false,
                type: 'binary'
              } // 这里的数据是用来定义导出的格式类型
            )
          )
        ],
        {
          type: ''
        }
      ) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      this.outFile.download = downName + '.xlsx' // 下载名称
      this.outFile.href = href // 绑定a标签
      this.outFile.click() // 模拟点击实现下载
      setTimeout(function() {
        // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab(s) {
      // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    },
    getCharCol(n) {
      // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = (n % 26) + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata(data) {
      // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        )
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
.table-link {
  color: rgb(64, 158, 255);
  cursor: pointer;
}
</style>
