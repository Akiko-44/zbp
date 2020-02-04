<template>
  <AppView
    class="shop"
    :title="title"
    :clickLeft="clickLeft"
  >
    <div
      class="type"
      v-if="!success && loadData"
    >
      <validator
        :rules="rules"
        :model="form"
        ref="form"
      >
        <van-cell-group class="margin">
          <van-field
            class="van-cell--required"
            v-model="form.name"
            label="店铺名称"
            placeholder="请输入店铺名称，30字以内"
            maxlength="30"
            rows="1"
            autosize
          />
          <van-cell
            class="van-cell--required"
            title="店铺类型"
            is-link
            :value="form.type"
            @click="typePickerShow = true"
          />
          <van-cell
            class="van-cell--required"
            title="店铺LOGO"
            label="尺寸500*500，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式"
            title-class="min-width"
          >
            <div class="img-upload">
              <img
                v-if="form.logo"
                :src="form.logo | setImg({ w: 150 })"
              >
              <img
                v-else
                src="../../../assets/images/uploadImg.png"
              >
              <VUpload
                :width="400"
                :height="400"
                @success="uploadSuccessLogo"
              />
            </div>
          </van-cell>
          <van-cell
            class="van-cell--required"
            title="店铺背景图"
            label="尺寸710*350，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式"
            title-class="min-width"
          >
            <div class="img-upload">
              <img
                v-if="form.backgroundImg"
                :src="form.backgroundImg | setImg({ w: 150 })"
              >
              <img
                v-else
                src="../../../assets/images/uploadImg.png"
              >
              <VUpload
                :width="355"
                :height="175"
                @success="uploadSuccessBg"
              />
            </div>
          </van-cell>
          <van-field
            v-model="form.companyName"
            label="企业名称"
            placeholder="30字以内，与营业执照上保持一致"
            rows="3"
            autosize
          />
        </van-cell-group>
      </validator>
      <van-popup
        v-model="typePickerShow"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @cancel="typeCancel"
          @confirm="typeConfirm"
        />
      </van-popup>
      <van-button
        type="primary"
        block
        class="primary-btn submit-btn block"
        @click="submit"
      >提交</van-button>
    </div>
    <div
      class="success-container"
      v-if="success  && loadData"
    >
      <img
        src="../../../assets/images/submitSuccess.png"
        width="200"
      />
      <div class="info">
        <p>恭喜您成功开通店铺！</p>
        <p>复制下方链接，在电脑端登录商家后台发布商品吧</p>
      </div>
      <p
        class="link"
        v-if="form.merchantType === 1"
      >http://admin.gacjc.com/usrManager/jewelry/</p>
      <p
        class="link"
        v-if="form.merchantType === 2"
      >http://admin.gacjc.com/designMerchant.html</p>
      <p
        class="link"
        v-if="form.merchantType === 3"
      >http://admin.gacjc.com/makeMerchant.html </p>
      <div class="fix-bottom"><span class="red">*</span>温馨提示：完成<span
          class="link blue"
          @click="linkTo"
        >企业认证</span>可以提升店铺信任噢</div>
    </div>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload/base'
import Validator from '~/components/common/validator'
export default {
  head() {
    return {
      title: this.title
    }
  },
  components: {
    VUpload,
    Validator
  },
  data() {
    return {
      // merchantType: '',
      // errorMessage: '',
      // hasMerchantType: false,
      // failPassed: false,
      // loadData: false,
      success: false,
      loadData: false,
      title: '我要开店',
      // chooseShow: false,
      typePickerShow: false,
      typeColumns: ['珠宝店', '设计师', '制造间'],
      form: {
        name: '',
        merchantType: 1,
        companyName: '',
        logo: '',
        backgroundImg: '',
      },
      rules: {
        name: [
          { required: true, message: '请填写店铺名称' }
        ],
        merchantType: [
          { required: true, message: '请选择店铺类型' }
        ],
        logo: [
          { required: true, message: '请上传店铺logo' }
        ],
        backgroundImg: [
          { required: true, message: '请上传店铺背景图' }
        ]
      },
    }
  },
  middleware: 'auth',
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.$service("userInfo").then(result => {
      this.loadData = true
      if (result.data.userType === 4) {
        this.success = true
        this.form.merchantType = result.data.merchantType
      } else if (result.data.userType === 2) {
        this.$router.push({
          name: 'user-shop-createShop'
        })
      }
    }).catch(err => { })
  },
  methods: {
    submit() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        console.log(this.form)
        this.$loading(this.$service('openShop', { data: this.form }))
          .then(() => {
            this.success = true
          }).catch()
      }
    },
    linkTo() {
      this.$router.push({
        name: 'user-shop-createShop',
        query: {
          type: '4'
        }
      })
    },
    typeCancel() {
      this.typePickerShow = false
    },
    typeConfirm(val, index) {
      this.form.type = val
      this.form.merchantType = index + 1
      this.typePickerShow = false
    },
    uploadSuccessLogo(key) {
      this.form.logo = key
    },
    uploadSuccessBg(key) {
      this.form.backgroundImg = key
    },
    clickLeft() {
      this.$router.push({ name: 'user-shop' })
    }
  }
}
</script>

<style lang="postcss" scoped>
.success-state {
  text-align: center;
  & .imgwrap {
    padding-top: 95px;
    & img {
      width: 146px;
    }
  }
  & .text {
    margin: 30px auto 16px;
    width: 100%;
    color: var(--black);
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
  & p {
    padding: 0 20px;
    line-height: 20px;
    font-size: 15px;
    color: var(--gray);
  }
  & button {
    margin-top: 20px;
    background: #d57e6a;
  }
}
.margin {
  margin-bottom: 15px;
}
.upload-area {
  float: right;
}
.block {
  margin: 25px auto;
  width: 90%;
}
.min-width {
  min-width: 220px;
}
.img-upload {
  float: right;
  width: 100px;
  & img {
    width: 100%;
  }
}
.submit-btn {
  background: #d57e6a;
  border-color: #d57e6a;
}
.success-container {
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  & .info {
    margin-top: 20px;
    line-height: 30px;
  }
  & .link {
    /* color: #2d69c3; */
    margin-top: 30px;
  }
  & .fix-bottom {
    /* position: fixed;
    bottom: 20px;
    left: 0;
    right: 0; */
    margin-top: 30px;
    & .link {
      font-size: 18px;
    }
  }
  & .red {
    color: red;
  }
  & .blue {
    color: #2d69c3;
  }
}
</style>
