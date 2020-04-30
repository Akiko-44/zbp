<template>
  <div class="app-container calendar-list-container">
    <h4>基本信息</h4>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-position="left"
      label-width="80px"
    >
      <!--<el-form-item label="用户头像">
        <span><img class="userlogo" :src="form.userLogo" alt="" /></span>
      </el-form-item>-->
      <el-form-item
        label="logo"
        prop="userLogo"
      >
        <el-row
          class="row"
          v-if="form.userLogo"
        >
          <el-col
            class="col"
            :span="6"
          >
            <el-card :body-style="{ padding: '0px' }">
              <a
                target="_blank"
                :href="form.userLogo | setImg"
                class="image"
                :style="getImageStyle(form.userLogo)"
              ></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.userLogo = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- <ImageUpload v-show="!form.userLogo"
                     :multiple="false"
                     prefix="userLogo"
                     @successCBK="userLogoUploadSuccess" /> -->
        <el-button
          v-show="!form.userLogo"
          @click="cropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="500"
          :height="500"
          prefix="userLogo"
          @crop-upload-success="userLogoUploadSuccess"
          tips="5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸500*500"
        />
      </el-form-item>
      <el-form-item
        label="昵称"
        inline
        prop="nickname"
      >
        <el-input
          v-model="form.nickname"
          placeholder="昵称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="save()"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, updateInfo } from '@/api/makeMerchant/center'
import ImageCropper from '@/components/ImageCropper'
import { setImg } from '@/filters'
import Cookies from 'js-cookie'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      loading: false,
      cropShow: false,
      form: {
        userLogo: undefined,
        nickname: undefined
      },
      rules: {
        userLogo: [
          {
            required: true,
            message: '请上传头像',
            trigger: 'blur'
          }
        ],
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await getInfo()
    next(vm => {
      vm.form = data
    })
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    userLogoUploadSuccess(imgs) {
      this.form.userLogo = imgs
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          updateInfo(this.form).then(data => {
            this.editStatus = false
            Cookies.set('nickName', this.form.nickname)
            this.$store.commit('SET_NAME', this.form.nickname)
            Cookies.set('logo', this.form.userLogo)
            this.$store.commit('SET_AVATAR', this.form.userLogo)
            this.$router.push({
              name: 'merchantCenter'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

