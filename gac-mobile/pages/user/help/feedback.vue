<template>
  <AppView title="意见反馈">
  <validator :rules="rules"
    :model="form"
    ref="form">
    <van-field
      v-model="form.content"
      type="textarea"
      placeholder="请输入反馈内容，500字以内"
      maxlength="500"
    />
  </validator>
  <div style="text-align: center;">  
    <van-button 
      type="warning" 
      size="small"
      @click="release">发布</van-button>
  </div>
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
      form: {
        title: '意见反馈',
        content: ''
      },
      rules: {
        content: [{
          required: true,
          message: '请输入反馈内容'
        }]
      }
    }
  },
  methods: {
    release() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.$service('feedback', {
          data: this.form
        })
          .then(this.success)
      }
    },
    success () {
      this.$toast({
        type: 'success',
        message: '发布成功'
      })
      this.$router.push({
        name: 'user-help'
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
>>> textarea{
  border: 1px solid var(--border-color);
  height: 200px;
}
</style>