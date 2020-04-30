<template>
  <div>
    <div class="page-container">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <!--商品名称-->
        <el-form-item
          label="商品名称："
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
          label="商品价格："
          prop="price"
        >
          <el-input
            v-model.number="form.price"
            :maxlength="50"
            placeholder=" 请输入商品价格"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="作品主图："
          prop="imgUrlList"
        >
          <div v-if="form.imgUrlList && form.imgUrlList.length < 5">
            <ImageUpload
              class="mb-1"
              :multiple="true"
              prefix="work"
              @successCBK="workUploadSuccess"
            />
          </div>
          <div class="line-h-sm text-light-gray font-12">
            共<span class="danger">{{form.imgUrlList.length}}</span>张，还能上传<span class="danger">{{5 - form.imgUrlList.length}}</span>张；第一张图片默认为商品主图；图片尺寸：600*600以上；数量：5张以内；格式：jpg、jpeg、png、gif；大小：单张图片不超过3m
          </div>
          <div
            class="d-flex"
            v-if="form.imgUrlList.length"
          >
            <div
              class="pic-item"
              v-for="(item, index) in form.imgUrlList"
              :key="index"
            >
              <a
                target="_blank"
                :href="item | setImg"
                class="image"
                :style="getImageStyle(item)"
              ></a>
              <i
                class="el-icon-delete pointer"
                @click.stop="form.imgUrlList.splice(index, 1)"
              ></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="主图视频：">
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
          label="商品描述："
          prop="caseInfo"
        >
          <Tinymce
            :height="500"
            ref="editor"
            v-model="form.caseInfo"
          ></Tinymce>
        </el-form-item>

        <!--售后服务-->
        <el-form-item label="专用发票：">
          <el-radio-group v-model="form.isSupportInvoice">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="上架时间："
          style="padding-bottom: 30px;"
        >
          <el-radio-group v-model="form.automatic">
            <el-radio :label="0">审核通过后自动上架</el-radio>
            <el-radio :label="1">审核通过后手动上架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="footer_btn">
          <el-button
            type="primary"
            @click="goBack"
            class="primary-btn-md"
          >返回</el-button>
          <el-button
            type="primary"
            @click="preView"
            class="primary-btn-md"
          >预览</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="save"
            class="primary-btn-md"
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
      if (this.form.imgUrlList.length > 5) {
        this.form.imgUrlList.splice(5, this.form.imgUrlList.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加5张图片，已删除多余图片',
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
  display: flex;
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
  background-image: url('../../../assets/image/customGoods.jpg');
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
// 商品主图
.pic-item {
  position: relative;
  margin-top: 20px;
  margin-right: 20px;
  .image {
    display: block;
    width: 86px;
    height: 86px;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
  }
}
// 输入框
.input-value {
  font-size: 12px;
  color: #333333;
}
/deep/ .el-input {
  width: 640px;
  font-size: 12px;
}
/deep/ .freight-input.el-input {
  width: 200px;
}
/deep/ .short-input .el-input {
  margin-right: 17px;
  width: 200px;
}
/deep/ .category-attr-input.el-input,
/deep/ .category-attr-input .el-input {
  margin-bottom: 10px;
  width: 200px;
}
</style>
