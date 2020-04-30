<template>
  <div>
    <!--<el-button
      icon='el-icon-upload'
      size="mini"
      :style="{background:color,borderColor:color, position: 'relative'}"
      type="primary"
    >
      上传视频
      <input class="uploadInput" @change="upload" type="file" accept="video/*">
    </el-button>
    <span>(视频时长建议60秒以内，大小100m以内；仅支持mp4/ogg/webm格式)</span>
    <span v-if="progress > 0">上传进度：{{progress}}%</span>-->
    <el-upload
      class="avatar-uploader el-upload--text"
      :action="uploadImg"
      :show-file-list="false"
      accept="video/mp4, video/avi, video/webm"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess"
      ref="upload"
    >
      <video
        v-if="showVideoPath !='' && !videoFlag"
        :src="showVideoPath"
        class="avatar video-avatar"
        controls="controls"
      >您的浏览器不支持视频播放</video>
      <el-button
        v-else-if="showVideoPath =='' && !videoFlag"
        class="plain-btn-sm"
      >
        上传视频
      </el-button>
      <span class="font-12 text-light-gray ml">{{tips}}</span>

      <el-progress
        v-if="videoFlag == true"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top:30px;"
      ></el-progress>

    </el-upload>
    <el-button
      class="video-btn"
      @click="delVideo"
      size="small"
      v-if="isShowDelVideo"
      type="primary"
    >删除视频</el-button>
    <!--<p v-if="isShowDelVideo" class="text">请保证视频格式正确，且不超过20M</p>-->

  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { getToken, domain } from '@/api/qiniu'
import { guid } from '@/utils'
import { uploadImg, uploadBatchApi } from '@/api/upload'

export default {
  props: {
    tips: {
      type: String,
      default: '仅支持mp4/avi/webm格式'
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    uploadImg: {
      type: String,
      default: uploadImg
    }
  },
  data() {
    return {
      progress: 0,
      showVideoPath: '',
      uploadUrl: '', // 你要上传视频到你后台的地址
      videoFlag: false, // 是否显示进度条
      videoUploadPercent: '', // 进度条的进度，
      isShowDelVideo: false // 显示删除按钮
    }
  },
  methods: {
    // 上传前回调
    beforeUploadVideo(file) {
      // const isLt30M = file.size / 1024 / 1024 < 30
      if (['video/mp4', 'video/avi', 'video/webm'].indexOf(file.type) == -1) { // 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error('请上传正确的视频格式')
        return false
      }
      /* if (!isLt30M) {
        this.$message.error('上传视频大小不能超过30MB哦!')
        return false
      } */
      this.isShowDelVideo = false
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },

    // 上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowDelVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.success) {
        this.showVideoPath = res.data.picUrl
        this.$emit('success', res.data.picUrl)
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    },
    delVideo() {
      this.$refs.upload.clearFiles()
      this.showVideoPath = ''
      this.isShowDelVideo = false
    },
    async upload(event) {
      console.log(0)
      const self = this
      const file = event.target.files[0]
      const token = await getToken()
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
      }
      const putExtra = {
        fname: '',
        params: {},
        mimeType: null
      }
      const key = 'designer-video/' + guid()
      const next = (response) => {
        self.progress = parseInt(response.total.percent)
      }
      const error = err => {
        console.log(err)
        self.$message({
          message: '视频上传出错，请重试',
          type: 'error',
          duration: 5 * 1000
        })
        self.progress = 0
      }
      const complete = res => {
        this.$emit('success', domain + '/' + res.key)
      }
      const observable = qiniu.upload(file, key, token, putExtra, config)
      observable.subscribe(next, error, complete)
      event.target.value = ''
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.video-avatar {
  width: 400px;
  height: 200px;
}
.uploadInput {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>


