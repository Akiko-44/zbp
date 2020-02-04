<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="guidanceForm"
               ref="guidanceForm"
               :rules="rules"
               label-width="100px"
               class="listForm">
        <el-form-item label="名称:"
                      prop="name">
          <el-input style="width: 300px;"
                    :disabled="type === 'update'"
                    :maxlength="5"
                    v-model="guidanceForm.name"
                    placeholder="请输入名称，5字以内"> </el-input>
        </el-form-item>
        <div class="price-box">
          <el-form-item label="价格:"
                        prop="price">
            <el-input style="width: 300px;"
                      v-model="guidanceForm.price"
                      placeholder="请输入价格"> </el-input>
          </el-form-item>
          元/
          <el-select style="width: 80px;"
                     v-model="unit">
            <el-option label="克"
                       value="克"></el-option>
            <el-option label="毫米"
                       value="毫米"></el-option>
          </el-select>
        </div>
        <el-form-item label="排序:"
                      prop="sortNum">
          <el-input style="width: 300px;"
                    :disabled="type === 'update'"
                    v-model.number="guidanceForm.sortNum"
                    placeholder="请输入数字1-100，1表示排在第1位"> </el-input>
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
import { getGuidance, updateGuidedPrice, addGuidedPrice } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      sortNum: this.$route.query.sortNum,
      type: 'add',
      loading: false,
      unit: '克',
      guidanceForm: {
        id: undefined,
        name: '',
        price: '',
        priceUnit: '',
        sortNum: undefined
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        price: [
          { validator: this.validatePrice, required: true, trigger: 'blur' }
        ],
        sortNum: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.sortNum) {
      getGuidance({ integer: this.sortNum }).then(data => {
        this.guidanceForm = data.data
        this.unit = this.guidanceForm.priceUnit.substr(2)
      }).catch(() => { })
      this.type = 'update'
    }
  },
  methods: {
    add() {
      addGuidedPrice(this.guidanceForm).then(data => {
        this.success()
      }).catch(() => {
        this.loading = false
      })
    },
    update() {
      updateGuidedPrice(this.guidanceForm).then(data => {
        this.success()
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.guidanceForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.guidanceForm.price = String(Number(this.guidanceForm.price))
          this.guidanceForm.priceUnit = '元/' + this.unit
          if (this.type === 'add') {
            this.add()
          } else {
            this.update()
          }
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
        name: 'guidance'
      })
      this.loading = false
    },
    cancel() {
      this.$router.go(-1)
    },
    validatePrice(rule, value, callback) {
      if (!value || Number(value) === 0) {
        return callback(new Error('价格不能为空'))
      }
      setTimeout(() => {
        var reg = /^[0-9]+(.[0-9]{1,2})?$/
        if (!reg.test(value)) {
          callback(new Error('请输入数字值，如果有小数点则保留两位小数'))
        } else {
          callback()
        }
      }, 200)
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字1-100，1表示排在第1位'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('请输入数字1-100，1表示排在第1位'))
          } else {
            callback()
          }
        }
      }, 200)
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
