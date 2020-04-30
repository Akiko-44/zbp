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
      class="step-wrap"
    >
      <van-cell-group class="margin">
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
          :label-width="(registType == 2 || form.registType == 2 || form4.registType == 2) ? '106px' : '90px' "
          placeholder="请输入中国大陆的身份证号码"
          required
          @blur="validateidCard"
        />
      </van-cell-group>

      <div class="common-area">
        <div class="upload-area">
          <CUpload
            @success="uploadfacePhoto"
            :src="form.linkmanList[0].facePhoto"
            :maxSize="1.5"
          />
        </div>
        <div class="right-area">
          身份证照片（人像面)
        </div>
      </div>

      <p class="tips">1.5兆（M）以内，格式支持jpg\jpeg\png，尺寸不限</p>
      <div class="common-area">
        <div class="upload-area">
          <CUpload
            @success="uploadbackPhoto"
            :src="form.linkmanList[0].backPhoto"
            :maxSize="1.5"
          />
        </div>
        <div class="right-area">
          身份证照片（党徽面)
        </div>
      </div>
      <p class="tips">1.5兆（M）以内，格式支持jpg\jpeg\png，尺寸不限</p>
      <!-- <van-cell
          class="van-cell--required"
          :title="(registType == 2 || form.registType == 2 || form4.registType == 2) ? '法人手持身份证照片（人像面）' : '手持身份证照片（人像面）' "
          label="1.5兆（M）以内，格式支持jpg\jpeg\png，尺寸不限"
          title-class="min-width"
        >
          <div class="img-upload">
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
            <CUpload
              @success="uploadbackPhoto"
              :src="form.linkmanList[0].backPhoto"
            />
          </div>
        </van-cell> -->
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
.step-wrap {
  padding: 0 10px;
  & >>> .van-cell-group {
    border-radius: 6px;
    overflow: hidden;
  }
  & >>> .van-cell:not(:last-child)::after {
    left: 0;
  }
  & >>> .van-cell {
    padding: 18px 15px;
    font-size: 17px;
  }
  & >>> .van-cell__value {
    font-size: 13px;
  }
  & >>> .van-button.van-button--primary.block,
  & >>> .van-button.primary-btn.block {
    height: 44px;
    line-height: 44px;
    font-size: 15px;
  }

  /* 拍照上传 */
  & .common-area {
    display: flex;
    & .right-area {
      font-size: 15px;
      margin-left: 30px;
      line-height: 84px;
    }
  }
  & .tips {
    font-size: 12px;
    line-height: 18px;
    color: #999;
    margin: 5px 0 20px;
  }
  & .upload-area {
    position: relative;
    width: 84px;
    height: 84px;
    background-color: #ffffff;
    text-align: center;
    & img {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }
    & .top22 {
      top: 22px;
    }
    & .icon {
      position: absolute;
      top: 50%;
      margin-top: -25px;
      left: 50%;
      margin-left: -25px;
      width: 50px;
      height: 50px;
      background-image: url(../../../../assets/images/icon_uploadadd.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    & p {
      color: var(--dark-gray);
      padding-top: 15px;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
.margin {
  margin-bottom: 20px;
}
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
