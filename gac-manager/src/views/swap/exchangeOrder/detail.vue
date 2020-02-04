<template>
  <div class="detail">
  	<div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>订单详情</span>
    	</div>
    <div class="actions" style="margin-top: 10px;">
      <el-button v-if="allowCancelswapOrder(detail.state)" size="small" type="danger" @click="handleCancel">取消订单</el-button>
    </div>
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="订单信息">
        <h4>基本信息</h4>
        <div class="inner">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="订单编号">
              <span>{{ detail.orderNumber }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ exchangeOrderState[detail.state] }}</span>
            </el-form-item>
            <!-- <el-form-item label="订单来源">
              <span>{{ detail.desc }}</span>
            </el-form-item> -->
            <el-form-item label="订单创建时间">
              <span>{{ detail.createTime | formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
            </el-form-item>
            <!--<el-form-item label="订单结束时间">
              <span>{{ detail.endTime | formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
            </el-form-item>-->
          </el-form>
        </div>
        <h4>换出信息</h4>
        <div class="inner">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="换出商家">
              <span></span>
            </el-form-item>
          </el-form>
          <el-table :data="detail.swapOutList" style="width: 620px">
            <el-table-column align="center" label="换出商品">
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
            </el-table-column>
          </el-table>
        </div>

        <div class="inner">
          <h4 class="sub-title">支付信息</h4>
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="支付方式">
              <span>在线支付</span>
            </el-form-item>
            <el-form-item label="支付渠道">
              <span>{{ payType[detail.payType] }}</span>
            </el-form-item>
            <el-form-item label="支付时间">
              <span>{{ detail.swapoutPayTime }}</span>
            </el-form-item>
            <el-form-item label="支付流水号">
              <span>{{ detail.shopId }}</span>
            </el-form-item>
          </el-form>
        </div>

        <div class="inner" v-if="detail.orderExpressIn != ''">
          <h4 class="sub-title">物流信息</h4>
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="快递公司">
              <span v-if="detail.orderExpressIn.expressCompany">{{ detail.orderExpressIn.expressCompany }}</span>
            </el-form-item>
            <el-form-item label="快递单号">
              <span v-if="detail.orderExpressIn.expressNum">{{ detail.orderExpressIn.expressNum }}</span>
            </el-form-item>
            <el-form-item label="发货时间">
              <span  v-if="detail.orderExpressIn.createTime">{{ detail.orderExpressIn.createTime }}</span>
            </el-form-item>
          </el-form>
        </div>

        <h4>换入信息</h4>
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="换入商家">
            <span></span>
          </el-form-item>
        </el-form>
        <div class="inner">
          <el-table :data="detail.swapInList" style="width: 620px">
            <el-table-column align="center" label="换入商品">
              <el-table-column width="180px" align="center" label="图片">
                <template slot-scope="{ row }">
                  <img :src="row.skuMainPic | setImg" style="max-width: 100%" />
                </template>
              </el-table-column>

              <el-table-column width="110px" align="center" label="商品名称">
                <template slot-scope="{ row }">
                  <span>{{row.skuName}}</span>
                </template>
              </el-table-column>
      
              <el-table-column width="110px" align="center" label="商品ID">
                <template slot-scope="{ row }">
                  <span>{{row.goodId}}</span>
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
            </el-table-column>
          </el-table>
        </div>

        <div class="inner">
          <h4 class="sub-title">支付信息</h4>
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="支付方式">
              <span>在线支付</span>
            </el-form-item>
            <el-form-item label="支付渠道">
              <span>{{ payType[detail.payType] }}</span>
            </el-form-item>
            <el-form-item label="支付时间">
              <span>{{ detail.swapinPayTime }}</span>
            </el-form-item>
            <el-form-item label="支付流水号">
              <span>{{ detail.shopId }}</span>
            </el-form-item>
          </el-form>
        </div>

        <div class="inner" v-if="detail.orderExpressOut != ''">
          <h4 class="sub-title">物流信息</h4>
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="快递公司">
              <span v-if="detail.orderExpressOut.expressCompany">{{ detail.orderExpressOut.expressCompany }}</span>
            </el-form-item>
            <el-form-item label="快递单号">
              <span v-if="detail.orderExpressOut.expressNum">{{ detail.orderExpressOut.expressNum }}</span>
            </el-form-item>
            <el-form-item label="发货时间">
              <span v-if="detail.orderExpressOut.createTime">{{ detail.orderExpressOut.createTime }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { 
	swapOrderInfo,
	swapOrderCancel
} from '@/api/swap/order'
import { exchangeOrderState, payType, allowCancelswapOrder } from '@/utils/mixins/order'

export default {
  data() {
    return {
      exchangeOrderState, payType, allowCancelswapOrder,
      detail: {
        list: []
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await swapOrderInfo(to.query.id)
    next(vm => {
    	data.swapInList = [data.swapIn]
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
          swapOrderCancel(this.detail.orderNumber)
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
.inner {
  margin-left: 20px;
}
.sub-title {
  font-size: 14px;
}
</style>

