<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="testForm"
               ref="testForm"
               :rules="rules"
               label-width="100px"
               class="listForm">
        <el-form-item label="商家ID:"
                      prop="userId">
          <el-input style="width: 300px;"
                    :maxlength="20"
                    v-model="testForm.userId"
                    @blur="getMobile"
                    placeholder="输入商家ID，自动显示手机号码、商家名称和类型"> </el-input>
        </el-form-item>
        <el-form-item label="手机号码:"
                      prop="mobilePhone">
          <el-input style="width: 300px;"
                    :maxlength="11"
                    v-model="testForm.mobilePhone"
                    @blur="getUserID"
                    placeholder="输入手机号，自动显示商家ID、商家名称和类型"> </el-input>
        </el-form-item>
        <el-form-item label="商户名称:">
          <el-input readonly
                    style="width: 300px;"
                    v-model="testForm.name"
                    placeholder="自动读取，不可修改"> </el-input>
        </el-form-item>
        <el-form-item label="商户类型:">
          <el-input readonly
                    style="width: 300px;"
                    v-model="typeList[testForm.merchantType]"
                    placeholder="自动读取，不可修改"> </el-input>
        </el-form-item>
        <div class="button-box">
          <el-button type="primary"
                     class="btn cancel-btn"
                     v-waves
                     @click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn save-btn"
                     v-waves
                     :loading="loading"
                     @click="save">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getMerchantByUserId, getMerchantByMobilePhone, addTestUser } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      type: 2,
      loading: false,
      typeList: {
        1: '珠宝店',
        2: '设计师3',
        3: '制造间'
      },
      testForm: {
        // id: undefined,
        userId: '',
        mobilePhone: '',
        name: '',
        merchantType: undefined
      },
      rules: {
        userId: [
          { pattern: /^[0-9]*$/, message: '请输入正确的用户ID', trigger: 'blur' }
        ],
        mobilePhone: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getMobile() {
      if (this.testForm.userId) {
        this.$refs.testForm.validateField('userId', (value) => {
          if (!value) {
            getMerchantByUserId(this.testForm.userId).then(result => {
              this.testForm.mobilePhone = result.data.mobilePhone
              this.testForm.name = result.data.name
              this.testForm.merchantType = result.data.merchantType
            }).catch(() => { })
          }
        })
      }
    },
    getUserID() {
      if (this.testForm.mobilePhone) {
        this.$refs.testForm.validateField('mobilePhone', (value) => {
          if (!value) {
            getMerchantByMobilePhone(this.testForm.mobilePhone).then(result => {
              this.testForm.userId = result.data.userId
              this.testForm.name = result.data.name
              this.testForm.merchantType = result.data.merchantType
            }).catch(() => { })
          }
        })
      }
    },
    add() {
      addTestUser(this.type, this.testForm).then(data => {
        this.success()
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.testForm.validate(valid => {
        if (valid) {
          this.loading = true
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
    },
    success() {
      this.$notify({
        title: '成功',
        message: '提交成功',
        type: 'success',
        duration: 2000
      })
      this.$router.push({
        name: 'testMerchant'
      })
      this.loading = false
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.filter-container {
  position: relative;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.price-box .el-form-item {
  display: inline-block;
  margin-right: 10px;
}
</style>
