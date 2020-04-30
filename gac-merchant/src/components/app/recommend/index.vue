<template>
<div class="block">
  <h4>{{title}}</h4>
  <el-form :model="form" ref="form" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column width="180px" align="center" :label="title + 'ID'">
          <template slot-scope="{ row }">
            <el-input v-model="row[fields.id]" :placeholder="'请输入'+ title +'ID'"></el-input>
          </template>
        </el-table-column>
        <slot />
        <el-table-column width="100px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card class="card" v-if="row[fields.thumbnail]" :body-style="{ padding: '0px' }">
              <img :src="row[fields.thumbnail] | setImg" class="image" width="100%" style="display: block;">
              <div class="actions">
                <el-button icon="el-icon-delete" type="text" class="button" @click="row[fields.thumbnail] = ''"></el-button>
              </div>
            </el-card>
            <el-button v-else @click="cropShow = true; currentIndex = $index" plain size="small">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" class="button" @click="form.data.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="!isVaild" @click="add">添加</el-button>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </el-form-item>
  </el-form>

  <ImageCropper
    ref="cropper"
    v-model="cropShow"
    :noCircle="true"
    :noSquare="true"
    :withCredentials="true"
    imgFormat="jpg"
    :width="width"
    :height="height"
    :prefix="prefix"
    @crop-upload-success="uploadSuccess"
  />
</div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  props: {
    title: String,
    fields: {
      type: Object,
      default: () => {
        return {
          id: 'id',
          thumbnail: 'thumbnail'
        }
      }
    },
    getData: Function,
    setData: Function,
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 800
    },
    min: {
      type: Number,
      default: 0
    }
  },
  components: {
    ImageCropper
  },
  data() {
    return {
      form: {
        data: []
      },
      cropShow: false,
      prefix: 'thumbnail',
      currentIndex: 1,
      loading: false,
      listLoading: false
    }
  },
  created() {
    this.listLoading = true
    this.getData().then(result => {
      this.listLoading = false
      this.form.data = result.data
    }).catch(() => {
      this.listLoading = false
    })
  },
  computed: {
    isVaild() {
      return this.min === 0 || (this.min && this.min === this.form.data.length)
    }
  },
  methods: {
    add() {
      this.form.data.push({ [this.fields.id]: '', [this.fields.thumbnail]: '' })
    },
    save() {
      const dataLength = this.form.data.length
      const complateLength = this.form.data.filter(item => item[this.fields.id] && item[this.fields.thumbnail]).length

      if (!this.isVaild) {
        this.$message({
          title: '警告',
          message: `请至少添加${this.min}个`,
          type: 'error'
        })
        return
      }

      if (!complateLength || dataLength !== complateLength) {
        this.$message({
          title: '警告',
          message: '请填写ID并上传缩略图',
          type: 'error'
        })
        return
      }

      this.loading = true
      this.setData(this.form.data).then(data => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    uploadSuccess({ key }) {
      const item = this.form.data[this.currentIndex]
      // 第一批数据没有字段： thumbnail ，需要使用 splice 更新视图
      item[this.fields.thumbnail] = key
      this.form.data.splice(this.currentIndex, 1, item)
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    }
  }
}
</script>


<style scoped>
.block {
  margin: 20px;
  width: 959px;
}
.card {
  position: relative;
}
.actions {
  position: absolute;
  bottom: 0px;
  right: 8px;
}
</style>