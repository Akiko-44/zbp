<template>
  <AppView title="投诉入口">
    <validator
      :rules="rules"
      :model="form"
      ref="form"
    >
      <van-cell-group>
        <van-field
          required
          v-model="form.userName"
          placeholder="请输入姓名"
          @click-icon="form.userName = ''"
        />
        <van-field
          required
          v-model="form.mobilePhone"
          placeholder="请输入手机号"
          @click-icon="form.mobilePhone = ''"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="form.email"
          placeholder="请输入邮箱(选填)"
          @click-icon="form.email = ''"
          @blur="regEmail"
        />
        <van-cell
          title="请选择投诉商家名称"
          :value="form.merchantName"
          required
          is-link
          @click="pickerMerchantShow = true"
        />
        <van-cell
          title="请选择投诉商品"
          :value="form.goodName"
          required
          is-link
          @click="pickerGoodsShow = true"
        />
        <van-cell
          title="请选择投诉的品牌"
          :value="form.brandName"
          is-link
          @click="pickerBrandShow = true"
        />
        <van-field
          required
          v-model="form.complaintName"
          placeholder="请输入投诉标题，30字以内"
          @click-icon="form.complaintName = ''"
          maxlength="30"
        />
        <van-field
          required
          type="textarea"
          v-model="form.complaintContent"
          placeholder="请输入投诉内容，500字以内"
          @click-icon="form.complaintContent = ''"
          maxlength="500"
        />
      </van-cell-group>

    </validator>
    <van-cell-group>
      <van-cell style="border-top: 15px solid #F8F8F8;">
        <template slot="title">
          <VUpload
            ref="picUploader"
            :imgs="imgs"
            :limit=9
            :props="{src: 'imgUrl'}"
          >
          </VUpload>
        </template>
      </van-cell>
      <van-cell>
        <div class="tips">9张以内，支持jpg/png/gif/jpeg，单张图片大小3m以内</div>
      </van-cell>
    </van-cell-group>

    <van-button
      @click="submit"
      :loading="loading"
      type="primary"
      block
      class="primary-btn submit-btn"
    >提交</van-button>

    <van-popup
      v-model="pickerMerchantShow"
      position="bottom"
    >
      <van-picker
        :columns="merchantcolumns"
        show-toolbar
        @cancel="pickerMerchantShow = false"
        @confirm="merchantConfirm"
      />
    </van-popup>
    <van-popup
      v-model="pickerBrandShow"
      position="bottom"
    >
      <van-picker
        :columns="brandcolumns"
        show-toolbar
        @cancel="pickerBrandShow = false"
        @confirm="brandConfirm"
      />
    </van-popup>
    <van-popup
      v-model="pickerGoodsShow"
      position="bottom"
    >
      <van-picker
        :columns="goodscolumns"
        show-toolbar
        @cancel="pickerGoodsShow = false"
        @confirm="goodsConfirm"
      />
    </van-popup>
  </AppView>
</template>

<script>
import Validator from '~/components/common/validator'
import VUpload from '~/components/common/upload'
import { setImg } from '~/utils/qiniu'

