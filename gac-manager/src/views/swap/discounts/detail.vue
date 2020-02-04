<template>
  <div class="detail">
    <div class="actions">
      <OrderOperation
        :detail="detail"
      />
    </div>
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="订单信息">
        <h4>基本信息</h4>
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="订单编号">
            <span>{{ detail.orderNumber }}</span>
          </el-form-item>
          <el-form-item label="订单创建时间">
            <span>{{ detail.createTime }}</span>
          </el-form-item>
          <el-form-item label="应付金额">
            <span>￥{{ detail.payMoney }}</span>
          </el-form-item>
          <el-form-item label="运费金额">
            <span>￥{{ detail.freightMoney }}</span>
          </el-form-item>
          <el-form-item label="卖家">
            <span>{{ detail.sellUserName }}</span>
          </el-form-item>
          <el-form-item label="买家">
            <span>{{ detail.buyUserName }}</span>
          </el-form-item>
        </el-form>

        <h4>收货人信息</h4>
        <el-form v-if="detail.userInfoVO" label-position="left" inline class="table-expand">
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
        <el-table :data="detail.orderGoodVOList" style="width: 620px">
          <el-table-column width="180px" align="center" label="图片">
            <template slot-scope="{ row }">
              <img :src="row.skuMainPic | setImg" style="height: 100px;" />
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="商品名称">
            <template slot-scope="{ row }">
              <span>{{row.skuName}}</span>
            </template>
          </el-table-column>
  
          <el-table-column width="110px" align="center" label="商品ID">
            <template slot-scope="{ row }">
              <span>{{row.skuId}}</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="价格">
            <template slot-scope="{ row }">
              <span>{{row.unitPrice}}</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="数量">
            <template slot-scope="{ row }">
              <span>{{row.goodsNumber}}</span>
            </template>
          </el-table-column>
        </el-table>

        <h4>支付信息</h4>
        <el-form label-position="left" inline class="table-expand">
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
  
        <h4>物流信息</h4>
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="快递公司">
            <span>{{ detail.name }}</span>
          </el-form-item>
          <el-form-item label="快递单号">
            <span>{{ detail.shop }}</span>
          </el-form-item>
          <el-form-item label="发货时间">
            <span>{{ detail.shop }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { getObj } from '@/api/makeMerchant/discounts'

export default {
  components: {

  },
  data() {
    return {
      detail: {
        list: []
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await getObj(to.query.id)
    next(vm => {
      vm.detail = data
    })
  },
  methods: {}
}
</script>

<style scoped>
.detail {
  margin:20px 14px;
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

