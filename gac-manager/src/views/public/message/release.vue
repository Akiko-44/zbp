
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
    putObj
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
      const [categories, form] = await Promise.all(queue)

      next(vm => {
        setTimeout(() => {
          vm.categories = categories
          if (form) {
            delete form.propIds
            delete form.props
            delete form.columns
            vm.form = form
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
        const num = this.getZFWlength(this.form.content)
        if(num > 250){
          this.$message({
            message: '消息内容最多250个字',
            type: 'error',
            duration: 2000
          })
          return
        }
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
      },
      getZFWlength(string){
        //定义一个计数器
        var Zcount = 0;
        for(var i=0;i<string.length;i++){
            //对每一位字符串进行判断，如果Unicode编码在0-127，计数器+1；否则+2
            if(string.charCodeAt(i)<128 && string.charCodeAt(i)>=0 ){
                
            }else{
                Zcount++;
            }
        }
        return Zcount;
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
