<template>
<el-dialog title="添加/修改广告" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="广告位名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="时间限制" prop="timelimit">
      <el-radio-group v-model.number="form.timelimit">
        <el-radio :label="1">不限时</el-radio>
        <el-radio :label="2">限定时间内有效</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item v-if="form.timelimit === 2" label="投放时间" prop="endTime">
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

    <el-form-item label="广告位置" prop="location">
      <el-select v-model="form.location" placeholder="请选择广告位置">
        <el-option v-for="item in bannerRule" :key="item.value" :label="item.text" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="图片内容" prop="picUrl">
      <el-card v-if="form.picUrl" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.picUrl | setImg" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.picUrl = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.picUrl"
        :multiple="false"
        :checkFile="checkFile"
        prefix="news"
        @successCBK="uploadSuccess"
      />
    </el-form-item>

    <el-form-item label="图片链接" prop="advertiseUrl">
      <el-input v-model="form.advertiseUrl"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel('form')">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="update('form')">确 定</el-button>
  </div>
</el-dialog>  
</template>

<script>
import { putObj } from '@/api/news/ad'
import ImageUpload from '@/components/Upload'

export default {
  name: 'adAdd',
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
      bannerRule: [
        {
          text: '顶部导航320*320', width: 320, height: 320, value: 1
        },
        {
          text: '中间位置长图330*800', width: 330, height: 800, value: 2
        }
      ],
      form: {
        id: undefined,
        name: '',
        timelimit: 1,
        startTime: undefined,
        endTime: undefined,
        location: 1,
        picUrl: '',
        advertiseUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请输入投放时间', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择广告位置', trigger: 'change' }
        ],
        picUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        advertiseUrl: [
          { required: true, message: '请填写图片链接', trigger: 'blur' }
        ]
      },
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
      }
    }
  },
  watch: {
    dateValue(value) {
      this.form.startTime = value ? value[0] : undefined
      this.form.endTime = value ? value[1] : undefined
    },
    // 更新编辑操作的投放时间
    'form.id'(value) {
      if (this.form.startTime && this.form.endTime) {
        this.dateValue = [this.form.startTime, this.form.endTime]
      }
    }
  },
  methods: {
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.form.id = undefined
          this.loading = true
          putObj(this.form)
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
        this.form.id = undefined
        this.dateValue = ''
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
    uploadSuccess(imgs) {
      this.form.picUrl = imgs[imgs.length - 1]
    },
    checkFile(file, img) {
      const size = this.bannerRule[this.form.location - 1]
      if (img.width !== size.width || img.height !== size.height) {
        return '图片尺寸不对，请重新上传'
      }
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