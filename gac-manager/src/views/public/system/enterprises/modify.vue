<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="enterprisesForm"
      :rules="rules"
      ref="enterprisesForm"
      label-width="120px"
    >
      <el-form-item
        label="是否已入驻平台:"
        prop="resource"
      >
        <el-radio-group v-model="enterprisesForm.resource">
          <el-radio
            :label="1"
            :checked="checked"
            @change="checked=!checked"
          >是</el-radio>
          <el-radio
            :label="0"
            :checked="checked"
            @change="checked=!checked"
          >否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="merchant-name-box">
        <el-form-item
          label="企业名称:"
          prop="companyName"
        >
          <el-input
            style="width: 220px;"
            v-model="enterprisesForm.companyName"
          > </el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="btn select-btn"
          v-if="enterprisesForm.resource"
          @click="openDialog"
        >选择</el-button>
      </div>

      <el-form-item
        label="企业logo:"
        prop="logo"
      >
        <el-card
          v-if="enterprisesForm.logo"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="enterprisesForm.logo | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="enterprisesForm.logo = ''"
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
          :width="width"
          :height="height"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
        <div>支持jpg、jpeg、png、gif，2m以内，尺寸400*400</div>
      </el-form-item>

      <el-form-item
        label="主营类目:"
        prop="cityId"
      >
        <el-checkbox-group v-model="enterprisesForm.catList">
          <el-checkbox
            v-for="item in categoryList"
            :key="item.id"
            :label="item.id"
            @change="$forceUpdate()"
          >{{item.catName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="所在城市:"
        prop="provinceId"
      >
        <el-select
          style="width: 220px;"
          placeholder="请选择省份"
          v-model="enterprisesForm.provinceId"
          @change="getCity"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId"
          >
          </el-option>
        </el-select>
        <el-select
          style="width: 220px;"
          placeholder="请选择城市"
          v-model="enterprisesForm.cityId"
          @change="cityChange"
        >
          <el-option
            v-for="item in cityList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="企业类型:"
        prop="companyType"
      >
        <el-select
          style="width: 220px;"
          v-model="enterprisesForm.companyType"
          placeholder="请选择企业类型"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="外部链接:"
        prop="externalLink"
        v-if="!enterprisesForm.resource"
      >
        <el-input
          style="width: 220px;margin-right: 10px;"
          placeholder="请输入外部链接"
          v-model="enterprisesForm.externalLink"
          :disabled="enterprisesForm.checked"
        > </el-input>
        <el-checkbox
          v-model="enterprisesForm.checked"
          @change="$forceUpdate()"
        >无外部链接</el-checkbox>
      </el-form-item>

      <el-form-item
        label="排序:"
        prop="sortOrder"
      >
        <el-input
          style="width: 220px;"
          placeholder="请输入数字，1表示排在第1位"
          v-model.number="enterprisesForm.sortOrder"
        > </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="back">返回</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="save"
        >保存</el-button>
      </el-form-item>
    </el-form>

    <enterprise-dialog
      ref="enterpriseDialog"
      @selectEnterprise="selectEnterprise"
    ></enterprise-dialog>
  </div>
</template>

<script>
import { saveCompanyDirectory, getSecondCategoryList, getRegion } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令
import ImageCropper from '@/components/ImageCropper'
import enterpriseDialog from './chooseEnterprise'
// import { setImg } from '@/filters'

export default {
  name: 'enterprisesModify',
  directives: {
    waves
  },
  components: {
    ImageCropper,
    enterpriseDialog
  },
  data() {
    return {
      checked: true,
      loading: false,
      enterprisesForm: {
        id: undefined,
        companyName: '',
        logo: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        merchantId: '',
        companyType: 1,
        externalLink: '',
        sortOrder: '',
        resource: 1,
        checked: false,
        catList: [],
        categoryList: []
      },
      // 修改初始化状态
      updateCreate: false,
      // logo
      cropShow: false,
      width: 400,
      height: 400,
      prefix: 'logo',
      provinceList: [],
      cityList: [],
      categoryList: [],
      typeList: [
        {
          value: 1,
          label: '专委会主任企业'
        }, {
          value: 2,
          label: '专委会副主任企业'
        }, {
          value: 3,
          label: '专委会成员'
        }, {
          value: 4,
          label: '中宝协会员'
        }, {
          value: 5,
          label: '其它成员'
        }
      ],
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传企业logo', trigger: 'blur' }
        ],
        cityId: [
          { required: true, message: '请选择所在城市', trigger: 'change' }
        ],
        catList: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个主营类目',
            trigger: 'change' }
        ],
        externalLink: [
          { validator: this.validateUrl, trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCategoryList()
    this.getProvince()
    if (this.$route.query.data) {
      this.enterprisesForm = JSON.parse(this.$route.query.data)
      this.enterprisesForm.resource = this.enterprisesForm.merchantId ? 1 : 0
      this.enterprisesForm.checked = !this.enterprisesForm.externalLink
      this.enterprisesForm.catList = this.enterprisesForm.categoryList.map(item => item.secondCatId)
      this.updateCreate = true
    }
  },
  methods: {
    getProvince() {
      getRegion(0).then(data => {
        this.provinceList = data.data
        // 防止回显数据被覆盖
        if (!this.updateCreate) {
          this.enterprisesForm.provinceId = this.provinceList[0].regionId
          this.enterprisesForm.provinceName = this.provinceList[0].regionName
        }
        this.getCity(this.enterprisesForm.provinceId)
      }).catch(() => { })
    },
    getCity(id) {
      getRegion(id).then(data => {
        this.cityList = data.data
        this.provinceList.map(item => {
          if (item.regionId === id) {
            this.enterprisesForm.provinceId = item.regionId
            this.enterprisesForm.provinceName = item.regionName
          }
        })
        // 防止回显数据被覆盖
        if (this.updateCreate) {
          this.updateCreate = !this.updateCreate
        } else {
          this.enterprisesForm.cityId = this.cityList[0].regionId
          this.enterprisesForm.cityName = this.cityList[0].regionName
        }
      }).catch(() => { })
    },
    cityChange(id) {
      this.cityList.map(item => {
        if (item.regionId === id) {
          this.enterprisesForm.cityId = item.regionId
          this.enterprisesForm.cityName = item.regionName
        }
      })
    },
    getCategoryList() {
      getSecondCategoryList().then(data => {
        this.categoryList = data.data
      }).catch(() => { })
    },
    add() {
      if (!this.enterprisesForm.resource) {
        this.enterprisesForm.merchantId = ''
      }
      this.enterprisesForm.categoryList = []
      this.categoryList.map(item => {
        if (this.enterprisesForm.catList.includes(item.id)) {
          this.enterprisesForm.categoryList.push({
            secondCatId: item.id,
            secondCatName: item.catName
          })
        }
      })
      saveCompanyDirectory(this.enterprisesForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'enterprises'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.enterprisesForm.validate(valid => {
        if (valid) {
          if (!this.enterprisesForm.resource && !this.enterprisesForm.checked && !this.enterprisesForm.externalLink) {
            this.$notify({
              title: '警告',
              message: '请输入外部链接',
              type: 'warning'
            })
            return false
          }
          if (this.enterprisesForm.checked) {
            this.enterprisesForm.externalLink = ''
          }
          this.loading = true
          this.add()
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
    // 上传图片
    uploadSuccess(key) {
      this.enterprisesForm.logo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    // 选择企业
    openDialog() {
      this.$refs.enterpriseDialog.dialogTableVisible = true
      this.$refs.enterpriseDialog.listParams.companyName = this.enterprisesForm.companyName
      this.$refs.enterpriseDialog.getList()
    },
    selectEnterprise(selectedName) {
      this.enterprisesForm.merchantId = selectedName.id
      this.enterprisesForm.companyName = selectedName.companyName
      this.enterprisesForm.logo = selectedName.logo
      this.enterprisesForm.catList = selectedName.categoryList.map(item => item.secondCatId)
      this.enterprisesForm.companyName = selectedName.companyName
      this.enterprisesForm.provinceId = selectedName.provinceId
      this.enterprisesForm.provinceName = selectedName.provinceName
      this.enterprisesForm.cityId = selectedName.cityId
      this.enterprisesForm.cityName = selectedName.cityName
      if (!this.enterprisesForm.provinceId) { return }
      getRegion(this.enterprisesForm.provinceId).then(data => {
        this.cityList = data.data
      }).catch(() => { })
    },
    reset() {
      this.$refs.enterprisesForm.resetFields()
    },
    back() {
      this.$router.go(-1)
    },
    validateUrl(rule, value, callback) {
      const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
      if (value && !reg.test(value)) {
        callback(new Error('请输入合法链接，如：http://admin.gacjc.com'))
      } else {
        callback()
      }
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('请输入数字，1表示排在第1位'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入大于1的整数'))
        } else {
          /* if (value < 1 || value > 100) {
            callback(new Error('请输入1-100的整数'))
          } */
          if (value < 1) {
            callback(new Error('请输入大于1的整数'))
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
.filter-container {
  position: relative;
}
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.select-btn {
  position: absolute;
  left: 360px;
  top: 0;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.merchant-name-box {
  position: relative;
}
.tip {
  margin-left: 20px;
  font-size: 12px;
}
table img {
  width: 100px;
  height: 100px;
}
</style>
