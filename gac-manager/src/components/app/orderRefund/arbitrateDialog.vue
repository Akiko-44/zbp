<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item
        label="仲裁意见:"
        prop="opinion"
        v-if="form.auditState == 2"
      >
        <el-input v-model="form.opinion"></el-input>
      </el-form-item>
      <el-form-item
        label="仲裁意见:"
        v-if="form.auditState == 1"
      >
        <el-input v-model="form.opinion"></el-input>
      </el-form-item>
    </el-form>
    <div style="font-weight: 700;padding-left: 27px;">
      <p>上传凭证：</p>
      <el-row
        class="row"
        v-if="form.picUrlList.length"
      >
        <el-col
          class="col"
          :span="6"
          v-for="(picUrl, index) in form.picUrlList"
          :key="index"
        >
          <el-card :body-style="{ padding: '0px' }">
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
                  @click="form.picUrlList.splice(index, 1)"
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
      <p
        class="tip"
        v-if="form.auditState == 1 && form.refundType == 1"
      >同意退款后，退款金额将会原路返回</p>
      <p
        class="tip"
        v-if="form.auditState == 1 && form.refundType == 2"
      >同意退货后,系统会将您的退货地址发送给买家</p>
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
import { auditArbitrate } from '@/api/common/order'
import ImageUpload from '@/components/Upload'
import { setImg } from '@/filters'

export default {
  data() {
    return {
      title: '',
      loading: false,
      dialogFormVisible: false,
      form: {
        opinion: '',
        refundId: '',
        auditState: 0,
        picUrlList: [],
        refundType: ''
      },
      rules: {
        opinion: [
          { required: true, message: '请输入仲裁意见', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    ImageUpload
  },
  watch: {
    dialogFormVisible: function() {
      this.form.picUrlList = []
    },
    'form.picUrlList': function(val) {
      console.log(val)
    }
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
      this.form.picUrlList = []
    },
    // 提交成功
    success() {
      this.loading = false
      this.$emit('success')
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          auditArbitrate(this.form).then(() => {
            this.dialogFormVisible = false
            this.form.picUrlList = []
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
      this.form.opinion = ''
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    workUploadSuccess(imgs) {
      imgs.forEach((key) => {
        this.form.picUrlList.push(key)
      })
      //    if(this.form.picUrlList.length > 9) {
      //      this.form.picUrlList.splice(9, this.form.picUrlList.length)
      //      this.$notify({
      //        title: '提示',
      //        message: '最多只能添加9张图片，已删除多余图片',
      //        type: 'warning'
      //      })
      //    }
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
.danger {
  color: #f56c6c;
}
.el-col-6 {
  margin-bottom: 20px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.tip {
  color: red;
  margin: 10px 0 -30px;
}
</style>
