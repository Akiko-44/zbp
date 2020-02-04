<template>
  <div class="app-container" style="padding-right: 40px">
      <el-form>
        <el-form-item style="text-align: center">
          <span>{{ form.title }}</span>
        </el-form-item>

        <el-form-item style="border: 1px solid #ddd;padding: 0 20px;">
            <!--<Tinymce :height="500" ref="editor" v-model="form.content"></Tinymce>-->
            <p v-html="form.content"></p>
        </el-form-item>
        <el-button @click="back" icon='arrow-left' class="pan-back-btn"  style="display: block;margin: 0 auto;">返回</el-button>
      </el-form>
    </div>
</template>

<script>
import { domain } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import {
  getObj
} from '@/api/public/feedback'

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      domain,
      form: {
        title: [],
        content: ''
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObj(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/list' })
      } else {
        this.$router.go(-1)
      }
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
.merVoData {
  padding-top: 10px;
  line-height: 22px;
  p {
    margin: 0;
    color: #606266;
  }
}
</style>


