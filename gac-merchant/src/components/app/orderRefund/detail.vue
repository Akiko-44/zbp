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
    <el-steps
      class="actions"
      :active="activeStatus"
      align-center
    >
      <el-step title="申请仲裁"></el-step>
      <el-step title="平台处理仲裁申请"></el-step>
      <el-step title="仲裁结果"></el-step>
    </el-steps>
    <div class="operation">
      <p>当前退款状态：<span class="red">{{ auditState[form.auditState] }}</span></p>
      <template v-if="form.auditState === 7">
        <ul>
          <li>平台工作人员将在3个工作日内处理仲裁申请；</li>
          <li>如有疑问，可致电400xxxxxxxx；</li>
        </ul>
      </template>
      <template v-if="form.auditState === 3 || form.auditState === 8">
        <p>退款金额将原路返回至买家账户中</p>
        <ul>
          <li>具体到账时间已银行的到账时间为准；</li>
          <li>如有疑问，可致电400xxxxxxxx；</li>
        </ul>
      </template>
      <template v-if="form.auditState === 4 || form.auditState === 9">
        <p>经平台审查，仲裁申请不合理，予以驳回</p>
        <ul>
          <li>如有疑问，可致电400xxxxxxxx；</li>
        </ul>
      </template>
      <template v-if="form.auditState === 1">
        <p>请耐心等待买家寄还商品 <span>还剩6天23小时59分59秒</span></p>

        <ul>
          <li>收到买家退货时，请及时验货</li>
          <li>为保障顺利退货，买家申请的退款金额暂做冻结</li>
          <li>该笔冻结款项会在您同意退款后直接退给买家</li>
          <li>如果买家在倒计时结束后未退货，钱款会自动解冻</li>
        </ul>
      </template>
      <template v-if="form.auditState === 2">
        <p>请确认收货</p>
        <ul>
          <li>如果拒绝收货，买家可以申请仲裁，让客服介入处理</li>
          <li>如果您逾期未处理，将自动退款给买家</li>
          <li>确认收货后，退款金额将原路返回至买家账户中</li>
        </ul>
      </template>
      <div class="auditAction">
        <el-button
          type="success"
          size="small"
          @click="agreeReturn(1, 1)"
          v-if="form.auditState === 0 && form.refundType === 1"
        >
          <!--  -->
          同意退款
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="audit(2)"
          v-if="form.auditState === 0 && form.refundType === 1"
        >
          <!--  -->
          拒绝退款
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="agreeReturn(1, 2)"
          v-if="form.auditState === 0 && form.refundType === 2"
        >
          <!--  -->
          同意退货
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="audit(2)"
          v-if="form.auditState === 0 && form.refundType === 2"
        >
          <!--  -->
          拒绝退货
        </el-button>
        <el-button
          type="warning"
          size="small"
          @click="applyArbitrate()"
          v-if="form.auditState === 0"
        >
          <!--  -->
          申请仲裁
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="delayedReceipt()"
          v-if="form.auditState == 2 && form.delayedReceipt == 0"
        >
          <!--  -->
          延迟收货
        </el-button>
        <el-button
          type="success"
          size="small"
          @click="refunAmountC()"
          v-if="form.auditState == 2"
        >
          <!--  -->
          确认收货
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="audit(4)"
          v-if="form.auditState == 2"
        >
          <!--  -->
          拒绝收货
        </el-button>
        <el-button
          v-if="form.auditState == 2"
          type="primary"
          size="small"
          @click="dialogExpressVisible = true"
        >
          查看物流
        </el-button>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="退款信息">
        <el-form label-width="100px">
          <template v-if="form.auditLogList && form.auditLogList.length">
            <el-form-item label="平台处理人员">
              <span>{{ form.auditLogList[0].auditName }}</span>
            </el-form-item>
            <el-form-item label="平台处理时间">
              <span>{{ form.auditLogList[0].createTime }}</span>
            </el-form-item>
            <el-form-item label="备注信息">
              <span>{{ form.auditLogList[0].opinion }}</span>
            </el-form-item>
          </template>
          <hr />
          <el-form-item label="仲裁时间">
            <span>{{ form.arbitrationTime }}</span>
          </el-form-item>
          <el-form-item label="仲裁原因">
            <span>{{ form.arbitationReason }}</span>
          </el-form-item>
          <el-form-item label="仲裁凭证">
            <el-row
              class="row"
              v-if="form.arbitrationPic && form.arbitrationPic.length"
            >
              <el-col
                class="col"
                :span="6"
                v-for="(picUrl, index) in form.arbitrationPic"
                :key="index"
              >
                <el-card
                  style="width:250px;"
                  :body-style="{ padding: '0px' }"
                >
                  <a
                    title="点击查看大图"
                    @click="lookImg(picUrl)"
                    class="image"
                    :style="getImageStyle(picUrl)"
                  ></a>
                </el-card>
              </el-col>
            </el-row>
          </el-form-item>
          <hr />
          <el-form-item label="退款编号">
            <span>{{ form.refundOrderId }}</span>
          </el-form-item>
          <el-form-item label="提交时间">
            <span>{{ form.createTime }}</span>
          </el-form-item>
          <el-form-item label="退款金额">
            <span>￥{{ form.refundAmount }}</span>
          </el-form-item>
          <el-form-item label="退款原因">
            <span>{{ form.comments }}</span>
          </el-form-item>
          <el-form-item label="退款凭证">
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
                    title="点击查看大图"
                    @click="lookImg(picUrl)"
                    class="image"
                    :style="getImageStyle(picUrl)"
                  ></a>
                </el-card>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="订单信息">
        <h4>发票信息</h4>
        <el-form
          label-position="left"
          inline
          class="table-expand"
          v-if="form.orderInvoiceVO && form.orderInvoiceVO.invoiceType != 0"
        >
          <el-form-item label="发票类型">
            <span v-if="form.orderInvoiceVO.invoiceType == 1">企业</span>
            <span v-else>个人</span>
          </el-form-item>
          <el-form-item label="发票抬头">
            <span>{{form.orderInvoiceVO.invoiceTitle}}</span>
          </el-form-item>
          <el-form-item label="税号">
            <span>{{form.orderInvoiceVO.code}}</span>
          </el-form-item>
        </el-form>

        <h4>买家留言</h4>
        <el-form>
          <el-form-item label="">
            <span v-if="form.message">{{ form.message }}</span>
            <span v-else>暂无</span>
          </el-form-item>
        </el-form>

        <h4>原料及寄送信息</h4>

        <el-form
          label-position="left"
          inline
          class="table-expand"
          v-if="form.state != 4"
        >
          <el-form-item label="原料">
            <span>{{ form.materialInformation }}</span>
          </el-form-item>
          <el-form-item label="快递公司">
            <span v-if="status">{{ form.orderExpress.expressCompany }}</span>
          </el-form-item>
          <el-form-item label="快递单号">
            <span v-if="status">{{ form.orderExpress.expressNum }}</span>
          </el-form-item>
          <el-form-item
            label="寄送"
            v-if="form.userInfoVO"
          >
            <span>{{ form.userInfoVO.shippingAddr }}</span>
            <span>{{ form.userInfoVO.username }}</span>
            <span>{{ form.userInfoVO.mobile }}</span>
          </el-form-item>
        </el-form>

        <el-form
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="订单编号">
            <span>{{ form.orderNumber }}</span>
          </el-form-item>
          <el-form-item label="生成时间">
            <span>{{ form.createTime }}</span>
          </el-form-item>
          <el-form-item label="支付时间">
            <span>{{ form.payTime }}</span>
          </el-form-item>
          <el-form-item label="发货时间">
            <span>{{ form.sendTime }}</span>
          </el-form-item>
          <el-form-item label="订单金额修改人">
            <span>{{ form.sellUserName }}</span>
          </el-form-item>
          <el-form-item label="修改时间">
            <span>{{ form.modifyTime }}</span>
          </el-form-item>
        </el-form>
        <el-table
          :data="form.revoList"
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
  <span>￥{{ form.payMoney }}</span>
  <span>(含运费￥{{ form.freightMoney }})</span>
