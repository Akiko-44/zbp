<template>
	<div>
    <el-dialog title="参展店铺修改" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="100px">
        <el-form-item label="参展店铺名">
          <span>{{merchantName}}</span>
        </el-form-item>
        <el-form-item label="店铺ID">
          <span>{{merchantId}}</span>
        </el-form-item>
        <el-form-item label="参展图片">
          <el-row class="row" v-if="list.length">
            <el-col class="col" :span="10" v-for="(item, index) in list" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <a target="_blank" :href="item.imgUrl | setImg" class="image" :style="getImageStyle(item.imgUrl)"></a>
                <div style="padding: 14px;">
                  <p>图片名称：{{item.imgName}}</p>
                  <p>图片描述：{{item.imgDesc}}</p>
                  <div class="bottom clearfix">
                    <el-button type="text" icon="el-icon-edit" @click="handleUpdate(item, index)"></el-button>
                    <el-button type="text" icon="el-icon-delete" @click="handleDelete(item, index)"></el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-button type="primary" @click="handleAdd">添加图片</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">确定</el-button>
      </div>
    </el-dialog>

    <EditShopPicDialog ref="dialog" @success="success" />
  </div>
</template>

<script>
import { setImg } from '@/filters'

import {
  delDetailMerPic,
  getDetailMerPic
} from '@/api/aggregate/exhibition'
import EditShopPicDialog from './editShopPicDialog'

export default {
  props: {
    merchantName: String,
    merchantId: String,
    exhibitionId: String
  },
  components: {
    EditShopPicDialog
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      list: [],
      index: undefined
    }
  },
  methods: {
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('form')
    },
    success(data) {
      this.loading = false
      getDetailMerPic(this.merchantId).then(response => {
        this.list = response.data
      })
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    handleAdd() {
      const dialog = this.$refs.dialog

      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form.id = undefined
        dialog.form.merchantId = this.merchantId
        dialog.form.exhibitionId = this.exhibitionId
      })
      this.index = this.list.length
    },
    handleDelete(row) {
      this.$confirm(`确定删除此图片？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delDetailMerPic(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
        })
    },
    handleUpdate(data, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
      })
      this.index = index
    }
  }
}
</script>

<style scoped>
.image{
  display: block;
  max-width: 100%;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.row {
  position: relative;
  left: -20px;
  margin-top: 10px;
}
.col {
  margin-bottom: 20px;
  margin-left: 20px;
  max-height: 400px;
}
.col p {
  margin: 0;
  height: 39px;
  line-height: 19px;
  word-break: break-all;
  font-size: 14px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

