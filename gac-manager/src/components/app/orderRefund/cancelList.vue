
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="cancelListQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item
          label="订单编号:"
          prop="orderNumber"
        >
          <el-input
            class="search-input"
            placeholder="请输入订单编号"
            :maxlength="20"
            @keyup.enter.native="handleFilter"
            v-model.trim="listQuery.orderNumber"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="购买人手机:"
          prop="buyUserMobile"
        >
          <el-input
            class="search-input"
            placeholder="请输入购买人手机"
            :maxlength="20"
            @keyup.enter.native="handleFilter"
            v-model.trim="listQuery.buyUserMobile"
          > </el-input>
        </el-form-item>
        <el-form-item label="收货人名称:">
          <el-input
            class="search-input"
            placeholder="请输入收货人名称"
            :maxlength="30"
            @keyup.enter.native="handleFilter"
            v-model.trim="listQuery.consignee"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="收货人手机号:"
          prop="consigneeMobile"
        >
          <el-input
            class="search-input"
            placeholder="请输入收货人手机号码"
            :maxlength="20"
            @keyup.enter.native="handleFilter"
            v-model.trim="listQuery.consigneeMobile"
          > </el-input>
        </el-form-item>
        <!--<el-form-item label="订单状态:">
		    <el-select v-model="listQuery.orderState" placeholder="请选择订单状态" @change="handleFilter">
    	<el-option v-for="item in refundTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
  	</el-select>
		  </el-form-item>-->
        <el-form-item label="下单时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="订单取消时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="cancelTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          class="search-button"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
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

      <!--<el-table-column type="expand">
      <template slot-scope="{ row }">
        <el-table :data="row.revoList" border style="width: 100%">
          <el-table-column width="110px" align="center" label="商品ID">
            <template slot-scope="props">
              <span>{{props.row.goodId}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="商品名">
            <template slot-scope="props">
              <span>{{props.row.skuName}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="图片">
            <template slot-scope="props">
              <img :src="props.row.skuMainPic | setImg" style="max-width: 100%" />
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="单价">
            <template slot-scope="props">
              <span>{{props.row.unitPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="数量">
            <template slot-scope="props">
              <span>x{{props.row.goodsNumber}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
     </el-table-column>-->

      <el-table-column
        width="170px"
        align="center"
        label="订单编号"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: detailRouteName, query: { id: row.orderNumber } })">{{row.orderNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="140px"
        align="center"
        label="购买人手机号"
      >
        <template slot-scope="{ row }">
          <span>{{row.buyUserName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="收货人"
      >
        <template slot-scope="{ row }">
          <span>{{row.userAddress.consignee}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="140px"
        align="center"
        label="收货人手机号"
      >
        <template slot-scope="{ row }">
          <span>{{row.userAddress.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="运费"
      >
        <template slot-scope="{ row }">
          <span>{{row.freightMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="退款金额"
      >
        <template slot-scope="{ row }">
          <span>{{row.payMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="退款申请时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="230px"
        align="center"
        label="退货状态"
      >
        <template slot-scope="{ row }">
          <p style="margin: 0;">待审核</p>
          <span>{{row.auditStateTime}}后自动同意退款</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            @click="$router.push({ name: detailRouteName, query: { id: row.orderNumber } })"
          >
            详情
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="agreeCancel(row.orderNumber)"
          >
            同意退款
          </el-button>
          <!--<el-button
        	v-if="row.auditState == 2"
          type="primary"
          size="small"
          @click="refunAmountC(row.id)"
        >
          确认收货
        </el-button>
        <el-button
        	v-if="row.auditState == 2"
        	type="primary"
          size="small"
          @click="expressLook(row.id)"
        >
          查看物流
        </el-button>-->
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
      title="物流详情"
      :visible.sync="dialogExpressVisible"
    >
      <p>物流公司：{{orderExpressData.com}}</p>
      <p>物流单号：{{orderExpressData.nu}}</p>
      <el-table
        :data="orderExpressData.data"
        border
      >
        <el-table-column
          align="center"
          label="时间"
          width="200px"
        >
          <template slot-scope="{ row }">
            <span>{{row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="{ row }">
            <span>{{row.context}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import waves from '@/directive/waves' // 水波纹指令
import { orderState, payType } from '@/utils/mixins/order'
// import { page } from '@/api/designMerchant/refundAddr'
import { merchantPage, refunAmount, lookRefundExpress, agreeCancel } from '@/api/common/order'
import { TimeDifference } from '@/utils/time'
import auditDialog from './auditDialog'

const getInitQuery = () => {
  return {
    orderNumber: undefined,
    buyUserMobile: undefined,
    consignee: undefined,
    consigneeMobile: undefined,
    orderState: undefined,
    payStartTime: undefined,
    payEndTime: undefined,
    cancelStartTime: undefined,
    cancelEndTime: undefined
  }
}

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
      createTime: [],
      cancelTime: [],
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: getInitQuery(),
      tableKey: 0,
      orderState,
      payType,
      auditState: {
        0: '审核中',
        1: '退款中(服务中)',
        2: '审核通过',
        3: '退款成功',
        4: '退款失败',
        5: '用户取消',
        6: '审核拒绝'
      },
      refundTypeList: [{
        value: 1,
        label: '待收货'
      }, {
        value: 2,
        label: '已收货'
      }, {
        value: undefined,
        label: '全部'
      }],
      dialogExpressVisible: false,
      orderExpressData: {},
      isAddr: false,
      detailRouteName: 'orderDetail',
      timeOut: null,
      rules: {
        orderNumber: [
          { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
        ],
        buyUserMobile: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        consigneeMobile: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        orderNumber: '订单编号',
        buyUserName: '购买人手机号码',
        consignee: '收货人',
        phone: '收货人手机号',
        freightMoney: '运费',
        payMoney: '退款金额',
        createTime: '退款申请时间'
      }]
    }
  },
  props: {
    listPage: String
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    orderStatus() {
      return Object.keys(this.orderState).map(key => {
        return { value: key, label: this.orderState[key] }
      })
    }
  },
  created() {
    this.fetchData()
    //  this.getList()
    //  page().then(data => {
    //  	this.isAddr = true
    //  })
  },
  beforeDestroy() {
    for (var i = 0; i <= this.timeOut; i++) {
      clearInterval(i)
    }
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      //  	console.log(this.timeOut)
      for (var i = 0; i <= this.timeOut; i++) {
        clearInterval(i)
      }
      this.listLoading = true
      //    this.listQuery.status = 17
      this.listQuery.orderState = 17
      // this.listQuery.orderType = this.listPage === 'design' ? 5 : 6
      this.listQuery.orderType = this.listPage === 'design' ? 5 : this.listPage === 'jewelry' ? 1 : 6
      this.listQuery.payStartTime = this.createTime ? this.createTime[0] : ''
      this.listQuery.payEndTime = this.createTime ? this.createTime[1] : ''
      this.listQuery.cancelStartTime = this.cancelTime ? this.cancelTime[0] : ''
      this.listQuery.cancelEndTime = this.cancelTime ? this.cancelTime[1] : ''
      merchantPage(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
          this.list.forEach((item) => {
            const timeDifferenceInstance = new TimeDifference()
            let cancelTime = +new Date(Date.parse(item.cancelTime.replace(/-/g, '/')))
            cancelTime += 24 * 7 * 60 * 60 * 1000
            const diferentTime = timeDifferenceInstance.format(new Date(), cancelTime)
            this.$set(item, 'auditStateTime', diferentTime)
            this.timeOut = setInterval(() => {
              let cancelTime = +new Date(Date.parse(item.cancelTime.replace(/-/g, '/')))
              cancelTime += 24 * 7 * 60 * 60 * 1000
              const diferentTime = timeDifferenceInstance.format(new Date(), cancelTime)
              this.$set(item, 'auditStateTime', diferentTime)
            }, 1000)
          })
        })
    },
    getExportList() {
      merchantPage({
        offset: 1,
        limit: 9999,
        orderState: 17,
        orderType: this.listPage === 'design' ? 5 : this.listPage === 'jewelry' ? 1 : 6,
        payStartTime: this.createTime ? this.createTime[0] : '',
        payEndTime: this.createTime ? this.createTime[1] : '',
        cancelStartTime: this.cancelTime ? this.cancelTime[0] : '',
        cancelEndTime: this.cancelTime ? this.cancelTime[1] : ''
      }).then(data => {
        this.exportList = data.data.records
        this.exportList.map(item => {
          item.consignee = item.userAddress.consignee
          item.phone = item.userAddress.phone
        })

        this.downloadFile()
      })
    },
    handleFilter() {
      this.$refs['cancelListQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
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
      //    this.listParams.offset = val
      //    this.getList()
      this.$router.replace({ name: 'cancelList', query: { page: val }})
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.createTime = []
      this.cancelTime = []
      this.$refs['cancelListQueryForm'].resetFields()
      this.$router.replace({ name: 'cancelList' })
      this.getList()
    },
    agreeCancel(orderNo) {
      this.$confirm('同意退款后，退款金额将原路返回', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        agreeCancel(orderNo).then(() => {
          this.$notify({
            title: '成功',
            message: '同意退款成功',
            type: 'success'
          })
          this.getList()
        })
      }).catch(() => { })
    },
    refunAmountC(id) {
      refunAmount(id).then(data => {
        this.$notify({
          title: '成功',
          message: '确认成功',
          type: 'success'
        })
        this.getList()
      })
    },
    expressLook(orderId) {
      lookRefundExpress(orderId).then(data => {
        const res = JSON.parse(data.data)
        console.log(res)
        if (res.message == 'ok') {
          this.orderExpressData = res
          this.dialogExpressVisible = true
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const downloadData = this.excelTitle.concat(listData)
      this.downloadExl(downloadData, '取消订单列表')
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
.search-input {
  width: 210px;
  /*margin-bottom: 10px;*/
}
</style>
