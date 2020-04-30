<template>
  <div class="upload-container">
    <el-button
      icon='el-icon-upload'
      size="mini"
      :style="{background:color,borderColor:color}"
      @click=" dialogVisible=true"
      type="primary"
    >上传图片
    </el-button>
    <div class="tips">{{tips}}</div>
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
    >
      <el-upload
        class="editor-slide-upload"
        :action="uploadImg"
        :multiple="multiple"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :data="uploadData"
        :accept="accept"
        :limit="limit"
        :on-exceed="handleExceed"
        ref="uploadImages"
      >
        <el-button
          size="small"
          type="primary"
        >点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit"
      >提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken, domain, uploadUrl, getKey, uploadSectionFile } from '@/api/qiniu'
import { uploadImg, uploadBatchApi } from '@/api/upload'

function loadImage(file, cb) {
  const _URL = window.URL || window.webkitURL
  const img = new Image()
  img.src = _URL.createObjectURL(file)
  img.onload = function () {
    cb && cb(img)
    _URL.revokeObjectURL(img.src)
  }
}

export default {
  name: 'ImageUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: String,
      default: 'pic'
    },
    checkFile: {
      type: Function,
      default: () => { }
    },
    accept: {
      type: String,
      default: 'image/gif, image/jpeg, image/png, image/jpg'
    },
    // 单文件大小限制
    maxSize: {
      type: Number,
      'default': 5
    },
    // 文件个数限制
    limit: {
      type: Number,
      'default': 9
    },
    uploadUrl: {
      type: String,
      default: uploadUrl
    },
    uploadImg: {
      type: String,
      default: uploadImg
    },
    uploadBatchApi: {
      type: Function,
      default: () => { }
    },
    tips: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      param: new FormData(),
      form: {},
      count: 0,
      listObj: {},
      fileList: [],
      uploadData: {}
    }
  },
  methods: {
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = domain + '/' + response.key
          this.listObj[objKeyArr[i]].key = response.key
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleError(err, file, fileList) {
      this.handleRemove(file)
      this.$message({
        message: err,
        showClose: true,
        type: 'error'
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '最多可上传' + this.limit + '张图片',
        showClose: true,
        type: 'error'
      })
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    onSubmit() {
      const _self = this
      let count = 0
      for (let i = 0; i < _self.fileList.length; i++) {
        // _self.param.append('file', _self.fileList[i].raw)
        uploadSectionFile(_self.fileList[i].raw, _self.maxSize).then((res) => {
          count++
          _self.param.append('file', res)
          _self.$refs.uploadImages.submit()
        }).then(() => {
          if (count === _self.fileList.length) {
            uploadBatchApi(_self.param).then(res => {
              _self.$emit('successCBK', res.data.picUrl)
              _self.listObj = {}
              _self.fileList = []
              _self.param.delete('file')
              _self.dialogVisible = false
            }).catch(error => {
              // console.log(error)
            })

          }
        })
      }
    },
    beforeUpload(file) {
      const _self = this
      const fileName = file.uid

      if (!/image\/\w+/.test(file.type)) {
        this.$message.error('请上传图片文件')
        return false
      }

      this.listObj[fileName] = {}

      return new Promise((resolve, reject) => {
        loadImage(file, img => {
          uploadSectionFile(file, _self.maxSize).then(res => {
            if (res.size > _self.maxSize * 1024 * 1024) {
              this.$message.error('图片不能超过' + _self.maxSize + 'M')
              reject()
            }
          })
          if (_self.prefix === 'work' && img.width / img.height !== 1) {
            this.$message.error('图片比例为1：1')
            reject()
          }
          // 设置上传参数
          _self.uploadData = {
            key: getKey(_self.prefix, img.width, img.height, file.type.split('/')[1]),
            fname: file.name
          }
          const message = _self.checkFile(file, img)

          if (typeof message === 'string') {
            this.$message({
              message,
              showClose: true,
              type: 'warning'
            })
            reject()
          } else {
            const result = { hasSuccess: false, uid: fileName, width: img.width, height: img.height }
            _self.listObj[fileName] = result
            resolve(true)
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
