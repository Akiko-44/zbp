<template>
  <el-dialog title="添加/修改广告图" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="权重">
        <el-input v-model.number="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="展会图片" prop="imgUrl">
        <el-card v-if="form.imgUrl" style="width:250px;" :body-style="{ padding: '0px' }">
          <img :src="form.imgUrl | setImg" class="image" width="100%">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="form.imgUrl = ''">删除</el-button>
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
          :prefix="'pic'"
          @crop-upload-success="uploadSuccess"
        />
      </el-form-item>
      <el-form-item label="展示周期" prop="endTime">
        <el-date-picker
          v-model="dateValue"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input v-model="form.url" placeholder="http://xxx.com/xxx"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="showStatus">
        <el-select v-model="form.showStatus" placeholder="状态">
          <el-option
            v-for="(item, index) in showStatus"
            :key="index"
            :value="item.value"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

import {
  putObj
} from '@/api/aggregate/exhibitionBanner'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      cropShow: false,
      width: 1080,
      height: 460,
      showStatus: [
        { name: '待展示', value: 0 },
        { name: '展示中', value: 1 },
        { name: '已过期', value: 2 }
      ],
      dateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      loading: false,
      dialogFormVisible: false,
      form: {
        id: undefined,
        title: undefined,
        grade: undefined,
        startTime: undefined,
        endTime: undefined,
        imgUrl: undefined,
        url: undefined,
        showStatus: undefined
      },
      rules: {
        endTime: [
          { required: true, message: '请选择展示周期', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传展会图片', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入展会链接', trigger: 'blur' }
        ],
        showStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    dateValue(value) {
      this.form.startTime = value ? value[0] : undefined
      this.form.endTime = value ? value[1] : undefined
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
          putObj(this.form).then(() => {
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
    },
    uploadSuccess(key) {
      this.form.imgUrl = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }
  }
}
</script>

