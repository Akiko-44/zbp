<template>
  <div>
    <el-button :loading="loading" v-if="isAdmin && allowCancelOrder(detail.state)" size="small" type="danger" @click="cancel">取消订单</el-button>
    <template v-if="!isAdmin">
      <el-button :loading="loading" v-if="allowStartDesign(detail.state)" type="primary" size="small" @click="startDesign">开始{{text}}</el-button>
      <el-button :loading="loading" v-if="allowCompleteDesign(detail.state)" type="success" size="small" @click="completeDesign">完成{{text}}</el-button>
      <el-button v-if="allowDelivery(detail.state)" type="primary" plain size="small" @click="dialogFormVisible=true">发货</el-button>
      <el-button :loading="loading" v-if="allowCompleteOrder(detail.state)" type="primary" size="small" @click="completeOrder">订单完成</el-button>
    </template>
    <el-dialog title="发货" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="物流公司" prop="expressCompany">
          <!--<el-input v-model="form.expressCompany"></el-input>-->
          <el-select v-model="form.expressCompany" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流编号" prop="expressNum">
          <el-input v-model="form.expressNum"></el-input>
        </el-form-item>
        <el-form-item label="发货备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="deliveryGoods">确认发货</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderCancel
} from '@/api/swap/order'
import { startDesign, completeDesign, completeOrder, delivery, express } from '@/api/common/order'
import {
  allowCancelOrder, allowStartDesign, allowCompleteDesign, allowDelivery, allowCompleteOrder
} from '@/utils/mixins/order'

export default {
  props: {
    detail: Object
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      options: [],
      form: {
        orderId: '',
        expressCompany: '',
        expressNum: '',
        remark: ''
      },
      rules: {
        expressCompany: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        expressNum: [
          { required: true, message: '请输入物流编号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.indexOf('admin') !== -1
    },
    text() {
      return this.detail.orderType === 5 ? '设计' : '制造'
    }
  },
  created() {
    this.getExpress()
  },
  methods: {
    async getExpress() {
      const expressData = await express()
      const _this = this
      expressData.data.forEach(function(v, i){
        _this.options.push({
          value: i,
          label: v
        })
      })
    },
    allowCancelOrder, allowStartDesign, allowCompleteDesign, allowDelivery, allowCompleteOrder,
    startDesign() {
      this.commonAction(startDesign(this.detail.orderNumber), 3)
    },
    completeDesign() {
      this.commonAction(completeDesign(this.detail.orderNumber), 4)
    },
    cancel() {
      this.commonAction(orderCancel(this.detail.orderNumber), 8)
    },
    delivery() {
      this.commonAction(delivery(this.detail.orderNumber), 5)
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.designerId = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancelForm() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    deliveryGoods() {
      const set = this.$refs
      this.form.orderId = this.detail.id
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          delivery(this.detail.orderNumber,this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '发货成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
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
    completeOrder() {
      this.commonAction(completeOrder(this.detail.orderNumber), 7)
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
    }
  }
}
</script>
