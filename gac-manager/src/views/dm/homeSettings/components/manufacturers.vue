<template>
  <div class="block">
    <h4>推荐商家
      <!-- <span v-if="flag == 1 && type == 1">（首饰大师工作室）</span>
      <span v-if="flag == 2 && type == 2">（玉雕大师工作室）</span>
      <span v-if="flag == 3 && type == 3">（制印工作室）</span>
      <span v-if="flag == 4 && type == 4">（品牌加工厂）</span>
      <span v-if="flag == 5 && type == 5">（智能加工厂）</span> -->
    </h4>
    <el-form
      :model="form"
      ref="form"
      label-width="0px"
    >
      <el-form-item>
        <el-table
          style="margin-bottom: 10px;"
          :data="form.data"
          border
          v-loading.body="listLoading"
        >
          <el-table-column
            type="index"
            width="50"
            label="排序"
          ></el-table-column>
          <el-table-column
            width="180px"
            align="center"
            label="制造商ID"
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.manuId"
                placeholder="请输入制造商ID"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="250px"
            align="center"
            label="缩略图"
          >
            <template slot-scope="{ row, $index }">
              <el-card
                v-if="row.thumbnail"
                :body-style="{ padding: '0px' }"
              >
                <img
                  :src="row.thumbnail | setImg"
                  class="image"
                  width="100%"
                >
                <div style="padding: 14px;">
                  <div class="bottom clearfix">
                    <el-button
                      type="text"
                      class="button"
                      @click="row.thumbnail = ''"
                    >删除</el-button>
                  </div>
                </div>
              </el-card>
              <el-button
                v-else
                @click="cropShow = true;width=235;height=155; currentIndex = $index"
                plain
                size="small"
              >上传</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="操作"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="text"
                class="button"
                @click="form.data.splice($index, 1)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          icon="el-icon-plus"
          @click="form.data.push({ manuId: '', thumbnail: '' })"
        >添加</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="save"
        >保存</el-button>
      </el-form-item>
    </el-form>

    <ImageCropper
      ref="cropper"
      v-model="cropShow"
      :noCircle="true"
      :noSquare="true"
      :withCredentials="true"
      imgFormat="jpg"
      :prefix="prefix"
      @crop-upload-success="uploadSuccess"
    />
  </div>
</template>

<script>
import { getManufacturers, saveManufacturers } from '@/api/dm/homeSettings'
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  props: {
    flag: [String, Number],
    type: [String, Number]
  },
  data() {
    return {
      form: {
        data: []
      },
      cropShow: false,
      prefix: 'thumbnail',
      width: 150,
      height: 150,
      currentIndex: 1,
      loading: false,
      listLoading: false
    }
  },
  created() {
    this.listLoading = true
    getManufacturers(this.flag).then(result => {
      this.listLoading = false
      this.form.data = result.data
    }).catch(() => {
      this.listLoading = false
    })
  },
  methods: {
    save() {
      const dataLength = this.form.data.length
      const complateLength = this.form.data.filter(item => item.manuId && item.thumbnail).length

      if (!complateLength || dataLength !== complateLength) {
        this.$message({
          title: '警告',
          message: '请填写ID并上传缩略图',
          type: 'error'
        })
        return
      }

      this.loading = true
      saveManufacturers(this.form.data, this.type).then(data => {
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
