<template>
  <div class="app-container">
    <el-form
      v-if="!success"
      style="padding-right: 200px;"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="140px"
    >
      <el-form-item
        label="店铺名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          :maxlength="30"
          placeholder="请输入店铺名称，20字以内，请勿使用含特殊符号或营销推广意图的店铺名"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="主营类目"
        prop="catList"
      >
        <el-checkbox-group v-model="form.catList">
          <el-checkbox
            v-for="item in categoryList"
            :key="item.id"
            :label="item.id"
            @change="$forceUpdate()"
          >{{item.catName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="店铺logo"
        prop="logo"
      >
        <el-card
          v-if="form.logo"
          style="width:202px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.logo | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.logo = ''"
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
          :width="400"
          :height="400"
          :maxSize="1.5"
          prefix="logo"
          @crop-upload-success="uploadSuccess"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸400*400</div>
      </el-form-item>

      <el-form-item
        label="店铺背景图"
        prop="backgroundImg"
      >
        <el-card
          v-if="form.backgroundImg"
          style="width:407px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.backgroundImg | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.backgroundImg = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="backgroundCropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="backgroundCropper"
          v-model="backgroundCropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="355"
          :height="175"
          :maxSize="1.5"
          prefix="backgroundImg"
          @crop-upload-success="backgroundUploadSuccess"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸355*175</div>
      </el-form-item>

      <el-form-item
        label="店铺介绍"
        prop="merchantExplain"
      >
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.merchantExplain"
          :maxlength="300"
          placeholder="300字以内，内容完整通畅、无特殊符号或者微信、QQ、微博、手机号等联系方式"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="企业名称"
        prop="companyName"
      >
        <el-input
          v-model="form.companyName"
          :maxlength="30"
          placeholder="请输入企业名称，即营业执照上的企业名称，30个字以内，如果名称含有括号，请使用英文的括号( )"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="联系地址:"
        prop="countryId"
      >
        <el-select
          style="width: 220px;"
          placeholder="请选择省份"
          v-model="form.provinceId"
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
          v-model="form.cityId"
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
        <el-select
          style="width: 220px;"
          placeholder="请选择所在区"
          v-model="form.countryId"
          @change="countryChange"
        >
          <el-option
            v-for="item in countryList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="详细地址"
        prop="address"
      >
        <el-input
          v-model="form.address"
          :maxlength="50"
          placeholder="详细地址，具体到小区、街道，与营业地址保持一致"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="门牌号"
        prop="houseNumber"
      >
        <el-input
          v-model="form.houseNumber"
          :maxlength="6"
          placeholder="请输入门牌号，即联系地址的门牌号，6个字以内"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="电子邮箱"
        prop="email"
      >
        <el-input
          v-model="form.email"
          :maxlength="30"
          placeholder="请输入可用的邮箱，用于接收银联商务发送的信息"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="纳税人识别号"
        prop="taxNumber"
      >
        <el-input
          v-model="form.taxNumber"
          :maxlength="30"
          placeholder="请输入纳税人识别号,与营业执照上保持一致；由15/17/18/20位数字及字母组成"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="开户名称"
        prop="realName"
      >
        <el-input
          v-model="form.realName"
          :maxlength="20"
          placeholder="请输入开户人的真实姓名，与实名认证者保持一致"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="'开户账号"
        prop="bankAccount"
      >
        <el-input
          v-model="form.bankAccount"
          :maxlength="20"
          placeholder="即对公账户的银行账号"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="开户银行"
        prop="bankName"
      >
        <el-input
          v-model="form.bankName"
          :maxlength="30"
          placeholder="即对公账户的开户行名称，具体到支行"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="开户银行联行号"
        prop="bankNumber"
      >
        <el-input
          v-model="form.bankNumber"
          :minlength="12"
          :maxlength="12"
          placeholder="请输入正确的开户银行联行号"
        ></el-input>
        <a
          class="link aggrement"
          target="_blank"
          href="https://www.icvio.cn/"
        >（开户银行联行号查询入口）</a>
        <div>可通过查询入口（https://www.icvio.cn）获得开户行联行号；由12位数字组成</div>
      </el-form-item>

      <el-form-item
        label="银行开户证明图片"
        prop="materials"
      >
        <el-card
          v-if="form.materials && form.materials.length"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.materials[0] | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.materials = []"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="form.materials.length == 0"
          :multiple="false"
          prefix="materials"
          @successCBK="materialsUploadSuccess"
          :maxSize="1.5"
        />
        <div>(请上传开户许可证照片或由银行提供的开户证明照片，需加盖本公司公章（可参考如下示例图）。支持jpg、jpeg、png格式，大小1.5兆以内，尺寸不限)
          <p><img
              src="../../../assets/image/bankCertificate.jpg"
              width="200"
            /></p>
        </div>
      </el-form-item>

      <el-form-item
        label="营业执照图片"
        prop="businessLicense"
      >
        <el-card
          v-if="form.businessLicense"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.businessLicense | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.businessLicense = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.businessLicense"
          :multiple="false"
          prefix="businessLicense"
          @successCBK="businessLicenseUploadSuccess"
          :maxSize="1.5"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</div>
      </el-form-item>

      <el-form-item
        label="承诺书上传"
        prop="legalPersonPic"
      >
        <el-card
          v-if="form.legalPersonPic"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.legalPersonPic | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.legalPersonPic = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.legalPersonPic"
          :multiple="false"
          prefix="legalPersonPic"
          @successCBK="legalPersonPicUploadSuccess"
          :maxSize="1.5"
        />
        <div>《银联商务T+N自由划付业务（对公提现业务）承诺书》<a
            class="link aggrement"
            @click="download"
          >下载</a></div>
        <div>填写相关资料并签字盖章，然后以拍照或扫描件的形式上传；</div>
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</div>
      </el-form-item>

      <el-form-item
        label="店铺招牌照片"
        prop="doorPhotos"
      >
        <el-card
          v-if="form.doorPhotos"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.doorPhotos | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.doorPhotos = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.doorPhotos"
          :multiple="false"
          prefix="doorPhotos"
          @successCBK="doorPhotosUploadSuccess"
          :maxSize="1.5"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</div>
      </el-form-item>

      <el-form-item
        label="店铺内部照片"
        prop="idroomPic"
      >
        <el-card
          v-if="form.idroomPic"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.idroomPic | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="form.idroomPic = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.idroomPic"
          :multiple="false"
          prefix="idroomPic"
          @successCBK="idroomPicUploadSuccess"
          :maxSize="1.5"
        />
        <div>1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</div>
      </el-form-item>

      <div class="line"></div>

      <el-form-item
        label="实名认证"
        prop="linkmanList"
      >
        <el-table
          border
          :data="form.linkmanList"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="linkName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="idCard"
            label="身份证号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="身份证照片"
          >
            <template slot-scope="{ row }">
              <span>{{row.facePhoto ? '已上传' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
          >
            <template slot-scope="{ row }">
              <span>{{row.status === 1 ? '已提交' : '已通过'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="{ row }">
              <el-button
                size="small"
                @click="openDialog(row)"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="add-btn"
          v-if="!form.linkmanList.length"
        >
          <el-button
            type="primary"
            size="small"
            @click="openDialog"
          >
            添加
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="手机验证">
        <span>已绑定手机号码：<span class="mobilephone">{{form.mobilePhone}}</span>，该手机号默认是注册的手机号，后期将用于登录商家后台、及提现等重要业务</span>
      </el-form-item>

      <div style="overflow:hidden;">
        <el-col :span="12">
          <el-form-item
            label="图形验证码"
            prop="verifyCode"
          >
            <el-col :span="18">
              <el-input
                :maxlength="6"
                name="code"
                v-model="form.verifyCode"
                autoComplete="on"
                placeholder="验证码"
              />
            </el-col>
            <el-col :span="6">
              <img
                @click="code = getVerifyCode()"
                :src="code.url"
                style="display: block; border-radius: 0 5px 5px 0; height: 47px;"
              />
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="短信验证码"
            prop="dynamicVerifyCode"
          >
            <el-col :span="12">
              <el-input
                :maxlength="6"
                v-model="form.dynamicVerifyCode"
                autoComplete="on"
                placeholder="验证码"
              />
            </el-col>
            <el-col :span="6">
              <el-button
                v-show="sendAuthCode"
                type="primary"
                :loading="codeLoading"
                @click.native.prevent="codeBtn"
                style="margin-left: 10px;"
              >获取验证码</el-button>
              <el-button
                v-show="!sendAuthCode"
                type="primary"
                disabled
              >已发送({{authTime}})</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </div>

      <el-form-item prop="checked">
        <el-checkbox-group v-model="form.checked">
          <el-checkbox :label="true">我已阅读和接受</el-checkbox>
        </el-checkbox-group>
        <span
          class="aggrement"
          @click="openShopAgreement"
        >《中宝协云平台开店协议》</span>和<span
          class="aggrement"
          @click="openThreePartyAgreement"
        >TN自由划付业务合作协议（三方协议）</span>
      </el-form-item>

      <el-form-item>
        <div class="add-btn">
          <el-button
            type="primary"
            class="submit-btn"
            :loading="submitLoading"
            @click="save"
          >
            提交
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <div
      class="waiting-container"
      v-if="success"
    >
      <!-- <img
        src="../../../assets/image/success.png"
        alt=""
      > -->
      <p v-if="!errorMessage">商户入驻资料审核中，请耐心等待</p>
      <p v-if="errorMessage">{{errorMessage}}</p>
      <p v-if="showUpdate">
        <el-button
          class="button"
          @click="modify"
        >修改认证信息</el-button>
      </p>
    </div>

    <authentication-dialog
      ref="authenticationDialog"
      @authentication="authentication"
    ></authentication-dialog>

    <shop-agreement-dialog ref="shopAgreementDialog"></shop-agreement-dialog>
    <three-party-dialog ref="threePartyDialog"></three-party-dialog>
  </div>
</template>

<script>
import { getInfo, checkMerchant, getMerchantInfo, getCode, merchantCertification } from '@/api/makeMerchant/center'
import { getSecondCategoryList, getRegion } from '@/api/public/system'
import { getVerifyCode } from '@/api/admin/login'
import { setImg } from '@/filters'
import ImageCropper from '@/components/ImageCropper'
import ImageUpload from '@/components/Upload'
import authenticationDialog from './authenticationDialog'
import shopAgreementDialog from './shopAgreement'
import threePartyDialog from './threePartyAgreement'
// import Cookies from 'js-cookie'

export default {
  components: {
    ImageCropper,
    ImageUpload,
    authenticationDialog,
    shopAgreementDialog,
    threePartyDialog
  },
  data() {
    return {
      success: false,
      errorMessage: '',
      showUpdate: false,
      checked: false,
      mobilePhone: '',
      submitLoading: false,
      codeLoading: false,
      code: getVerifyCode(),
      sendAuthCode: true,
      authTime: 0,
      form: {
        id: undefined,
        merchantType: 3,
        registType: 2,
        name: '',
        logo: '',
        backgroundImg: '',
        catList: [],
        categoryDTOList: [],
        merchantExplain: '',
        companyName: '',
        provinceId: '',
        provinceName: '',
        cityId: '',
        cityName: '',
        countryId: '',
        countryName: '',
        address: '',
        houseNumber: '',
        email: '',
        taxNumber: '',
        realName: '',
        bankAccount: '',
        bankName: '',
        bankNumber: '',
        businessLicense: '',
        legalPersonPic: '',
        doorPhotos: '',
        idroomPic: '',
        materials: [],
        linkmanList: [],
        // mobilePhone: Cookies.get('mobilePhone'),
        mobilePhone: '',
        msgId: '', // 消息id
        codeUuid: '', // 图形验证码Uuid
        dynamicVerifyCode: '', // 动态验证码
        verifyCode: '', // 验证码
        checked: []
      },
      cropShow: false,
      backgroundCropShow: false,
      doorPhotosCropShow: false,
      idroomPicCropShow: false,
      materialsCropShow: false,
      updateCreate: false,
      categoryList: [],
      provinceList: [],
      cityList: [],
      countryList: [],
      cards: [],
      rules: {
        name: [{
          required: true,
          message: '请输入设计师名称',
          trigger: 'blur'
        }],
        logo: [{
          required: true,
          message: '请上传设计师logo',
          trigger: 'blur'
        }],
        backgroundImg: [{
          required: true,
          message: '请上传设计师背景图',
          trigger: 'blur'
        }],
        catList: [{
          type: 'array',
          required: true,
          message: '请至少选择一个主营类目',
          trigger: 'change'
        }],
        merchantExplain: [{
          required: true,
          message: '请输入设计师简介',
          trigger: 'blur'
        }],
        countryId: [{
          required: true,
          message: '请选择联系地址',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }],
        houseNumber: [{
          required: true,
          message: '请输入门牌号',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }],
        realName: [{
          required: true,
          validator: this.checkRealName,
          message: '请输入开户名称，只支持英文括号',
          trigger: 'blur'
        }],
        bankAccount: [{
          required: true,
          message: '请输入个人银行账号',
          trigger: 'blur'
        }],
        bankName: [{
          required: true,
          message: '请输入开户银行',
          trigger: 'blur'
        }],
        bankNumber: [{
          required: true,
          pattern: /^\d{12}$/,
          message: '请输入正确的开户银行联行号',
          trigger: 'blur'
        }],
        doorPhotos: [{
          required: true,
          message: '请上传店铺招牌照片',
          trigger: 'blur'
        }],
        idroomPic: [{
          required: true,
          message: '请上传店铺内部照片',
          trigger: 'blur'
        }],
        materials: [{
          required: true,
          message: '请上传银行开户证明图片',
          type: 'array',
          trigger: 'blur'
        }],
        linkmanList: [{
          type: 'array',
          required: true,
          message: '请完善实名认证',
          trigger: 'blur'
        }],
        dynamicVerifyCode: [{
          required: true,
          message: '请输入短信验证码',
          trigger: 'blur'
        }],
        verifyCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
        checked: [{
          type: 'array',
          required: true,
          message: '请同意中宝协云平台商家用户注册协议',
          trigger: 'change'
        }],
        companyName: [{
          required: true,
          message: '请输入企业名称',
          trigger: 'blur'
        }],
        taxNumber: [{
          required: true,
          message: '请输入纳税人识别号',
          trigger: 'blur'
        }],
        businessLicense: [{
          required: true,
          message: '请上传营业执照图片',
          trigger: 'blur'
        }],
        legalPersonPic: [{
          required: true,
          message: '请上传承诺书',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    getInfo().then(data => {
      if (data.data.userType === 2) {
        this.success = true
        this.checkMerchant()
      } else {
        this.getMerchantInfo()
        this.getCategoryList()
      }
    })
  },
  methods: {
    getVerifyCode,
    modify() {
      this.success = false
      this.getMerchantInfo()
      this.getCategoryList()
    },
    checkMerchant() {
      checkMerchant().then(data => {
        if (data.data.isHide === 0 && (data.data.isCheck === 2 || data.data.isCheck === 7 || data.data.isCheck === 10)) {
          this.errorMessage = '不通过理由：' + data.data.errorMessage
          this.showUpdate = true
        } else {
          this.errorMessage = data.data.errorMessage
        }
      }).catch(() => { })
    },
    getMerchantInfo() {
      getMerchantInfo().then(data => {
        Object.assign(this.form, data.data)
        this.form.catList = this.form.categoryDTOList.map(item => item.secondCatId)
        if (!Array.isArray(this.form.materials)) {
          this.form.materials = [this.form.materials]
        }
        this.updateCreate = !!this.form.countryId
        this.getProvince()
      }).catch(() => { })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          this.form.codeUuid = this.code.uuid
          this.form.categoryDTOList = []
          this.categoryList.map(item => {
            if (this.form.catList.includes(item.id)) {
              this.form.categoryDTOList.push({
                secondCatId: item.id,
                secondCatName: item.catName
              })
            }
          })
          merchantCertification(this.form).then(data => {
            this.submitLoading = false
            this.success = true
            this.showUpdate = false
            this.errorMessage = ''
          }).catch(() => {
            this.submitLoading = false
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
    codeBtn() {
      const self = this
      self.codeLoading = true
      getCode({ mobilePhone: this.form.mobilePhone }).then(data => {
        self.form.msgId = data.data
        if (data.success) {
          self.sendAuthCode = false
          self.authTime = 2 * 60
          var auth_timetimer = setInterval(() => {
            self.authTime--
            if (self.authTime <= 0) {
              self.sendAuthCode = true
              clearInterval(auth_timetimer)
            }
          }, 1000)
        }
        self.codeLoading = false
      }).catch(() => {
        self.codeLoading = false
      })
    },
    getCategoryList() {
      getSecondCategoryList().then(data => {
        this.categoryList = data.data
      }).catch(() => { })
    },
    getProvince() {
      getRegion(0).then(data => {
        this.provinceList = data.data
        // 防止回显数据被覆盖
        if (!this.updateCreate) {
          this.form.provinceId = this.provinceList[0].regionId
          this.form.provinceName = this.provinceList[0].regionName
        }
        this.getCity(this.form.provinceId)
      }).catch(() => { })
    },
    getCity(id) {
      getRegion(id).then(data => {
        this.cityList = data.data
        this.provinceList.map(item => {
          if (item.regionId === id) {
            this.form.provinceId = item.regionId
            this.form.provinceName = item.regionName
          }
        })
        // 防止回显数据被覆盖
        if (!this.updateCreate) {
          this.form.cityId = this.cityList[0].regionId
          this.form.cityName = this.cityList[0].regionName
        }
        this.cityChange(this.form.cityId)
      }).catch(() => { })
    },
    cityChange(id) {
      getRegion(id).then(data => {
        this.countryList = data.data
        this.cityList.map(item => {
          if (item.regionId === id) {
            this.form.cityId = item.regionId
            this.form.cityName = item.regionName
          }
        })
        // 防止回显数据被覆盖
        if (this.updateCreate) {
          this.updateCreate = !this.updateCreate
        } else {
          this.form.countryId = this.countryList[0].regionId
          this.form.countryName = this.countryList[0].regionName
        }
      }).catch(() => { })
    },
    countryChange(id) {
      this.countryList.map(item => {
        if (item.regionId === id) {
          this.form.countryId = item.regionId
          this.form.countryName = item.regionName
        }
      })
    },
    openShopAgreement() {
      this.$refs.shopAgreementDialog.dialogVisible = true
    },
    openThreePartyAgreement() {
      this.$refs.threePartyDialog.dialogVisible = true
    },
    openDialog() {
      this.$refs.authenticationDialog.dialogTableVisible = true
      if (this.form.linkmanList.length) {
        this.$refs.authenticationDialog.authenticationForm = this.form.linkmanList[0]
      }
    },
    authentication(selected) {
      this.$set(this.form.linkmanList, 0, selected)
    },
    download() {
      location.href = 'http://app.gacjc.com/app/download/help/commitment.docx'
    },
    // 上传图片
    uploadSuccess(key) {
      this.form.logo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    backgroundUploadSuccess(key) {
      this.form.backgroundImg = key
      this.backgroundCropShow = false
      this.$refs.backgroundCropper.setStep(1)
    },
    doorPhotosUploadSuccess(imgs) {
      this.form.doorPhotos = imgs[imgs.length - 1]
    },
    idroomPicUploadSuccess(imgs) {
      this.form.idroomPic = imgs[imgs.length - 1]
    },
    materialsUploadSuccess(imgs) {
      imgs.forEach((key, i) => {
        this.form.materials.push(key)
      })
      if (this.form.materials.length > 5) {
        this.form.materials.splice(5, this.form.materials.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加5张图片，已删除多余图片',
          type: 'warning'
        })
      }
    },
    businessLicenseUploadSuccess(imgs) {
      this.form.businessLicense = imgs[imgs.length - 1]
    },
    legalPersonPicUploadSuccess(imgs) {
      this.form.legalPersonPic = imgs[imgs.length - 1]
    },
    checkRealName(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入开户名称'))
      } else {
        if (value.includes('（') || value.includes('）')) {
          callback(new Error('开户名称只支持英文括号'))
        }
        callback()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-btn {
  margin-top: 10px;
  text-align: center;
  button {
    width: 100px;
  }
  .submit-btn {
    width: 150px;
  }
}
.aggrement {
  color: #409eff;
  cursor: pointer;
}
.el-checkbox-group {
  display: inline-block;
}
.line {
  margin-bottom: 30px;
  height: 1px;
  border-bottom: 1px solid #ccc;
}

.mobilephone {
  font-weight: bold;
}
</style>

