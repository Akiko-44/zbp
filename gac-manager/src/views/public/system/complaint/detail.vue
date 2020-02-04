<template>
  <div class="app-container"
       v-loading="loading"
       style="padding-right: 40px">
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>投诉处理</span>
    </div>
    <el-form label-width="200px"
             :model="form"
             ref="complaintDetailForm"
             class="complaint-detail-form"
             :rules="rules">
      <el-form-item label="投诉人昵称：">
        <span>{{ form.userName }}</span>
      </el-form-item>

      <el-form-item label="投诉人手机号码：">
        <span>{{ form.mobilePhone }}</span>
      </el-form-item>

      <el-form-item label="被投诉品牌名称：">
        <span>{{form.brandName}}</span>
      </el-form-item>

      <el-form-item label="被投诉商家名称：">
        <span>{{form.merchantName}}</span>
      </el-form-item>

      <el-form-item label="被投诉商家手机号码：">
        <span>{{form.merchantPhone}}</span>
      </el-form-item>

      <el-form-item label="被投诉商品名称：">
        <span>{{form.goodName}}</span>
      </el-form-item>

      <!-- <el-form-item label="被投诉商品条形码">
        <span>{{form.orderState}}</span>
      </!-->

      <el-form-item label="投诉标题：">
        <span>{{form.complaintName}}</span>
      </el-form-item>

      <el-form-item label="投诉时间：">
        <span>{{form.complaintDate}}</span>
      </el-form-item>

      <el-form-item label="投诉内容：">
        <span>{{form.complaintContent}}</span>
      </el-form-item>

      <el-form-item label="图片凭证：">
        <el-row class="row"
                v-if="form.imgUrl && form.imgUrl.length">
          <el-col class="col"
                  :span="6"
                  v-for="(picUrl, index) in form.imgUrl"
                  :key="index">
            <el-card style="width:250px;"
                     :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="picUrl | setImg"
                 class="image"
                 :style="getImageStyle(picUrl)"></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <div class="complaint-handle-box">
        <div v-if="form.state === 0">
          <el-form-item label="处理投诉："
                        prop="complaintHandle">
            <el-input type="textarea"
                      :rows="3"
                      placeholder="请输入处理结果，500字以内；"
                      v-model="form.complaintHandle">
            </el-input>
          </el-form-item>
          <el-form-item label="相关凭证">
            <el-row class="row"
                    v-if="handleImgUrl.length">
              <el-col class="col"
                      :span="6"
                      v-for="(picUrl, index) in handleImgUrl"
                      :key="index">
                <el-card style="width:250px;"
                         :body-style="{ padding: '0px' }">
                  <a target="_blank"
                     :href="picUrl | setImg"
                     class="image"
                     :style="getImageStyle(picUrl)"></a>
                  <div style="padding: 14px;">
                    <div class="bottom clearfix">
                      <el-button type="text"
                                 class="button"
                                 @click="handleImgUrl.splice(index, 1)">删除</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <div v-if="handleImgUrl.length < 9">
              <ImageUpload :multiple="true"
                           prefix="complaint"
                           @successCBK="workUploadSuccess" />
              <div>共<span class="danger">{{handleImgUrl.length}}</span>张，还能上传<span class="danger">{{9 - handleImgUrl.length}}</span>张</div>
            </div>
          </el-form-item>
          <el-form-item label="视频介绍">
            <video controls="controls"
                   v-if="form.handleVideoUrl && form.handleVideoUrl.length"
                   style="width: 450px; height: 250px;"
                   :src="form.handleVideoUrl">
              您的浏览器不支持 html5 video 属性，下载视频查看：
              <el-button size="mini"
                         type="text">
                <a :href="form.handleVideoUrl"
                   target="_blank">下载视频</a>
              </el-button>
            </video>
            <el-button v-if="form.handleVideoUrl && form.handleVideoUrl.length"
                       type="text"
                       @click="form.handleVideoUrl = []">删除视频</el-button>
            <template v-else>
              <video-upload @success="videoUploadScccess" />
            </template>
          </el-form-item>

          <div class="auditAction">
            <el-button size="small"
                       class="btn"
                       @click="back">
              返回
            </el-button>
            <el-button type="primary"
                       size="small"
                       class="btn"
                       :loading="saveLoading"
                       @click="save">
              提交
            </el-button>
          </div>
        </div>
        <div v-else>
          <el-form-item label="处理人：">
            <span>{{form.complaintHandlePerson}}</span>
          </el-form-item>

          <el-form-item label="处理时间：">
            <span>{{form.complaintHandleDate}}</span>
          </el-form-item>

          <el-form-item label="处理结果：">
            <span>{{form.complaintHandle}}</span>
          </el-form-item>

          <el-form-item label="相关凭证：">
            <el-row class="row"
                    v-if="form.handleImgUrl && form.handleImgUrl.length">
              <el-col class="col"
                      :span="6"
                      v-for="(picUrl, index) in form.handleImgUrl"
                      :key="index">
                <el-card style="width:250px;"
                         :body-style="{ padding: '0px' }">
                  <a target="_blank"
                     :href="picUrl | setImg"
                     class="image"
                     :style="getImageStyle(picUrl)"></a>
                </el-card>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="">
            <video controls="controls"
                   v-if="form.handleVideoUrl && form.handleVideoUrl.length"
                   style="width: 450px; height: 250px;"
                   :src="form.handleVideoUrl">
              您的浏览器不支持 html5 video 属性，下载视频查看：
              <el-button size="mini"
                         type="text">
                <a :href="form.handleVideoUrl"
                   target="_blank">下载视频</a>
              </el-button>
            </video>
          </el-form-item>

        </div>
      </div>

    </el-form>

  </div>
