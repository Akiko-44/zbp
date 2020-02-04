<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px"
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

      <el-form-item label="Logo图片">
        <el-card
          v-if="form.pcLogoImg"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.pcLogoImg"
            class="image"
            width="100%"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'pcLogoImg')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.pcLogoImg"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadLogoSuccess"
        />
      </el-form-item>

      <el-form-item label="搜索ICON">
        <el-card
          v-if="form.pcSearchIcon"
          style="width:100px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.pcSearchIcon"
            class="image"
            width="100%"
          />
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'pcSearchIcon')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <ImageUpload
          v-show="!form.pcSearchIcon"
          :multiple="false"
          prefix="theme"
          @successCBK="uploadIconSuccess"
        />
      </el-form-item>

      <el-form-item label="搜索默认提示文字颜色">
        <el-color-picker v-model="form.pcDefaultSearchColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="搜索输入文字颜色">
        <el-color-picker v-model="form.pcCheckedSearchColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
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

      <h3>
        导航主题 <span class="tip">排序由1开始依次递增，数字越小越靠前</span>
      </h3>

      <el-form-item
        label="主题背景"
        prop="wholeType"
      >
        <el-radio-group
          v-model="form.wholeType"
          @change="changeType"
        >
          <el-radio :label="1">自定义背景色</el-radio>
          <el-radio :label="2">自定义背景图</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="自定义背景色"
        prop="wholeColor"
        v-if="form.wholeType === 1"
      >
        <el-color-picker v-model="form.wholeColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item
        label="自定义背景图"
        prop="wholeImg"
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

      <el-form-item label="默认字体颜色">
        <el-color-picker v-model="form.pcDefaultWholeColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-form-item label="选中字体颜色">
        <el-color-picker v-model="form.pcCheckWholeColor"></el-color-picker>
        <div class="tip">
          点击进行颜色选择或色值填写，若不选择颜色则使用默认色
        </div>
      </el-form-item>

      <el-table
        :data="form.pcNavigations"
        border
        fit
        highlight-current-row
        style="width: 622px"
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
        backgroundType: 1,
        pcNavigations: [],
        pcLogoImg: '',
        pcSearchIcon: '',
        pcDefaultSearchColor: '',
        pcCheckedSearchColor: '',
        pcDefaultWholeColor: '',
        pcCheckWholeColor: ''
      },
      navList: [
        {
          id: '1000',
          defaultName: '首页',
          name: '首页',
          sortOrder: 1
        },
        {
          id: '1001',
          defaultName: '去哪儿买',
          name: '去哪儿买',
          sortOrder: 2
        },
        {
          id: '1002',
          defaultName: '找设计师',
          name: '找设计师',
          sortOrder: 3
        },
        {
          id: '1003',
          defaultName: '寻代工',
          name: '寻代工',
          sortOrder: 4
        },
        {
          id: '1004',
          defaultName: '珠宝圈',
          name: '珠宝圈',
          sortOrder: 5
        },
        {
          id: '1005',
          defaultName: '珠宝展',
          name: '珠宝展',
          sortOrder: 6
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
      this.form.pcNavigations = this.navList
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
          let flag = true
          this.form.pcNavigations.every(item => {
            if (!item.name || !item.sortOrder) {
              flag = false
              return false
            } else {
              return true
            }
          })
          if (!flag) {
            this.$notify({
              title: '提示',
              message: '请完善导航相关信息',
              type: 'warning'
            })
            return false
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
    changeType(val) {
      if (val === 1) {
        this.$refs.form.clearValidate('wholeImg')
      } else {
        this.$refs.form.clearValidate('wholeColor')
      }
    },
    uploadSuccess(key) {
      // this.form.wholeImg = key[0]
      this.$set(this.form, 'wholeImg', key[0])
    },
    uploadLogoSuccess(key) {
      // this.form.pcLogoImg = key[0]
      this.$set(this.form, 'pcLogoImg', key[0])
    },
    uploadIconSuccess(key) {
      // this.form.pcSearchIcon = key[0]
      this.$set(this.form, 'pcSearchIcon', key[0])
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
.btn-box {
  margin-top: 50px;
  button {
    width: 100px;
  }
}
</style>
