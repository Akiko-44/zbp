
<template>
    <div class="app-container" style="padding-right: 40px">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">

            <el-form-item label="标题" prop="artTitle">
                <el-input v-model="form.artTitle" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="分类" prop="categoryZid">
                <el-cascader
                        :options="categories"
                        v-model="selectedCategory"
                        @change="handleCategoryChange"
                        :props="{value: 'id', label: 'name'}"
                />
            </el-form-item>

            <el-form-item label="正文内容" prop="articleDesc">
                <Tinymce :height="500" ref="editor" v-model="form.articleDesc"></Tinymce>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loading" @click="save(0)">保存草稿</el-button>
                <el-button type="primary" :loading="loading" @click="save(1)">保存并发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {
    getObj,
    putObj
  } from '@/api/public/help'
  import waves from '@/directive/waves' // 水波纹指令
  import ImageUpload from '@/components/Upload'
  import { category } from '@/utils/mixins/help'
  import Tinymce from '@/components/Tinymce'

  export default {
    name: 'editDocument',
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
          artTitle: '',
          articleType: undefined,
          articleDesc: '',
          categoryFid: undefined,
          categoryZid: undefined
        },
        rules: {
          artTitle: [
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
          categoryZid: [
            {
              required: true,
              message: '请选择栏目',
              trigger: 'blur'
            }
          ],
          articleDesc: [
            {
              required: true,
              message: '请填写正文内容',
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
            vm.selectedCategory = category.getParentId(vm.form.categoryZid)
          }
        }, 10)
      })
    },
    methods: {
      save(type) {
        if (type === 0) {
          this.form.articleType = 0
        } else if (type === 1) {
          this.form.articleType = 1
        }
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
                name: 'index'
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
      handleCategoryChange(data) {
        this.form.categoryFid = data[0]
        this.form.categoryZid = data[1]
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
