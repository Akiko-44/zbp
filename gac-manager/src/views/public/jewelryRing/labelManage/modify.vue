<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="labelForm"
      :rules="rules"
      ref="labelForm"
      label-width="100px"
    >

      <el-form-item
        label="标签名称"
        prop="name"
      >
        <el-input
          style="width: 220px;"
          v-model="labelForm.name"
          :maxlength="4"
          placeholder="请输入标签名称，4字以内"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="背景颜色"
        prop="backgroundColor"
      >
        <span class="select-color">请选择背景颜色>></span>
        <el-color-picker v-model="labelForm.backgroundColor"></el-color-picker>
      </el-form-item>

      <el-form-item
        label="排列顺序"
        prop="sortOrder"
      >
        <el-input
          style="width: 220px;"
          type="number"
          maxlength="2"
          min="0"
          v-model.number="labelForm.sortOrder"
        ></el-input>
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
        >保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { contentLabelList, updateContentLabel } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'editlabelManage',
  directives: {
    waves
  },
  data() {
    return {
      id: this.$route.query.id,
      type: 'add',
      loading: false,
      labelForm: {
        id: undefined,
        name: '',
        backgroundColor: '#409EFF',
        sortOrder: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入标签名称',
            trigger: 'blur'
          }
        ],
        backgroundColor: [
          {
            required: true,
            message: '请选择背景颜色',
            trigger: 'blur'
          }
        ],
        sortOrder: [
          {
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }
        ]
      },
      editStatus: true
    }
  },
  created() {
    if (this.id) {
      contentLabelList({ id: this.id }).then(data => {
        this.labelForm.id = data.data.records[0].id
        this.labelForm.name = data.data.records[0].name
        this.labelForm.backgroundColor = data.data.records[0].backgroundColor
        this.labelForm.sortOrder = data.data.records[0].sortOrder
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
      updateContentLabel(this.labelForm).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'labelManage'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    update() {
      this.loading = true
      updateContentLabel(this.labelForm).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'labelManage'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.labelForm.validate(valid => {
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
    }
  }
}
</script>

<style scoped>
.select-color {
  vertical-align: top;
  color: #999;
}
</style>
