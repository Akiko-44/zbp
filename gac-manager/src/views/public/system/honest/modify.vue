<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :model="honestForm"
        ref="honestForm"
        :rules="rules"
        label-width="100px"
        class="listForm"
      >
        <div class="merchant-name-box">
          <el-form-item
            label="企业名称:"
            prop="merchantName"
          >
            <el-input
              style="width: 195px;"
              v-model="honestForm.merchantName"
            > </el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="btn select-btn"
            @click="openDialog"
          >选择</el-button>
        </div>

        <!-- <el-form-item label="选择分类:">
          <el-select style="width: 195px;"
                     v-model="honestForm.classifyId"
                     placeholder="请选择分类"
                     @change="selectCategory">
            <el-option v-for="item in categoryList"
                       :key="item.id"
                       :label="item.catName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item
          label="诚信度:"
          prop="honestDegree"
        >
          <el-input
            style="width: 195px;"
            v-model="honestForm.honestDegree"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="获奖数量:"
          prop="rewardNumber"
        >
          <el-input
            style="width: 195px;"
            v-model="honestForm.rewardNumber"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="投诉数量:"
          prop="complaintNumber"
        >
          <el-input
            style="width: 195px;"
            v-model="honestForm.complaintNumber"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="排序:"
          prop="sortNum"
        >
          <el-input
            style="width: 195px;"
            v-model.number="honestForm.sortNum"
          > </el-input>
        </el-form-item>
        <div class="button-box">
          <el-button
            type="primary"
            class="btn cancel-btn"
            v-waves
            @click="cancel"
          >取消</el-button>
          <el-button
            type="primary"
            class="btn save-btn"
            v-waves
            :loading="loading"
            @click="save"
          >保存</el-button>
        </div>
      </el-form>
    </div>

    <el-dialog
      title="选择企业名称"
      :visible.sync="dialogTableVisible"
    >
      <el-input
        style="width: 195px;"
        v-model="listParams.name"
      > </el-input>
      <el-button
        type="primary"
        class="btn"
        v-waves
        @click="getList"
      >查询</el-button>
      <span class="tip"> 提示：单击以下选项即可选中该企业</span>
      <el-table
        :data="enterpriseList"
        ref="enterpriseTable"
        highlight-current-row
        @current-change="tableCurrentChange"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="companyName"
          label="企业名称"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listParams.offset"
          :page-sizes="[10,20,30,50]"
          :page-size="listParams.limit"
          layout="total, prev, pager, next"
          :total="total"
        > </el-pagination>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="selectEnterprise"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getHonest, searchHonest, addHonest, updateHonest, getCategory } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      id: this.$route.query.id,
      type: 'add',
      loading: false,
      honestForm: {
        id: undefined,
        merchantId: 0,
        merchantName: '',
        classifyId: undefined,
        classifyName: '',
        honestDegree: 100,
        rewardNumber: 0,
        complaintNumber: 0,
        sortNum: 1
      },
      categoryList: [],
      dialogTableVisible: false,
      listParams: {
        offset: 1,
        limit: 10,
        name: ''
      },
      total: 0,
      selectedName: {},
      enterpriseList: [],
      rules: {
        merchantName: [
          { required: true, message: '企业名称必填', trigger: 'blur' }
        ],
        honestDegree: [
          { validator: this.validateHonest, required: true, trigger: 'blur' }
        ],
        rewardNumber: [
          { pattern: /^[0-9]*$/, message: '请输入整数', required: true, trigger: 'blur' }
        ],
        complaintNumber: [
          { pattern: /^[0-9]*$/, message: '请输入整数', required: true, trigger: 'blur' }
        ],
        sortNum: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // this.getCategory()
    if (this.id) {
      getHonest({ id: this.id }).then(data => {
        this.honestForm = data.data
        this.selectedName.companyName = this.honestForm.merchantName
      })
      this.type = 'update'
    }
  },
  methods: {
    getList() {
      searchHonest(this.listParams).then(data => {
        this.enterpriseList = data.data.records
        this.total = data.data.total
      })
    },
    getCategory() {
      getCategory({ limit: 9999 }).then(data => {
        this.categoryList = data.data.records
        this.honestForm.classifyId = this.categoryList[0].id
        this.honestForm.classifyName = this.categoryList[0].catName
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      addHonest(this.honestForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'honest'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    update() {
      this.loading = true
      updateHonest(this.honestForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'honest'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.honestForm.validate(valid => {
        if (valid) {
          if (!this.honestForm.merchantId) {
            this.$notify({
              title: '警告',
              message: '请选择一个企业',
              type: 'warning'
            })
            return
          }
          if (this.honestForm.merchantName !== this.selectedName.companyName) {
            this.$notify({
              title: '警告',
              message: '修改完企业名称后请重新选择企业',
              type: 'warning'
            })
            return
          }
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
    selectCategory(val) {
      this.honestForm.classifyName = this.categoryList.filter(item => item.id === val)[0].catName
    },
    openDialog() {
      this.dialogTableVisible = true
      this.listParams.name = this.honestForm.merchantName
      this.getList()
    },
    tableCurrentChange(val) {
      this.selectedName = val
    },
    selectEnterprise() {
      this.honestForm.merchantId = this.selectedName.id
      this.honestForm.merchantName = this.selectedName.companyName
      this.dialogTableVisible = false
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    validateHonest(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('请输入0-100的整数'))
        } else {
          if (value < 0 || value > 100) {
            callback(new Error('请输入0-100的整数'))
          } else {
            callback()
          }
        }
      }, 200)
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入0-1000的整数'))
        } else {
          if (value < 0 || value > 1000) {
            callback(new Error('请输入0-1000的整数'))
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
