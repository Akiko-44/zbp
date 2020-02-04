<template>
  <div>
    <el-dialog
      title="发货"
      :visible.sync="dialogFormVisible"
    >
      <el-table
        border
        :data="orderGoodsList"
        style="width: 100%; margin-bottom: 20px;"
      >
        <el-table-column
          class-name="input-column"
          align="center"
          label="证书编码(发货时请先填写证书编号)"
        >
          <template slot-scope="{ row }">
            <template v-for="(item,i) in row.certificateList">
              <el-input
                :key="i"
                :maxlength="20"
                v-model="item.certificateCode"
                placeholder="选填，输入证书编码"
              ></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodId"
          align="center"
          label="商品编号"
        >
        </el-table-column>
        <el-table-column
          prop="skuName"
          align="center"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="商品图片"
        >
          <template slot-scope="{ row }">
            <img
              style="width:100px;height:100px;"
              :src="row.skuMainPic"
              alt=""
            >
          </template>
        </el-table-column>
      </el-table>

      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="物流公司"
          prop="expressCompany"
        >
          <!--<el-input v-model="form.expressCompany"></el-input>-->
          <el-select
            v-model="form.expressCompany"
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
          <el-input v-model="form.expressNum"></el-input>
        </el-form-item>
        <el-form-item label="发货备注">
          <el-input v-model="form.remark"></el-input>
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
  </div>
</template>

<script>
// import {
//   orderCancel
// } from '@/api/swap/order'
import { delivery, express } from '@/api/common/order'

export default {
  props: {
    orderGoodVOList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      options: [],
      isDelivery: false,
      orderNumber: '',
      orderGoodsList: [],
      form: {
        orderId: '',
        expressCompany: '',
        expressNum: '',
        remark: '',
        certificateDTOList: []
      },
      rules: {
        expressCompany: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        expressNum: [
          { pattern: /^[0-9a-zA-Z]+$/, required: true, message: '请输入物流编号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    orderGoodVOList(val) {
      // this.form.certificateDTOList = val
      this.orderGoodsList = val
      this.orderGoodsList.map((item, i) => {
        item.certificateList = []
        for (let i = 0; i < item.goodsNumber; i++) {
          const certificateObj = {
            certificateCode: '',
            skuId: item.skuId
          }
          item.certificateList.push(certificateObj)
        }
      })
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
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.certificateDTOList = []
          this.orderGoodsList.map((item, i) => {
            this.form.certificateDTOList.push(...item.certificateList)
          })
          delivery(this.orderNumber, this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '发货成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.loading = false
            this.$emit('success')
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
    }
  }
}
</script>
<style lang="scss" scoped>
.input-column div {
  display: block;
  margin-bottom: 4px;
}
</style>
