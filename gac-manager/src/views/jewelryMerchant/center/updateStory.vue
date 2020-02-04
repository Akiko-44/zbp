
<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >

      <el-form-item
        label="品牌故事"
        prop="stroyDetail"
      >
        <Tinymce
          :height="500"
          ref="editor"
          v-model="form.stroyDetail"
        ></Tinymce>
      </el-form-item>

      <el-form-item
        label="显示顺序"
        prop="sortOrder"
      >
        <el-input
          style="width: 220px;"
          type="number"
          maxlength="2"
          min="0"
          v-model.number="form.sortOrder"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="back"
        >返回</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="save"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  storyDetail,
  saveOrUpdateStory
} from '@/api/jewelryMerchant/merchant'
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'editMsg',
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      id: this.$route.query.id,
      form: {
        id: undefined,
        stroyDetail: '',
        sortOrder: 0
      },
      rules: {
        stroyDetail: [
          {
            required: true,
            message: '请填写正文内容',
            trigger: 'blur'
          }
        ],
        sortOrder: [
          {
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }
        ]
      },
      editStatus: true
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  /* async beforeRouteEnter(to, from, next) {
    const queue = [

    ]
    if (to.query.id) {
      queue.push(storyDetail(to.query.id).then(data => data.data))
    }
    const [form] = await Promise.all(queue)

    next(vm => {
      setTimeout(() => {
        if (form) {
          delete form.propIds
          delete form.props
          delete form.columns
          vm.form = form
        }
      }, 10)
    })
  }, */
  created() {
    if (this.id) {
      storyDetail(this.id).then(data => {
        this.form = data.data
      })
    }
  },
  methods: {
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          saveOrUpdateStory(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'storyList'
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
    },
    reset() {
      this.$refs.form.resetFields()
    },
    uploadSuccess(imgs) {
      this.form.thumbnail = imgs[imgs.length - 1]
    },
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    back() {
      this.$router.go(-1)
    }
  },
  components: {
    ImageUpload,
    Tinymce
  }
}
</script>

<style scoped>
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
</style>
