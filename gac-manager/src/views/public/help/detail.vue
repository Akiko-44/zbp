<template>
    <div class="app-container" style="padding-right: 40px">
        <el-form :model="form" ref="form" label-width="120px">

            <h4 id="BaseInfo">文档信息：</h4>
            <el-form-item label="标题">
                <span>{{form.artTitle}}</span>
            </el-form-item>

            <el-form-item label="分类">
                <span style="display: none">{{form.categoryFid}} - {{form.categoryZid}}</span>
                <el-cascader
                        clearable
                        placeholder="全部分类"
                        :options="categories"
                        v-model="selectedCategory"
                        @change="handleCategoryChange"
                        :props="{value: 'id', label: 'name'}"
                />
            </el-form-item>

            <el-form-item label="内容">
                <Tinymce :height="500" ref="editor" v-model="form.articleDesc"></Tinymce>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
  import { getObj } from '@/api/public/help'
  import Tinymce from '@/components/Tinymce'
  import { category } from '@/utils/mixins/help'

  export default {
    props: {

    },
    components: {
      Tinymce
    },
    data() {
      return {
        form: {},
        categories: [],
        category: null,
        selectedCategory: []
      }
    },
    async beforeRouteEnter(to, from, next) {
      const form = await getObj(to.query.id).then(data => data.data)
      next(vm => {
        setTimeout(() => {
          vm.form = form
          vm.selectedCategory = category.getParentId(vm.form.categoryZid)
        }, 10)
      })
    },
    created() {
      category.get().then(data => (this.categories = data))
    },
    methods: {
      handleCategoryChange(data) {
        this.category = data[data.length - 1]
      }
    }
  }
</script>
<style lang="scss" scoped>
    .image {
        display: block;
        max-width: 100%;
        height: 200px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .danger {
        color: #F56C6C;
    }
    .el-col-6 {
        margin-bottom: 20px;
    }
</style>


