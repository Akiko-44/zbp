
<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">

    <el-form-item label="文章标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>

    <el-form-item label="副标题" prop="subtitle">
      <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
    </el-form-item>

    <!-- <el-form-item label="排序" prop="orderNum">
      <el-input v-model.number="form.orderNum" type="number" maxlength="2" placeholder="请输入排序"></el-input>
    </el-form-item> -->
    <el-form-item label="所属栏目" prop="type">
      <el-select v-model="form.type" clearable placeholder="所属栏目">
        <el-option
          v-for="item in categroies"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="缩略图" prop="thumbnail">
      <el-card v-if="form.thumbnail" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.thumbnail | setImg" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.thumbnail = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.thumbnail"
        :multiple="false"
        prefix="news"
        @successCBK="uploadSuccess"
      />
    </el-form-item>

    <el-form-item label="关键字" prop="keyword">
      <el-input v-model="form.keyword" placeholder='如不填写自动获取，手动填写请用","分开'></el-input>
    </el-form-item>

    <el-form-item label="内容摘要" prop="summary">
      <el-input
        type="textarea" :autosize="{ minRows: 3, maxRows: 5}"
        v-model="form.summary"
      >
      </el-input>
    </el-form-item>

    <el-form-item label="正文内容" prop="content">
      <Tinymce :height="500" ref="editor" v-model="form.content"></Tinymce>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">提交审核</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {
  putObj,
  getObj
} from '@/api/gallery/subject'
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import Tinymce from '@/components/Tinymce'

export default {
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      categroies: [{
        value: 1,
        label: '精品专题'
      }, {
        value: 2,
        label: '玉雕臻选'
      }, {
        value: 3,
        label: '流行风尚'
      }],
      form: {
        id: undefined,
        title: '',
        subtitle: '',
        thumbnail: '',
        keyword: '',
        summary: '',
        content: '',
        type: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        subtitle: [
          {
            required: true,
            message: '请输入子标题',
            trigger: 'blur'
          }
        ],
        summary: [
          {
            required: true,
            message: '请填写内容摘要',
            trigger: 'blur'
          }
        ],
        thumbnail: [
          {
            required: true,
            message: '请上传缩略图',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请填写正文内容',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择所属栏目',
            trigger: 'change'
          }
        ]
      },
      editStatus: true
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async beforeRouteEnter(to, from, next) {
    let form
    if (to.query.id) {
      form = await getObj(to.query.id).then(data => data.data)
    }
    next(vm => {
      setTimeout(() => {
        if (form) {
          vm.form = form
          if (typeof (form.propIds) === 'string') {
            form.propIds = []
          }
          if (typeof (form.properties) === 'string') {
            form.properties = []
          }
        }
      }, 10)
    })
  },
  methods: {
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'list'
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
          this.loading = false
          return false
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    },
    uploadSuccess(imgs) {
      this.form.thumbnail = imgs[imgs.length - 1].key
    },
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
        // 有 BUG
        // this.$confirm(`确定要放弃当前的操作吗？`, '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // })
        //   .then(() => {
        //     next()
        //   })
        // next(false)
      } else {
        next()
      }
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
