
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <label class="filter-label">品牌名称：</label>
    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listParams.brandName"> </el-input>
    &nbsp;
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
    &nbsp;
    <el-button type="primary" v-waves @click="showDialog">新增品牌</el-button>
  </div>
  <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    
    <el-table-column align="center" label="品牌名称">
      <template slot-scope="{ row }">
        <span>{{row.brandName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          type="success"
          @click="showDialog($index)"
        >
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

  <el-dialog title="设置品牌" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="品牌名称">
        <el-input v-model="form.brandName"> </el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sortOrder"> </el-input>
      </el-form-item>
      <el-form-item label="添加图片" prop="pic">
        <el-row class="row" v-show="form.pic">
          <el-col class="col" :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank" :href="form.pic | setImg" class="image" :style="getImageStyle(form.pic)"></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="form.pic = ''">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <ImageUpload
          v-show="!form.pic"
          :multiple="false"
          width='400'
          height='400'
          prefix="dm-pic"
          @successCBK="picUploadSuccess"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  putObj,
  delObj,
  getQiniu
} from '@/api/swap/homeSettings'
import waves from '@/directive/waves' // 水波纹指令
import { domain } from '@/api/qiniu'
import ImageUpload from '@/components/Upload/custom'
import { setImg } from '@/filters'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload
  },
  data() {
    return {
      domain,
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      index: undefined,
      editStatus: true,
      dialogFormVisible: false,
      form: {
        moduleType: 2,
        pic: ''
      },
      rules: {
        pic: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  watch: {
    pic(value) {
      this.form.pic = value
    }
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    picUploadSuccess(imgs) {
      this.form.pic = imgs
    },
    getList() {
      this.listLoading = true
      page(this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前品牌？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
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
    async showDialog(index) {
      if(typeof(index) === 'number'){
        this.form.brandName = this.list[index].brandName
        this.form.sortOrder = this.list[index].sortOrder
        this.form.pic = this.list[index].pic
        this.form.id = this.list[index].id
      }else{
        this.form.brandName = ''
        this.form.sortOrder = ''
        this.form.pic = ''
      }
      
      this.dialogFormVisible = true
    },
    cancel(formName) {
      this.dialogFormVisible = false
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
