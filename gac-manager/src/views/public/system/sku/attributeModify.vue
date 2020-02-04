<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="attributeForm"
               ref="attributeForm"
               :rules="rules"
               label-width="100px"
               class="listForm">
        <el-form-item label="属性值:"
                      prop="attrValue">
          <el-input style="width: 200px;"
                    placeholder="请输入属性值，20字以内"
                    v-model="attributeForm.attrValue"> </el-input>
        </el-form-item>
        <el-form-item label="排序:"
                      prop="sortOrder">
          <el-input style="width: 200px;"
                    placeholder="请输入数字，1表示排在第1位"
                    v-model.number="attributeForm.sortOrder"> </el-input>
        </el-form-item>
        <div class="button-box">
          <el-button class="btn cancel-btn"
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
import { saveSpecsAttrs } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      // id: this.$route.query.id,
      type: 'add',
      loading: false,
      attributeForm: {
        id: undefined,
        specsId: '',
        attrValue: '',
        sortOrder: ''
      },
      rules: {
        attrValue: [
          { required: true, message: '属性值不能为空', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.data) {
      this.attributeForm = JSON.parse(this.$route.query.data)
    } else if (this.$route.query.specsId) {
      this.attributeForm.specsId = this.$route.query.specsId
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      saveSpecsAttrs(this.attributeForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'attributeList',
          query: { id: this.attributeForm.specsId }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.attributeForm.validate(valid => {
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
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('请输入数字，1表示排在第1位'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入1-100的整数'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('请输入1-100的整数'))
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
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.select-btn {
  position: absolute;
  left: 340px;
  top: 0;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.merchant-name-box {
  position: relative;
}
.tip {
  margin-left: 20px;
  font-size: 12px;
}
</style>
