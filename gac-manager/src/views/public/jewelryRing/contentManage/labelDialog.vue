<template>
  <el-dialog
    title="选择标签"
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
      ref="form"
    >
      <el-form-item
        label="所属标签"
        label-width="80px"
        prop="labelId"
      >
        <el-radio-group v-model="form.labelId">
          <el-radio
            v-for="item in labelList"
            :key="item.id"
            :label="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>
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
  contentLabelList, updateLabel
} from '@/api/public/jewelryRing'

export default {
  props: ['labelId'],
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      title: '',
      authorName: '',
      labelList: [],
      form: {
        id: undefined,
        labelId: undefined
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
          updateLabel(this.form).then((data) => {
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
>>> .el-form {
  margin-top: 20px;
}
>>> .el-dialog__body {
  padding-bottom: 0;
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
