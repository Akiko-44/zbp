
<template>
    <div class="app-container" style="padding-right: 40px">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">

            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="正文内容" prop="content">
                <Tinymce :height="500" ref="editor" v-model="form.content"></Tinymce>
            </el-form-item>

            <el-form-item label="发布位置">
                <el-checkbox-group v-model="checked" @change="test">
                    <el-checkbox v-for="item in checkList" :key="item.id" :label="item.id">{{item.menu}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loading" @click="save()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {
    getObj,
    editObj
  } from '@/api/public/message'
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
        checked: [],
        checkList: [
          {
            id: '0',
            menu: 'PC'
          }, {
            id: '1',
            menu: 'APP'
          }, {
            id: '2',
            menu: '珠宝店商家'
          }, {
            id: '3',
            menu: '设计室商家'
          }, {
            id: '4',
            menu: '制造间商家'
          }
        ],
        form: {
          id: undefined,
          title: '',
          position: '',
          content: ''
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入标题',
              trigger: 'blur'
            },
            {
              min: 0,
              max: 20,
              message: '长度在 0 到 20 个字符',
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
              min: 0,
              max: 1000,
              message: '长度在 0 到 1000 个字符',
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

      ]
      if (to.query.id) {
        queue.push(getObj(to.query.id).then(data => data.data))
      }
      const [form] = await Promise.all(queue)

      next(vm => {
        setTimeout(() => {
          if (form) {
            delete form.propIds
            delete form.props
            delete form.columns
            vm.form = form
            const v = form.position.split(',')
            let i
            for (i = 0; i < v.length; i++) {
              vm.checked.push(v[i])
            }
          }
        }, 10)
      })
    },
    methods: {
      test() {
        this.form.position = this.checked.join(',')
      },
      save() {
        const set = this.$refs
        set.form.validate(valid => {
          if (valid) {
            this.loading = true
            editObj(this.form).then(data => {
              this.editStatus = false
              this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push({
                name: 'msglist'
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
