<template>
<el-dialog
  :title="textMap[dialogStatus]"
  :visible.sync="dialogFormVisible"
>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="ruleForm" style="width: 50%;">
    <el-form-item label="栏目名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="缩略图" prop="thumbnail">
      <el-card v-if="form.thumbnail" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.thumbnail | setImg" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.thumbnail = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.thumbnail"
        :multiple="false"
        :checkFile="checkFile"
        prefix="news"
        @successCBK="uploadSuccess"
      />
    </el-form-item>
    <el-form-item label="排列顺序" prop="priority">
      <el-input type="number" maxlength="2" v-model.number="form.priority"></el-input>
    </el-form-item>
    <el-form-item label="浏览权限" prop="authority">
      <el-select v-model="form.authority" placeholder="请选择浏览权限">
        <el-option label="开放浏览" :value="1"></el-option>
        <el-option label="注册会员" :value="2"></el-option>
        <el-option label="中级会员" :value="3"></el-option>
        <el-option label="高级会员" :value="4"></el-option>
        <el-option label="钻石会员" :value="5"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="跳转地址" prop="skipType">
      <el-radio-group v-model.number="form.skipType">
        <el-radio :label="1">栏目列表</el-radio>
        <el-radio :label="2">外部链接</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.skipType === 2" label="填写链接" prop="skipUrl">
      <el-input v-model="form.skipUrl"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" :loading="loading" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" :loading="loading" @click="update('form')">确 定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
import { addObj, putObj } from '@/api/news/column'
import ImageUpload from '@/components/Upload'

export default {
  name: 'columnAdd',
  components: {
    ImageUpload
  },
  data() {
    return {
      loading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      form: {
        name: '',
        priority: 1,
        authority: '',
        skipType: 1,
        skipUrl: '',
        // 顶级栏目ID
        parentId: 0,
        // 编辑的栏目ID
        id: undefined,
        thumbnail: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        priority: [
          { required: true, message: '请输入排列顺序', trigger: 'blur' }
        ],
        authority: [
          { required: true, message: '请选择浏览权限', trigger: 'change' }
        ],
        thumbnail: [
          { required: true, message: '请上传缩略图', trigger: 'blur' }
        ],
        skipUrl: [
          { required: true, message: '请输入外部链接', trigger: 'blur' }
        ],
        skipType: [
          { required: true, message: '请选择跳转地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.form.id = undefined
          addObj(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.success()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          putObj(this.form).then(() => {
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
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.skipUrl = ''
        this.form.id = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    success() {
      this.loading = false
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    uploadSuccess(imgs) {
      this.form.thumbnail = imgs[imgs.length - 1]
    },
    checkFile(file, img) {
      // const size = this.bannerRule[this.form.location]
      // if (img.width !== size.width || img.height !== size.height) {
      //   return '图片尺寸不对，请重新上传'
      // }
    }
  }
}
</script>


<style scoped>
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
</style>