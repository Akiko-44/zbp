
<template>
  <div class="app-container calendar-list-container">
    <h4>用户信息</h4>
    <div class="el-table el-table--border even-color">
      <table class="el-table__body">
        <tbody>
          <tr class="el-table__row">
            <td class="is-center">用户ID</td>
            <td class="is-center">{{detail.buyUserId}}</td>
            <td class="is-center">用户昵称</td>
            <td class="is-center">{{detail.buyUserName}}</td>
            <td class="is-center">用户手机号</td>
            <td class="is-center">{{detail.buyUserPhone}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="is-center">收货人</td>
            <td class="is-center">{{detail.consignee}}</td>
            <td class="is-center">收货人联系电话</td>
            <td class="is-center">{{detail.receivePhone}}</td>
            <td class="is-center">收货地址</td>
            <td class="is-center">{{detail.shippingAddress}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>商品信息</h4>
    <el-table
      border
      :data="detail.goodsDetailVOs"
    >
      <el-table-column
        width="300px"
        align="center"
        label="商品"
      >
        <template slot-scope="{ row }">
          <div class="goods-info">
            <img
              :src="row.goodsImg"
              width="100"
              height="100"
            />
            <span>{{row.goodsName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="商家"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="SKU属性"
      >
        <template slot-scope="{ row }">
          <p
            v-for="(sku, skuIndex) in row.goodsSku"
            :key="skuIndex"
          >{{sku.specsName}}:{{sku.attrValue}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属分类"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsCategory}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属品牌"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsBrand}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单价"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.goodsPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="运费"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.goodsFreightPrice}}</span>
        </template>
      </el-table-column>
    </el-table>

    <h4>物流信息</h4>
    <div class="el-table el-table--border even-color">
      <table class="el-table__body">
        <tbody>
          <tr class="el-table__row">
            <td class="is-center">物流公司</td>
            <td class="is-center">{{detail.expressCompany}}</td>
            <td class="is-center">物流单号</td>
            <td class="is-center">{{detail.expressNum}}</td>
            <td class="is-center">物流详情</td>
            <td class="is-center">
              <el-button
                type="text"
                @click="expressLook(detail.id)"
              >查看</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>财务信息</h4>
    <div class="el-table el-table--border even-color">
      <table class="el-table__body">
        <tbody>
          <tr class="el-table__row">
            <td class="is-center">商品总金额</td>
            <td class="is-center">{{detail.goodsTotalMoney}}</td>
            <td class="is-center">运费</td>
            <td class="is-center">{{detail.freightMoney}}</td>
            <td class="is-center">优惠金额</td>
            <td class="is-center">{{detail.couponsPrice}}</td>
            <td class="is-center">优惠折扣</td>
            <td class="is-center">{{detail.discountCount === 10 ? '无':detail.discountCount+'折'}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="is-center">订单金额</td>
            <td class="is-center">{{detail.payMoney}}</td>
            <td class="is-center">支付方式</td>
            <td class="is-center">{{payTypeMap[detail.payType]}}</td>
            <td class="is-center">银联交易手续费率（商家）</td>
            <td class="is-center">{{detail.orderFee}}%</td>
            <td class="is-center">银联交易手续费（商家）</td>
            <td class="is-center">{{detail.freeMoney}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="is-center">银联交易手续费率（平台）</td>
            <td class="is-center">{{detail.unionPlatServiceFee}}%</td>
            <td class="is-center">银联交易手续费（平台）</td>
            <td class="is-center">{{detail.unionPlatServiceFeeMoney}}</td>
            <td class="is-center">平台手续费率</td>
            <td class="is-center">{{detail.platFee}}%</td>
            <td class="is-center">平台手续费</td>
            <td class="is-center">{{detail.platServiceFee}}</td>
          </tr>
          <tr class="el-table__row">
            <td class="is-center">商家实收金额</td>
            <td class="is-center">{{detail.merchantReceive}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>操作日志</h4>
    <el-table
      border
      :data="detail.financialAuditLogs"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        label="操作人"
        prop="auditName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作记录"
      >
        <template slot-scope="{ row }">
          {{auditStateMap[row.auditState]}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
        prop="auditLog"
      ></el-table-column>
      <el-table-column
        width="180px"
        align="center"
        label="操作时间"
        prop="createTime"
      ></el-table-column>
    </el-table>
    <div class="btns">
      <el-button
        type="primary"
        @click="auditOne(detail.auditState)"
        v-if="detail.auditState === 0"
      >审核操作</el-button>
      <!-- (待初审) -->
      <el-button
        type="primary"
        @click="auditOne(detail.auditState)"
        v-if="detail.auditState === 1"
      >审核操作</el-button>
      <!-- (初审通过) -->
      <el-button
        type="primary"
        @click="auditOne(detail.auditState)"
        v-if="detail.auditState === 2"
      >审核通过</el-button>
      <!-- (初审不通过) -->
      <el-button
        type="primary"
        @click="auditOne(detail.auditState)"
        v-if="detail.auditState === 4"
      >审核通过</el-button>
      <!-- (复审不通过) -->
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>

    <el-dialog
      title="审核操作"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <template v-if="detail.auditState === 0 || detail.auditState === 1">
        <el-radio-group v-model="auditForm.state">
          <template v-if="detail.auditState === 0">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </template>
          <template v-if="detail.auditState === 1">
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核不通过</el-radio>
          </template>
        </el-radio-group>
        <p v-if="auditForm.state === 1">初审通过后，需要下一位同事进行复审</p>
        <p v-if="auditForm.state === 3">审核通过后，商家即可发起提现</p>
        <el-input
          type="textarea"
          v-if="auditForm.state === 2 || auditForm.state === 4"
          v-model="auditForm.auditLog"
          placeholder="请输入不通过原因，60字以内"
          maxlength="60"
        ></el-input>
      </template>
      <div
        class="dialog-content"
        v-else
      >
        <p>请在商家与平台相关工作人员沟通，并确认订单没有问题后，再审核通过。</p>
        <p>审核通过后，商家即可提现</p>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="auditLoading"
          @click="update"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="物流详情"
      :visible.sync="dialogExpressVisible"
    >
      <div>物流公司：{{ orderExpressData.com }}</div>
      <div>物流单号：{{ orderExpressData.nu }}</div>
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
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="{ row }">
            <span>{{ row.context }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  audit,
  reportOrderDetail
} from '@/api/public/report'
import {
  lookExpress,
  expressMap
} from '@/api/common/order'

export default {
  data() {
    return {
      list: null,
      fixedList: null,
      total: null,
      listLoading: true,
      detail: {},
      dialogFormVisible: false,
      auditLoading: false,
      auditForm: {
        id: undefined,
        state: undefined,
        auditLog: undefined
      },
      payTypeMap: {
        1: 'PC扫码支付',
        2: 'APP微信支付',
        3: 'APP支付宝支付',
        4: '公众号+服务号支付'
      },
      auditStateMap: {
        0: '待审核',
        1: '初审通过',
        2: '初审不通过',
        3: '复审通过',
        4: '复审不通过'
      },
      dialogExpressVisible: false,
      orderExpressData: {}
    }
  },
  created() {
    // this.getList()
    if (this.$route.query.id) {
      this.auditForm.id = this.$route.query.id
      reportOrderDetail(this.$route.query.id).then(data => {
        this.detail = data.data
      })
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    auditOne(state) {
      this.dialogFormVisible = true
      if (state === 2) {
        this.auditForm.state = 1
      } else if (state === 4) {
        this.auditForm.state = 3
      }
    },
    update() {
      if ((this.auditForm.state === 2 && this.auditForm.auditLog == undefined) || (this.auditForm.state === 4 && this.auditForm.auditLog == undefined)) {
        this.$message({
          message: '请输入不通过原因',
          type: 'warning'
        })
        return false
      }
      audit(this.auditForm).then(data => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '审核成功',
          type: 'success',
          duration: 2000
        })
        this.$router.go(-1)
      }).catch(() => {
        this.$router.go(-1)
      })
    },
    resetQuery() {
      this.listQuery = {
        orderNumber: undefined,
        receiveName: undefined,
        createBTime: undefined,
        createETime: undefined,
        payBTime: undefined,
        payETime: undefined,
        orderType: undefined,
        auditState: undefined
      }
      this.createValue = ''
      this.payValue = ''
      this.getList()
    },
    expressLook(orderId) {
      lookExpress(orderId).then(data => {
        const res = JSON.parse(data.data)
        if (res.message == 'ok') {
          this.orderExpressData = res
          this.dialogExpressVisible = true
          this.expressToChinese(res.com)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    expressToChinese(val) {
      expressMap().then(data => {
        data = data.data
        for (const item in data) {
          if (val === data[item]) {
            this.orderExpressData.com = item
          }
        }
      })
    },
    downloadFile() { // 点击导出按钮
      var listData = this.fixedList
      for (let i = 0; i < listData.length; i++) {
        listData[i].merchantType = this.orderType[listData[i].orderType]
        listData[i].couponsType = '满减券'
        listData[i].receivableMoney = listData[i].payMoney
      }
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '报表')
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
.even-color tbody td:nth-child(odd) {
  background: #f5f7fa;
}
.even-color table {
  width: 100%;
  border-spacing: inherit;
}
.btns {
  margin-top: 20px;
}
.goods-info {
  display: flex;
}
.goods-info img {
  width: 100px;
  height: 100px;
}
</style>

