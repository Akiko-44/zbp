<template>
  <el-dialog
    title="修改订单价格"
    :visible.sync="dialogFormVisible"
  >
    <!-- <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item>
        <el-input v-model="form.modifyPrice" placeholder="请输入新价格"></el-input>
      </el-form-item>
    </el-form> -->
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
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
                v-model="form.modifyPrice"
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
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="update('form')"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  modifyPrice
} from '@/api/common/order'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      list: [],
      form: {
        orderId: '',
        modifyPrice: ''
      },
      rules: {
        modifyPrice: [
          { required: true, message: '请输入修改价格', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    // 提交成功
    success() {
      this.loading = false
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          modifyPrice(this.form).then(() => {
            this.dialogFormVisible = false
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
    }
  }
}
</script>

