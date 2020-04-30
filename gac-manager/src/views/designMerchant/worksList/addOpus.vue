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
        <!--作品名称-->
        <el-form-item
          label="作品名称"
          prop="caseName"
        >
          <el-input
            v-model="form.caseName"
            :maxlength="30"
            placeholder=" 请输入作品名称，30字以内"
          ></el-input>
        </el-form-item>

        <!--作品标签-->
        <el-form-item
          label="作品标签"
          prop="tag"
        >
          <el-input
            v-model="form.tag"
            :maxlength="50"
            placeholder=" 请输入作品标签，每个标签之间用顿号“、”隔开，30字以内；"
          ></el-input>
        </el-form-item>

        <!--所属分类-->
        <el-form-item
          label="所属分类"
          prop="cat"
        >
          <el-select
            v-model="form.primaryCgyId"
            @change="getCategoriesSecond"
            placeholder="请选择一级分类"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.catName"
              :value="String(item.id)"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.secondaryCgyId"
            @change="getCategoriesThird"
            placeholder="请选择二级分类"
          >
            <el-option
              v-for="item in categoriesSecond"
              :key="item.id"
              :label="item.catName"
              :value="String(item.id)"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.thridaryCgyId"
            @change="getThird"
            placeholder="请选择三级分类"
          >
            <el-option
              v-for="item in categoriesThird"
              :key="item.id"
              :label="item.catName"
              :value="String(item.id)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="作品主图"
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
            <div>第一张图片默认为主图；<br />图片尺寸：500*500以上；数量：5张以内；格式：jpg、jpeg、png、jif；大小：单张图片不超过2m</div>
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
          label="作品描述"
          prop="caseInfo"
        >
          <Tinymce
            :height="500"
            ref="editor"
            v-model="form.caseInfo"
          ></Tinymce>
        </el-form-item>

        <el-form-item
          v-if="showAutomatic"
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
            :loading="draftLoading"
            @click="saveDraft(1)"
            style="width: 150px;"
          >保存到草稿箱</el-button>
          <el-button
            type="primary"
            :loading="loading"
            :disabled="notSale"
            @click="saveWork"
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
          <p class="category">
            <template v-if="form.primaryCgyName">{{form.primaryCgyName}}</template>
            <template v-if="form.secondaryCgyName">/ {{form.secondaryCgyName}}</template>
            <template v-if="form.thridaryCgyName">/ {{form.thridaryCgyName}}</template>
          </p>
          <p class="num">
            <span>收藏量 0</span>
            <span>浏览量 0</span>
          </p>
          <div class="designerInfo">
            <img
              :src="designerLogo"
              alt=""
            >
            <div>
              <p>{{designerName}}</p>
              <p>综合评分<span style="margin-left:10px;color:#DF735A;">5.0</span></p>
            </div>
          </div>
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
import { opusDetail, saveOrUpdateOpus } from '@/api/designMerchant/works'
import { categoryList } from '@/api/public/system'
import Cookies from 'js-cookie'
// import { getInfo } from '@/api/designMerchant/designer'
// import { getParamSettings } from '@/api/public/system'

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
      draftLoading: false,
      showAutomatic: false,
      designerLogo: undefined,
      designerName: undefined,
      // 分类
      categories: [],
      categoriesSecond: [],
      categoriesThird: [],
      form: {
        id: undefined,
        caseName: undefined,
        tag: undefined,
        automatic: 0,
        videoUrl: undefined,
        caseInfo: undefined,
        imgUrlList: [],
        catList: [],
        isDraft: 0,
        cat: '',
        primaryCgyId: undefined,
        primaryCgyName: undefined,
        secondaryCgyId: undefined,
        secondaryCgyName: undefined,
        thridaryCgyId: undefined,
        thridaryCgyName: undefined
      },
      rules: {
        caseName: [{
          required: true,
          message: '请输入作品名称，30字以内',
          trigger: 'blur'
        }],
        tag: [{
          required: true,
          message: '请输入作品标签',
          trigger: 'blur'
        }],
        caseInfo: [{
          required: true,
          message: '请输入作品描述',
          trigger: 'blur'
        }],
        imgUrlList: [{
          required: true,
          message: '请上传作品图片',
          type: 'array',
          trigger: 'blur'
        }],
        cat: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }]
      },
      editStatus: true,
      timeout: null,
      // 修改初始化
      editCreate: false,
      dialogVisible: false,
      storeName: '',
      notSale: false
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async created() {
    this.designerLogo = Cookies.get('logo')
    this.designerName = Cookies.get('nickName')
    if (this.$route.query.id) {
      const form = await opusDetail(this.$route.query.id).then(data => data.data)
      this.form = form
      this.form.catList.map((item, i) => {
        if (i === 0) {
          this.form.primaryCgyId = item.catId
          this.form.primaryCgyName = item.catName
        } else if (i === 1) {
          this.form.secondaryCgyId = item.catId
          this.form.secondaryCgyName = item.catName
        } else if (i === 2) {
          this.form.thridaryCgyId = item.catId
          this.form.thridaryCgyName = item.catName
        }
      })
      this.editCreate = true
      this.notSale = this.form.auditState === 5
    } else {
      this.timeout = setInterval(() => {
        if (!this.form.caseName) return
        this.saveDraft(0)
      }, 1000 * 60 * 15)
    }
    this.getCategory()
  },
  beforeDestroy() {
    clearInterval(this.timeout)
    this.timeout = null
  },
  methods: {
    // 获取所有分类
    getCategory() {
      categoryList(0).then(data => {
        this.categories = data.data
        if (this.editCreate) {
          if (this.form.catList.length === 0) {
            return false
          }
          this.getCategoriesSecond(this.form.primaryCgyId)
        }
      }).catch(() => { })
    },
    // 获取二级分类
    getCategoriesSecond(id) {
      categoryList(id).then(data => {
        this.categoriesSecond = data.data
        if (this.editCreate) {
          this.getCategoriesThird(this.form.secondaryCgyId)
        } else {
          this.form.secondaryCgyId = ''
          this.form.thridaryCgyId = ''
          const firstObj = this.categories.find(item => item.id == id)
          this.form.primaryCgyName = firstObj.catName
        }
      }).catch(() => { })
    },
    // 获取三级分类及类目属性
    getCategoriesThird(id) {
      const secondObj = this.categoriesSecond.find(item => item.id == id)
      this.form.secondaryCgyName = secondObj.catName
      categoryList(id).then(data => {
        this.categoriesThird = data.data
        if (this.editCreate) {
          this.getThird(this.form.thridaryCgyId)
        } else {
          debugger
          this.form.thridaryCgyId = ''
        }
      }).catch(() => { })
    },
    getThird(id) {
      const thirdObj = this.categoriesThird.find(item => item.id == id)
      this.form.thridaryCgyName = thirdObj.catName
      this.$forceUpdate()
    },
    preView() {
      this.dialogVisible = true
    },
    saveDraft(isToList) {
      if (!this.form.caseName) {
        this.$notify({
          title: '提示',
          message: '存草稿时，作品名称必填',
          type: 'warning'
        })
        return
      }
      this.form.isDraft = 1
      this.draftLoading = true
      this.save(isToList)
    },
    saveWork() {
      this.form.isDraft = 0
      this.form.cat = (this.form.primaryCgyId && this.form.secondaryCgyId && this.form.thridaryCgyId) ? this.form.primaryCgyId : ''
      if (!this.form.cat) {
        this.$notify({
          title: '提示',
          message: '请选择分类',
          type: 'warning'
        })
        return
      }
      this.form.catList = [{
        catId: this.form.primaryCgyId,
        catName: this.form.primaryCgyName,
        catLevel: 1
      }, {
        catId: this.form.secondaryCgyId,
        catName: this.form.secondaryCgyName,
        catLevel: 2
      }, {
        catId: this.form.thridaryCgyId,
        catName: this.form.thridaryCgyName,
        catLevel: 3
      }]
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.save()
        } else {
          return false
        }
      })
    },
    save(isToList = 1) {
      saveOrUpdateOpus(this.form).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        if (!this.form.isDraft) {
          this.$router.push({
            name: 'opusList'
          })
        } else {
          this.$router.push({
            name: 'opusDraft'
          })
        }
        this.loading = false
        this.draftLoading = false
      }).catch(() => {
        this.loading = false
        this.draftLoading = false
      })
    },
    reset() {
      this.$refs.form.resetFields()
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
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
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

.danger {
  color: #f56c6c;
}

.el-col-6 {
  margin-bottom: 20px;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}

.right-nav {
  position: fixed;
  background: white;
  z-index: 2500;
  // margin-top: 50px;
  padding: 7px;
  width: 100%;
}

.sinput {
  width: 376px;
}

.comm {
  width: 206px;
  padding-right: 5px;
}

.top_btn {
  background: red;
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
.category-attr {
  padding: 30px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.category-attr.sku-box {
  padding: 10px;
  .sku-attr-item {
    display: inline-block;
    margin: 10px 10px 0 0;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    & .custom-item {
      margin-left: 10px;
    }
  }
}
.tip {
  margin: 0;
  line-height: 22px;
  font-size: 12px;
}
.blue {
  color: #409eff;
}
.cur-pointer {
  cursor: pointer;
}
.custom-form-item {
  position: relative;
}
.custom-attr {
  position: absolute;
  left: -102px;
  width: 90px;
  height: 36px;
  text-align: right;
}
/deep/ .el-table th {
  background: #ddd;
}
/deep/ th .el-input {
  padding: 0;
}
/deep/ .el-checkbox-group {
  font-size: 16px;
}
/deep/ .el-dialog {
  width: 1200px;
}
/deep/ .el-dialog__body {
  padding: 30px 0;
}
.preview-bg {
  position: relative;
  width: 1200px;
  min-height: 883px;
  background-image: url("../../../assets/image/opus.png");
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
    & .category {
      height: 24px;
    }
    & .num {
      margin-top: 146px;
      margin-left: 90px;
    }
    & .designerInfo {
      margin-top: 140px;
      & img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: top;
      }
      & > div {
        display: inline-block;
      }
      & p {
        margin: 0 10px;
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
