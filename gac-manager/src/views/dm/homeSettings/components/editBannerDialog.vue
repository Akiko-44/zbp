<template>
  <el-dialog title="添加/编辑图片"
             :visible.sync="dialogFormVisible">
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="130px">
      <el-form-item label="banner标题"
                    prop="name"
                    v-if="flag === 11">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="banner类别"
                    v-if="flag === 11"
                    prop="category">
        <el-select class="fl"
                   v-model="form.category"
                   placeholder="请选择banner类别">
          <el-option v-for="item in categoryList"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片"
                    prop="pcUrl">
        <el-card v-if="form.pcUrl"
                 style="width:250px;"
                 :body-style="{ padding: '0px' }">
          <img :src="form.pcUrl | setImg"
               class="image"
               width="100%">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button type="text"
                         class="button"
                         @click="delBaner">删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button v-else
                   @click="cropShow = true"
                   type="primary">上传</el-button>
        <ImageCropper ref="cropper"
                      v-model="cropShow"
                      :noCircle="true"
                      :noSquare="true"
                      :withCredentials="true"
                      imgFormat="jpg"
                      :width="width"
                      :height="height"
                      :prefix="prefix"
                      @crop-upload-success="uploadSuccess" />
      </el-form-item>
      <el-form-item label="链接类型"
                    prop="type"
                    v-if="flag !== 11">
        <el-select v-model="form.type"
                   placeholder="请选择链接类型">
          <el-option v-for="item in hrefTypes"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接地址/ID"
                    prop="bannerUrl">
        <el-input v-model="form.bannerUrl"></el-input>
      </el-form-item>
      <el-form-item label="移动端链接地址"
                    prop="mobileUrl">
        <el-input v-model="form.mobileUrl"></el-input>
      </el-form-item>
      <template v-if="flag === 11">
        <el-form-item label="展示周期"
                      prop="showStartDate">
          <el-form-item prop="showStartDate"
                        class="dateInput">
            <el-date-picker v-model="form.showStartDate"
                            type="date"
                            placeholder="选择开始时间"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item prop="showEndDate"
                        class="dateInput">
            <el-date-picker v-model="form.showEndDate"
                            type="date"
                            placeholder="选择截止时间"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </template>
      <el-form-item label="排序"
                    v-if="flag === 11">
        <el-input type="number"
                  placeholder="1到100之间"
                  v-model.number="form.sortOrder"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary"
                 :loading="loading"
                 @click="update('form')">确 定</el-button>
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
    const hrefTypes = +this.flag === 0
      ? [
        { value: 1, name: '外链' }
        //      { value: 3, name: '设计室' },
        //      { value: 4, name: '设计师' }
      ]
      : [
        { value: 1, name: '外链' }
        //      { value: 2, name: '制造商' }
      ]
    return {
      hrefTypes,
      prefix: 'banner',
      width: 1200,
      height: 400,
      cropShow: false,
      loading: false,
      dialogFormVisible: false,
      form: {
        bannerUrl: undefined,
        mobileUrl: undefined,
        pcUrl: undefined,
        type: undefined,
        flag: this.flag,
        category: undefined,
        showStartDate: undefined,
        showEndDate: undefined
      },
      categoryList: [
        {
          value: 1,
          label: '首页'
        }, {
          value: 2,
          label: '珠宝店'
        }
      ],
      rules: {
        bannerUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
          { pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message: '请输入正确的链接地址' }
        ],
        mobileUrl: [
          { required: true, message: '请输入移动端链接地址', trigger: 'blur' },
          { pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, message: '请输入正确的移动端链接地址' }
        ],
        pcUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择链接类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入banner标题', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择banner类别', trigger: 'blur' }
        ],
        showStartDate: [
          { required: true, message: '请选择展示开始时间', trigger: 'blur' }
        ],
        showEndDate: [
          { required: true, message: '请选择展示结束时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
    /* uploadSuccess({ key }) {
      this.form.pcUrl = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }*/
    uploadSuccess(key) {
      this.form.pcUrl = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    delBaner() {
      // this.form.pcUrl = ''
      this.$delete(this.form, 'pcUrl')
    }
  }
}
</script>

<style scoped>
.dateInput {
  display: inline-block;
}
</style>

