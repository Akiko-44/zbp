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
                    <el-form-item label="订单状态">
                        <span>{{ orderState[detail.state] }}</span>
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
                <el-table :data="detail.orderGoodVOList" style="width: 100%">
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

                    <el-table-column width="120px" align="center">
                        <template slot-scope="{ row }">
                            <el-button type="text" @click="modify(row, detail)">修改商品价格</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-button type="text" @click="dialogTableVisible = true">查看电子合同</el-button>
                <el-dialog title="电子合同" :visible.sync="dialogTableVisible">
                    <el-table :data="detail.orderGoodVOList">
                        <el-table-column align="center" label="商品名称">
                            <template slot-scope="{ row }">
                                <span>{{row.skuName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="110px" align="center" label="数量">
                            <template slot-scope="{ row }">
                                <span>{{row.goodsNumber}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="110px" align="center" label="单价">
                            <template slot-scope="{ row }">
                                <span>{{row.unitPrice}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="200px" align="center" label="下单时间">
                            <template slot-scope="{ row }">
                                <span>{{detail.createTime}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
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
        </el-tabs>

        <modify-dialog ref="modifyDialog" />

    </div>
</template>

<script>
  import { orderInfo } from '@/api/common/order'
  import { orderState, payType } from '@/utils/mixins/order'
  import OrderOperation from '@/components/app/orderOperation'
  import modifyDialog from './modifyDialog'

  export default {
    components: {
      OrderOperation,
      modifyDialog
    },
    data() {
      return {
        orderState, payType,
        detail: {
          list: []
        },
        dialogTableVisible: false
      }
    },
    async beforeRouteEnter(to, from, next) {
      const { data } = await orderInfo(to.query.id)
      next(vm => {
        vm.detail = data
      })
    },
    methods: {
      modify(row, detail, index) {
        const dialog = this.$refs.modifyDialog
        dialog.dialogFormVisible = true
        dialog.form.orderId = detail.id
        dialog.form.goodsId = row.goodId
        dialog.form.skuId = row.skuId
        this.index = index
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

