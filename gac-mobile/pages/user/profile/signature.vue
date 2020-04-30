<template>
  <AppView title="个性签名">
    <validator
      :rules="rules"
      :model="form"
      ref="form"
    >
      <div class="box">
        <van-field
          v-model="form.userBrief"
          rows="3"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入个性签名，100字以内"
        />
      </div>

      <van-button
        :loading="submiting"
        @click="submit"
        class="submit-btn primary-btn"
        type="primary"
      >
        完成
      </van-button>
    </validator>
  </AppView>
</template>

<script>
import Validator from '~/components/common/validator'
export default {
  components: {
    Validator
  },
  data() {
    return {
      submiting: false,
      form: {
        userBrief: ''
      },
      rules: {
        userBrief: [
          { required: true, message: '请输入个性签名，100字以内' }
        ]
      }
    }
  },
  activated() {
    this.form.userBrief = this.$route.query.userBrief
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    submit() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.submiting = true
        this.$service("userBriefSetting", { data: this.form }).then(result => {
          // this.$router.go(-1)
          this.submiting = false
          this.$toast("设置成功")
        });
      }
    }
  },
}
</script>

<style scoped>
.box {
  margin: 10px;
  border-radius: 6px;
  overflow: hidden;
}
.van-button.submit-btn {
  display: block;
  margin: 50px auto;
  width: 345px;
  border-radius: 5px;
  font-size: 16px;
  border-color: #df735a;
  background: #df735a;
}
</style>
