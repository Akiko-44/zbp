<template>

  <el-dialog
    title="编辑文章"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="contentForm"
      label-width="100px"
      class="contentForm"
    >
      <!-- <el-form-item label="商家名称">
        <span class="input">{{form.merchantName}}</span>
      </el-form-item> -->
      <el-form-item
        label="文章名称"
        prop="title"
      >
        <span class="input">{{form.title}}</span>
        <!-- <el-input
          v-model.trim="form.title"
          placeholder="请输入商品名称"
        ></el-input> -->
        <el-button
          type="text"
          class="modify-btn"
          @click="openContentDialog"
        >修改</el-button>
      </el-form-item>
      <el-form-item
        label="缩略图"
        prop="thumbnail"
      >
        <el-card
          v-if="form.thumbnail"
          style="width:150px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.thumbnail | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'thumbnail')"
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
        > </el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="saveContent"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseContent',
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
        name: '',
        sortOrder: '',
        thumbnail: '',
        index: 0
      },
      selectedName: {},
      goodsList: [],
      rules: {
        title: [
          { required: true, message: '请选择文章', trigger: 'blur' }
        ],
        thumbnail: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 选择商品弹框
    openContentDialog() {
      this.$emit('openContentDialog', this.form.index)
    },
    saveContent() {
      this.$refs['contentForm'].validate(valid => {
        if (valid) {
          this.dialogTableVisible = false
          this.$emit('saveContent', this.form)
        } else {
          return false
        }
      })
    },
    uploadSuccess(key) {
      this.form.thumbnail = key
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
