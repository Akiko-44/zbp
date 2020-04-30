<template>
  <div
    class="app-container"
    v-loading="loading"
    style="padding-right: 40px"
  >
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>售后详情</span>
    </div>
    <el-form label-width="120px">

      <h4>订单信息：</h4>
      <el-form-item label="订单编号">
        <span>{{ form.orderNumber }}</span>
      </el-form-item>

      <el-form-item label="付款时间">
        <span>{{ form.payTime }}</span>
      </el-form-item>

      <el-form-item label="交易状态">
        <span>{{orderState[form.orderState]}}</span>
      </el-form-item>

      <!--
    <h4>订单信息：</h4>
    <el-form-item label="支付方式">
      <span>{{ payType[form.payType] }}</span>
    </el-form-item>
    <el-form-item label="支付渠道">
      <span>{{ form.shop }}</span>
    </el-form-item>
    <el-form-item label="支付流水号">
      <span>{{ form.shopId }}</span>
    </el-form-item>
   -->

      <!-- <el-form-item label="头像">
      <el-row class="row" v-if="form.userLogo">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.userLogo | setImg" class="image" :style="getImageStyle(form.userLogo)"></a>
          </el-card>
        </el-col>
      </el-row>
    </el-form-item> -->

      <h4>收货人信息：</h4>
      <template v-if="form.userInfoVO">
        <el-form-item label="收货人">
          <span>{{ form.userInfoVO.username }}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{ form.userInfoVO.mobile }}</span>
        </el-form-item>
        <el-form-item label="收货地址">
          <span>{{ form.userInfoVO.shippingAddr }}</span>
        </el-form-item>
      </template>

      <h4>清单：</h4>
      <el-table
        :data="form.revoList"
        style="width: 620px"
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
          width="110px"
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
            <span>{{row.skuId}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="110px"
          align="center"
          label="商品规格"
        >
          <template slot-scope="{ row }">
            <p
              v-for="(item, i) in row.skuExplain"
              :key="i"
            >{{item.specsName}}：{{item.attrValue}}</p>
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
            <span>x{{row.goodsNumber}}</span>
          </template>
        </el-table-column>
      </el-table>

      <h4>退款理由：</h4>
      <el-form-item label="">
        <span>{{form.comments}}</span>
      </el-form-item>

      <h4>退款金额：</h4>
      <el-form-item label="">
        <span>￥{{form.refundAmount}}</span>
      </el-form-item>

      <h4>描述图片：</h4>
      <el-form-item label="">
        <el-row
          class="row"
          v-if="form.picList && form.picList.length"
        >
          <el-col
            class="col"
            :span="6"
            v-for="(picUrl, index) in form.picList"
            :key="index"
          >
            <el-card
              style="width:250px;"
              :body-style="{ padding: '0px' }"
            >
              <a
                target="_blank"
                :href="picUrl | setImg"
                class="image"
                :style="getImageStyle(picUrl)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <!--<el-form-item v-if="form.auditState == 0 || form.auditState == 6" label="审核操作">
      <el-button size="small" type="primary" @click="audit(2)">审核通过</el-button>
      <el-button v-if="form.auditState == 0" size="small" type="warning" @click="audit(3)">审核拒绝</el-button>
    </el-form-item>-->

      <div class="auditAction">
        <el-button
          type="success"
          size="small"
          @click="agreeReturn(1, 1)"
          v-if="form.auditState === 0 && form.refundType === 1"
        >
          同意退款
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="audit(2)"
          v-if="form.auditState === 0 && form.refundType === 1"
        >
          拒绝退款
        </el-button>
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="agreeReturn(1, 2)"
          v-if="form.auditState === 0 && form.refundType === 2"
        >
          同意退货
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="audit(2)"
          v-if="form.auditState === 0 && form.refundType === 2"
        >
          拒绝退货
        </el-button>
        <el-button
          type="warning"
          size="small"
          @click="applyArbitrate()"
          v-if="form.auditState === 6 || form.auditState === 2"
        >
          申请仲裁
        </el-button>
        <el-button
          v-if="form.auditState == 2 && form.delayedReceipt == 0"
          type="primary"
          size="small"
          @click="delayedReceipt()"
        >
          延迟收货
        </el-button>
        <el-button
          v-if="form.auditState == 2"
          type="success"
          size="small"
          @click="refunAmountC()"
        >
          确认收货
        </el-button>
        <el-button
          v-if="form.auditState == 2"
          type="danger"
          size="small"
          @click="audit(4)"
        >
          拒绝收货
        </el-button>
      </div>

    </el-form>

    <!-- <el-table
    :data="form.auditLogList">
    <el-table-column label="审核记录" align="center">
      <el-table-column
        prop="createTime"
        label="日期"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        width="120"
        label="状态"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{auditState[row.auditState]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="opinion"
        label="意见"
        align="center"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="auditName"
        label="审核人"
      >
      </el-table-column>
    </el-table-column>
  </el-table> -->

    <audit-dialog
      ref="auditDialog"
      @success="auditSuccess"
    />

    <arbitrate-apply-dialog
      ref="arbitrateApplyDialog"
      @applySuccess="auditSuccess"
    />
  </div>
</template>

<script>
// import auditDialog from './auditDialog'
import { orderState, payType, auditState } from '@/utils/mixins/order'
import { refunAmount, lookRefundExpress, refundDelayedReceipt, merchantAuditRefund } from '@/api/common/order'
import { setImg } from '@/filters'
import auditDialog from './auditDialog'
import arbitrateApplyDialog from './arbitrateApplyDialog'

export default {
  components: {
    auditDialog,
    arbitrateApplyDialog
  },
  props: {
    getDetail: Function
  },
  data() {
    return {
      id: this.$route.query.id,
      orderState, payType,
      loading: false,
      form: {},
      auditState
    }
  },
  async mounted() {
    this.loading = true
    const form = await this.getDetail(this.$route.query.id).then(data => data.data)
    if (typeof form.revoList === 'string') form.revoList = []
    setTimeout(() => {
      this.form = form
      this.loading = false
    }, 10)
  },
  methods: {
    applyArbitrate() {
      const dialog = this.$refs.arbitrateApplyDialog
      dialog.dialogFormVisible = true
      dialog.form.refundOrderId = this.id
      //    this.index = index
    },
    agreeReturn(state, $index, type) {
      const id = this.id
      const data = {
        refundId: id,
        auditState: state
      }
      const tip = type === 1 ? '同意退款后,退款金额将原路返回' : '确认同意退货?'
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        merchantAuditRefund(data).then(() => {
          this.$notify({
            title: '成功',
            message: '审核成功',
            type: 'success',
            duration: 2000
          })
          this.auditSuccess()
        })
      }).catch(() => { })
    },
    audit(state) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.refundOrderId = this.id
      dialog.form.refundId = this.id
      dialog.form.auditState = state
    },
    delayedReceipt() {
      this.$confirm('确认延迟收货时间？（每笔订单可延迟7天收货）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        refundDelayedReceipt(this.id).then(data => {
          this.$notify({
            title: '成功',
            message: '确认成功',
            type: 'success'
          })
          this.auditSuccess()
        })
      }).catch(action => { })
    },
    refunAmountC() {
      this.$confirm('确认收货？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        refunAmount(this.id).then(data => {
          this.$notify({
            title: '成功',
            message: '确认成功',
            type: 'success'
          })
          this.auditSuccess()
        })
      }).catch(action => { })
    },
    auditSuccess() {
      this.$router.go(-1)
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.danger {
  color: #f56c6c;
}
.el-col-6 {
  margin-bottom: 20px;
}
.auditAction {
  margin-bottom: 20px;
}
</style>


