<template>
  <el-dialog :title="dialogStatus === 'create' ? '增加品牌' : '修改品牌'" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="brandform" label-width="130px">
    	<el-form-item label="品牌名称" prop="brandName">
		    <el-input v-model.trim="form.brandName" :maxlength="30"></el-input>
		  </el-form-item>
		  <el-form-item label="排序" prop="sortOrder">
		    <el-input type="number" placeholder="1到100之间" v-model.number="form.sortOrder"> </el-input>
		  </el-form-item>
      <el-form-item label="添加图片" prop="pic">
        <el-card v-if="form.pic" style="width:250px;" :body-style="{ padding: '0px' }">
          <img :src="form.pic | setImg" class="image" width="100%">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="form.pic = ''">删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button v-else @click="cropShow = true" type="primary">上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="width"
          :height="height"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
      </el-form-item>      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('brandform')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('brandform')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  props: {
    flag: [String, Number]
  },
  data() {
    return {
    	dialogStatus: '',
      prefix: 'brand',
      width: 300,
      height: 300,
      cropShow: false,
      loading: false,
      dialogFormVisible: false,
      form: {
        brandName: undefined,
        sortOrder: undefined,
        pic: undefined
      },
      rules: {
        pic: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        sortOrder: [
        { required: true, message: '请输入品牌', trigger: 'blur' },
        { validator: this.checkPriority, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
        this.form.brandName = undefined
        this.form.sortOrder = undefined
        this.form.pic = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.resetForm(formName)
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
          this.dialogFormVisible = false
          this.success()
        } else {
          return false
        }
      })
    },
    uploadSuccess(key) {
      this.form.pic = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    checkPriority (rule, value, callback) {
	    if (!value) {
	      return callback(new Error('请输入排列顺序'))
	    }
	    if (!Number.isInteger(value) || value < 0 || value > 100) {
	      callback(new Error('排列顺序需为0-100之间的正整数'))
	    } else {
	      callback();
	    }
	  }
  }
}
</script>

<style scoped>
	.dateInput {
		display: inline-block;
	}
</style>

