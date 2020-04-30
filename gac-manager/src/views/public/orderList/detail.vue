<template>
  <div class="detail">
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>订单详情</span>
    </div>
    <div class="actions">
      <OrderOperation :detail="detail" />
    </div>
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="订单信息">
        <h4>基本信息</h4>
        <el-form
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="订单编号">
            <span>{{ detail.orderNumber }}</span>
          </el-form-item>
          <el-form-item label="订单创建时间">
            <span>{{ detail.createTime }}</span>
          </el-form-item>
          <el-form-item label="订单状态">
            <span>{{ orderState[detail.state] }}</span>
          </el-form-item>
          <el-form-item label="应付金额">
            <span>￥{{ detail.payMoney }}</span>
          </el-form-item>
          <el-form-item label="优惠金额">
            <span>￥{{ detail.discountPrice }}</span>
          </el-form-item>
          <el-form-item label="卖家">
            <span>{{ detail.sellUserName }}</span>
          </el-form-item>
          <el-form-item label="买家">
            <span>{{ detail.buyUserName }}</span>
          </el-form-item>
          <el-form-item label="订单类型">
            <span v-if="detail.caseType == 1">商品销售</span>
            <span v-else>商品定制</span>
          </el-form-item>
        </el-form>

        <h4>收货人信息</h4>
        <el-form
          v-if="detail.userInfoVO"
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="收货人">
            <span>{{ detail.userInfoVO.username }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ detail.userInfoVO.mobile }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ detail.userInfoVO.shippingAddr }}</span>
          </el-form-item>
        </el-form>
        <h4>商品信息</h4>
        <el-table
          :data="detail.orderGoodVOList"
          style="width: 100%"
        >
          <el-table-column
            width="180px"
            align="center"
            label="图片"
          >
            <template slot-scope="{ row }">
              <img
                :src="row.skuMainPic | setImg"
                style="height: 100px;"
              />
            </template>
          </el-table-column>

          <el-table-column
            width="200px"
            align="center"
            label="商品名称"
          >
            <template slot-scope="{ row }">
              <span>{{row.skuName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="110px"
            align="center"
            label="商品ID"
          >
            <template slot-scope="{ row }">
              <span>{{row.goodId}}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="110px"
            align="center"
            label="价格"
          >
            <template slot-scope="{ row }">
              <span>{{row.unitPrice}}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="110px"
            align="center"
            label="数量"
          >
            <template slot-scope="{ row }">
              <span>{{row.goodsNumber}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="text"
          v-if="detail.caseType == 2"
          @click="dialogTableVisible = true"
        >查看电子合同</el-button>
        <el-dialog
          title="电子合同"
          :visible.sync="dialogTableVisible"
        >
          <p>用户{{ detail.buyUserName }}在{{ detail.sellUserName }}购买了如下商品：</p>
          <el-table :data="detail.orderGoodVOList">
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.skuName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              align="center"
              label="原价"
            >
              <template slot-scope="{ row }">
                <span>{{row.unitPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              align="center"
              label="下单时间"
            >
              <template slot-scope="{ row }">
                <span>{{detail.createTime}}</span>
              </template>
            </el-table-column>
          </el-table>
          <p style="text-align: right;">订单金额￥{{ detail.payMoney }}，含运费￥{{ detail.freightMoney }}</p>
          <h3>补充信息</h3>
          <p style="height: 300px;overflow-y: scroll;">
            <img
              src="../../../assets/contract_images/contract.png"
              style="width: 100%;"
            />
          </p>
        </el-dialog>
        <el-form
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="支付方式">
            <span>{{ payType[detail.payType] }}</span>
          </el-form-item>
          <el-form-item label="支付渠道">
            <span>{{ detail.shop }}</span>
          </el-form-item>
          <el-form-item label="支付时间">
            <span>{{ detail.payTime }}</span>
          </el-form-item>
          <el-form-item label="支付流水号">
            <span>{{ detail.shopId }}</span>
          </el-form-item>
        </el-form>

        <h4>发票信息</h4>
        <el-form
          v-if="detail.invoiceType != 0"
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="发票类型">
            <span v-if="detail.invoiceType == 1">企业</span>
            <span v-else>个人</span>
          </el-form-item>
          <el-form-item label="抬头">
            <span>{{ detail.invoiceTitle }}</span>
          </el-form-item>
          <el-form-item label="税号">
            <span>{{ detail.code }}</span>
          </el-form-item>
        </el-form>

        <h4>买家留言</h4>
        <p><span>{{ detail.message }}</span></p>

        <h4>物流信息
          （<el-button
            type="text"
            @click="dialogExpressVisible = true"
          >物流详情</el-button>）
        </h4>
        <el-form
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="快递公司">
            <span v-if="status">{{ detail.orderExpress.expressCompany }}</span>
          </el-form-item>
          <el-form-item label="快递单号">
            <span v-if="status">{{ detail.orderExpress.expressNum }}</span>
          </el-form-item>
          <el-form-item label="发货时间">
            <span v-if="status">{{ detail.orderExpress.createTime }}</span>
          </el-form-item>
        </el-form>

        <el-dialog
          title="物流详情"
          :visible.sync="dialogExpressVisible"
        >
          <p v-if="status">物流公司：{{ detail.orderExpress.expressCompany }}</p>
          <p v-if="status">物流单号：{{ detail.orderExpress.expressNum }}</p>
          <el-table
            :data="expressData.data"
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
      </el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { orderInfo, getExpressCompanyInfo } from '@/api/common/order'
import { orderState, payType } from '@/utils/mixins/order'
import OrderOperation from '@/components/app/orderOperation'

export default {
  components: {
    OrderOperation
  },
  created() {
    this.status = false
  },
  data() {
    return {
      orderState, payType,
      detail: {
        list: []
      },
      status: false,
      expressData: {},
      dialogTableVisible: false,
      dialogExpressVisible: false,
      orderExp: ''
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await orderInfo(to.query.id)
    next(vm => {
      vm.detail = data
      vm.orderExp = data.orderExpress
      vm.orderExp.expressCode = vm.orderExp.expressCode || '0'
      vm.orderExp.expressNum = vm.orderExp.expressNum || '0'
      getExpressCompanyInfo(vm.orderExp.expressCode, vm.orderExp.expressNum).then(res => {
        vm.expressData = JSON.parse(res.data)
        vm.status = true
      })
    })
  },
  created() {
    //	this.datalist()
  }
}
</script>

<style scoped>
.detail {
  margin: 20px 14px;
}
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}
</style>

