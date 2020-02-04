<template>
<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="ruleForm" style="width: 50%;">
    <el-form-item label="路径编码" prop="code">
      <el-input v-model="form.code" placeholder="请输入路径编码"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model="form.icon" placeholder="请输入图标"></el-input>
    </el-form-item>
    <el-form-item label="资源路径" prop="href">
      <el-input v-model="form.href" placeholder="请输入资源路径"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select class="filter-item" v-model="form.type" placeholder="请输入资源请求类型">
        <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序" prop="orderNum">
      <el-input v-model.number="form.orderNum" type="number" maxlength="2" placeholder="请输入排序"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item label="前端组件" prop="attr1">
      <el-input v-model="form.attr1" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item v-if="formStatus == 'update'">
      <el-button type="primary" @click="update">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
    <el-form-item v-if="formStatus == 'create'">
      <el-button type="primary" @click="create">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
import { addObj, putObj } from '@/api/admin/menu'

export default {
  name: 'menuAdd',
  components: {
  },
  data() {
    return {
      formStatus: '',
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      typeOptions: ['menu', 'dirt'],
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: 1,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: 'menu',
        attr1: 'Layout'
      },
      rules: {
        code: [
          { required: true, message: '请输入路径编码', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        href: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入图标', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入资源请求类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.form.id = undefined
          addObj(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.success()
            })
        } else {
          return false
        }
      })
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.success()
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    success() {
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
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