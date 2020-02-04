<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">

    <el-form-item label="回收标题" prop="recycleName">
      <el-input v-model="form.recycleName" placeholder="请输入回收标题"></el-input>
    </el-form-item>

    <el-form-item label="分类" prop="categoryId">
      <el-cascader
        :options="categories"
        v-model="selectedCategory"
        @change="handleChange"
        :props="{value: 'id', label: 'catName'}"
      >
      </el-cascader>
    </el-form-item>

    <el-form-item label="图片" prop="imgUrl">
      <el-row class="row" v-show="form.imgUrl">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.imgUrl | setImg" class="image" :style="getImageStyle()"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button type="text" icon="el-icon-delete" @click="handleDelete()"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
       <ImageUpload
        :multiple="false"
        prefix="swap"
        @successCBK="goodsUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="描述" prop="recycleDesc">
      <Tinymce :height="500" ref="editor" v-model="form.recycleDesc"></Tinymce>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import Tinymce from '@/components/Tinymce'
import { getGoodsDesc } from '@/api/swap/goods'
import { getObj, putObj } from '@/api/swap/recycleInfo'
import { category } from '@/utils/mixins/swap'
import { setImg } from '@/filters'

export default {
  directives: {
    waves
  },
  computed: {
  },
  data() {
    const rules = {
      recycleName: [
        {
          required: true,
          message: '请输入回收标题',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
      ],
      categoryId: [
        {
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }
      ],
      recycleDesc: [
        {
          required: true,
          message: '请填写描述',
          trigger: 'blur'
        }
      ],
      imgUrl: [
        {
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        }
      ]
    }

    return {
      rules,
      categories: [],
      selectedCategory: [],
      loading: false,
      form: {
        id: undefined,
        categoryId: undefined,
        recycleName: undefined,
        imgUrl: '',
        recycleDesc: ''
      },
      editStatus: true
    }
  },
  async beforeRouteEnter(to, from, next) {
    const queue = [
      category.get()
    ]
    if (to.query.id) {
      queue.push(getObj(to.query.id).then(data => data.data))
      queue.push(getGoodsDesc(to.query.id).then(data => data.data ? data.data.goodsDesc : ''))
    }
    const [categories, form, goodsDesc] = await Promise.all(queue)
    next(vm => {
      setTimeout(() => {
        vm.categories = categories
        if (form) {
          vm.form = form
          vm.form.goodsDesc = goodsDesc
          vm.selectedCategory = category.getParentId(vm.form.categoryId)
        }
      }, 10)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  methods: {
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
    handleDelete() {
      this.form.imgUrl = ''
    },
    getImageStyle() {
      return {
        backgroundImage: 'url(' + setImg(this.form.imgUrl, { w: 500 }) + ')'
      }
    },
    goodsUploadSuccess(imgs) {
      this.form.imgUrl = imgs[0].key
    },
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.swapble = +this.form.swapble
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: 'recyclingInfo' })
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
    handleChange(data) {
      this.form.categoryId = data[data.length - 1]
    }
  },
  components: {
    ImageUpload,
    Tinymce
  }
}
</script>

<style scoped>
.image{
  display: block;
  max-width: 100%;
  padding-bottom: 100%;
  height: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.row {
  position: relative;
  left: -20px;
  margin-top: 10px;
}
.col {
  margin-bottom: 20px;
  margin-left: 20px;
  max-width: 22.8%;
  max-height: 400px;
}
</style>
