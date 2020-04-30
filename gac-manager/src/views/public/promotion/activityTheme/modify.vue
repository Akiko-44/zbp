<template>
  <div>
    <div class="app-container">
      <el-form
        style="padding-right: 200px;"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="160px"
      >
        <div
          class="subtitle"
          style="border-top:none;"
        >基础信息</div>
        <el-form-item
          label="主题名称:"
          prop="name"
        >
          <span v-if="readonly">{{form.name}}</span>
          <el-input
            v-else
            width="200"
            v-model="form.name"
            maxlength="20"
            show-word-limit
            placeholder="请输入活动主题名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="移动端商品列表标识:"
          class="is-required"
        >
          <el-form-item
            prop="appSmallIcon"
            class="inline-item"
          >
            <el-card
              v-if="form.appSmallIcon"
              style="width:150px;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="form.appSmallIcon"
                class="image"
                width="100%"
              />
              <div
                style="padding: 14px;"
                v-if="!readonly"
              >
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.appSmallIcon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!form.appSmallIcon"
              :multiple="false"
              :limit="1"
              width='600'
              height='600'
              prefix="dm-appSmallIcon"
              @successCBK="appSmallIconUploadSuccess"
              tips="(小图：196*196px)"
            />
          </el-form-item>
          <el-form-item
            prop="appBigIcon"
            class="inline-item"
          >
            <el-card
              v-if="form.appBigIcon"
              style="width:150px;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="form.appBigIcon"
                class="image"
                width="100%"
              />
              <div
                style="padding: 14px;"
                v-if="!readonly"
              >
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.appBigIcon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!form.appBigIcon"
              :multiple="false"
              :limit="1"
              width='600'
              height='600'
              prefix="dm-appBigIcon"
              @successCBK="appBigIconUploadSuccess"
              tips="(大图：330*330px)"
            />
          </el-form-item>
          <el-form-item class="inline-item">
            <p class="tip">(每种尺寸各1张，大小5M以内，支持jpg/jpeg/png/gif格式)</p>
          </el-form-item>
        </el-form-item>
        <el-form-item
          label="移动端商品详情标识:"
          prop="appDetailIcon"
        >
          <el-card
            v-if="form.appDetailIcon"
            style="width:150px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.appDetailIcon"
              class="image"
              width="100%"
            />
            <div
              style="padding: 14px;"
              v-if="!readonly"
            >
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  @click="form.appDetailIcon = ''"
                >删除</el-button>
              </div>
            </div>
          </el-card>
          <ImageUpload
            v-show="!form.appDetailIcon"
            :multiple="false"
            :limit="1"
            width='600'
            height='600'
            prefix="dm-appDetailIcon"
            @successCBK="appDetailIconUploadSuccess"
            tips="(750*750px)"
          />

          <el-form-item class="inline-item">
            <p class="tip">(1张，大小5M以内，支持jpg/jpeg/png/gif格式)</p>
          </el-form-item>
        </el-form-item>
        <el-form-item
          label="PC端商品列表标识:"
          class="is-required"
        >
          <el-form-item
            prop="pcSmallIcon"
            class="inline-item"
          >
            <el-card
              v-if="form.pcSmallIcon"
              style="width:150px;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="form.pcSmallIcon"
                class="image"
                width="100%"
              />
              <div
                style="padding: 14px;"
                v-if="!readonly"
              >
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.pcSmallIcon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!form.pcSmallIcon"
              :multiple="false"
              :limit="1"
              width='600'
              height='600'
              prefix="dm-pcSmallIcon"
              @successCBK="pcSmallIconUploadSuccess"
              tips="(小图：185*185px)"
            />
          </el-form-item>
          <el-form-item
            prop="pcBigIcon"
            class="inline-item"
          >
            <el-card
              v-if="form.pcBigIcon"
              style="width:150px;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="form.pcBigIcon"
                class="image"
                width="100%"
              />
              <div
                style="padding: 14px;"
                v-if="!readonly"
              >
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.pcBigIcon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!form.pcBigIcon"
              :multiple="false"
              :limit="1"
              width='600'
              height='600'
              prefix="dm-pcBigIcon"
              @successCBK="pcBigIconUploadSuccess"
              tips="(大图：225*225px)"
            />
          </el-form-item>

          <el-form-item class="inline-item">
            <p class="tip">(每种尺寸各1张，大小5M以内，支持jpg/jpeg/png/gif格式)</p>
          </el-form-item>
        </el-form-item>
        <el-form-item
          label="PC商品详情标识:"
          prop="pcDetailIcon"
        >
          <el-card
            v-if="form.pcDetailIcon"
            style="width:150px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.pcDetailIcon"
              class="image"
              width="100%"
            />
            <div
              style="padding: 14px;"
              v-if="!readonly"
            >
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  @click="form.pcDetailIcon = ''"
                >删除</el-button>
              </div>
            </div>
          </el-card>
          <ImageUpload
            v-show="!form.pcDetailIcon"
            :multiple="false"
            :limit="1"
            width='600'
            height='600'
            prefix="dm-pcDetailIcon"
            @successCBK="pcDetailIconUploadSuccess"
            tips="(420*420px)"
          />

          <el-form-item class="inline-item">
            <p class="tip">(1张，大小5M以内，支持jpg/jpeg/png/gif格式)</p>
          </el-form-item>
        </el-form-item>
        <el-form-item
          label="有效期:"
          props="showStartDate"
          class="is-required"
        >
          <el-date-picker
            v-model="timeValue"
            :disabled="readonly"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
          <div class="tip">（不同活动的有效时间不可重叠）</div>
        </el-form-item>
        <div class="subtitle">抽奖设置<span>（非必填项，如果活动不涉及抽奖，则该项信息可不填）</span></div>
        <el-form-item label="关联抽奖活动:">
          <el-select
            v-model="form.luckDrawId"
            placeholder="请选择需要关联的活动"
            :disabled="readonly"
          >
            <el-option
              v-for="item in drawList"
              :key="item.id"
              :label="item.luckyDrawName"
              :value="String(item.id)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抽奖次数:">
          <div>新用户注册成功增加
            <el-input
              v-model.number="form.newUserTimes"
              style="width: 100px;"
              :disabled="readonly"
            ></el-input>次抽奖机会
          </div>
          <div style="margin: 10px 0;">支付成功增加
            <el-input
              v-model.number="form.newOrderTimes"
              style="width: 100px;"
              :disabled="readonly"
            ></el-input>次抽奖机会
          </div>
        </el-form-item>
        <el-form-item
          label="抽奖图片:"
          prop="luckDrawPic"
        >
          <el-card
            v-if="form.luckDrawPic"
            style="width:150px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.luckDrawPic"
              class="image"
              width="100%"
            />
            <div
              style="padding: 14px;"
              v-if="!readonly"
            >
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  @click="form.luckDrawPic = ''"
                >删除</el-button>
              </div>
            </div>
          </el-card>
          <ImageUpload
            v-show="!form.luckDrawPic && !readonly"
            :multiple="false"
            :limit="1"
            width='600'
            height='600'
            prefix="dm-luckDrawPic"
            @successCBK="luckDrawPicUploadSuccess"
            tips="(支付成功后，显示的抽奖图片，1张，大小5M以内，支持jpg/jpeg/png/gif格式)"
          />
        </el-form-item>

        <el-form-item>
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="update('form')"
            v-if="!readonly"
          >确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  saveOrUpdateActivityTheme,
  activityThemeDetail,
  activityThemeDrawList
} from '@/api/public/system'
import ImageUpload from '@/components/Upload'
// import addPrize from './component/addPrize.vue'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload
    // addPrize
  },
  head() {
    return {
      title: '添加/编辑活动主题2',
      meta: {
        title: '添加/编辑活动主题2'
      }
    }
  },
  data() {
    return {
      readonly: false,
      loading: false,
      drawList: [],
      form: {
        id: undefined,
        name: undefined,
        appSmallIcon: undefined,
        appBigIcon: undefined,
        appDetailIcon: undefined,
        pcSmallIcon: undefined,
        pcBigIcon: undefined,
        pcDetailIcon: undefined,
        luckDrawId: undefined,
        luckDrawPic: undefined,
        showStartDate: undefined,
        showEndDate: undefined,
        newUserTimes: undefined,
        newOrderTimes: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入活动主题名称', trigger: 'blur' }
        ],
        appSmallIcon: [
          { required: true, message: '请上传移动端商品列表标识', trigger: 'blur' }
        ],
        appBigIcon: [
          { required: true, message: '请上传移动端商品列表标识', trigger: 'blur' }
        ],
        appDetailIcon: [
          { required: true, message: '请上传移动端商品详情标识', trigger: 'blur' }
        ],
        pcSmallIcon: [
          { required: true, message: '请上传PC端商品列表标识', trigger: 'blur' }
        ],
        pcBigIcon: [
          { required: true, message: '请上传PC端商品列表标识', trigger: 'blur' }
        ],
        pcDetailIcon: [
          { required: true, message: '请上传PC商品详情标识', trigger: 'blur' }
        ],
        showStartDate: [
          { required: true, message: '请选择有效期', trigger: 'blur, change' }
        ]
      },
      timeValue: []
    }
  },
  async created() {
    if (this.$route.query.id) {
      const form = await activityThemeDetail({ id: this.$route.query.id }).then(data => data.data)
      this.timeValue = [form.showStartDate, form.showEndDate]
      this.form = form
    }
    if (this.$route.query.type) {
      this.readonly = true
    }
    this.getDrawList()
  },
  watch: {
    timeValue(value) {
      if (value) {
        this.form.showStartDate = value.length ? value[0] : undefined
        this.form.showEndDate = value.length ? value[1] : undefined
      }
    }
  },
  methods: {
    getDrawList() {
      activityThemeDrawList().then(data => {
        this.drawList = data.data.records
      })
    },
    appSmallIconUploadSuccess(key) {
      this.form.appSmallIcon = key[0]
    },
    appBigIconUploadSuccess(key) {
      this.form.appBigIcon = key[0]
    },
    appDetailIconUploadSuccess(key) {
      this.form.appDetailIcon = key[0]
    },
    pcSmallIconUploadSuccess(key) {
      this.form.pcSmallIcon = key[0]
    },
    pcBigIconUploadSuccess(key) {
      this.form.pcBigIcon = key[0]
    },
    pcDetailIconUploadSuccess(key) {
      this.form.pcDetailIcon = key[0]
    },
    luckDrawPicUploadSuccess(key) {
      this.form.luckDrawPic = key[0]
    },
    update(formName) {
      const self = this
      if (!this.form.showStartDate || !this.form.showEndDate) {
        this.$notify({
          title: '警告',
          message: '请选择有效期',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          saveOrUpdateActivityTheme(self.form).then((data) => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.tip {
  font-size: 12px;
  color: #999;
}
.subtitle {
  font-weight: bold;
  border-top: 1px solid #e5e5e5;
  padding: 20px 0 40px;
  color: #666;
  font-size: 15px;
}
.subtitle > span {
  font-size: 12px;
  font-weight: normal;
}
.inline-item {
  display: inline-block;
  margin: 0 50px 0 0;
}
.upload-container {
  min-width: 200px;
}
</style>
