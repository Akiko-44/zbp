<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="140px"
    >
      <h3>基础信息</h3>
      <el-form-item
        label="主题名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          placeholder="请输入主题名称"
          maxlength="15"
          show-word-limit
          style="width: 500px;"
        ></el-input>
      </el-form-item>

      <el-form-item label="主题背景">
        <el-radio-group v-model="form.wholeType">
          <el-radio :label="1">自定义背景色</el-radio>
          <el-radio :label="2">自定义背景图</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="自定义背景色"
        v-if="form.wholeType === 1"
      >
        <el-color-picker v-model="form.wholeColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item
        label="自定义背景图"
        v-if="form.wholeType === 2"
      >
        <el-card
          v-if="form.wholeImg"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.wholeImg"
            class="image"
            width="100%"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'wholeImg')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.wholeImg"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadSuccess"
        />
      </el-form-item>

      <el-form-item
        label="状态"
        prop="backgroundStatus"
      >
        <el-switch
          v-model="form.backgroundStatus"
          :active-value="1"
          :inactive-value="2"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <div class="line"></div>

      <h3>顶部导航主题</h3>

      <el-form-item label="自定义背景色">
        <el-color-picker v-model="form.appTopColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
        <div class="tip">
          （注：与状态栏同色）
        </div>
      </el-form-item>

      <el-form-item label="状态栏字体颜色">
        <el-radio-group v-model="form.appTopLocationFontColor">
          <el-radio :label="1">白色</el-radio>
          <el-radio :label="2">黑色</el-radio>
        </el-radio-group>
        <!-- <div class="tip">
          （注：与状态栏同色）
        </div> -->
      </el-form-item>

      <el-form-item label="定位字体颜色">
        <el-color-picker v-model="form.appTopLocationFontColorString"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
        <!-- <div class="tip">
          （注：与状态栏同色）
        </div> -->
      </el-form-item>

      <el-form-item label="搜索框背景颜色">
        <el-color-picker v-model="form.appTopSearchColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="搜索框提示文字颜色">
        <el-color-picker v-model="form.appTopSearchFontColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="定位ICON">
        <el-card
          v-if="form.appTopLocationIcon"
          style="width:100px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appTopLocationIcon"
            class="image"
            width="100%"
          />
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appTopLocationIcon')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appTopLocationIcon"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadLocationSuccess"
        />
      </el-form-item>

      <el-form-item label="搜索ICON">
        <el-card
          v-if="form.appTopSearchIcon"
          style="width:100px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appTopSearchIcon"
            class="image"
            width="100%"
          />
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appTopSearchIcon')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appTopSearchIcon"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadSearchSuccess"
        />
      </el-form-item>

      <el-form-item label="扫一扫ICON">
        <el-card
          v-if="form.appTopScanIcon"
          style="width:100px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appTopScanIcon"
            class="image"
            width="100%"
          />
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appTopScanIcon')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appTopScanIcon"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadScanSuccess"
        />
      </el-form-item>

      <div class="line"></div>

      <h3>公告主题</h3>

      <el-form-item label="自定义背景色">
        <el-color-picker v-model="form.appNoticeColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="字体颜色">
        <el-color-picker v-model="form.appNoticeFontColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="公告ICON">
        <el-card
          v-if="form.appNoticeIcon"
          style="width:100px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appNoticeIcon"
            class="image"
            width="100%"
          />
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appNoticeIcon')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appNoticeIcon"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadNoticeSuccess"
        />
      </el-form-item>

      <div class="line"></div>

      <h3>Banner上的按钮主题</h3>

      <el-form-item label="字体颜色">
        <el-color-picker v-model="form.appBannerFontColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="背景图">
        <el-card
          v-if="form.appBannerImg"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appBannerImg"
            class="image"
            width="100%"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appBannerImg')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appBannerImg"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadBannerSuccess"
        />
      </el-form-item>

      <div class="line"></div>

      <h3>底部背景主题</h3>

      <el-form-item label="背景图">
        <el-card
          v-if="form.appFootImg"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appFootImg"
            class="image"
            width="100%"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appFootImg')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appFootImg"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadFootSuccess"
        />
      </el-form-item>

      <el-form-item label="默认字体颜色">
        <el-color-picker v-model="form.appFootDefaultFontColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="选中字体颜色">
        <el-color-picker v-model="form.appFootCheckedFontColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <div class="line"></div>

      <h3>底部导航主题</h3>

      <el-table
        :data="form.appFootNavigations"
        border
        fit
        highlight-current-row
        style="width: 602px;margin-bottom:22px;"
      >
        <el-table-column
          width="200px"
          align="center"
          label="默认导航名称"
        >
          <template slot-scope="{ row }">
            <span>{{ row.defaultName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          align="center"
          label="默认图标"
        >
          <template slot-scope="{ row, $index }">
            <el-card
              v-if="row.defaultIcon"
              style="width:100px;margin: 0 auto;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="row.defaultIcon"
                class="image"
                width="100%"
              />
              <div style="padding: 0 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="row.defaultIcon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!row.defaultIcon"
              :multiple="false"
              prefix="theme"
              @successCBK="uploadFootDefaultSuccess($event, $index)"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          align="center"
          label="选中图标"
        >
          <template slot-scope="{ row, $index }">
            <el-card
              v-if="row.checkedIcon"
              style="width:100px;margin: 0 auto;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="row.checkedIcon"
                class="image"
                width="100%"
              />
              <div style="padding: 0 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="row.checkedIcon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!row.checkedIcon"
              :multiple="false"
              prefix="theme"
              @successCBK="uploadFootCheckedSuccess($event, $index)"
            />
          </template>
        </el-table-column>
      </el-table>

      <div class="line"></div>

      <h3>中部背景主题</h3>

      <el-form-item label="主题背景">
        <el-radio-group v-model="form.appMiddleType">
          <el-radio :label="1">自定义背景色</el-radio>
          <el-radio :label="2">自定义背景图</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="自定义背景色"
        v-if="form.appMiddleType === 1"
      >
        <el-color-picker v-model="form.appMiddleColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item
        label="自定义背景图"
        v-if="form.appMiddleType === 2"
      >
        <el-card
          v-if="form.appMiddleImg"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.appMiddleImg"
            class="image"
            width="100%"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'appMiddleImg')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.appMiddleImg"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadMiddleSuccess"
        />
      </el-form-item>

      <div class="line"></div>

      <h3>
        中部导航主题
        <span class="tip">排序由1开始依次递增，数字越小越靠前</span>
      </h3>

      <el-table
        :data="form.appMiddleNavigations"
        border
        fit
        highlight-current-row
        style="width: 822px"
      >
        <el-table-column
          width="200px"
          align="center"
          label="默认导航名称"
        >
          <template slot-scope="{ row }">
            <span>{{ row.defaultName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          align="center"
          label="新导航名称"
        >
          <template slot-scope="{ row }">
            <el-input v-model="row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          align="center"
          label="图标"
        >
          <template slot-scope="{ row, $index }">
            <el-card
              v-if="row.icon"
              style="width:100px;margin: 0 auto;"
              :body-style="{ padding: '0px' }"
            >
              <img
                :src="row.icon"
                class="image"
                width="100%"
              />
              <div style="padding: 0 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="row.icon = ''"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
            <ImageUpload
              v-show="!row.icon"
              :multiple="false"
              prefix="theme"
              @successCBK="uploadMiddleIconSuccess($event, $index)"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="220px"
          align="center"
          label="排序"
        >
          <template slot-scope="{ row }">
            <el-input-number
              v-model="row.sortOrder"
              :min="1"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>

      <el-form-item class="btn-box">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="update('form')"
        >确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from '@/components/Upload'
import { addBackground, getBackgroundDetail } from '@/api/public/system'

export default {
  components: {
    ImageUpload
  },
  props: ['type'],
  data() {
    return {
      loading: false,
      form: {
        id: undefined,
        name: '',
        backgroundStatus: 2,
        wholeType: 1,
        wholeImg: '',
        wholeColor: '',
        backgroundType: 4,
        appTopColor: '',
        appTopLocationFontColor: 1,
        appTopLocationFontColorString: '',
        appTopSearchColor: '',
        appTopSearchFontColor: '',
        appTopLocationIcon: '',
        appTopSearchIcon: '',
        appTopScanIcon: '',
        appNoticeColor: '',
        appNoticeFontColor: '',
        appNoticeIcon: '',
        appBannerFontColor: '',
        appBannerImg: '',
        appFootImg: '',
        appFootDefaultFontColor: '',
        appFootCheckedFontColor: '',
        appMiddleType: 1,
        appMiddleImg: '',
        appMiddleColor: '',
        appMiddleNavigations: [],
        appFootNavigations: []
      },
      footNavList: [
        {
          id: '1000',
          defaultName: '首页',
          defaultIcon: '',
          checkedIcon: ''
        },
        {
          id: '1001',
          defaultName: '分类',
          defaultIcon: '',
          checkedIcon: ''
        },
        {
          id: '1002',
          defaultName: '溯源',
          defaultIcon: '',
          checkedIcon: ''
        },
        {
          id: '1003',
          defaultName: '购物车',
          defaultIcon: '',
          checkedIcon: ''
        },
        {
          id: '1004',
          defaultName: '我的',
          defaultIcon: '',
          checkedIcon: ''
        }
      ],
      middleNavList: [
        {
          id: '1000',
          defaultName: '去哪儿买',
          name: '去哪儿买',
          icon: '',
          sortOrder: 1
        },
        {
          id: '1001',
          defaultName: '找设计师',
          name: '找设计师',
          icon: '',
          sortOrder: 2
        },
        {
          id: '1002',
          defaultName: '寻代工',
          name: '寻代工',
          icon: '',
          sortOrder: 3
        },
        {
          id: '1003',
          defaultName: '珠宝圈',
          name: '珠宝圈',
          icon: '',
          sortOrder: 4
        },
        {
          id: '1004',
          defaultName: '珠宝展',
          name: '珠宝展',
          icon: '',
          sortOrder: 5
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入主题名称', trigger: 'blur' }],
        backgroundStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        wholeType: [
          { required: true, message: '请选择主题背景类型', trigger: 'change' }
        ],
        wholeColor: [{ required: true, message: '请选择自定义背景色' }],
        wholeImg: [{ required: true, message: '请选择自定义背景图' }]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getDetail()
    } else {
      this.form.appMiddleNavigations = this.middleNavList
      this.form.appFootNavigations = this.footNavList
    }
  },
  methods: {
    getDetail() {
      getBackgroundDetail({ id: this.$route.query.id }).then(data => {
        this.form = data.data
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          let footerFlag = true
          let middleFlag = true
          let checkFooterList = []
          let checkMiddleList = []
          checkFooterList = this.form.appFootNavigations.filter(item => (item.defaultIcon || item.checkedIcon))
          if (checkFooterList.length) {
            this.form.appFootNavigations.every(item => {
              if (!item.defaultIcon || !item.checkedIcon) {
                footerFlag = false
                return false
              } else {
                return true
              }
            })
          }
          if (!footerFlag) {
            this.$notify({
              title: '提示',
              message: '请完善底部导航主题相关信息',
              type: 'warning'
            })
            return false
          }
          checkMiddleList = this.form.appMiddleNavigations.filter(item => item.icon)
          if (checkMiddleList.length) {
            this.form.appMiddleNavigations.every(item => {
              if (!item.name || !item.icon || !item.sortOrder) {
                middleFlag = false
                return false
              } else {
                return true
              }
            })
          } else {
            this.form.appMiddleNavigations.every(item => {
              if (!item.name || !item.sortOrder) {
                middleFlag = false
                return false
              } else {
                return true
              }
            })
          }

          if (!middleFlag) {
            this.$notify({
              title: '提示',
              message: '请完善中部导航主题相关信息',
              type: 'warning'
            })
            return false
          }
          if (!checkFooterList.length) {
            this.form.appFootNavigations = []
          }
          if (this.form.wholeType === 1) {
            this.form.wholeImg = ''
          } else {
            this.form.wholeColor = ''
          }
          addBackground(this.form).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: 'theme' })
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必填项',
            type: 'warning'
          })
          return false
        }
      })
    },
    uploadSuccess(key) {
      // this.form.wholeImg = key[0]
      this.$set(this.form, 'wholeImg', key[0])
    },
    uploadLocationSuccess(key) {
      // this.form.appTopLocationIcon = key[0]
      this.$set(this.form, 'appTopLocationIcon', key[0])
    },
    uploadSearchSuccess(key) {
      // this.form.appTopSearchIcon = key[0]
      this.$set(this.form, 'appTopSearchIcon', key[0])
    },
    uploadScanSuccess(key) {
      // this.form.appTopScanIcon = key[0]
      this.$set(this.form, 'appTopScanIcon', key[0])
    },
    uploadNoticeSuccess(key) {
      this.$set(this.form, 'appNoticeIcon', key[0])
    },
    uploadBannerSuccess(key) {
      // this.form.appBannerImg = key[0]
      this.$set(this.form, 'appBannerImg', key[0])
    },
    uploadFootSuccess(key) {
      // this.form.appFootImg = key[0]
      this.$set(this.form, 'appFootImg', key[0])
    },
    uploadFootDefaultSuccess(key, i) {
      this.form.appFootNavigations[i].defaultIcon = key[0]
    },
    uploadFootCheckedSuccess(key, i) {
      this.form.appFootNavigations[i].checkedIcon = key[0]
    },
    uploadMiddleSuccess(key) {
      // this.form.appMiddleImg = key[0]
      this.$set(this.form, 'appMiddleImg', key[0])
    },
    uploadMiddleIconSuccess(key, i) {
      this.form.appMiddleNavigations[i].icon = key[0]
    }
  }
}
</script>

<style scoped lang="scss">
.tip {
  /* margin-left: 20px; */
  font-size: 12px;
  color: #999;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
}
.btn-box {
  margin-top: 50px;
  button {
    width: 100px;
  }
}
</style>
