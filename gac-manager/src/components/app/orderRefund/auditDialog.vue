<template>
  <el-dialog title="审核操作" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="审核意见" prop="opinion">
        <el-input v-model="form.opinion"></el-input>
      </el-form-item>
    </el-form>
    <div>
    	<p>上传凭证：</p>
    	<el-row class="row" v-if="form.picUrlList.length">
		    <el-col class="col" :span="6" v-for="(picUrl, index) in form.picUrlList" :key="index">
		      <el-card style="width:250px;" :body-style="{ padding: '0px' }">
		        <a target="_blank" :href="picUrl | setImg" class="image" :style="getImageStyle(picUrl)"></a>
		        <div style="padding: 14px;">
		          <div class="bottom clearfix">
		            <el-button type="text" class="button" @click="form.picUrlList.splice(index, 1)">删除</el-button>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { merchantAuditRefund } from '@/api/common/order'
import ImageUpload from '@/components/Upload'
import { setImg } from '@/filters'

export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        refundId: undefined,
        auditState: undefined,
        opinion: undefined,
        picUrlList: []
      },
      rules: {
        opinion: [
          { required: true, message: '请输入审核意见', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
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
        this.form.refundId = undefined
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
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          merchantAuditRefund(this.form).then(() => {
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
      imgs.forEach(({ key }) => {
        this.form.picUrlList.push(key)
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
.danger {
  color: #F56C6C;
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

</style>
