
<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
    >

      <el-form-item label="ID">
        <!-- <el-input disabled
                  v-model="form.id"></el-input> -->
        <span>{{form.id}}</span>
      </el-form-item>

      <el-form-item label="姓名">
        <!-- <el-input v-model="form.userName"
                  placeholder="不超过10个字"></el-input> -->
        <span>{{form.userName}}</span>
      </el-form-item>

      <el-form-item label="头像">
        <!-- <a class="image"
           style="width: 200px; background-image: url('https://imgsa.baidu.com/forum/w%3D580%3B/sign=922bfcf78818367aad897fd51e4889d4/503d269759ee3d6d7781b6154d166d224e4adeac.jpg')"
           href="https://imgsa.baidu.com/forum/w%3D580%3B/sign=922bfcf78818367aad897fd51e4889d4/503d269759ee3d6d7781b6154d166d224e4adeac.jpg"
           alt=""></a> -->
        <el-row
          class="row"
          v-if="form.userLogo"
        >
          <el-col
            class="col"
            :span="6"
          >
            <el-card :body-style="{ padding: '0px' }">
              <a
                target="_blank"
                :href="form.userLogo | setImg"
                class="image"
                :style="getImageStyle(form.userLogo)"
              ></a>
            </el-card>
          </el-col>
        </el-row>
        <!-- <el-row class="row"
                v-show="form.userLogo">
          <el-col class="col"
                  :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="form.userLogo | setImg"
                 class="image"
                 :style="getImageStyle(form.userLogo)"></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text"
                             class="button"
                             @click="form.userLogo = ''">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <ImageUpload v-show="!form.userLogo"
                     :multiple="false"
                     prefix="dm-userlogo"
                     @successCBK="userLogoUploadSuccess" /> -->
      </el-form-item>

      <el-form-item label="设计年限">
        <el-select
          v-model="form.ageLimit"
          placeholder="选择设计年限"
        >
          <el-option
            v-for="value in ageLimitData"
            :key="value"
            :label="value"
            :value="value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="行业资历"
        prop="experience"
      >
        <el-input
          :autosize="{ minRows: 3, maxRows: 5}"
          type="textarea"
          v-model="form.experience"
          placeholder="请输入行业资历，不超过500字"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="获奖证书"
        prop="honor"
      >
        <el-input
          :autosize="{ minRows: 3, maxRows: 5}"
          type="textarea"
          v-model="form.honor"
          placeholder="请输入获奖证书，回车分段，不超过500字"
        ></el-input>
      </el-form-item>

      <el-form-item label="描述图片">
        <el-row
          class="row"
          v-show="form.picUrlList.length"
        >
          <el-col
            class="col"
            :span="6"
            v-for="(picUrl, index) in form.picUrlList"
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
                    @click="form.picUrlList.splice(index, 1)"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div v-show="form.picUrlList.length < 9">
          <!--<BatchImageUpload
          :multiple="true"
          prefix="dm-describe"
          @successCBK="describeUploadSuccess"
        />-->
          <ImageUpload
            :multiple="true"
            prefix="dm-describe"
            @successCBK="describeUploadSuccess"
          />
          <div>共<span class="danger">{{form.picUrlList.length}}</span>张，还能上传<span class="danger">{{9 - form.picUrlList.length}}</span>张，格式：jpg、jpeg、png、gif；大小：单张图片不超过5m</div>
        </div>
      </el-form-item>

      <!-- <el-form-item label="分类"
                    prop="cateFirst">
        <template v-if="!form.id || categoryShow">
          <el-cascader change-on-select
                       :options="categories"
                       v-model="selectedCategory"
                       @change="handleCategoryChange"
                       :props="{value: 'id', label: 'name'}" />
        </template>
        <template v-if="form.id && !categoryShow">
          <span>{{form.cateFirst}} - {{form.cateSecond}} - {{form.cateThree}}</span>
          <el-button type="text"
                     @click="categoryShow = true">修改</el-button>
        </template>
      </el-form-item>

      <el-form-item label="本人所在城市"
                    prop="city">
        <template v-if="!form.id || cityShow">
          <v-city @change="cityChange"
                  ref="city" />
        </template>
        <template v-if="form.id && !cityShow">
          <span>{{form.province}} {{form.city}} {{form.area}}</span>
          <el-button type="text"
                     @click="cityShow = true">修改</el-button>
        </template>
      </el-form-item> -->

      <!-- <el-form-item label="视频介绍">
        <video controls="controls"
               v-if="form.videoUrl"
               style="width: 450px; height: 250px;"
               :src="form.videoUrl">
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button size="mini"
                     type="text">
            <a :href="form.videoUrl"
               target="_blank">下载视频</a>
          </el-button>
        </video>
        <el-button v-if="form.videoUrl"
                   type="text"
                   @click="form.videoUrl = ''">删除视频</el-button>
        <template v-else>
          <video-upload @success="videoUploadScccess" />
        </template>
      </el-form-item>

      <el-form-item label="身份证正面照片(国徽页)"
                    prop="idPicFront">
        <el-row class="row"
                v-show="form.idPicFront">
          <el-col class="col"
                  :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="form.idPicFront | setImg"
                 class="image"
                 :style="getImageStyle(form.idPicFront)"></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text"
                             class="button"
                             @click="form.idPicFront = ''">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <ImageUpload v-show="!form.idPicFront"
                     :multiple="false"
                     prefix="dm-idcard"
                     @successCBK="idPicFrontUploadSuccess" />
      </el-form-item>

      <el-form-item label="身份证反面照片(人像页)"
                    prop="idPicBack">
        <el-row class="row"
                v-show="form.idPicBack">
          <el-col class="col"
                  :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="form.idPicBack | setImg"
                 class="image"
                 :style="getImageStyle(form.idPicBack)"></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text"
                             class="button"
                             @click="form.idPicBack = ''">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <ImageUpload v-show="!form.idPicBack"
                     :multiple="false"
                     prefix="dm-idcard"
                     @successCBK="idPicBackUploadSuccess" />
      </el-form-item> -->

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="save"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
/* import ImageUpload from '@/components/Upload/custom'
import BatchImageUpload from '@/components/Upload'*/
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import VCity from '@/components/app/city'
import { category } from '@/utils/mixins/dm'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import { ageLimit, getObj, putObj } from '@/api/designMerchant/designer'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    /* BatchImageUpload,*/
    VideoUpload,
    VCity
  },
  data() {
    return {
      domain,
      cityShow: false,
      categoryShow: false,
      categories: [],
      selectedCategory: [],
      selectedCity: [],
      merVO: {},
      ageLimitData: [],
      citiesData: [],
      loading: false,
      form: {
        id: undefined,
        userName: '',
        cateFirst: undefined,
        cateSecond: undefined,
        cateThree: undefined,
        sex: null,
        mobile: null,
        ageLimit: '',
        experience: '',
        eduKey: 1,
        honor: '',
        picUrlList: [],
        videoUrl: '',
        idPicFront: '',
        idPicBack: '',
        chargeStandard: 1,
        userLogo: '',
        province: undefined,
        city: undefined,
        area: undefined
      },
      rules: {
        experience: [
          {
            max: 500,
            message: '输入内容请少于500字',
            trigger: 'blur'
          }
        ],
        honor: [
          {
            max: 500,
            message: '输入内容请少于500字',
            trigger: 'blur'
          }
        ]
      },
      editStatus: true,
      timeout: null
    }
  },
  // beforeRouteLeave(to, from, next) {
  // this.onbeforeunloadHandler(next)
  // },
  // async beforeRouteEnter(to, from, next) {
  // const form = await getObj().then(data => data.data)
  // next(vm => {
  //   setTimeout(() => {
  //     if (form) {
  //       vm.form = form
  //       vm.form.picUrlList = form.picUrlList === '' ? [] : form.picUrlList
  //       vm.merVO = form.merVO || {}
  //     }
  //   }, 10)
  // })
  // },
  created() {
    // this.getCategory()
    getObj().then(data => {
      this.form = data.data
    })
    ageLimit().then(result => result.data).then(data => {
      this.ageLimitData = data
    })
  },
  methods: {
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'designerList'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    },
    // async getCategory() {
    //   const categories = await category.get(0)
    //   this.categories = categories
    // },
    reset() {
      this.$refs.form.resetFields()
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    describeUploadSuccess(imgs) {
      /* imgs.forEach(({ key }) => {
        this.form.picUrlList.push(key)
      })*/
      imgs.forEach(key => {
        this.form.picUrlList.push(key)
      })
      if (this.form.picUrlList.length > 9) {
        this.form.picUrlList.splice(9, this.form.picUrlList.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加9张图片，已删除多余图片',
          type: 'warning'
        })
      }
    },
    userLogoUploadSuccess(imgs) {
      /* this.form.userLogo = imgs*/
      this.form.userLogo = imgs[imgs.length - 1]
    },
    idPicFrontUploadSuccess(imgs) {
      /* this.form.idPicFront = imgs*/
      this.form.idPicFront = imgs[imgs.length - 1]
    },
    idPicBackUploadSuccess(imgs) {
      /* this.form.idPicBack = imgs*/
      this.form.idPicBack = imgs[imgs.length - 1]
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
.merVoData {
  padding-top: 10px;
  line-height: 22px;
  p {
    margin: 0;
    color: #606266;
  }
}
</style>
