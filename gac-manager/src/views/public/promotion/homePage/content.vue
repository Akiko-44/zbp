<template>
  <div class="app-container" style="padding-right: 40px">
    <el-form :model="form" :rules="rules" ref="form" label-width="130px">
      <el-form-item label="推荐内容">
        <span>{{ form.moduleDefaultName }}</span>
      </el-form-item>

      <el-form-item label="模块名称" prop="moduleName">
        <span v-if="type">{{ form.moduleName }}</span>
        <el-input
          v-else
          v-model.trim="form.moduleName"
          placeholder="请输入模块名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="模块排序" prop="sortOrder">
        <span v-if="type">{{ form.sortOrder }}</span>
        <el-input
          v-else
          type="number"
          :min="1"
          :max="1"
          placeholder="请输入数字进行排序，数字越低的排序越靠前,相同数字的最新修改的排名靠前"
          v-model.number="form.sortOrder"
        >
        </el-input>
        <div class="tip">模块排序仅针对移动端</div>
      </el-form-item>

      <el-form-item label="内容信息" prop="moduleRelationList">
        <el-button
          type="primary"
          class="btn select-btn"
          v-if="!type"
          @click="openContentDialog(form.moduleRelationList.length)"
          >添加</el-button
        >
      </el-form-item>

      <!-- <el-form-item> -->
      <el-table
        :data="form.moduleRelationList"
        ref="goodsTable"
        border
        highlight-current-row
        style="width: 100%"
        class="table-box"
      >
        <el-table-column align="center" label="内容信息" width="400">
          <template slot-scope="{ row }">
            <div class="selected-goods">
              <img :src="row.thumbnail" />
              <div class="goods-info">
                <div class="goods-name">{{ row.title }}</div>
                <div class="goods-num">
                  <p>作者：{{ row.authorName }}</p>
                  <p>
                    <span>栏目：{{ row.columnName }}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="推送状态">
          <template slot-scope="{ row }">
            {{ pushStatusMap[row.pushStatus] }}
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          property="sortOrder"
          label="显示顺序"
        >
        </el-table-column>
        <el-table-column
          align="center"
          property="updateTime"
          label="更新时间"
          width="200"
        ></el-table-column>
        <el-table-column
          fixed="right"
          align="left"
          label="操作"
          v-if="!type"
          width="200"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              class="auditBtn"
              size="small"
              type="primary"
              @click="openContentModify(row, $index)"
              >编辑</el-button
            >
            <el-button
              class="auditBtn"
              size="small"
              type="danger"
              @click="delContent($index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-form-item> -->

      <el-form-item>
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="update('form')"
          >确 定</el-button
        >
      </el-form-item>
    </el-form>

    <content-dialog
      ref="contentDialog"
      @selectContent="selectContent"
    ></content-dialog>
    <content-modify-dialog
      ref="contentModifyDialog"
      @saveContent="saveContent"
      @openContentDialog="openContentDialog"
    ></content-modify-dialog>
  </div>
</template>

<script>
import { getHomeModule, modifyHomeModule } from '@/api/public/system';
import contentDialog from './components/chooseContent';
import contentModifyDialog from './components/modifyContent';

export default {
  components: {
    contentDialog,
    contentModifyDialog
  },
  props: ['content', 'goodsType'],
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
        moduleRelationList: []
      },
      // form.moduleRelationList: [],
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
            message: '请至少选择一个内容',
            trigger: 'change'
          }
        ]
      },
      pushStatusMap: {
        0: '未推送',
        1: '待审核',
        2: '审核通过（全平台）',
        3: '审核通过（仅粉丝）',
        4: '审核不通过'
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    this.form.id = this.$route.query.id
    this.getHomeModule()
  },
  methods: {
    getHomeModule() {
      getHomeModule({ id: this.id }).then(data => {
        this.form = data.data
        this.form.moduleRelationList = this.form.contentVOList
      })
    },
    // 选择内容弹框
    openContentDialog(index) {
      this.$refs.contentDialog.dialogTableVisible = true
      this.$refs.contentDialog.getList()
      this.$refs.contentDialog.index = index
    },
    selectContent(selectedObj) {
      // this.form.moduleRelationList.push(selectedObj)
      this.$set(this.form.moduleRelationList, selectedObj.index, selectedObj)
      this.openContentModify(selectedObj, selectedObj.index)
    },
    // 编辑内容弹框
    openContentModify(data, index) {
      this.$refs.contentModifyDialog.dialogTableVisible = true
      this.$refs.contentModifyDialog.form = data
      // if (this.form.name) {
      //   this.$refs.contentModifyDialog.form.merchantName = this.form.name
      // }
      this.$refs.contentModifyDialog.form.index = index
    },
    saveContent(selectedObj) {
      // this.form.moduleRelationList[selectedObj.index] = selectedObj
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
            item.relationPic = item.thumbnail
            // item.sortOrder = undefined
            item.id = undefined
            moduleRelationIds.push(item.relationId)
          })
          moduleRelationIds = [...(new Set(moduleRelationIds))]
          if (moduleRelationIds.length !== this.form.moduleRelationList.length) {
            this.$notify({
              title: '警告',
              message: '内容信息不能重复',
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
            // this.$router.push({ name: 'banner' })
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    delContent(index) {
      this.form.moduleRelationList.splice(index, 1)
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
/* 已选择内容 */
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
}
</style>
