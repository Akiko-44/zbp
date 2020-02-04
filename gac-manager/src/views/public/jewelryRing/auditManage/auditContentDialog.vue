<template>
  <el-dialog
    title="审核操作"
    width="600px"
    :visible.sync="dialogFormVisible"
  >
    <div>
      标题：{{title}}
    </div>
    <div>
      作者：{{authorName}}
    </div>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item prop="contentStatus">
        <el-radio-group
          v-model="form.contentStatus"
          style="text-align:center;"
        >
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="2">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item
        label="所属标签"
        label-width="80px"
        v-if="form.contentStatus == 1"
        prop="labelId"
      >
        <el-radio-group v-model="form.labelId">
          <el-radio
            v-for="item in labelList"
            :key="item.id"
            :label="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item
        v-if="form.contentStatus !== 1"
        prop="contentReviewDesc"
      >
        <el-input
          v-model="form.contentReviewDesc"
          type="textarea"
          maxlength="60"
          placeholder="请输入不通过原因，60字以内"
        />
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
  </el-dialog>
</template>

<script>
import {
  contentLabelList, auditContentReview
} from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      title: '',
      authorName: '',
      labelList: [],
      form: {
        id: '',
        contentStatus: 1,
        labelId: undefined,
        contentReviewDesc: ''
      },
      rules: {
        contentReviewDesc: [
          { required: true, message: '请输入不通过原因，60字以内', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getLabelList()
  },
  methods: {
    getLabelList() {
      contentLabelList().then(data => {
        this.labelList = data.data.records
        this.labelList = [{ id: '', name: '无' }].concat(this.labelList)
      })
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
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
          auditContentReview(this.form).then((data) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.success()
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
>>> .el-dialog__body {
  text-align: center;
  .el-form-item margin: 0;
}
>>> .el-radio-group {
  text-align: left;
}
>>> .el-radio {
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