export default {
  components: {
    Validator,
    VUpload
  },
  head() {
    return {
      title: '投诉入口'
    }
  },
  // middleware: 'auth',
  data() {
    if (this.$data) return
    return {
      form: {
        userName: '',
        email: '',
        mobilePhone: '',
        merchantPhone: '',
        complaintName: '',
        complaintContent: '',
        merchantName: '',
        brandName: '',
        goodName: '',
        imgUrl: []
      },
      imgs: [],
      pickerMerchantShow: false,
      pickerBrandShow: false,
      pickerGoodsShow: false,
      merchant: {},
      merchantcolumns: [],
      brandcolumns: [],
      goodscolumns: [],
      complaintGoodsVOS: [],
      rules: {
        userName: [{
          required: true,
          message: '请输入姓名'
        }],
        mobilePhone: [{
          required: true,
          message: '请输入手机号'
        }],
        complaintName: [{
          required: true,
          message: '请输入投诉标题'
        }, {
          max: 30,
          message: '请输入30字以内'
        }],
        complaintContent: [{
          required: true,
          message: '请输入投诉内容'
        }, {
          max: 500,
          message: '请输入500字以内'
        }],
        merchantName: [{
          required: true,
          message: '请选择投诉商家名称'
        }],
        goodName: [{
          required: true,
          message: '请选择投诉商品'
        }]
      },
      loading: false,
      pickerShow: false,
      currentDate: new Date(1970, 1, 1),
      minDate: new Date(1930, 1, 1),
      maxDate: new Date()
    }
  },
  computed: {
    user() {
      return this.$store.state.user.info
    }
  },
  watch: {
    user: {
      handler: function handler(value) {
        this.form1 = Object.assign({}, this.form, value)
      },
      immediate: true
    }
  },
  async beforeMount() {
    let fromUrl = location.href
    await this.$store.dispatch('user/checkLogin', { router: this.$router, fromUrl })
    /*this.$loading(this.$store.dispatch('/api/userCenter/account')).then(this.successInfo)*/
    this.$service('account').then(res => {
      this.form1 = res.data
      this.successInfo()
    })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    merchantConfirm(value, index) {
      let self = this
      this.pickerMerchantShow = false
      this.form.merchantName = value
      self.goodscolumns = []
      this.merchant.forEach(function (item, i) {
        if (value == item.mechantName && item.complaintGoodsVOS.length > 0) {
          self.form.merchantPhone = item.mechantPhone
          self.complaintGoodsVOS = item.complaintGoodsVOS
          item.complaintGoodsVOS.forEach(function (citem, ci) {
            self.goodscolumns.push(citem.goodName)
          })
        }
      })
    },
    goodsConfirm(value, index) {
      let self = this
      this.pickerGoodsShow = false
      this.form.goodName = value
      self.brandcolumns = []
      self.complaintGoodsVOS.forEach(function (citem, ci) {
        if (value == citem.goodName) {
          self.form.goodId = citem.goodId
          self.brandcolumns.push(citem.brandName)
        }
      })
    },
    brandConfirm(value, index) {
      this.pickerBrandShow = false
      this.form.brandName = value
    },
    uploadSuccess({
      key
    }) {
      this.form.userLogo = key
    },
    regEmail() {
      let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!regEmail.test(this.form.email)) {
        this.$toast('请输入正确的邮箱地址')
      }
    },
    async successInfo(detail) {
      let self = this
      const [merchant] = await Promise.all([
        this.$service('complaintMechant', {
          data: {
            phoneNumber: self.form1.mobilePhone
          }
        })
          .then(result => result.data ? result.data : [])
      ])
      this.merchant = merchant
      this.form.mobilePhone = this.form1.mobilePhone
      this.merchant.forEach(function (item, index) {
        self.merchantcolumns.push(item.mechantName)
      })
    },
    submit() {
      this.imgs.forEach(data => {
        this.form.imgUrl.push(data.imgUrl)
      })
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.loading = true
        this.$service('complaintSave', {
          data: this.form
        })
          .then(this.success)
          .catch(this.fail)
      }
    },
    success(result) {
      this.$toast({
        type: 'success',
        message: '提交成功'
      })
      this.$router.replace({
        name: 'complaints-list'
      })
      this.loading = false
    },
    fail() {
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> .van-cell-group {
  &:after {
    border-top: none;
  }
}

.img-upload {
  position: relative;
  margin: 20px auto 50px;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background-color: var(--light-gray);
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  & i {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

.inline {
  display: inline;
}

>>> .sex .van-cell__title {
  flex: 2;
}

>>> .van-cell__value {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.van-cell-text {
  padding-right: 38px;
}

.tips {
  font-size: 13px;
  color: #aaaaac;
  text-align: left;
}

.submit-btn {
  margin: 30px auto 50px;
  background: #d57e6a;
  border-color: #d57e6a;
  width: calc(100% - 20px);
}
</style>