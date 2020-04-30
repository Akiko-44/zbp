<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px"
    >
      <el-form-item label="商家名称">
        <span>{{ form.merchantName }}</span>
        <!-- <el-input
          v-if="!type"
          v-model.trim="form.merchantName"
          placeholder="请输入商家名称"
        ></el-input> -->
        <el-button
          v-if="!type"
          type="text"
          class="modify-btn"
          @click="openEnterpriseDialog"
        >修改</el-button>
      </el-form-item>

      <el-form-item
        label="商家图片"
        prop="merchantPic"
      >
        <el-card
          v-if="form.merchantPic"
          style="width:150px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.merchantPic | setImg"
            class="image"
            width="100%"
          />
          <div
            style="padding: 0 14px;"
            v-if="!type"
          >
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'merchantPic')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="cropShow = true"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="540"
          :height="784"
          prefix="shop"
          @crop-upload-success="uploadSuccess"
        />
        <div class="tip">尺寸540*784，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>

      <el-form-item
        label="推荐描述"
        prop="recommendDetail"
      >
        <span v-if="type">{{ form.recommendDetail }}</span>
        <el-input
          v-else
          v-model.trim="form.recommendDetail"
          placeholder="请输入推荐描述"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="显示排序"
        prop="sortOrder"
      >
        <span v-if="type">{{ form.sortOrder }}</span>
        <el-input
          v-else
          type="number"
          :min="1"
          :max="1"
          placeholder="请输入数字进行排序，数字越低的排序越靠前,相同数字的最新修改的排名靠前"
          v-model.number="form.sortOrder"
        >
        </el-input>
        <div class="tip">排序仅针对移动端</div>
      </el-form-item>

      <el-form-item
        label="商品信息"
        prop="selectedGoods"
      >
        <el-button
          type="primary"
          class="btn select-btn"
          v-if="!type"
          :disabled="selectedGoods.length > 3"
          @click="openGoodsDialog(selectedGoods.length)"
        >添加</el-button>
      </el-form-item>

      <!-- <el-form-item> -->
      <el-table
        :data="selectedGoods"
        ref="goodsTable"
        border
        highlight-current-row
        class="table-box"
      >
        <el-table-column
          align="center"
          label="商品信息"
          width="400"
        >
          <template slot-scope="{ row }">
            <div class="selected-goods">
              <img :src="row.imgUrl" />
              <div class="goods-info">
                <div class="goods-name">{{ row.goodsName }}</div>
                <div class="goods-num">
                  <p>商品ID：{{ row.id }}</p>
                  <p>
                    <span>销售量：{{ row.goodsSaleCount || 0 }}</span>&nbsp;&nbsp;
                    <span>收藏量：{{ row.goodsSaleCount || 0 }}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="categoryName"
          label="商品分类"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sortOrder"
          label="显示排序"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          property="onSaleTime"
          label="上架时间"
          width="120"
        ></el-table-column>
        <el-table-column
          fixed="right"
          align="left"
          label="操作"
          v-if="!type"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              class="auditBtn"
              size="small"
              type="primary"
              @click="openGoodsModify(row, $index)"
            >编辑</el-button>
            <el-button
              class="auditBtn"
              size="small"
              type="danger"
              @click="delGoods($index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-form-item> -->

      <el-form-item>
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="update('form')"
        >确 定</el-button>
      </el-form-item>
    </el-form>

    <enterprise-dialog
      ref="enterpriseDialog"
      @selectEnterprise="selectEnterprise"
    ></enterprise-dialog>
    <goods-dialog
      ref="goodsDialog"
      @selectGoods="selectGoods"
    ></goods-dialog>
    <goods-modify-dialog
      ref="goodsModifyDialog"
      @saveGoods="saveGoods"
      @openGoodsDialog="openGoodsDialog"
    ></goods-modify-dialog>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import {
  saveHomeModuleMerchant,
  getHomeModuleMerchant
} from '@/api/public/system'
import enterpriseDialog from './components/chooseEnterprise'
import goodsDialog from './components/chooseGoods'
import goodsModifyDialog from './components/modifyGoods'

