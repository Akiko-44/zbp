
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
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
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
  reportOrderDetail
} from '@/api/public/report'
import {
  lookExpress,
  expressMap
} from '@/api/common/order'

export default {
  props: ['id'],
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
        state: 1,
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
    if (this.id) {
      this.auditForm.id = this.id
      reportOrderDetail(this.id).then(data => {
        this.detail = data.data
      })
    }
  },
  methods: {
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

