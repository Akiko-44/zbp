<template>
  <AppView class="auth" title="实名认证">
    <!--<van-notice-bar :scrollable="false">
      资料已上传，审核中
    </van-notice-bar>-->
    <div class="padding">
      <describe />
    </div>
    <div class="padding-right">
      <validator
        :rules="rules"
        :model="form"
        ref="form">
        <van-cell-group>
          <van-field
            v-model="form.name"
            label="姓名"
            placeholder="请输入真实姓名"
          />
          <van-field
            v-model="form.idNumber"
            type="text"
            label="身份证号"
            maxlength="18"
            placeholder="请输入身份证号"
            @blur="regidNumber"
          />
          <van-cell
            is-link
            title="身份证照片"
            :value="uploaded"
            @click="toAuthUpload"
          />
        </van-cell-group>
      </validator>
    </div>
  </AppView>
</template>

<script>
import Describe from '~/components/index/authDescribe'
import Validator from '~/components/common/validator'

export default {
  data () {
    return {
      idNumber: '',
      name: '',
      mobile: '',
      form: {
        idNumber: '',
        name: ''
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
    Describe
  },
  activated () {
    this.$service('userDetail', {resources: [this.$route.query.id]}).then((result) => {
      this.form.idNumber = result.data.idNumber
      this.form.name = result.data.name
      this.uploaded = result.data.id == 0 ? '上传照片' : '已上传照片'
      this.flag = result.data.id == 0 ? true : false
    })
  },
  methods: {
    toAuthUpload () {
      if (this.$refs.form.checkAll(error => this.$toast(error[0])) && this.idNumberFlag && this.flag) {
        this.$router.push({name: 'user-auth-upload', query: {id: this.$route.query.id, idNumber: this.form.idNumber, name: this.form.name}})
      }
      if (!this.flag) {
        this.$toast('已上传照片，无法再次修改')
      }
    },
    regidNumber(){
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if(reg.test(this.form.idNumber) === false){
        this.idNumberFlag = false
        this.$toast('身份证号输入有误')
      }else{
        this.idNumberFlag = true
      }
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
>>> .van-cell-group {
  &:after {
    border-top: none;
  }
}
</style>
