<template>
  <AppView
    class="auth"
    title="实名认证"
  >
    <!--<van-notice-bar :scrollable="false">
      资料已上传，审核中
    </van-notice-bar>-->
    <!-- <div class="padding">
      <describe />
    </div> -->
    <div class="padding">
      <validator
        :rules="rules"
        :model="form"
        ref="form"
      >
        <van-cell-group>
          <p>真实姓名：</p>
          <van-field
            v-model="form.name"
            maxlength="20"
            placeholder="请输入真实姓名，与身份证上一致，20字以内"
          />

          <p>身份证号码：</p>
          <van-field
            v-model="form.idNumber"
            type="text"
            maxlength="18"
            placeholder="请输入身份证号码，与身份证上一致"
            @blur="regidNumber"
          />

          <div class="common-area">
            <div class="upload-area">
              <div class="">
                <img
                  v-if="form.idPicFront"
                  :src="form.idPicFront | setImg(form.idPicFront, { w: 150 })"
                />
                <i
                  class="icon"
                  v-else
                ></i>
              </div>
              <!--<input type="file" class="upload-input" accept="image/*">-->
              <VUpload
                @success="frontUploadSuccess"
                :width="371"
                :height="175"
                :maxSize="1.5"
              />
            </div>
            <div class="right-area">
              身份证照片（人像面)
            </div>
          </div>
          <p class="tips">格式:jpg、png、gif、jpeg单张大小1.5m以内</p>
          <div class="common-area">
            <div class="upload-area">
              <div class="">
                <img
                  v-if="form.idPicBack"
                  :src="form.idPicBack | setImg(form.idPicBack, { w: 150 })"
                />
                <i
                  class="icon"
                  v-else
                ></i>
              </div>
              <!--<input type="file" class="upload-input" accept="image/*">-->
              <VUpload
                @success="backUploadSuccess"
                :width="371"
                :height="175"
                :maxSize="1.5"
              />
            </div>
            <div class="right-area">
              身份证照片（党徽面)
            </div>
          </div>
          <p class="tips">格式:jpg、png、gif、jpeg单张大小1.5m以内</p>
          <!-- <van-cell
            is-link
            title="身份证照片"
            :value="uploaded"
            @click="toAuthUpload"
          /> -->
        </van-cell-group>
      </validator>
      <van-button
        type="primary"
        block
        class="primary-btn block"
        @click="submit"
      >立即认证</van-button>
    </div>
  </AppView>
</template>

<script>
import Describe from '~/components/index/authDescribe'
import Validator from '~/components/common/validator'
import VUpload from '~/components/common/upload/base'
import { setImg } from '~/utils/qiniu'

export default {
  data() {
    return {
      idNumber: '',
      name: '',
      mobile: '',
      form: {
        idNumber: '',
        name: '',
        idPicFront: '',
        idPicBack: ''
      },
      idNumberFlag: true,
      flag: true,
      uploaded: '上传照片',
      rules: {
        name: [
          { required: true, message: '请填写真实姓名' }
        ],
        idNumber: [
          { required: true, message: '请填写身份证号' }
        ]
      },
    }
  },
  components: {
    Validator,
    Describe,
    VUpload
  },
  activated() {
    this.$service('userDetail', { resources: [this.$route.query.id] }).then((result) => {
      // this.form.idNumber = result.data.idNumber
      // this.form.name = result.data.name
      this.uploaded = result.data.id == 0 ? '上传照片' : '已上传照片'
      // this.flag = result.data.id == 0 ? true : false
      this.form = result.data
    })
  },
  methods: {
    setImg,
    frontUploadSuccess(key) {
      this.form.idPicFront = key
    },
    backUploadSuccess(key) {
      this.form.idPicBack = key
    },
    toAuthUpload() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0])) && this.idNumberFlag && this.flag) {
        this.$router.push({ name: 'user-auth-upload', query: { id: this.$route.query.id, idNumber: this.form.idNumber, name: this.form.name } })
      }
      if (!this.flag) {
        this.$toast('已上传照片，无法再次修改')
      }
    },
    regidNumber() {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(this.form.idNumber) === false) {
        this.idNumberFlag = false
        this.$toast('身份证号输入有误')
      } else {
        this.idNumberFlag = true
      }
    },
    submit() {
      if (!this.form.idPicFront) {
        this.$toast('请上传身份证正面照')
        return false
      }
      if (!this.form.idPicBack) {
        this.$toast('请上传身份证反面照')
        return false
      }
      if (this.$refs.form.checkAll(error => this.$toast(error[0])) && this.idNumberFlag) {
        this.$service('userAuth', { data: this.form }).then(() => {
          this.$toast('提交成功')
          this.$router.push({ name: 'user-settings', query: { id: this.$route.query.id } })
        })      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.padding {
  padding: 10px;
}

>>> .van-button.van-button--primary.block,
>>> .van-button.primary-btn.block {
  height: 44px;
  margin-top: 50px;
  line-height: 44px;
  background: #df735a;
  border-color: #df735a;
  border-radius: 4px;
}
>>> .van-cell-group {
  background: transparent;
  & .van-cell.van-field {
    height: 54px;
    line-height: 34px;
    margin: 5px 0 16px;
    border-radius: 5px;
  }
  &:after {
    border-top: none;
  }
}
/* 拍照上传 */
.common-area {
  display: flex;
  & .right-area {
    font-size: 15px;
    margin-left: 30px;
    line-height: 84px;
  }
}
.tips {
  font-size: 14px;
  color: #999;
  margin: 5px 0 20px;
}
.upload-area {
  position: relative;
  width: 84px;
  height: 84px;
  background-color: #ffffff;
  text-align: center;
  & img {
    position: absolute;
    width: 100%;
    left: 0;
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
    background-image: url("./images/icon_uploadadd.png");
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
  &.min {
    width: 85px;
    height: 85px;
    & .icon {
      width: 18px;
      height: 16px;
    }
    & p {
      padding-top: 0;
      font-size: 12px;
    }
  }
}
</style>
