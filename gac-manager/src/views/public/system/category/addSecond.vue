<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="secondForm"
               ref="secondForm"
               :rules="rules"
               label-width="100px"
               class="listForm">
        <el-form-item label="名称:"
                      prop="catName">
          <el-input style="width: 220px;"
                    placeholder="请输入菜单名称，10字以内"
                    :maxlength="10"
                    v-model="secondForm.catName"> </el-input>
        </el-form-item>
        <!-- <el-form-item label="类目属性:">
          <el-button type="primary"
                     v-if="isEdit"
                     class="select-btn"
                     @click="openDialog">立即关联</el-button>
          <el-button type="primary"
                     class="select-btn"
                     v-else
                     @click="openDialog">继续添加</el-button>
        </el-form-item> -->
        <!-- <el-table v-if="categoryAttributesList.length"
                  :data="categoryAttributesList"
                  border
                  class="attribute-selected-table"
                  ref="attributeSelectedTable"
                  highlight-current-row
                  style="width: 60%">
          <el-table-column property="attributesName"
                           label="名称">
          </el-table-column>
          <el-table-column label="文本框类型">
            <template slot-scope="{ row }">
              <span>{{ textTypeMap[row.attributesType] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可选择内容">
            <template slot-scope="{ row }">
              <span>{{ row.subsidiaryAttributesVOs.length }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否必填">
            <template slot-scope="{ row }">
              <span>{{ mustMap[row.isMust] }}</span>
            </template>
          </el-table-column>
        </el-table> -->
        <el-form-item label="排序:"
                      prop="sortOrder">
          <el-input style="width: 220px;"
                    v-model.number="secondForm.sortOrder"> </el-input>
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
    <attr-dialog ref="attrDialog"
                 :categoryAttributesList="categoryAttributesList"
                 @selectAttr="selectAttr"></attr-dialog>
  </div>
</template>

<script>
import { saveSecond } from '@/api/public/system'
import attrDialog from './attrDialog'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    attrDialog
  },
  data() {
    return {
      // 可修改状态 false为只可添加类目属性 不可修改
      isEdit: true,
      loading: false,
      secondForm: {
        id: undefined,
        parentId: '',
        catLevel: '2',
        catName: '',
        sortOrder: '',
        categoryAttributesIdList: [],
      },
      categoryAttributesList: [],
      selectedName: [],
      textTypeMap: {
        0: '文本框',
        1: '下拉框'
      },
      mustMap: {
        0: '否',
        1: '是'
      },
      rules: {
        catName: [
          { required: true, message: '二级分类名称必填', trigger: 'blur' }
        ],
        attr: [
          { required: true, message: '类目属性必填', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.secondForm.parentId = this.$route.query.id
    } else if (this.$route.query.data) {
      this.secondForm = JSON.parse(this.$route.query.data)
      this.categoryAttributesList = this.secondForm.categoryAttributesList
      this.isEdit = !!this.$route.query.isEdit
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      saveSecond(this.secondForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'secondCategoryList',
          query: { id: this.secondForm.parentId }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.secondForm.categoryAttributesIdList = this.categoryAttributesList.map(item => item.id)
      this.$refs.secondForm.validate(valid => {
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
    openDialog() {
      const catId = !this.isEdit ? this.secondForm.id : ''
      this.$refs.attrDialog.openDialog(catId)
    },
    selectAttr(val) {
      if (!this.isEdit) {
        this.categoryAttributesList.push(val)
      } else {
        this.categoryAttributesList = val
      }
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入0-100的整数'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('请输入0-100的整数'))
          } else {
            callback()
          }
        }
      }, 200)
    }
  }
}
</script>

<style scoped lang="postcss">
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
  width: 220px;
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
.attribute-selected-table {
  margin-left: 100px;
  margin-bottom: 24px;
}
</style>
