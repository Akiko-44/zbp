<template>
  <div class="parameter-setting">
    <!-- <div>
      <el-tabs
        type="border-card"
        :tab-position="'top'"
        class="right-nav"
        ref="tab"
      >
        <el-tab-pane label="商户参数">
          <div
            class="app-container"
            style="padding-right: 40px"
          >
            <el-form
              :model="merchantForm"
              :rules="rules"
              ref="merchantForm"
              label-width="220px"
            >
              <el-form-item
                label="平台服务费："
                prop="platformServiceFee"
              >
                <el-input-number
                  placeholder="请输入数字"
                  v-model="merchantForm.platformServiceFee"
                  :controls="false"
                  :min="0"
                ></el-input-number> %
              </el-form-item>

              <el-form-item
                label="提现手续费："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入数字"
                  v-model="merchantForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> %
              </el-form-item>

              <el-form-item
                label="最低提现金额："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入数字"
                  v-model="merchantForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 元
              </el-form-item>

              <el-form-item
                label="营业期限预警时间："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入数字"
                  v-model="merchantForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天
              </el-form-item>

              <el-form-item
                label="营业期限预警短信："
                prop="noticeName"
              >
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="尊敬的XXX，您在中宝平所提交的营业执照快到期限，为确保您的账户权益及安全，请尽快更新营业执照，如有不清楚，请拔打客服：010XXXXXXXX"
                  style="width:500px;"
                  v-model="merchantForm.noticeName"
                >
                </el-input>
              </el-form-item>

              <el-form-item
                label="预警短信下发频率："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入数字"
                  v-model="merchantForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天/次，自营业期限到期前90天开始计时
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="save"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="年费、押金参数">
          <div
            class="app-container"
            style="padding-right: 40px"
          >
            <el-form
              :model="yearForm"
              :rules="rules"
              ref="yearForm"
              label-width="220px"
            >
              <el-form-item
                label="珠宝店年费："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> %
              </el-form-item>

              <el-form-item
                label="珠宝店押金："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> %
              </el-form-item>

              <el-form-item
                label="设计师年费："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 元
              </el-form-item>

              <el-form-item
                label="设计师押金："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天
              </el-form-item>

              <el-form-item
                label="制造间年费："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 元
              </el-form-item>

              <el-form-item
                label="制造间押金："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天
              </el-form-item>

              <el-form-item
                label="年费期限预警时间："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天
              </el-form-item>

              <el-form-item
                label="年费期限预警短信："
                prop="noticeName"
              >
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="尊敬的XXX，您在中宝平的年费还有XX天到期，为确保您的账户权益及安全，请尽快缴纳年费，如有不清楚，请拔打客服：010XXXXXXXX"
                  style="width:500px;"
                  v-model="yearForm.noticeName"
                >
                </el-input>
              </el-form-item>

              <el-form-item
                label="预警短信下发频率："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="yearForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天/次，自年费期限到期前90天开始计时
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="save"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="订单参数设置">
          <div
            class="app-container"
            style="padding-right: 40px"
          >
            <el-form
              :model="orderForm"
              :rules="rules"
              ref="orderForm"
              label-width="220px"
            >
              <el-form-item
                label="发货后自动收货时长："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="orderForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天，同样适用于退货后的用户发货后流程；
              </el-form-item>

              <el-form-item
                label="可延长收货次数："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="orderForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 次，同样适用于退货后的用户发货后流程；
              </el-form-item>

              <el-form-item
                label="可延长收货时长："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="orderForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天，同样适用于退货后的用户发货后流程；
              </el-form-item>

              <el-form-item
                label="待付款订单失效时长："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="orderForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 分钟
              </el-form-item>

              <el-form-item
                label="退款/货申请失效时长："
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额"
                  v-model="orderForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天
              </el-form-item>

              <el-form-item
                label="退货申请通过后发货失效时长"
                prop="noticeName"
              >
                <el-input-number
                  placeholder="请输入金额："
                  v-model="orderForm.noticeName"
                  :controls="false"
                  :min="0"
                ></el-input-number> 天
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loading"
                  @click="save"
                >保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div> -->

    <div
      class="app-container"
      style="padding-right: 40px"
    >
      <el-form
        :model="merchantForm"
        :rules="rules"
        ref="merchantForm"
        label-width="220px"
      >
        <el-form-item
          label="平台服务费："
          prop="platformServiceFee"
        >
          <el-input-number
            placeholder="请输入数字"
            v-model="merchantForm.platformServiceFee"
            :controls="false"
            :min="0"
          ></el-input-number>
          %
        </el-form-item>

        <el-form-item
          label="开店是否需要审核："
          prop="resource"
        >
          <el-radio-group v-model="merchantForm.shopAuditSwitch">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="中宝协会员入驻是否需要审核："
          prop="resource"
        >
          <el-radio-group v-model="merchantForm.gacAuditSwitch">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="商品是否需要审核："
          prop="resource"
        >
          <el-radio-group v-model="merchantForm.goodsAuditSwitch">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="设计师订单支付时间："
          prop="designOrderCancelTime"
        >
          <el-input-number
            placeholder="请输入数字"
            v-model="merchantForm.designOrderCancelTime"
            :controls="false"
            :min="1"
            :max="1000"
          ></el-input-number>
          <span>小时</span>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="save"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getParamSettings, saveParamSettings } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'editAnnouncement',
  directives: {
    waves
  },
  data() {
    return {
      type: 'add',
      loading: false,
      merchantForm: {
        id: undefined,
        platformServiceFee: '',
        shopAuditSwitch: 0,
        gacAuditSwitch: 0,
        goodsAuditSwitch: 0,
        designOrderCancelTime: 24
      },
      yearForm: {},
      orderForm: {},
      rules: {
        platformServiceFee: [
          {
            required: true,
            message: '请输入平台服务费',
            trigger: 'blur'
          }
        ],
        designOrderCancelTime: [
          { message: '请输入设计师订单支付时间', required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getParamSettings().then(data => {
      this.merchantForm = data.data
    })
  },
  methods: {
    add() {
      this.loading = true
      saveParamSettings(this.merchantForm)
        .then(data => {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    save() {
      this.$refs.merchantForm.validate(valid => {
        if (valid) {
          this.add()
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parameter-setting {
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  /deep/ .el-tabs__header {
    position: fixed;
    z-index: 2222;
    top: 50px;
    width: 100%;
  }
  /deep/ .el-tabs__content {
    padding-top: 40px;
  }
}
</style>
