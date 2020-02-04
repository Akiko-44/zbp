<template>
<div class="block">
  <h4>优秀商品设置
    <span v-if="flag == 6 && caseType == 1">（现货）</span>
    <span v-if="flag == 6 && caseType == 2">（定制）</span>
  </h4>
  <el-form :model="form" ref="form" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column type="index" width="50" label="排序"></el-table-column>
        <el-table-column width="180px" align="center" label="商品ID">
          <template slot-scope="{ row }">
            <el-input v-model="row.caseId" placeholder="请输入商品ID"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card v-if="row.thumbnail" :body-style="{ padding: '0px' }">
              <img :src="row.thumbnail | setImg" class="image" width="100%" height="227">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="row.thumbnail = ''">删除</el-button>
                </div>
              </div>
            </el-card>
            <el-button v-else-if="flag == 6" @click="cropShow = true;width=178;height=226;currentIndex = $index" plain size="small">上传</el-button>
            <el-button v-else @click="cropShow = true;width=265;height=208;currentIndex = $index" plain size="small">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" class="button" @click="form.data.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-plus" @click="form.data.push({ caseId: '', thumbnail: '' })">添加</el-button>
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
import { getWorks, saveWorks } from '@/api/dm/homeSettings'
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  props: {
    flag: [String, Number],
    caseType: [String, Number]
  },
  data() {
    return {
      form: {
        data: []
      },
      cropShow: false,
      prefix: 'thumbnail',
      width: 178,
      height: 226,
      currentIndex: 1,
      loading: false,
      listLoading: false
    }
  },
  created() {
    this.listLoading = true
    getWorks(this.flag, this.caseType).then(result => {
      this.listLoading = false
      this.form.data = result.data
    }).catch(() => {
      this.listLoading = false
    })
  },
  methods: {
    save() {
      const dataLength = this.form.data.length
      const complateLength = this.form.data.filter(item => item.caseId && item.thumbnail).length

      if (!complateLength || dataLength !== complateLength) {
        this.$message({
          title: '警告',
          message: '请填写ID并上传缩略图',
          type: 'error'
        })
        return
      }

      this.loading = true
      saveWorks(this.form.data, this.flag, this.caseType).then(data => {
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
    uploadSuccess(key) {
      const item = this.form.data[this.currentIndex]
      // 第一批数据没有字段： thumbnail ，需要使用 splice 更新视图
      item.thumbnail = key
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
</style>