</template>
          </el-table-column>
        </el-table>
        <p style="text-align: right;">实收金额￥{{ form.payMoney }}，含运费￥{{ form.freightMoney }}</p>
      </el-tab-pane>
      <el-tab-pane label="收货和物流信息">
        <h4>购买人信息</h4>
        <el-form
          v-if="form.userInfoVO"
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="用户昵称">
            <span>{{ form.buyUserName }}</span>
          </el-form-item>
          <el-form-item label="手机号码">
            <span>{{ form.buyUserName }}</span>
          </el-form-item>
        </el-form>
        <h4>收货人信息</h4>
        <el-form
          v-if="form.userInfoVO"
          label-position="left"
          inline
          class="table-expand"
        >
          <el-form-item label="收货人">
            <span>{{ form.userInfoVO.username }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ form.userInfoVO.mobile }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ form.userInfoVO.shippingAddr }}</span>
          </el-form-item>
        </el-form>
        <h4 v-if="form.state != 4">
          物流信息
        </h4>
        <el-form
          label-position="left"
          inline
          class="table-expand"
          v-if="form.state != 4"
        >
          <el-form-item label="快递公司">
            <span v-if="status">{{ form.refundExpressVO.expressCompany }}</span>
          </el-form-item>
          <el-form-item label="快递单号">
            <span v-if="status">{{ form.refundExpressVO.expressNum }}</span>
            <el-button
              type="warning"
              v-if="form.refundExpressVO"
              @click="dialogExpressVisible = true"
            >物流跟踪</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          title="物流详情"
          :visible.sync="dialogExpressVisible"
        >
          <p v-if="status">物流公司：{{ form.refundExpressVO.expressCompany }}</p>
          <p v-if="status">物流单号：{{ form.refundExpressVO.expressNum }}</p>
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
    <!-- <el-form label-width="120px">

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
                title="点击查看大图"
                @click="lookImg(picUrl)"
                class="image"
                :style="getImageStyle(picUrl)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form> -->

    <!--<el-form-item v-if="form.auditState == 0 || form.auditState == 6" label="审核操作">
      <el-button size="small" type="primary" @click="audit(2)">审核通过</el-button>
      <el-button v-if="form.auditState == 0" size="small" type="warning" @click="audit(3)">审核拒绝</el-button>
    </el-form-item>-->

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
    <el-dialog
      title="大图"
      fullscreen='fullscreen'
      :visible.sync="dialogImgVisible"
    >
      <div style="text-align: center;">
        <img
          :src="bigImgSrc"
          width="50%"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      dialogImgVisible: false,
      dialogExpressVisible: false,
      expressData: {},
      bigImgSrc: '',
      activeStatus: 0,
      status: false,
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
    if (form.auditState <= 6) {
      this.activeStatus = 0
    } else if (form.auditState === 7) {
      this.activeStatus = 1
    } else if (form.auditState === 8 || form.auditState === 9 || form.auditState === 10) {
      this.activeStatus = 2
    }
    /* const form = {
      orderNumber: '23453245',
      payTime: '23453245',
      orderState: 1,
      auditState: 0,
      refundType: 1,
      userInfoVO: {
        username: 'ewrwe',
        mobile: 'ewrwe',
        shippingAddr: 'ewrwe'
      },
      revoList: [{
        skuMainPic: 'http://219.134.137.178:85/group1/M00/00/37/wKgI5l5n0rOAT2QZAACKfApSgTw116.jpg',
        skuName: 'fsafs'
      }],
      comments: '23453245',
      refundAmount: '23453245',
      picList: ['http://219.134.137.178:85/group1/M00/00/37/wKgI5l5n0rOAT2QZAACKfApSgTw116.jpg']
    } */

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
    },
    lookImg(imgSrc) {
      this.dialogImgVisible = true
      this.bigImgSrc = imgSrc
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
.operation {
  background: #f5f7fa;
  padding: 10px 20px;
}
.operation ul {
  color: #999;
  font-size: 12px;
  line-height: 20px;
}
.red {
  color: red;
}
</style>


