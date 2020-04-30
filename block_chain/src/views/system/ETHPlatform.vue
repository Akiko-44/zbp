<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        ref="ETHForm"
        :model="ETHForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
      >

        <el-form-item
          label="钱包文件:"
          prop="keystore"
        >
          <el-input
            v-model="ETHForm.keystore"
            style="width: 300px;"
            :maxlength="30"
            placeholder="请输入钱包文件"
          />
        </el-form-item>

        <el-form-item
          label="密码:"
          prop="password"
        >
          <el-input
            v-model="ETHForm.password"
            style="width: 300px;"
            placeholder="请输入密码"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="合约地址:"
          prop="contract_address"
        >
          <el-input
            v-model="ETHForm.contract_address"
            style="width: 300px;"
            :maxlength="30"
            placeholder="请输入合约地址"
          />
        </el-form-item>

        <el-form-item
          label="矿工费上限:"
          prop="gasLimit"
        >
          <el-input
            v-model="ETHForm.gasLimit"
            style="width: 300px;"
            :maxlength="30"
            placeholder="请输入矿工费上限"
          />
        </el-form-item>

        <el-form-item
          label="钱包地址:"
          prop="platform_address"
        >
          <el-input
            v-model="ETHForm.platform_address"
            style="width: 300px;"
            :maxlength="30"
            placeholder="请输入钱包地址"
          />
        </el-form-item>

        <el-form-item
          label="URL:"
          prop="url"
        >
          <el-input
            v-model="ETHForm.url"
            style="width: 300px;"
            :maxlength="30"
            placeholder="请输入URL"
          />
        </el-form-item>

        <div class="button-box">
          <el-button
            type="primary"
            class="btn save-btn"
            :loading="loading"
            @click="save"
          >设置</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import { getBlockChainConfiguration, updateBlockChainConfiguration } from '@/api/system'
import { validURL } from '@/utils/validate'

export default {
  data() {
    return {
      loading: false,
      ETHForm: {
        keystore: '',
        password: '',
        contract_address: '',
        gasLimit: '',
        platform_address: '',
        url: ''
      },
      rules: {
        keystore: [
          { required: true, message: '请输入钱包文件', trigger: 'blur' }
        ],
        platform_address: [
          { required: true, message: '请输入钱包地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getBlockChainConfiguration({ blockChainId: 1 }).then(data => {
      this.ETHForm = data.data
    })
  },
  methods: {
    add() {
      updateBlockChainConfiguration(this.ETHForm).then(data => {
        this.success()
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.ETHForm.validate(valid => {
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
      this.loading = false
    },
    cancel() {
      this.$router.go(-1)
    },
    validateUrl(rule, value, callback) {
      if (!validURL(value)) {
        callback(new Error('请输入正确的URL'))
      } else {
        callback()
      }
    },
    validatePass(rule, value, callback) {
      const reg = /^[A-Za-z0-9]{6,16}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-16位数字或字母'))
      } else {
        callback()
      }
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
