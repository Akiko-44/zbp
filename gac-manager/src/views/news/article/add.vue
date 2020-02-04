
<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">

    <el-form-item label="文章标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
    </el-form-item>

    <!-- <el-form-item label="排序" prop="orderNum">
      <el-input v-model.number="form.orderNum" type="number" maxlength="2" placeholder="请输入排序"></el-input>
    </el-form-item> -->

    <!-- <el-form-item label="自定义属性" prop="propIds">
      <el-checkbox-group v-model="form.propIds">
        <el-checkbox :key="prop.id" v-for="prop in props" :label="prop.id">
          {{prop.name}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item> -->

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
      /><span style="color: #FF0000;">数量：1张，规格：仅支持jpg、jpeg、png格式，大小：不超过2m</span>
    </el-form-item>

    <el-form-item label="所属栏目" prop="columnId">
      <el-cascader
        :options="categories"
        v-model="selectedCategory"
        @change="handleCategoryChange"
        :change-on-select="true"
        :props="{value: 'id', label: 'name'}"
      />
    </el-form-item>

    <el-form-item label="关键字" prop="keyword">
      <el-input v-model="form.keyword" placeholder='关键字请用","分开'></el-input>
    </el-form-item>

    <el-form-item label="内容摘要" prop="summary">
      <el-input
        type="textarea" :autosize="{ minRows: 3, maxRows: 5}"
        v-model="form.summary"
      >
      </el-input>
    </el-form-item>

    <el-form-item label="来源" prop="source">
      <el-input v-model="form.source" placeholder="请输入来源"></el-input>
    </el-form-item>

    <el-form-item label="正文内容" prop="content">
      <Tinymce :height="500" ref="editor" v-model="form.content"></Tinymce>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save('1')">提交审核</el-button>
     <!-- <el-button type="primary" :loading="loading" @click="save('0')">存草稿</el-button>-->
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {
  putObj,
  getObj
} from '@/api/news/article'
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import { category } from '@/utils/mixins/news'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'acticleAdd',
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      categories: [],
      selectedCategory: [],
      form: {
        id: undefined,
        title: '',
        subtitle: '',
        thumbnail: '',
        columnId: undefined,
        keyword: '',
        summary: '',
        content: '正文内容不超过20000个字节',
        source: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 60,
            message: '长度在 2 到 60 个字符',
            trigger: 'blur'
          }
        ],
        columnId: [
          {
            required: true,
            message: '请选择栏目',
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
          },
          {
          	min: 2,
            max: 20000,
            message: '长度在 2 到 20000 个字符以内',
            trigger: 'blur'
          }
        ],
        keyword: [
          {
            required: true,
            message: '请填写关键字',
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
  async beforeRouteEnter(to, from, next) {
    const queue = [
      category.get()
    ]
    if (to.query.id) {
      queue.push(getObj(to.query.id).then(data => data.data))
    }
    const [categories, form] = await Promise.all(queue)
    next(vm => {
      setTimeout(() => {
        vm.categories = categories
        if (form) {
          delete form.propIds
          delete form.props
          delete form.columns
          vm.form = form
          vm.selectedCategory = category.getParentId(vm.form.columnId)
        }
      }, 10)
    })
  },
  methods: {
    save(id) {
      const set = this.$refs
      this.form.publicStatus = id
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
              name: 'article'
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
    },
    handleCategoryChange(data) {
      this.form.columnId = data[data.length - 1]
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
