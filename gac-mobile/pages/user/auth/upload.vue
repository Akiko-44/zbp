<template>
  <AppView  title="实名认证">
    <div class="upload form">
      <h4>拍摄您的二代身份原件，请保持图片清晰，四角完整</h4>
      <div class="upload-area">
        <div class="item-center flex-column">
          <img v-if="form.idPicFront" :src="form.idPicFront | setImg(form.idPicFront, { w: 150 })"/>
          <i class="icon"></i>
          <p>拍摄人像页</p>
        </div>
        <!--<input type="file" class="upload-input" accept="image/*">-->
        <VUpload @success="frontUploadSuccess" :width="371" :height="175" />
      </div>
      <div class="upload-area">
        <div class="item-center flex-column">
          <img v-if="form.idPicBack" :src="form.idPicBack | setImg(form.idPicBack, { w: 150 })"/>
          <i class="icon"></i>
          <p>拍摄国徽页</p>
        </div>
        <!--<input type="file" class="upload-input" accept="image/*">-->
        <VUpload @success="backUploadSuccess" :width="371" :height="175" />
      </div>
      <br>
      <p class="tip dark-gray">信息仅用于身份验证，珠宝云平台保障你的安全信息</p>
      <van-button type="primary" block class="primary-btn block" @click="submit">确定</van-button>
    </div>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload/base'
import { setImg } from '~/utils/qiniu'

export default {
  data () {
    return {
      form: {
        name: '',
        idNumber: '',
        idPicFront: '',
        idPicBack: ''
      }
    }
  },
  components: {
    VUpload
  },
  /* mounted() {
    this.form.name = this.$route.query.username
    this.form.idNumber = this.$route.query.idcard
    this.form.name = this.$route.query.username
    this.form.idNumber = this.$route.query.idcard
  }, */
  activated () {
    this.$service('userDetail', {resources: [this.$route.query.id]}).then((result) => {
      this.form = result.data
      this.form.name = this.$route.query.name
      this.form.idNumber = this.$route.query.idNumber
    })
  },
  methods: {
		setImg,
    frontUploadSuccess (key) {
      this.form.idPicFront = key
    },
    backUploadSuccess (key) {
      this.form.idPicBack = key
    },
    submit () {
      if(!this.form.idPicFront){
        this.$toast('请上传身份证正面照')
        return false
      }
      if(!this.form.idPicBack){
        this.$toast('请上传身份证反面照')
        return false
      }
      this.$service('userAuth', {data: this.form}).then(() => {
        this.$toast('上传成功')
        this.$router.push({name: 'user-auth', query: {id: this.$route.query.id}})
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.upload {
  padding: 12px;
  & h4 {
    padding: 20px 0;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
  }
  & .tip {
    font-size: 12px;
    text-align: center;
  }
  & .upload-area {
    margin-bottom: 15px;
    height: 175px;
  }
}

/* 拍照上传 */
.upload-area {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  text-align: center;
  & .item-center {
    width: 100%;
    height: 100%;
    & img{
      position: absolute;
      width: 351px;
      height: 175px;
    }
  }
  & .icon {
    display: block;
    width: 100%;
    height: 55px;
    background-image: url("./images/camera.png");
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
