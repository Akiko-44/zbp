<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="dynamicForm"
               ref="dynamicForm"
               :rules="rules"
               label-width="100px"
               class="listForm">
        <el-form-item label="属性:"
                      prop="specsName">
          <el-input style="width: 220px;"
                    placeholder="请输入属性名称，10字以内"
                    :maxlength="10"
                    v-model="dynamicForm.specsName"> </el-input>
        </el-form-item>
        <el-form-item label="排序:"
                      prop="sortOrder">
          <el-input style="width: 220px;"
                    placeholder="请输入数字，1表示排在第1位"
                    v-model.number="dynamicForm.sortOrder"> </el-input>
        </el-form-item>
        <el-form-item :label="'属性值1'"
                      prop="specsAttrsList.0.attrValue"
                      :rules="{
      required: true, message: '属性值不能为空', trigger: 'blur'
    }">
          <el-input style="width: 220px; margin-right: 10px;"
                    :maxlength="20"
                    placeholder="请输入属性值，20字以内"
                    v-model="dynamicForm.specsAttrsList[0].attrValue"> </el-input>
          <el-button @click="addAttribute">继续添加</el-button>
        </el-form-item>
        <el-form-item v-for="(attribute, index) in dynamicForm.specsAttrsList"
                      v-if="index>0"
                      :label="'属性值' + (index + 1)"
                      :key="attribute.key"
                      :prop="'specsAttrsList.' + index + '.attrValue'"
                      :rules="{
      required: true, message: '属性值不能为空', trigger: 'blur'
    }">
          <el-input style="width: 220px; margin-right: 10px;"
                    :maxlength="20"
                    placeholder="请输入属性值，20字以内"
                    v-model="attribute.attrValue"> </el-input>
          <el-button @click.prevent="removeAttribute(attribute)">删除</el-button>
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
import { saveSkuAttr } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      // id: this.$route.query.id,
      loading: false,
      dynamicForm: {
        id: undefined,
        sortOrder: '',
        specsName: '',
        specsAttrsList: [{
          attrValue: '',
          sortOrder: '1'
        }]
      },
      categoryList: [],
      rules: {
        specsName: [
          { required: true, message: '属性名不能为空', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.data) {
      this.dynamicForm = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      saveSkuAttr(this.dynamicForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'skuList'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.dynamicForm.validate(valid => {
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
    removeAttribute(item) {
      var index = this.dynamicForm.specsAttrsList.indexOf(item)
      if (index !== -1) {
        this.dynamicForm.specsAttrsList.splice(index, 1)
      }
    },
    addAttribute() {
      if (this.dynamicForm.specsAttrsList.length >= 10) {
        this.$notify({
          title: '警告',
          message: '属性值最多为10项',
          type: 'warning'
        })
      } else {
        this.dynamicForm.specsAttrsList.push({
          attrValue: '',
          sortOrder: String(this.dynamicForm.specsAttrsList.length + 1)
        })
      }
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
