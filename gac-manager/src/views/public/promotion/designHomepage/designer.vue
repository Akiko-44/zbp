<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px"
    >
      <el-form-item label="推荐内容">
        <span>{{ form.moduleDefaultName }}</span>
      </el-form-item>

      <el-form-item
        label="模块名称"
        prop="moduleName"
      >
        <span v-if="type">{{ form.moduleName }}</span>
        <el-input
          v-else
          v-model.trim="form.moduleName"
          placeholder="请输入模块名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="模块排序"
        prop="sortOrder"
      >
        <span v-if="type">{{ form.sortOrder }}</span>
        <el-input
          v-else
          type="number"
          :min="1"
          :max="100"
          placeholder="请输入数字进行排序，数字越低的排序越靠前,相同数字的最新修改的排名靠前"
          v-model.number="form.sortOrder"
        >
        </el-input>
        <div class="tip">模块排序仅针对移动端</div>
      </el-form-item>

      <el-form-item
        label="设计师信息"
        prop="linkTypeId"
      >
        <el-button
          type="primary"
          class="btn select-btn"
          v-if="!type"
          @click="openDesignerDialog(form.moduleRelationList.length)"
        >添加</el-button>
      </el-form-item>

      <el-table
        :data="form.moduleRelationList"
        ref="designerTable"
        border
        highlight-current-row
        class="table-box"
      >
        <el-table-column
          align="center"
          label="设计师信息"
          width="400"
        >
          <template slot-scope="{ row }">
            <div class="selected-goods">
              <img :src="row.merchantPic" />
              <div class="goods-info">
                <div class="goods-name">{{ row.merchantName }}</div>
                <div class="goods-num">
                  <p>设计师ID：{{ row.id }}</p>
                  <p>
                    <span>粉丝数：{{ row.concernNum || 0 }}</span>&nbsp;&nbsp;
                    <span>销售量：{{ row.saleNum || 0 }}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="上架作品"
        >
          <template slot-scope="{ row }">
            <span>{{ row.upperWorksNum || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="显示排序"
          width="100"
        >
          <template slot-scope="{ row }">
            <span>{{ row.sortOrder || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="更新时间"
          width="120"
        >
          <template slot-scope="{ row }">
            <span>{{ row.updateTime || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="left"
          label="操作"
          v-if="!(id === '1012' && type)"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              class="auditBtn"
              size="small"
              type="primary"
              v-if="type"
              @click="toDesignerDetail($index)"
            >详情</el-button>
            <el-button
              class="auditBtn"
              size="small"
              type="primary"
              v-if="!type && id !== '1012'"
              @click="toDesignerDetail($index)"
            >编辑</el-button>
            <el-button
              class="auditBtn"
              size="small"
              type="primary"
              v-if="!type && id === '1012'"
              @click="openDesignerModify(row, $index)"
            >编辑</el-button>
            <el-button
              class="auditBtn"
              size="small"
              type="danger"
              v-if="!type"
              @click="delBusiness(row.id, $index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form-item>
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="update('form')"
        >确 定</el-button>
      </el-form-item>
    </el-form>

    <designer-dialog
      ref="designerDialog"
      @selectDesigner="selectDesigner"
    ></designer-dialog>
    <designer-modify-dialog
      ref="designerModifyDialog"
      @saveDesigner="saveDesigner"
      @openDesignerDialog="openDesignerDialog"
    ></designer-modify-dialog>
  </div>
</template>

<script>
import { getHomeModule, modifyHomeModule } from '@/api/public/system'
import designerDialog from './components/chooseDesigner'
import designerModifyDialog from './components/modifyDesigner'

export default {
  components: {
    designerDialog,
    designerModifyDialog
  },
  data() {
    return {
      type: '',
      cropShow: false,
      loading: false,
      id: undefined,
      form: {
        id: undefined,
        moduleDefaultName: '',
        moduleName: '',
        sortOrder: '',
        moduleType: 2,
        moduleRelationList: [],
        index: 0
      },
      rules: {
        moduleName: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ],
        moduleRelationList: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个设计师',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
      this.id = this.form.id
    } else {
      this.id = this.$route.query.id
      this.form.id = this.$route.query.id
      this.getHomeModule()
    }
  },
  methods: {
    getHomeModule() {
      getHomeModule({ id: this.id }).then(data => {
        this.form = data.data
        this.form.moduleRelationList = this.form.merchantVOList
      })
    },
    // 选择设计师弹框
    openDesignerDialog(index) {
      this.$refs.designerDialog.dialogTableVisible = true
      this.$refs.designerDialog.getList()
      this.$refs.designerDialog.index = index
      this.$refs.designerDialog.listParams.moduleId = this.$route.query.id
    },
    selectDesigner(selectedObj) {
      selectedObj.merchantId = selectedObj.id
      selectedObj.merchantName = selectedObj.name
      selectedObj.goodsNum = selectedObj.goodsCount
      selectedObj.saleNum = selectedObj.goodsSaleCount
      selectedObj.merchantPic = selectedObj.logo
      this.$set(this.form.moduleRelationList, selectedObj.index, selectedObj)
      if (this.id === '1012') {
        this.openDesignerModify(selectedObj, selectedObj.index)
      }
    },
    // 编辑设计师弹框
    openDesignerModify(data, index) {
      this.$refs.designerModifyDialog.dialogTableVisible = true
      this.$refs.designerModifyDialog.form = data
      this.$refs.designerModifyDialog.form.index = index
    },
    saveDesigner(selectedObj) {
      this.$set(this.form.moduleRelationList, selectedObj.index, selectedObj)
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        setTimeout(() => {
          cb && cb()
        })
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          let moduleRelationIds = []
          this.form.moduleRelationList.map(item => {
            item.homeModuleId = this.id
            item.relationId = item.id
            item.relationPic = item.merchantPic
            item.id = undefined
            moduleRelationIds.push(item.relationId)
          })
          moduleRelationIds = [...new Set(moduleRelationIds)]
          if (
            moduleRelationIds.length !== this.form.moduleRelationList.length
          ) {
            this.$notify({
              title: '警告',
              message: '设计师信息不能重复',
              type: 'warning',
              duration: 2000
            })
            return false
          }
          modifyHomeModule(this.form).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: 'designHomepage' })
          })
        } else {
          return false
        }
      })
    },
    delBusiness(id, index) {
      this.form.moduleRelationList.splice(index, 1)
    },
    toDesignerDetail(index) {
      this.form.index = index
      if (this.type) {
        this.$router.push({
          name: 'designHomepageDesignerDetail',
          query: { data: JSON.stringify(this.form), type: this.type }
        })
      } else {
        this.$router.push({
          name: 'designHomepageDesignerDetail',
          query: { data: JSON.stringify(this.form) }
        })
      }
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
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

<style scoped lang="scss">
.dateInput {
  display: inline-block;
}
.tip {
  /* margin-left: 20px; */
  font-size: 12px;
  color: #999;
}
/* 已选择商品 */
.selected-goods {
  position: relative;
  // background: #f2f2f2;
  width: 400px;
  overflow: hidden;
  padding: 10px 20px 10px 10px;
  text-align: left;
  & .goods-edit {
    position: absolute;
    right: 12px;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    &:hover {
      color: #409eff;
    }
  }
  & img {
    float: left;
    width: 80px;
    // margin-top: 4px;
  }
  & .goods-info {
    margin-left: 100px;
    color: #666666;
  }
  & .goods-num {
    & p {
      margin: 5px;
    }
  }
  & .goods-name {
    width: 260px;
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/deep/ .el-input {
  width: 300px;
}
.table-box {
  margin-bottom: 20px;
  width: 100%;
}
</style>