</template>

<script>
import { complaintDetail, handleComplaint } from '@/api/public/system'
import { setImg } from '@/filters'
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'

export default {
  components: {
    ImageUpload,
    VideoUpload
  },
  data() {
    return {
      id: this.$route.query.id,
      loading: false,
      saveLoading: false,
      form: {},
      handelForm: {},
      handleImgUrl: [],
      rules: {
        complaintHandle: [
          { required: true, message: '请输入处理结果', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getComplaint()
  },
  methods: {
    getComplaint() {
      this.loading = true
      complaintDetail({ id: this.id }).then(data => {
        this.loading = false
        this.form = data.data
      })
    },
    save() {
      this.$refs['complaintDetailForm'].validate((valid) => {
        if (valid) {
          this.saveLoading = true
          this.form.handleImgUrl = this.handleImgUrl
          if (!this.form.complaintHandle) {
            this.$notify({
              title: '提示',
              message: '请输入处理结果，500字以内',
              type: 'warning'
            })
            this.saveLoading = false
            return false
          }
          this.handelForm.id = this.form.id
          this.handelForm.complaintHandle = this.form.complaintHandle
          this.handelForm.handleImgUrl = this.form.handleImgUrl
          this.handelForm.handleVideoUrl = this.form.handleVideoUrl
          handleComplaint(this.handelForm).then(data => {
            this.saveLoading = false
            this.$router.push({
              name: 'complaint'
            })
          }).catch(() => {
            this.saveLoading = false
          })
        } else {
          return false
        }
      })
    },
    workUploadSuccess(imgs) {
      imgs.forEach(key => {
        this.handleImgUrl.push(key)
      })
      if (this.handleImgUrl.length > 9) {
        this.handleImgUrl.splice(9, this.handleImgUrl.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加9张图片，已删除多余图片',
          type: 'warning'
        })
      }
    },
    videoUploadScccess(key) {
      this.form.handleVideoUrl.push(key)
    },
    back() {
      this.$router.go(-1)
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.complaint-detail-form {
  padding-top: 20px;
}
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.danger {
  color: #f56c6c;
}
.el-col-6 {
  margin-bottom: 20px;
}
.complaint-handle-box {
  padding-top: 30px;
  border-top: 1px solid #ccc;
}
.auditAction {
  margin-left: 200px;
}
.btn {
  width: 90px;
}
</style>


