<template>
  <div class="order-operation">
    <!-- 暂无 -->
    <!-- <el-button :loading="loading" v-if="allowStartDesign(detail.state) && !isDelivery" type="primary" size="small" @click="startDesign">开始{{text}}</el-button>
	  <el-button :loading="loading" v-if="allowCompleteDesign(detail.state) && !isDelivery" type="success" size="small" @click="completeDesign">完成{{text}}</el-button>
	  <el-button :loading="loading" v-if="allowCompleteOrder(detail.state)" type="primary" size="small" @click="completeOrder">订单完成</el-button> -->
    <p>当前订单状态：
      <span class="red">
        <template v-if="detail.state === 6 && detail.isCommented === 2">
          已评价
        </template>
        <template v-else>
          {{ orderState[detail.state] }}
        </template>
      </span>
    </p>
    <p
      style="font-size:12px;"
      v-if="detail.state == 5"
    >*温馨提示：买家还有<span class="red">{{countDown}}</span>来完成本次交易的“确认收货”，如果倒计时结束后，买家没有“确认收货”，也没有“申请仲裁”，那么本次交易将自动确认收货</p>
    <el-button
      :loading="loading"
      v-if="detail.state == 2 || detail.state == 3"
      size="small"
      type="primary"
      @click="confirmOrder(detail.orderNumber)"
    >确认订单</el-button>
    <el-button
      :loading="loading"
      v-if="detail.state == 2 || detail.state == 3 || detail.state == 100"
      size="small"
      type="primary"
      @click="dialogPriceVisible=true"
    >修改价格</el-button>
    <el-button
      :loading="loading"
      v-if="allowCancelCustomOrder(detail.state)"
      size="small"
      type="danger"
      @click="cancelOrder(detail.orderNumber)"
    >关闭交易</el-button>
    <el-button
      v-if="allowDelivery(detail.state)"
      type="primary"
      plain
      size="small"
      @click="dialogDeliveryVisible=true"
    >发货</el-button>
    <el-button
      v-if="allowDeliveryNow(detail.state) && isDelivery"
      type="primary"
      plain
      size="small"
      @click="dialogDeliveryVisible=true"
    >发货</el-button>

    <el-dialog
      title="发货"
      :visible.sync="dialogDeliveryVisible"
    >
      <el-form
        :model="deliveryForm"
        :rules="deliveryRules"
        ref="deliveryForm"
        label-width="100px"
      >
        <el-form-item
          label="物流公司"
          prop="expressCompany"
        >
          <el-select
            v-model="deliveryForm.expressCompany"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="物流编号"
          prop="expressNum"
        >
          <el-input v-model="deliveryForm.expressNum"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelForm">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="deliveryGoods"
        >确认发货</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改订单价格"
      :visible.sync="dialogPriceVisible"
    >
      <el-form
        :model="priceForm"
        :rules="priceRules"
        ref="priceForm"
      >
        <el-table
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            align="center"
            label="商品"
          >
            <template slot-scope="{ row }">
              <img
                :src="row.orderGoodVOList[0].skuMainPic"
                width="100"
                height="100"
                style="vertical-align: text-top;"
              />
              <span
                v-for="(item,index) in row.orderGoodVOList"
                :key="index"
              >
                <span v-if="index > 0">，</span>
                {{item.skuName}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="单价"
          >
            <template slot-scope="{ row }">
              <span>
                ￥{{row.orderGoodVOList[0].unitPrice}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="数量"
          >
            <template slot-scope="{ row }">
              <span>
                {{row.orderGoodVOList[0].goodsNumber}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="订单金额"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.payMoney}}(含运费：￥{{row.freightMoney}})</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="实收金额(可修改)"
          >
            <template slot-scope="{ row }">
              <el-form-item prop="modifyPrice">
                <el-input
                  v-model="priceForm.modifyPrice"
                  placeholder="请输入修改价格"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelPrice('priceForm')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="modifyPriceConfirm('priceForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { startDesign, completeDesign, confirmOrder, cancelOrder, completeOrder, delivery, express, modifyPrice } from '@/api/common/order'
import {
  allowCancelCustomOrder, allowStartDesign, allowCompleteDesign, allowDelivery, allowCompleteOrder, allowDeliveryNow, orderState
} from '@/utils/mixins/order'

export default {
  props: {
    detail: Object
  },
  data() {
    return {
      orderState,
      loading: false,
      dialogDeliveryVisible: false,
      dialogPriceVisible: false,
      options: [],
      list: [],
      isDelivery: false,
      countDown: '',
      deliveryForm: {
        orderId: '',
        expressCompany: '',
        expressNum: '',
        remark: ''
      },
      deliveryRules: {
        expressCompany: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        expressNum: [
          { required: true, message: '请输入物流编号', trigger: 'blur' }
        ]
      },
      priceForm: {
        orderId: '',
        modifyPrice: ''
      },
      priceRules: {
        modifyPrice: [
          { required: true, message: '请输入修改价格', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    text() {
      return this.detail.orderType === 5 ? '设计' : '制造'
    }
  },
  watch: {
    detail(val) {
      this.isToDelivery()
      this.list.push(val)
    }
  },
  created() {
    this.getExpress()
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
      this.getCountDown()
    },
    isToDelivery() {
      const list = this.detail.orderGoodVOList
      const arr = []
      list.forEach(function(v, i) {
        arr.push(v.caseType)
      })
      if (arr.indexOf(2) > -1) {
        this.isDelivery = false
      } else {
        this.isDelivery = true
      }
    },
    allowCancelCustomOrder, allowStartDesign, allowCompleteDesign, allowDelivery, allowCompleteOrder, allowDeliveryNow,
    startDesign() {
      this.commonAction(startDesign(this.detail.orderNumber), 3)
    },
    completeDesign() {
      this.commonAction(completeDesign(this.detail.orderNumber), 4)
    },
    /* cancel() {
      this.commonAction(orderCancel(this.detail.orderNumber), 8)
    }, */
    confirmOrder(orderNo) {
      this.$confirm('<div style="text-align:center;"><p style="font-size:16px;">是否确认该笔订单？</p><p>请先与用户协商一致，并在修改价格后再确认订单，确认订单后，用户即可支付</p></div>', '确认订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        confirmOrder(orderNo)
          .then(_ => {
            this.$notify({
              title: '成功',
              message: '已确认订单',
              type: 'success'
            })
            location.reload()
          })
      }).catch(() => {
      })
    },
    // 关闭交易
    cancelOrder(orderNo) {
      this.$prompt('请输入关闭原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '请输入关闭原因'
      }).then(({ value }) => {
        value = encodeURI(value)
        cancelOrder(orderNo, value)
          .then(_ => {
            this.$notify({
              title: '成功',
              message: '已关闭订单',
              type: 'success'
            })
            location.reload()
          })
      }).catch(() => { })
    },
    delivery() {
      this.commonAction(delivery(this.detail.orderNumber), 5)
    },
    completeOrder() {
      this.commonAction(completeOrder(this.detail.orderNumber), 7)
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        setTimeout(() => { cb && cb() })
      })
    },
    cancelForm() {
      this.dialogDeliveryVisible = false
      this.resetForm('deliveryForm')
    },
    cancelPrice(formName) {
      this.dialogPriceVisible = false
      this.resetForm(formName)
    },
    // 发货
    deliveryGoods() {
      const set = this.$refs
      this.deliveryForm.orderId = this.detail.id
      set.deliveryForm.validate(valid => {
        if (valid) {
          this.loading = true
          delivery(this.detail.orderNumber, this.deliveryForm).then(() => {
            this.dialogDeliveryVisible = false
            this.$notify({
              title: '成功',
              message: '发货成功',
              type: 'success',
              duration: 2000
            })
            this.dialogDeliveryVisible = false
            this.loading = false
            location.reload()
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // 改价
    modifyPriceConfirm(formName) {
      const set = this.$refs
      this.priceForm.orderId = this.detail.id
      set.priceForm.validate(valid => {
        if (valid) {
          this.loading = true
          modifyPrice(this.priceForm).then(() => {
            this.dialogPriceVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.success()
            location.reload()
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    commonAction(service, state) {
      this.loading = true
      return service.then(() => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.detail.state = state
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 倒计时
    getCountDown() {
      let finishTime = +new Date(Date.parse(this.detail.sendTime.replace(/-/g, '/')))
      finishTime += 24 * 9 * 60 * 60 * 1000
      const diferentTime = this.leftTimer(finishTime - new Date())
      this.countDown = diferentTime
      this.timeOut = setInterval(() => {
        let finishTime = +new Date(Date.parse(this.detail.sendTime.replace(/-/g, '/')))
        finishTime += 24 * 9 * 60 * 60 * 1000
        const diferentTime = this.leftTimer(finishTime - new Date())
        this.countDown = diferentTime
      }, 1000)
    },
    leftTimer(leftTime) {
      var text = ''
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10) // 计算剩余的分钟
      var seconds = parseInt(leftTime / 1000 % 60, 10) // 计算剩余的秒数
      if (seconds < 0) {
        this.isPromoteSale = false
      }
      days = this.checkTime(days)
      hours = this.checkTime(hours)
      minutes = this.checkTime(minutes)
      seconds = this.checkTime(seconds)
      if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
        text = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
      }
      return text
    },
    checkTime(i) { // 将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
  }
}
</script>

<style scoped>
.order-operation {
  background: #f5f7fa;
  padding: 10px 20px;
}
.red {
  color: red;
}
</style>
