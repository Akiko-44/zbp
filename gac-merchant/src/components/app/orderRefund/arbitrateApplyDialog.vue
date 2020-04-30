<template>
  <el-dialog
    title="申请仲裁"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item
        label="仲裁原因"
        prop="comments"
      >
        <el-input v-model="form.comments"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <p>上传凭证：</p>
      <el-row
        class="row"
        v-if="form.picList.length"
      >
        <el-col
          class="col"
          :span="6"
          v-for="(picUrl, index) in form.picList"
          :key="index"
        >
          <el-card
            style="width:250px;"
            :body-style="{ padding: '0px' }"
          >
            <a
              target="_blank"
              :href="picUrl | setImg"
              class="image"
              :style="getImageStyle(picUrl)"
            ></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  @click="form.picList.splice(index, 1)"
                >删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <ImageUpload
        :multiple="true"
        @successCBK="workUploadSuccess"
      />
    </div>
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
import { applyArbitrate } from '@/api/common/order'
import ImageUpload from '@/components/Upload'
import { setImg } from '@/filters'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        comments: '',
        refundOrderId: '',
        arbitrationType: 2,
        picList: []
      },
      rules: {
        comments: [
          { required: true, message: '请输入仲裁原因', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    ImageUpload
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        //      this.form.refundId = ''
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
      this.$emit('applySuccess')
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          applyArbitrate(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
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
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    workUploadSuccess(imgs) {
      imgs.forEach((key) => {
        this.form.picList.push(key)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
