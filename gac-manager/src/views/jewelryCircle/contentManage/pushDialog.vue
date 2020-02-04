<template>
  <el-dialog
    title="提示"
    width="400px"
    :visible.sync="dialogFormVisible"
  >

    <div style="text-align: center;">确定申请推送该内容给粉丝么？</div>
    <!-- <el-form
      :model="form"
      ref="form"
    >
      <el-form-item prop="applyPushObject">
        <el-radio-group v-model="form.applyPushObject">
          <el-radio :label="1">全平台用户</el-radio>
          <el-radio :label="2">关注了作者的用户</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form> -->
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
  applyPushObject
} from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        id: '',
        applyPushObject: 1
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      // this.resetForm('form')
    },
    // 提交成功
    success() {
      this.loading = false
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    update(formName) {
      applyPushObject(this.form.id, this.form.applyPushObject).then((data) => {
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
      /* const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          applyPushObject(this.form.id, this.form.applyPushObject).then((data) => {
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
      }) */
    }
  }
}
</script>

