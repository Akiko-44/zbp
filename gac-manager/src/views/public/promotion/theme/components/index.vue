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
      <el-form-item
        label="主题名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          placeholder="请输入主题名称"
          maxlength="15"
          show-word-limit
        ></el-input>
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

      <el-form-item>
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
        backgroundType: undefined
      },
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
    this.form.backgroundType = this.type
    if (this.$route.query.id) {
      this.getDetail()
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
    }
  }
}
</script>

<style scoped lang="scss">
.dateInput {
  display: inline-block;
}
.tip {
  /* margin-left: 20px; */
  font-size: 12px;
  color: #999;
}
/* 已选择商品 */
.selected-goods {
  position: relative;
  background: #f2f2f2;
  width: 420px;
  overflow: hidden;
  padding: 10px 20px 10px 10px;
  & .goods-edit {
    position: absolute;
    right: 12px;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    &:hover {
      color: #409eff;
    }
  }
  & img {
    float: left;
    width: 100px;
    margin-top: 4px;
  }
  & .goods-info {
    margin-left: 120px;
    color: #666666;
  }
  & .goods-name {
    width: 260px;
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .goods-brand {
    background: #f38d45;
    color: #fff;
    padding: 2px 5px;
  }
  & .goods-catgory {
    background: #b9b5b2;
    color: #fff;
    padding: 2px 5px;
  }
  & .main-categories {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .goods-price {
    color: red;
    font-weight: bold;
  }
  & .goods-stock {
    color: #666;
    margin-left: 20px;
  }
  & .column-name {
    background: #b9b5b2;
    color: #fff;
    padding: 2px 5px;
  }
  & .main-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3;
  }
}
</style>
