<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="120px">
    <el-form-item label="ID" v-if="form.id">
      <el-input disabled v-model="form.id"></el-input>
    </el-form-item>

    <el-form-item label="姓名" prop="userName">
      <el-input v-model="form.userName" placeholder="不超过10个字"></el-input>
    </el-form-item>

    <el-form-item label="头像" prop="userLogo">
      <el-row class="row" v-show="form.userLogo">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.userLogo | setImg" class="image" :style="getImageStyle(form.userLogo)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="form.userLogo = ''">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <ImageUpload
        v-show="!form.userLogo"
        :multiple="false"
        prefix="dm-userlogo"
        @successCBK="userLogoUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model.number="form.sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="联系手机" prop="mobile">
      <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
    </el-form-item>

    <el-form-item label="设计年限" prop="ageLimit">
      <el-select v-model="form.ageLimit" placeholder="选择设计年限">
        <el-option
          v-for="value in ageLimitData"
          :key="value"
          :label="value"
          :value="value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="行业资历" prop="experience">
      <el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.experience" placeholder="请输入行业资历，不超过500字"></el-input>
    </el-form-item>

    <el-form-item label="证书与奖励" prop="honor">
      <el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="form.honor" placeholder="请输入证书奖励描述，回车分段，不超过500字"></el-input>
    </el-form-item>

    <el-form-item label="描述图片">
      <el-row class="row" v-show="form.picUrlList.length">
        <el-col class="col" :span="6" v-for="(picUrl, index) in form.picUrlList" :key="index">
          <el-card style="width:250px;" :body-style="{ padding: '0px' }">
            <a target="_blank" :href="picUrl | setImg" class="image" :style="getImageStyle(picUrl)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="form.picUrlList.splice(index, 1)">删除</el-button>
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
        <div>共<span class="danger">{{form.picUrlList.length}}</span>张，还能上传<span class="danger">{{9 - form.picUrlList.length}}</span>张</div>
      </div>
    </el-form-item>

    <el-form-item label="分类" prop="cateFirst">
      <template v-if="!form.id || categoryShow">
        <el-cascader
          style="width: 300px;"
          change-on-select
          :options="categories"
          v-model="selectedCategory"
          @change="handleCategoryChange"
          :props="{value: 'id', label: 'name'}"
        />
      </template>
      <template v-if="form.id && !categoryShow">
        <span>{{form.cateFirst}} - {{form.cateSecond}} - {{form.cateThree}}</span>
        <el-button type="text" @click="categoryShow = true">修改</el-button>
      </template>
    </el-form-item>

    <el-form-item label="设计室商户编号" prop="merchantId">
      <el-autocomplete
        style="width: 300px;"
        popper-class="my-autocomplete"
        v-model="form.merchantId"
        placeholder="请输入系统中的工作室商户编号"
        :trigger-on-focus="false"
        :fetch-suggestions="querySearchAsync"
        @select="handleMerVOSelect"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.merchantName }}</div>
          <span class="addr">{{ item.province }}{{ item.city }}{{ item.address }}</span>
        </template>
      </el-autocomplete>
      <div class="merVoData" v-if="merVO.merchantName">
        <p>{{merVO.merchantName}}</p>
        <p>{{merVO.province }}{{ merVO.city }}{{ merVO.address }}</p>
      </div>
    </el-form-item>
    
    <el-form-item label="本人所在城市" prop="city">
      <template v-if="!form.id || cityShow">
        <v-city
          @change="cityChange"
          ref="city"
        />
      </template>
      <template v-if="form.id && !cityShow">
        <span>{{form.province}} {{form.city}} {{form.area}}</span>
        <el-button type="text" @click="cityShow = true">修改</el-button>
      </template>
    </el-form-item>

    <el-form-item label="视频介绍">
      <video controls="controls" v-if="form.videoUrl" style="width: 450px; height: 250px;" :src="form.videoUrl">
        您的浏览器不支持 html5 video 属性，下载视频查看：
        <el-button
          size="mini"
          type="text"
        >
          <a :href="form.videoUrl" target="_blank">下载视频</a>
        </el-button>
      </video>
      <el-button v-if="form.videoUrl" type="text" @click="form.videoUrl = ''">删除视频</el-button>
      <template v-else>
        <video-upload
          @success="videoUploadScccess"
        />
      </template>
    </el-form-item>

    <el-form-item label="身份证正面照片(国徽页)" prop="idPicFront">
      <el-row class="row" v-show="form.idPicFront">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.idPicFront | setImg" class="image" :style="getImageStyle(form.idPicFront)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="form.idPicFront = ''">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <ImageUpload
        v-show="!form.idPicFront"
        :multiple="false"
        prefix="dm-idcard"
        @successCBK="idPicFrontUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="身份证反面照片(人像页)" prop="idPicBack">
      <el-row class="row" v-show="form.idPicBack">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.idPicBack | setImg" class="image" :style="getImageStyle(form.idPicBack)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="form.idPicBack = ''">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <ImageUpload
        v-show="!form.idPicBack"
        :multiple="false"
        prefix="dm-idcard"
        @successCBK="idPicBackUploadSuccess"
      />
    </el-form-item>

    <!--<el-form-item label="收费标准" prop="chargeStandard">
      <el-input style="width: 250px;" v-model.number="form.chargeStandard" placeholder="请输入收费标准"></el-input> 元/小时
    </el-form-item>-->

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">提交审核</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
/*import ImageUpload from '@/components/Upload/custom'
import BatchImageUpload from '@/components/Upload'*/
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import VCity from '@/components/app/city'
import { category } from '@/utils/mixins/dm'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import { getMerVO, ageLimit, getObj, putObj } from '@/api/dm/designer'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    /*BatchImageUpload,*/
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
        eduKey: 1,
        ageLimit: '',
        experience: '',
        honor: '',
        picUrlList: [],
        merchantId: null,
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
        userName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            max: 11,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        ageLimit: [
          {
            required: true,
            message: '请选择设计年限',
            trigger: 'change'
          }
        ],
        experience: [
          {
            required: true,
            message: '请填写行业资历',
            trigger: 'blur'
          },
          {
            max: 500,
            message: '输入内容请少于500字',
            trigger: 'blur'
          }
        ],
        honor: [
          {
            required: true,
            message: '请填写证书与奖励',
            trigger: 'blur'
          },
          {
            max: 500,
            message: '输入内容请少于500字',
            trigger: 'blur'
          }
        ],
        merchantId: [
          {
            required: true,
            message: '设计室商户编号',
            trigger: 'blur'
          }
        ],
        videoUrl: [
          {
            required: true,
            message: '请上传视频介绍',
            trigger: 'blur'
          }
        ],
        idPicFront: [
          {
            required: true,
            message: '请上传身份证正面',
            trigger: 'blur'
          }
        ],
        idPicBack: [
          {
            required: true,
            message: '请上传身份证反面',
            trigger: 'blur'
          }
        ],