export default {
  components: {
    ImageCropper,
    enterpriseDialog,
    goodsDialog,
    goodsModifyDialog
  },
  data() {
    return {
      type: '',
      cropShow: false,
      loading: false,
      queryData: {},
      form: {
        id: undefined,
        merchantId: undefined,
        name: '',
        merchantName: '',
        recommendDetail: '',
        sortOrder: '',
        linkType: 1,
        linkTypeId: '',
        merchantPic: '',
        selectedGoods: []
      },
      selectedGoods: [],
      rules: {
        merchantPic: [
          { required: true, message: '请选择商家图片', trigger: 'blur' }
        ],
        recommendDetail: [
          { required: true, message: '请输入推荐描述', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ],
        selectedGoods: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个商品',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    if (this.$route.query.data) {
      this.queryData = JSON.parse(this.$route.query.data)
      this.form = this.queryData.moduleRelationList[this.queryData.index]
      this.form.merchantId = this.form.id
      this.getHomeModuleMerchant()
    }
  },
  methods: {
    // 获取商家绑定商品
    getHomeModuleMerchant() {
      getHomeModuleMerchant({ merchantId: this.form.merchantId }).then(data => {
        this.selectedGoods = data.data
      })
    },
    // 选择店铺弹框
    openEnterpriseDialog() {
      this.$refs.enterpriseDialog.dialogTableVisible = true
      this.$refs.enterpriseDialog.getList()
    },
    selectEnterprise(selectedObj) {
      selectedObj.merchantId = selectedObj.id
      selectedObj.merchantName = selectedObj.name
      selectedObj.goodsNum = selectedObj.goodsCount
      selectedObj.saleNum = selectedObj.goodsSaleCount
      selectedObj.merchantPic = selectedObj.logo
      this.form = selectedObj
      // this.selectedGoods = []
      this.getHomeModuleMerchant()
    },
    // 选择商品弹框
    openGoodsDialog(index) {
      this.$refs.goodsDialog.dialogTableVisible = true
      this.$refs.goodsDialog.getList()
      this.$refs.goodsDialog.listParams.merchantId = this.form.merchantId
      this.$refs.goodsDialog.index = index
    },
    selectGoods(selectedObj) {
      // this.selectedGoods.push(selectedObj)
      this.$set(this.selectedGoods, selectedObj.index, selectedObj)
      this.openGoodsModify(selectedObj, selectedObj.index)
    },
    // 编辑商品弹框
    openGoodsModify(data, index) {
      this.$refs.goodsModifyDialog.dialogTableVisible = true
      this.$refs.goodsModifyDialog.form = data
      // if (this.form.name) {
      //   this.$refs.goodsModifyDialog.form.merchantName = this.form.name
      // }
      this.$refs.goodsModifyDialog.form.index = index
    },
    saveGoods(selectedObj) {
      // this.selectedGoods[selectedObj.index] = selectedObj
      this.$set(this.selectedGoods, selectedObj.index, selectedObj)
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        setTimeout(() => {
          cb && cb()
        })
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    update(formName) {
      this.form.selectedGoods = this.selectedGoods
      this.$refs[formName].validate(valid => {
        if (valid) {
          let moduleRelationIds = []
          this.selectedGoods.map(item => {
            item.goodsId = item.id
            item.goodsPic = item.imgUrl
            moduleRelationIds.push(item.goodsId)
          })
          moduleRelationIds = [...new Set(moduleRelationIds)]
          if (moduleRelationIds.length !== this.selectedGoods.length) {
            this.$notify({
              title: '警告',
              message: '商品信息不能重复',
              type: 'warning',
              duration: 2000
            })
            return false
          }
          const data = {
            merchantId: this.form.merchantId,
            merchantGoodsList: this.selectedGoods
          }
          saveHomeModuleMerchant(data).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.form.selectedGoods = []
            this.queryData.moduleRelationList[this.queryData.index] = this.form
            this.$router.push({
              name: 'jewelryHomepageBusiness',
              query: { data: JSON.stringify(this.queryData) }
            })
          })
        } else {
          return false
        }
      })
    },
    delGoods(index) {
      this.selectedGoods.splice(index, 1)
    },
    uploadSuccess(key) {
      this.form.merchantPic = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入1-100的整数'))
        } else {
          if (value < 1 || value > 100) {
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

<style scoped lang="scss">
.dateInput {
  display: inline-block;
}
.tip {
  /* margin-left: 20px; */
  font-size: 12px;
  color: #999;
}
/* 已选择商品 */
.selected-goods {
  position: relative;
  // background: #f2f2f2;
  width: 400px;
  overflow: hidden;
  padding: 10px 20px 10px 10px;
  text-align: left;
  & .goods-edit {
    position: absolute;
    right: 12px;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    &:hover {
      color: #409eff;
    }
  }
  & img {
    float: left;
    width: 80px;
    // margin-top: 4px;
  }
  & .goods-info {
    margin-left: 100px;
    color: #666666;
    line-height: 14px;
  }
  & .goods-num {
    & p {
      margin: 5px;
    }
  }
  & .goods-name {
    width: 260px;
    font-size: 16px;
    color: #333;
    // white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // overflow: hidden;
    // text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3;
  }
}
/deep/ .el-input {
  width: 300px;
}
/deep/ .modify-btn {
  margin-left: 20px;
}
.table-box {
  margin-bottom: 20px;
  width: 100%;
}
</style>
