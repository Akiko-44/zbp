<template>
<div class="block">
  <h4>首饰设计师</h4>
  <el-form :model="form1" ref="form1" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form1.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column type="index" width="50" label="排序"></el-table-column>
        <el-table-column width="180px" align="center" label="设计师ID">
          <template slot-scope="{ row }">
            <el-input v-model="row.designerId" placeholder="请输入设计师ID"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card v-if="row.thumbnail" :body-style="{ padding: '0px' }">
              <img :src="row.thumbnail | setImg" class="image" width="100%">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="row.thumbnail = ''">删除</el-button>
                </div>
              </div>
            </el-card>
            <el-button v-else @click="cropShow = true;width=168;height=265; currentIndex = $index; imgData = form1.data" plain size="small">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" class="button" @click="form1.data.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-plus" @click="form1.data.push({ designerId: '', thumbnail: '', source: 1})">添加</el-button>
      <el-button type="primary" :loading="loading" @click="save(form1.data)">保存</el-button>
    </el-form-item>
  </el-form>
  
  <!--<h4>玉雕大师</h4>
  <el-form :model="form2" ref="form2" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form2.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column type="index" width="50" label="排序"></el-table-column>
        <el-table-column width="180px" align="center" label="设计师ID">
          <template slot-scope="{ row }">
            <el-input v-model="row.designerId" placeholder="请输入设计师ID"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card v-if="row.thumbnail" :body-style="{ padding: '0px' }">
              <img :src="row.thumbnail | setImg" class="image" width="100%">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="row.thumbnail = ''">删除</el-button>
                </div>
              </div>
            </el-card>
            <el-button v-else @click="cropShow = true;width=168;height=265;  currentIndex = $index; imgData = form2.data" plain size="small">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" class="button" @click="form2.data.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-plus" @click="form2.data.push({ designerId: '', thumbnail: '', source: 2})">添加</el-button>
      <el-button type="primary" :loading="loading" @click="save(form2.data)">保存</el-button>
    </el-form-item>
  </el-form>
  
  <h4>国外设计师</h4>
  <el-form :model="form3" ref="form3" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form3.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column type="index" width="50" label="排序"></el-table-column>
        <el-table-column width="180px" align="center" label="设计师ID">
          <template slot-scope="{ row }">
            <el-input v-model="row.designerId" placeholder="请输入设计师ID"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card v-if="row.thumbnail" :body-style="{ padding: '0px' }">
              <img :src="row.thumbnail | setImg" class="image" width="100%">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="row.thumbnail = ''">删除</el-button>
                </div>
              </div>
            </el-card>
            <el-button v-else @click="cropShow = true;width=265;height=178;  currentIndex = $index; imgData = form3.data" plain size="small">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" class="button" @click="form3.data.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-plus" @click="form3.data.push({ designerId: '', thumbnail: '', source: 3})">添加</el-button>
      <el-button type="primary" :loading="loading" @click="save(form3.data)">保存</el-button>
    </el-form-item>
  </el-form>
  
  <h4>设计爱好者</h4>
  <el-form :model="form4" ref="form4" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form4.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column type="index" width="50" label="排序"></el-table-column>
        <el-table-column width="180px" align="center" label="设计师ID">
          <template slot-scope="{ row }">
            <el-input v-model="row.designerId" placeholder="请输入设计师ID"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card v-if="row.thumbnail" :body-style="{ padding: '0px' }">
              <img :src="row.thumbnail | setImg" class="image" width="100%">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="row.thumbnail = ''">删除</el-button>
                </div>
              </div>
            </el-card>
            <el-button v-else @click="cropShow = true;width=265;height=178;  currentIndex = $index; imgData = form4.data" plain size="small">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" class="button" @click="form4.data.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-plus" @click="form4.data.push({ designerId: '', thumbnail: '', source: 4})">添加</el-button>
      <el-button type="primary" :loading="loading" @click="save(form4.data)">保存</el-button>
    </el-form-item>
  </el-form>-->

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
import { getDesigners, saveDesigners } from '@/api/dm/homeSettings'
import ImageCropper from '@/components/ImageCropper'

export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      form1: {
        data: []
      },
      form2: {
        data: []
      },
      form3: {
        data: []
      },
      form4: {
        data: []
      },
      imgData: [],
      cropShow: false,
      prefix: 'thumbnail',
      width: 325,
      height: 225,
      currentIndex: 1,
      loading: false,
      listLoading: false
    }
  },
  created() {
    this.listLoading = true
    getDesigners().then(result => {
      this.listLoading = false
      const self = this
      result.data.forEach(function(v) {
        if(v.source == 1){
          self.form1.data.push({
            designerId: v.designerId,
            thumbnail: v.thumbnail,
            source:1
          })
        }else if(v.source == 2) {
          self.form2.data.push({
            designerId: v.designerId,
            thumbnail: v.thumbnail,
            source: 2
          })
        }else if(v.source == 3) {
          self.form3.data.push({
            designerId: v.designerId,
            thumbnail: v.thumbnail,
            source: 3
          })
        }else if(v.source == 4) {
          self.form4.data.push({
            designerId: v.designerId,
            thumbnail: v.thumbnail,
            source: 4
          })
        }
      })
    }).catch(() => {
      this.listLoading = false
    })
  },
  methods: {
    save(data) {
      const dataLength = data.length
      const complateLength = data.filter(item => item.designerId && item.thumbnail).length

      if (!complateLength || dataLength !== complateLength) {
        this.$message({
          title: '警告',
          message: '请填写ID并上传缩略图',
          type: 'error'
        })
        return
      }

      this.loading = true
      saveDesigners(data).then(data => {
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
      this.imgData[this.currentIndex].thumbnail = key
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