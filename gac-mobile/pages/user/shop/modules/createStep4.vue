<template>
  <div class="form">
    <!--<h4 class="title">第三步  实名认证</h4>-->
    <div
      class="title"
      :class="{'h5class' : inH5}"
    >
      <div class="step active">
        <div class="step-circle">1</div>
        <div class="step-title">基本信息</div>
      </div>
      <div class="step active">
        <div class="step-circle">2</div>
        <div class="step-line"></div>
        <div class="step-title">资质信息</div>
      </div>
      <div class="step active">
        <div class="step-circle">3</div>
        <div class="step-line"></div>
        <div class="step-title">实名信息</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-line"></div>
        <div class="step-title">验证手机号</div>
      </div>
    </div>
    <validator
      v-if="form.linkmanList && form.linkmanList.length"
      :rules="rules"
      :model="form.linkmanList[0]"
      ref="form"
    >
      <van-cell-group>
        <van-field
          v-model="form.linkmanList[0].linkName"
          :label="(registType == 2 || form.registType == 2 || form4.registType == 2) ? '法人姓名' : '姓名' "
          maxlength="20"
          placeholder="请输入真实姓名"
          required
        />
        <van-field
          v-model="form.linkmanList[0].idCard"
          type="text"
          :label="(registType == 2 || form.registType == 2 || form4.registType == 2) ? '法人身份证号' : '身份证号' "
          maxlength="18"
          placeholder="请输入身份证号,目前仅支持中国大陆身份信息"
          required
          @blur="validateidCard"
        />
        <van-cell
          class="van-cell--required"
          :title="(registType == 2 || form.registType == 2 || form4.registType == 2) ? '法人手持身份证照片（人像面）' : '手持身份证照片（人像面）' "
          label="1.5兆（M）以内，格式支持jpg\jpeg\png，尺寸不限"
          title-class="min-width"
        >
          <div class="img-upload">
            <!--<img v-if="form.linkmanList[0].facePhoto" :src="form.linkmanList[0].facePhoto">
					<img v-else src="../../../../assets/images/uploadImg.png">
					<VUpload :width="243" :height="153" @success="uploadfacePhoto" />-->
            <CUpload
              @success="uploadfacePhoto"
              :src="form.linkmanList[0].facePhoto"
            />
          </div>
        </van-cell>
        <van-cell
          class="van-cell--required"
          :title="(registType == 2 || form.registType == 2 || form4.registType == 2) ? '法人手持身份证照片（党徽面）' : '手持身份证照片（党徽面）' "
          label="1.5兆（M）以内，格式支持jpg\jpeg\png，尺寸不限"
          title-class="min-width"
        >
          <div class="img-upload">
            <!--<img v-if="form.linkmanList[0].backPhoto" :src="form.linkmanList[0].backPhoto">
					<img v-else src="../../../../assets/images/uploadImg.png">
					<VUpload :width="243" :height="153" @success="uploadbackPhoto" />-->
            <CUpload
              @success="uploadbackPhoto"
              :src="form.linkmanList[0].backPhoto"
            />
          </div>
        </van-cell>
      </van-cell-group>
    </validator>
    <div class="padding">
      <van-button
        type="primary"
        block
        class="primary-btn block"
        @click="submit"
      >下一步</van-button>
    </div>
  </div>
</template>

<script>
import VUpload from '~/components/common/upload/base'
import CUpload from '~/components/common/upload/custom'
import Validator from '~/components/common/validator'

export default {
  props: {
    merchantType: [String, Number],
    registType: [String, Number],
    form4: {
      Type: Object,
      default: () => {
        return {
          linkmanList: [{
            linkName: '',
            idCard: '',
            facePhoto: '',
            backPhoto: '',
            status: 1
          }]
        }
      }
    }
  },
  data() {
    return {
      form: {
        linkmanList: [{
          linkName: '',
          idCard: '',
          facePhoto: '',
          backPhoto: '',
          status: 1
        }]
      },
      rules: {
        name: [
          { required: true, message: '请输入真实姓名' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', validator: this.validateidCard }
        ],
        facePhoto: [
          { required: true, message: '请上传身份证照片（人像面）' }
        ],
        backPhoto: [
          { required: true, message: '请上传身份证照片（党徽面）' }
        ]
      },
      hasAuth: false,
      inH5: true
    }
  },
  components: {
    CUpload,
    VUpload,
    Validator
  },
  watch: {
    form4: {
      handler(newValue, oldValue) {
        let obj = this.form
        Object.assign(obj, this.form4, newValue)
        Object.assign(this.form, obj)
      },
      deep: true
    }
  },
  activated() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    let form4 = JSON.parse(localStorage.getItem('form'))
    Object.assign(this.form, form4)
  },
  methods: {
    submit() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.$emit('submit', this.form, 4)
      }
    },
    uploadfacePhoto(key) {
      this.form.linkmanList[0].facePhoto = key
    },
    uploadbackPhoto(key) {
      this.form.linkmanList[0].backPhoto = key
    },
    validateidCard(rule, value) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) ? '' : '请输入正确的身份证号'
    }
  }
}
</script>

<style lang="postcss" scoped>
.padding {
  padding: 12px;
}
.padding-right {
  padding-right: 12px;
}
.min-width {
  min-width: 220px;
}
.img-upload {
  width: 100px;
  & img {
    width: 100%;
  }
}
>>> .van-cell-group {
  &:after {
    border-top: none;
  }
}
</style>
