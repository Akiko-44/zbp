<template>
  <div class="detail">
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>定制订单详情</span>
    </div>
    <el-steps
      class="actions"
      :active="activeStatus"
      align-center
    >
      <el-step title="买家下单"></el-step>
      <el-step title="买家付款"></el-step>
      <el-step title="发货"></el-step>
      <el-step title="买家确认收货"></el-step>
      <el-step title="评价"></el-step>
    </el-steps>
    <div class="actions">
      <OrderOperation :detail="detail" />
    </div>
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="订单信息">
        <template v-if="detail.orderInvoiceVO && detail.orderInvoiceVO.invoiceType != 0">
          <h4>发票信息</h4>
          <el-form
            label-position="left"
            inline
            class="table-expand"
          >
            <el-form-item label="发票类型">
              <span v-if="detail.orderInvoiceVO.invoiceType == 1">企业</span>
              <span v-else>个人</span>
            </el-form-item>
            <el-form-item label="发票抬头">
              <span>{{detail.orderInvoiceVO.invoiceTitle}}</span>
            </el-form-item>
            <el-form-item label="税号">
              <span>{{detail.orderInvoiceVO.code}}</span>
            </el-form-item>
          </el-form>
        </template>

        <h4>买家留言</h4>
        <el-form>
          <el-form-item label="">
            <span v-if="detail.message">{{ detail.message }}</span>
            <span v-else>暂无</span>
          </el-form-item>
        </el-form>

        <template v-if="detail.materialInformation">
          <h4>原料及寄送信息</h4>

          <el-form
            label-position="left"
            inline
            class="table-expand"
            v-if="detail.state != 4"
          >
            <el-form-item label="原料">
              <span>{{ detail.materialInformation }}</span>
            </el-form-item>
            <el-form-item label="快递公司">
              <span v-if="status">{{ detail.orderExpress.expressCompany }}</span>
            </el-form-item>
            <el-form-item label="快递单号">
              <span v-if="status">{{ detail.orderExpress.expressNum }}</span>
            </el-form-item>
            <el-form-item
              label="寄送"
              v-if="detail.userInfoVO"
            >
              <span>{{ detail.merchantAddr }}</span>
              <span>{{ detail.merchantConsignee }}</span>
              <span>{{ detail.merchantPhone }}</span>
            </el-form-item>
          </el-form>
        </template>

        <el-form
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="订单编号">
            <span>{{ detail.orderNumber }}</span>
          </el-form-item>
          <el-form-item label="生成时间">
            <span>{{ detail.createTime }}</span>
          </el-form-item>
          <el-form-item label="支付时间">
            <span>{{ detail.payTime }}</span>
          </el-form-item>
          <el-form-item label="发货时间">
            <span>{{ detail.sendTime }}</span>
          </el-form-item>
          <el-form-item label="订单金额修改人">
            <span>{{ detail.sellUserName }}</span>
          </el-form-item>
          <el-form-item label="修改时间">
            <span>{{ detail.modifyTime }}</span>
          </el-form-item>
        </el-form>
        <el-table
          :data="detail.orderGoodVOList"
          border
        >
          <el-table-column
            align="center"
            label="商品"
          >
            <template slot-scope="{ row }">
              <img
                :src="row.skuMainPic"
                width="100"
                height="100"
                style="vertical-align: text-top;"
              />
              <span>{{row.skuName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            align="center"
            label="单价"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.unitPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            align="center"
            label="数量"
          >
            <template slot-scope="{ row }">
              <span>{{row.goodsNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            align="center"
            label="订单金额"
          >
            <template slot-scope="{ row }">
              <span>￥{{ detail.payMoney }}</span>
              <span>(含运费￥{{ detail.freightMoney }})</span>
            </template>
          </el-table-column>
        </el-table>
        <p style="text-align: right;">实收金额￥{{ detail.payMoney }}，含运费￥{{ detail.freightMoney }}</p>
      </el-tab-pane>
      <el-tab-pane label="收货和物流信息">
        <h4>购买人信息</h4>
        <el-form
          v-if="detail.userInfoVO"
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="用户昵称">
            <span>{{ detail.buyUserName }}</span>
          </el-form-item>
          <el-form-item label="手机号码">
            <span>{{ detail.buyUserName }}</span>
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
        <h4 v-if="detail.state != 4">
          物流信息
        </h4>
        <el-form
          label-position="left"
          inline
          class="table-expand"
          v-if="detail.state != 4"
        >
          <el-form-item label="快递公司">
            <span v-if="status">{{ detail.orderExpress.expressCompany }}</span>
          </el-form-item>
          <el-form-item label="快递单号">
            <span v-if="status">{{ detail.orderExpress.expressNum }}</span>
            <el-button
              type="warning"
              v-if="detail.orderExpress"
              @click="dialogExpressVisible = true"
            >物流跟踪</el-button>
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
    </el-tabs>

    <modify-dialog ref="modifyDialog" />

  </div>
</template>

<script>
import { orderInfo, getExpressCompanyInfo, updateExpressNum, express } from '@/api/common/order'
import { orderState, payType } from '@/utils/mixins/order'
import OrderOperation from './orderOperation'
import modifyDialog from './modifyDialog'

export default {
  components: {
    OrderOperation,
    modifyDialog
  },
  data() {
    return {
      orderState, payType,
      toRouter: '',
      detail: {
        list: []
      },
      status: false,
      activeStatus: 0,
      expressData: {},
      dialogTableVisible: false,
      dialogExpressVisible: false,
      dialogExpressNum: false,
      orderExp: '',
      options: [],
      expressNumForm: {},
      expressNum: '',
      rules: {
        expressCompany: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        expressNum: [
          { required: true, message: '物流单号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await orderInfo(to.query.id)
    next(vm => {
      vm.detail = data
      vm.orderExp = data.orderExpress
      vm.expressNumForm = data.orderExpress
      vm.expressNum = data.orderExpress.expressNum
      if (vm.orderExp.expressCode && vm.orderExp.expressNum) {
        getExpressCompanyInfo(vm.orderExp.expressCode, vm.orderExp.expressNum).then(res => {
          vm.expressData = JSON.parse(res.data)
          vm.status = true
        })
      }
      if (data.state === 3) {
        vm.activeStatus = 0
      } else if (data.state === 1 || data.state === 100) {
        vm.activeStatus = 1
      } else if (data.state === 4) {
        vm.activeStatus = 2
      } else if (data.state === 5) {
        vm.activeStatus = 3
      } else if (data.state === 16 || (data.state === 6 && data.isCommented === 1)) {
        vm.activeStatus = 4
      } else if (data.state === 6 && data.isCommented === 2) {
        vm.activeStatus = 5
      }
      console.log(vm.status)
    })
  },
  created() {
    this.status = false
    // this.getExpress()
  },
  methods: {
    async getExpress() {
      const expressData = await express()
      const _this = this
      expressData.data.forEach(function(v, i) {
        _this.options.push({
          value: i,
          label: v
        })
      })
    },
    modify(detail) {
      const dialog = this.$refs.modifyDialog
      dialog.list = []
      dialog.dialogFormVisible = true
      dialog.form.orderId = detail.id
    },
    cancel() {
      this.dialogExpressNum = false
      this.expressNumForm.expressNum = this.expressNum
    },
    updateExpress() {
      const self = this
      this.$refs['expressNumForm'].validate((valid) => {
        if (valid) {
          updateExpressNum(this.expressNumForm).then(data => {
            self.dialogExpressNum = false
            self.status = false
            self.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            getExpressCompanyInfo(self.orderExp.expressCode, self.orderExp.expressNum).then(res => {
              self.expressData = JSON.parse(res.data)
              self.status = true
            })
          }).catch(() => {
            this.cancel()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.detail {
  margin: 60px 14px 20px;
}
.el-form {
  border-bottom: 1px solid #eee;
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
.el-button + .el-button {
  margin-left: 0;
}
.actions {
  margin-top: 15px;
}
</style>

