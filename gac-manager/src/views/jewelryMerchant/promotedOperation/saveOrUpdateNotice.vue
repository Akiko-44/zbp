<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="noticeForm"
      :rules="rules"
      ref="noticeForm"
      label-width="100px"
    >

      <el-form-item
        label="公告标题"
        prop="noticeName"
      >
        <el-input
          v-model="noticeForm.noticeName"
          :maxlength="25"
          placeholder="请输入公告标题"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="公告详情"
        prop="noticeDetails"
      >
        <Tinymce
          :height="500"
          ref="editor"
          v-model="noticeForm.noticeDetails"
        ></Tinymce>
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
        >立即发布</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getNotice, addNotice, updateNotice } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'editAnnouncement',
  directives: {
    waves
  },
  components: {
    ImageUpload,
    Tinymce
  },
  data() {
    return {
      id: this.$route.query.id,
      type: 'add',
      loading: false,
      notice: [],
      checkList: [
        {
          id: '1',
          menu: '前端用户'
        }, {
          id: '2',
          menu: '去哪儿买'
        }, {
          id: '3',
          menu: '找设计师'
        }, {
          id: '4',
          menu: '寻代工'
        }
      ],
      noticeForm: {
        id: undefined,
        noticeName: '',
        noticeType: 2,
        noticeDetails: ''
      },
      rules: {
        noticeName: [
          {
            required: true,
            message: '请输入公告标题',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 25,
            message: '公告标题名称长度至少3个字符，最长25个汉字',
            trigger: 'blur'
          }
        ],
        noticeDetails: [
          {
            required: true,
            message: '请填写公告详情',
            trigger: 'blur'
          }
        ]
      },
      editStatus: true
    }
  },
  created() {
    if (this.id) {
      getNotice({ id: this.id }).then(data => {
        this.noticeForm = data.data
      })
      this.type = 'update'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  methods: {
    add() {
      this.loading = true
      addNotice(this.noticeForm).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'noticeList'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    update() {
      this.loading = true
      updateNotice(this.noticeForm).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'noticeList'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      const set = this.$refs
      /* const num = this.getZFWlength(this.noticeForm.noticeDetails)
      if (num > 250) {
        this.$message({
          message: '消息内容最多250个字',
          type: 'error',
          duration: 2000
        })
        return
      } */
      set.noticeForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            this.add()
          } else {
            this.update()
          }
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
      this.$refs.noticeForm.resetFields()
    },
    uploadSuccess(imgs) {
      this.noticeForm.thumbnail = imgs[imgs.length - 1]
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
    },
    getZFWlength(string) {
      // 定义一个计数器
      var Zcount = 0
      for (var i = 0; i < string.length; i++) {
        // 对每一位字符串进行判断，如果Unicode编码在0-127，计数器+1；否则+2
        if (string.charCodeAt(i) < 128 && string.charCodeAt(i) >= 0) {

        } else {
          Zcount++
        }
      }
      return Zcount
    }
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
