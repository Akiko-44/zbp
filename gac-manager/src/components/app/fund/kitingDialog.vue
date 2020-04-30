<template>
  <el-dialog
    title="提现"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item
        label="金额"
        prop="amount"
      >
        <el-input
          type="number"
          v-model.number="form.amount"
          @change="supplyDwMoney"
          placeholder="请输入提现金额"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span>如果点击提现确认按钮没反应，请检查是否被浏览器拦截，点击右上角弹出的标签，并允许该链接访问</span>
      </el-form-item>
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
    <form
      id="test_form"
      style="display: none !important;"
      action="https://service.chinaums.com/uisouterfront/withdraw/process"
      method="post"
      target="_blank"
    >
      <input
        name="content"
        type="text"
        v-model="content1"
      >
      <input
        type="submit"
        value="submit"
      >
    </form>
  </el-dialog>
</template>

<script>
import {
  applyCash
} from '@/api/common/fund'

export default {
  props: ['dwMoney'],
  data() {
    return {
      content1: '',
      loading: false,
      dialogFormVisible: false,
      form: {
        amount: ''
      },
      rules: {
        amount: [
          { validator: this.checkamount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkamount(rule, value, callback) {
      if (!value) {
        callback(new Error('提现金额不能为空'))
      } else if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(value)) {
        callback(new Error('请输入数字值'))
      } else if (value < 100) {
        callback(new Error('提现金额不能低于100'))
      } else {
        callback()
      }
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
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
      this.resetForm('form')
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          applyCash(this.form.amount).then(res => {
            this.loading = false
            this.dialogFormVisible = false
            this.content1 = res.data
            var form = document.getElementById('test_form')
            setTimeout(function () {
              form.submit()
            }, 10)
            // this.success()
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    supplyDwMoney: function () {
      if (this.form.amount > this.dwMoney) {
        this.form.amount = this.dwMoney.toFixed(2)
      }
    }
  }
}
</script>

