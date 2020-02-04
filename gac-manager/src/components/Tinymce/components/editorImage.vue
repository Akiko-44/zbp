<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload"
        action="http://up-z2.qiniup.com/"
        :multiple="multiple"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :data="uploadData"
        :accept="accept"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken, domain } from '@/api/qiniu'
import { guid } from '@/utils'

function loadImage(file, cb) {
  const _URL = window.URL || window.webkitURL
  const img = new Image()
  img.src = _URL.createObjectURL(file)
  img.onload = function() {
    cb && cb(img)
    _URL.revokeObjectURL(img.src)
  }
}

export default {
  name: 'editorSlideUpload',
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
      default: () => {}
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadData: {}
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (arr.length === 0) {
        this.$message('请上传图片')
        return
      }
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }

      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
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
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const fileName = file.uid
      this.listObj[fileName] = {}

      return new Promise((resolve, reject) => {
        getToken().then(uptoken => {
          loadImage(file, img => {
            // 设置上传参数
            _self.uploadData = {
              // {prefix}_{id}_{width}_{height}.{imageType}
              key: `${_self.prefix}_${guid()}_${img.width}_${img.height}.${file.type.split('/')[1]}`,
              token: uptoken,
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
