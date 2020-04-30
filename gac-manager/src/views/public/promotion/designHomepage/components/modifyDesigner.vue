<template>
  <el-dialog
    title="编辑作品"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="designerForm"
      label-width="100px"
      class="designerForm"
    >
      <el-form-item
        label="设计师名称"
        prop="merchantName"
      >
        <span class="input">{{ form.merchantName }}</span>
        <el-button
          type="text"
          class="modify-btn"
          @click="openDesignerDialog"
        >修改</el-button>
      </el-form-item>
      <el-form-item
        label="设计师图片"
        prop="merchantPic"
      >
        <el-card
          v-if="form.merchantPic"
          style="width:150px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.merchantPic | setImg"
            class="image"
            width="100%"
          />
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'merchantPic')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="cropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="500"
          :height="500"
          prefix="shop"
          @crop-upload-success="uploadSuccess"
        />
        <div class="tip">尺寸500*500，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>
      <el-form-item
        label="显示排序"
        prop="sortOrder"
      >
        <el-input
          type="number"
          placeholder="请输入数字进行排序，由1开始依次递增，数字越小越靠前"
          v-model.number="form.sortOrder"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="saveDesigner"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'modifyDesigner',
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  data() {
    return {
      dialogTableVisible: false,
      cropShow: false,
      form: {
        id: undefined,
        merchantName: '',
        sortOrder: '',
        merchantPic: '',
        index: 0
      },
      selectedName: {},
      goodsList: [],
      rules: {
        merchantName: [{ required: true, message: '请选择设计师', trigger: 'blur' }],
        merchantPic: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 选择商品弹框
    openDesignerDialog() {
      this.$emit('openDesignerDialog', this.form.index)
    },
    saveDesigner() {
      this.$refs['designerForm'].validate(valid => {
        if (valid) {
          this.dialogTableVisible = false
          this.$emit('saveDesigner', this.form)
        } else {
          return false
        }
      })
    },
    uploadSuccess(key) {
      this.form.merchantPic = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入1-100的整数'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('请输入1-100的整数'))
          } else {
            callback()
          }
        }
      }, 200)
    }
  }
}
</script>

<style scoped>
table img {
  width: 100px;
  height: 100px;
}
.input {
  display: inline-block;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
