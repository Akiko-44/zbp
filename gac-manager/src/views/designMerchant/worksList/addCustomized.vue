<template>
  <div>
    <div class="app-container">
      <el-form
        style="padding-right: 200px;margin-bottom: 50px;"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
      >
        <!--商品名称-->
        <el-form-item
          label="商品名称"
          prop="caseName"
        >
          <el-input
            v-model="form.caseName"
            :maxlength="30"
            placeholder=" 请输入商品名称，30字以内"
          ></el-input>
        </el-form-item>

        <!--商品价格-->
        <el-form-item
          label="商品价格"
          prop="price"
        >
          <el-input
            v-model="form.price"
            :maxlength="50"
            placeholder=" 请输入商品价格"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品主图"
          prop="imgUrlList"
        >
          <el-row
            class="row"
            v-if="form.imgUrlList.length"
          >
            <el-col
              class="col"
              :span="6"
              v-for="(picUrl, index) in form.imgUrlList"
              :key="index"
            >
              <el-card
                style="width:250px;"
                :body-style="{ padding: '0px' }"
              >
                <a
                  target="_blank"
                  :href="picUrl | setImg"
                  class="image"
                  :style="getImageStyle(picUrl)"
                ></a>
                <div style="padding: 14px;">
                  <div class="bottom clearfix">
                    <el-button
                      type="text"
                      class="button"
                      @click="form.imgUrlList.splice(index, 1)"
                    >删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div v-if="form.imgUrlList.length < 9">
            <ImageUpload
              :multiple="true"
              prefix="work"
              @successCBK="workUploadSuccess"
            />
            <div>第一张图片默认为主图；<br />图片尺寸：500*500以上；数量：10张以内；格式：jpg、jpeg、png、jif；大小：单张图片不超过2m</div>
          </div>
        </el-form-item>

        <el-form-item label="主图视频">
          <video
            controls="controls"
            v-if="form.videoUrl"
            style="width: 450px; height: 250px;"
            :src="form.videoUrl"
          >
            您的浏览器不支持 html5 video 属性，下载视频查看：
            <el-button
              size="mini"
              type="text"
            >
              <a
                :href="form.videoUrl"
                target="_blank"
              >下载视频</a>
            </el-button>
          </video>
          <el-button
            v-if="form.videoUrl"
            type="text"
            @click="form.videoUrl = ''"
          >删除视频</el-button>
          <template v-if="!form.videoUrl">
            <video-upload @success="videoUploadScccess" />
          </template>
        </el-form-item>

        <el-form-item
          label="商品描述"
          prop="caseInfo"
        >
          <Tinymce
            :height="500"
            ref="editor"
            v-model="form.caseInfo"
          ></Tinymce>
        </el-form-item>

        <!--售后服务-->
        <h4 id="SalesService">售后服务：</h4>
        <el-form-item label="专用发票">
          <el-radio-group v-model="form.isSupportInvoice">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="上架时间"
          style="padding-bottom: 30px;"
        >
          <el-radio-group v-model="form.automatic">
            <el-radio :label="0">审核通过后自动上架</el-radio>
            <el-radio :label="1">审核通过后手动上架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          class="footer_btn"
          style="margin:0 auto;"
        >
          <el-button
            type="primary"
            @click="goBack"
            style="width: 150px;"
          >返回</el-button>
          <el-button
            type="primary"
            @click="preView"
            style="width: 150px;"
          >预览</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="save"
            style="width: 150px;"
          >提交</el-button>
        </el-form-item>

      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <div class="preview-bg">
        <img
          :src="form.imgUrlList[0]"
          class="work-pic"
          alt=""
        >
        <div class="right-box">
          <p class="goodsName">{{form.caseName}}</p>
          <p
            class="price"
            v-if="form.price"
          ><span>￥</span>{{form.price.toFixed(2)}}</p>
        </div>
        <div
          class="work-info"
          v-html="form.caseInfo"
        >
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import { customDetail, saveOrUpdateCustom } from '@/api/designMerchant/works'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    VideoUpload,
    Tinymce
  },
  data() {
    return {
      domain,
      loading: false,
      dialogVisible: false,
      form: {
        id: undefined,
        caseName: undefined,
        isSupportInvoice: 0,
        price: undefined,
        caseInfo: undefined,
        automatic: 0,
        goodsSource: 5,
        imgUrlList: [],
        videoUrl: undefined
      },
      rules: {
        caseName: [{
          required: true,
          message: '请输入商品名称，30字以内',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入正确的商品价格',
          pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,
          trigger: 'blur'
        }],
        caseInfo: [{
          required: true,
          message: '请输入商品描述',
          trigger: 'blur'
        }],
        imgUrlList: [{
          required: true,
          message: '请上传商品图片',
          type: 'array',
          trigger: 'blur'
        }]
      }
    }
  },
  async created() {
    const form = await customDetail().then(data => data.data)
    this.form = Object.assign(this.form, form)
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          saveOrUpdateCustom(this.form).then(data => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
            this.$router.go(-1)
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, {
          w: 500
        }) + ')'
      }
    },
    workUploadSuccess(imgs) {
      imgs.forEach(key => {
        this.form.imgUrlList.push(key)
      })
      if (this.form.imgUrlList.length > 9) {
        this.form.imgUrlList.splice(9, this.form.imgUrlList.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加9张图片，已删除多余图片',
          type: 'warning'
        })
      }
    },
    videoUploadScccess(key) {
      this.form.videoUrl = key
    },
    preView() {
      this.dialogVisible = true
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.footer_btn {
  border-top: 1px soild #e4e4e4;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  bottom: 0px;
  background: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  /deep/ .el-form-item__content {
    margin: 0 auto !important;
  }
}
/deep/ .el-dialog {
  width: 1200px;
}
/deep/ .el-dialog__body {
  padding: 30px 0 0;
}
.preview-bg {
  position: relative;
  width: 1200px;
  min-height: 883px;
  background-image: url("../../../assets/image/customGoods.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #f5f2f5;
  & .work-pic {
    position: absolute;
    top: 6px;
    left: 10px;
    width: 500px;
    height: 496px;
  }
  & .right-box {
    position: absolute;
    right: 7px;
    padding: 0 40px;
    width: 684px;
    height: 495px;
    & .goodsName {
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 25px;
    }
    & .price {
      margin-left: 10px;
      color: #fb746e;
      font-size: 24px;
      font-weight: bold;
      margin-top: 90px;
      & span {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
  & .work-info {
    padding-top: 620px;
    margin-left: 280px;
    width: 900px;
    height: 100%;
    /deep/ & img {
      max-width: 100%;
    }
  }
}
</style>
