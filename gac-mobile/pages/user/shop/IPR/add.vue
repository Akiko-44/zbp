<template>
  <AppView title="添加知识产权">
    <validator
      :rules="rules"
      :model="form"
      ref="form"
      class="addipr"
    >
      <van-cell-group>
        <p class="title">标题：</p>
        <van-field
          class="title-value"
          v-model="form.name"
          autosize
          maxlength="20"
          placeholder="请输入此次需要保护的专利名称"
        />

        <p class="title">详情：</p>
        <van-field
          type="textarea"
          class="detail-value"
          v-model="form.detail"
          autosize
          maxlength="300"
          rows="3"
          placeholder="请输入描述信息，300字以内"
        />

        <p class="title">上传图片：</p>
        <!-- <van-cell title="">
          <template slot="title"> -->
        <VUpload
          ref="picUploader"
          :imgs="pics"
          :limit=10
          :props="{src: 'imgUrl'}"
          :width="375"
          :height="667"
        >
        </VUpload>
        <!-- </template>
        </van-cell> -->
        <div class="tips">
          <p>请上传您要保护的原创作品图片，图片需要清晰</p>
          <p>图片格式：jpg、png、gif 图片大小：1.5M以下</p>
        </div>
      </van-cell-group>

      <van-button
        :loading="submiting"
        @click="submit"
        class="primary-btn"
        type="primary"
      >
        保存
      </van-button>
    </validator>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload'
import Validator from '~/components/common/validator'
import { setImg } from '~/utils/qiniu'
export default {
  components: {
    VUpload,
    Validator
  },
  data() {
    return {
      form: {
        name: '',
        detail: '',
        pics: ''
      },
      pics: [],
      rules: {
        name: [
          { required: true, message: '请输入此次需要保护的专利名称' }
        ],
        detail: [
          { required: true, message: '请输入描述信息，300字以内' }
        ]
      },
      submiting: false
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    submit() {
      if (this.pics.length < 1) {
        this.$toast('请上传图片')
        return
      }
      if (this.$refs.form.checkAll(error => this.$toast(error[0])) && this.pics.length > 0) {
        this.submiting = true
        let pics = []
        this.pics.forEach(item => {
          pics.push(item.imgUrl)
        })
        this.form.pics = pics.join(',')

        this.$service('intellectualSaveOrUpdate', {
          data: this.form
        }).then(data => {
          this.submiting = false
          this.$toast({ type: 'success', message: '添加成功' })
          this.$router.replace({ name: 'user-shop-IPR' })
        }).catch(() => {
          this.submiting = false
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> .crop-handle {
  top: 0;
  background: rgba(0, 0, 0, 0.5) !important;
}
>>> .van-cell__value {
  flex: 2;
}
>>> .van-cell-group {
  background: transparent;
}
.addipr {
  padding: 10px;
  & .title {
    font-size: 15px;
    padding: 10px 0 5px;
  }
  & .title-value {
    height: 54px;
    line-height: 34px;
    border-radius: 5px;
  }
  & .detail-value {
    height: 148px;
    border-radius: 5px;
  }
  & >>> .VUpload {
    overflow: hidden;
  }
  & .primary-btn {
    height: 44px;
    width: 100%;
    margin-top: 48px;
    background: #df7359;
    border-color: #df7359;
    font-size: 16px;
  }
}
.tips {
  font-size: 14px;
  line-height: 20px;
  color: #999999;
  & p:last-child {
    font-size: 12px;
  }
}
</style>