//      chargeStandard: [
//        {
//          required: true,
//          message: '请输入收费标准',
//          trigger: 'blur'
//        }
//      ],
        userLogo: [
          {
            required: true,
            message: '请上传用户头像',
            trigger: 'blur'
          }
        ],
        cateFirst: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'change'
          }
        ],
        area: [
          {
            required: true,
            message: '请选择所在区域',
            trigger: 'change'
          }
        ]
      },
      editStatus: true,
      timeout: null
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async beforeRouteEnter(to, from, next) {
    let form
    if (to.query.id) {
      form = await getObj(to.query.id).then(data => data.data)
    }
    next(vm => {
      setTimeout(() => {
        if (form) {
          vm.form = form
          vm.form.picUrlList = form.picUrlList === '' ? [] : form.picUrlList
          vm.merVO = form.merVO || {}
        }
      }, 10)
    })
  },
  created() {
    this.getCategory()
    ageLimit().then(result => result.data).then(data => {
      this.ageLimitData = data
    })
  },
  methods: {
    async getCategory() {
      const categories = await category.get(0)
      this.categories = categories
    },
    cityChange(cities) {
      //const fields = ['province', 'city', 'area']
      const fields = ['province', 'city']
      fields.forEach((value, index) => {
        this.form[value] = cities[index] && cities[index].regionName
      })
    },
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
              name: 'designList'
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
    reset() {
      this.$refs.form.resetFields()
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    describeUploadSuccess(imgs) {
      /*var _this = this
      imgs.forEach(({ key }) => {
        _this.form.picUrlList.push(key)
      })*/
      imgs.forEach(key => {
        this.form.picUrlList.push(key)
      })
      if(this.form.picUrlList.length > 9) {
        this.form.picUrlList.splice(9, this.form.picUrlList.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加9张图片，已删除多余图片',
          type: 'warning'
        })
      }
    },
    userLogoUploadSuccess(imgs) {
      /*this.form.userLogo = imgs*/
      this.form.userLogo = imgs[imgs.length - 1]
    },
    idPicFrontUploadSuccess(imgs) {
      /*this.form.idPicFront = imgs*/
      this.form.idPicFront = imgs[imgs.length - 1]
    },
    idPicBackUploadSuccess(imgs) {
      /*this.form.idPicBack = imgs*/
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
    },
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        getMerVO(queryString).then(result => result.data).then(data => {
          cb([data])
        })
      }, 100)
    },
    handleMerVOSelect(item) {
      this.form.merchantId = item.merchantId
      this.merVO = item
    },
    handleCategoryChange(data) {
      const fields = ['cateFirst', 'cateSecond', 'cateThree']
      data.forEach((id, index) => {
        this.form[fields[index]] = category.map[id].name
      })
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
	  color: #F56C6C;
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
