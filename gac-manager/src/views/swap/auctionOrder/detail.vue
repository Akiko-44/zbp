<template>
  <div class="detail">
  	<div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>订单详情</span>
    	</div>
    <div class="actions" style="margin-top: 10px;">
      <el-button size="small" type="danger" @click="handleCancel">取消订单</el-button>
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
          <el-form-item label="订单状态">
            <span>{{ orderState[detail.state] }}</span>
          </el-form-item>
          <el-form-item label="应付金额">
            <span>{{ detail.payMoney }}</span>
          </el-form-item>
          <el-form-item label="竞拍价">
            <span>{{ detail.dealPrice }}</span>
          </el-form-item>
          <el-form-item label="运费金额">
            <span>{{ detail.freightMoney }}</span>
          </el-form-item>
          <el-form-item label="卖家">
            <span>{{ detail.sellUserName }}</span>
          </el-form-item>
          <el-form-item label="买家">
            <span>{{ detail.buyUserName }}</span>
          </el-form-item>
          <el-form-item label="订单结束时间">
            <span>{{ detail.endTime }}</span>
          </el-form-item>
          <el-form-item label="订单来源">
            <span>{{ srcState[detail.src] }}</span>
          </el-form-item>
          <el-form-item label="保证金">
            <span>{{ detail.deposit }}</span>
          </el-form-item>
        </el-form>
        <h4>拍卖商品</h4>
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
            <span>{{ detail.id }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { orderCancel, orderInfo } from '@/api/swap/order'
import { srcState } from '@/utils/mixins/swap'
import { orderState, payType } from '@/utils/mixins/order'

export default {
  data() {
    return {
      orderState, srcState, payType,
      goodsDesc: '',
      detail: {
        list: []
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await orderInfo(to.query.id)
    next(vm => {
      vm.detail = data
    })
  },
  methods: {
    handleCancel() {
      this.$confirm(`确定取消当前订单？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          orderCancel(this.detail.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '取消成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            })
        })
    }
  }
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

