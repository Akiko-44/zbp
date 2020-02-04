<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="thirdForm"
               ref="thirdForm"
               :rules="rules"
               label-width="100px"
               class="listForm">
        <el-form-item label="名称:"
                      prop="catName">
          <el-input style="width: 220px;"
                    placeholder="请输入菜单名称，10字以内"
                    :maxlength="10"
                    :readonly="isBind"
                    v-model="thirdForm.catName"> </el-input>
        </el-form-item>
        <el-form-item label="图片" prop="categoryPic">
		      <el-card v-if="thirdForm.categoryPic" style="width:250px;" :body-style="{ padding: '0px' }">
	          <img :src="thirdForm.categoryPic | setImg" class="image" width="100%">
	          <div style="padding: 14px;">
	            <div class="bottom clearfix">
	              <el-button type="text" class="button" @click="delcategoryPic">删除</el-button>
	            </div>
	          </div>
	        </el-card>
	        <el-button v-else @click="cropShow = true" type="primary">上传</el-button>
		      <ImageCropper
	          ref="cropper"
	          v-model="cropShow"
	          :noCircle="true"
	          :noSquare="true"
	          :withCredentials="true"
	          imgFormat="jpg"
	          :width="500"
	          :height="500"
	          :prefix="prefix"
	          @crop-upload-success="uploadSuccess"
	        />
	        <span>数量：1张，规格：仅支持jpg、jpeg、png格式，大小：不超过2m，尺寸：500*500；</span>
		    </el-form-item>
        <el-form-item label="SKU:">
          <el-button type="primary"
                     class="select-btn sku-btn"
                     v-if="!skuSelectedList.length"
                     @click="openSkuDialog">立即关联</el-button>
          <el-button type="primary"
                     class="select-btn sku-btn"
                     v-if="skuSelectedList.length && !isBind"
                     @click="openSkuDialog">重新关联</el-button>

          <el-table :data="skuSelectedList"
                    v-if="skuSelectedList.length"
                    border
                    class="sku-selected-table"
                    ref="skuSelectedTable"
                    highlight-current-row
                    style="width: 500px;">
            <el-table-column property="specsName"
                             label="属性名称"
                             align="center"
                             width="150"></el-table-column>
            <el-table-column label="属性值"
                             align="center">
              <template slot-scope="{ row }">
                <span>{{getAttrValue(row.specsAttrsList)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label=" 款式:">
          <el-button type="primary"
                     v-if="!style"
                     class="select-btn"
                     @click="openStyleDialog">立即关联</el-button>
          <template v-else>
            <span>{{style}}</span>
            <el-button type="primary"
                       class="style-btn"
                       @click="openStyleDialog">重新关联</el-button>
          </template>
        </el-form-item>
        <el-form-item label="排序:"
                      prop="sortOrder">
          <el-input style="width: 220px;"
                    v-model.number="thirdForm.sortOrder"> </el-input>
        </el-form-item>
        <div class="button-box">
          <el-button class="btn cancel-btn"
                     v-waves
                     @click="cancel">取消</el-button>
          <el-button type="primary"
                     class="btn save-btn"
                     v-waves
                     :loading="loading"
                     @click="save">保存</el-button>
        </div>
      </el-form>
    </div>

    <sku-dialog ref="skuDialog"
                @selectSku="selectSku"></sku-dialog>
    <style-dialog ref="styleDialog"
                  @selectStyle="selectStyle"></style-dialog>

  </div>
</template>

<script>
import { saveThird } from '@/api/public/system'
import skuDialog from './skuDialog'
import styleDialog from './styleDialog'
import waves from '@/directive/waves' // 水波纹指令
import ImageCropper from '@/components/ImageCropper'

export default {
  directives: {
    waves
  },
  components: {
    skuDialog,
    styleDialog,
    ImageCropper
  },
  data() {
    return {
      isBind: false,
      loading: false,
      cropShow: false,
      prefix: 'category',
      thirdForm: {
        id: undefined,
        parentId: '',
        catLevel: '3',
        catName: '',
        sortOrder: 1,
        categoryPic: '',
        specsIdList: [],
        styleIdList: []
      },
      firstId: '',
      style: '',
      skuSelectedList: [],
      rules: {
        catName: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ],
        categoryPic: [
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
    this.firstId = this.$route.query.firstId
    if (this.$route.query.id) {
      this.thirdForm.parentId = this.$route.query.id
    } else if (this.$route.query.data) {
      this.thirdForm = JSON.parse(this.$route.query.data)
      this.skuSelectedList = this.thirdForm.specsList
      this.style = this.thirdForm.styleList.length ? this.thirdForm.styleList[0].styleName : ''
      this.thirdForm.styleIdList = this.thirdForm.styleList.length ? [this.thirdForm.styleList[0].id] : []
      this.isBind = !!this.$route.query.isBind
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    add() {
      this.loading = true
      saveThird(this.thirdForm).then(data => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: 'thirdCategoryList',
          query: { id: this.thirdForm.parentId, firstId: this.firstId }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.thirdForm.specsIdList = this.skuSelectedList.map(item => item.id)
      // this.thirdForm.sku = this.thirdForm.specsIdList.length ? this.thirdForm.specsIdList[0] : ''
      this.$refs.thirdForm.validate(valid => {
        if (valid) {
          this.add()
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
    uploadSuccess(key) {
      this.thirdForm.categoryPic = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    delcategoryPic(){
    	this.$delete(this.thirdForm, 'categoryPic')
    },
    openSkuDialog() {
      this.$refs.skuDialog.openDialog()
    },
    openStyleDialog() {
      this.$refs.styleDialog.openDialog()
    },
    selectSku(val) {
      this.skuSelectedList = val
    },
    selectStyle(val) {
      this.style = val.styleName
      this.thirdForm.styleIdList = [val.id]
      console.log(val)
      console.log(this.thirdForm)
    },
    getAttrValue(specsAttrsList) {
      const attrList = specsAttrsList.map(item => item.attrValue)
      return attrList.join(', ')
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入1-100的整数'))
        } else {
          if (value < 1 || value > 1000) {
            callback(new Error('请输入1-100的整数'))
          } else {
            callback()
          }
        }
      }, 200)
    }
  }
}
</script>

<style scoped lang="postcss">
.filter-container {
  position: relative;
}
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.button-box {
  margin-left: 100px;
}
.btn {
  width: 90px;
}
.select-btn {
  width: 220px;
}
.select-btn.sku-btn {
  margin-bottom: 24px;
}
.style-btn {
  margin-left: 20px;
}
</style>
