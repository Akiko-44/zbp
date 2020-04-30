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
      <el-form-item label="专区名称">
        <span v-if="type">{{form.zoneName}}</span>
        <el-input
          v-else
          v-model.trim="form.zoneName"
          placeholder="请输入专区名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="图标"
        prop="zoneIcon"
      >
        <el-card
          v-if="form.zoneIcon"
          style="width:150px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.zoneIcon | setImg"
            class="image"
            width="100%"
          >
          <div
            style="padding: 0 14px;"
            v-if="!type"
          >
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'zoneIcon')"
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
          :width="160"
          :height="160"
          prefix="shop"
          @crop-upload-success="uploadSuccess"
        />
        <div class="tip">尺寸160*160，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>

      <el-form-item
        label="显示顺序"
        prop="sortOrder"
      >
        <span v-if="type">{{form.sortOrder}}</span>
        <el-input
          v-else
          type="number"
          :min="1"
          :max="1"
          placeholder="请输入数字进行排序，数字越低的排序越靠前,相同数字的最新修改的排名靠前"
          v-model.number="form.sortOrder"
        > </el-input>
      </el-form-item>

      <el-form-item v-if="!type">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="update('form')"
        >确 定</el-button>
      </el-form-item>
    </el-form>

    <div
      class="bind-box"
      v-if="type"
    >
      <h4>绑定详情</h4>
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item label="所属商户:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.merchantName"
          > </el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="btn"
          v-waves
          @click="getBindGoodsList"
        >查询</el-button>
      </el-form>
      <el-table
        :data="bindGoods"
        ref="goodsTable"
        border
        highlight-current-row
        style="width: 100%"
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
                <div class="goods-name">{{row.goodsName}}</div>
                <div class="goods-num">
                  <p>商品ID：{{row.id}}</p>
                  <p>
                    <span>销售量：{{row.goodsSaleCount || 0}}</span>&nbsp;&nbsp;
                    <span>收藏量：{{row.goodsSaleCount || 0}}</span>
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
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          property="merchantName"
          label="所属商户"
          width="100"
        ></el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="价格"
        >
          <template slot-scope="{ row }">
            <span>￥{{row.lowPrice}}<span v-if="row.lowPrice!==row.highPrice">~ ￥{{row.highPrice}}</span></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="stockNum"
          label="库存"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sortNum"
          label="显示排序"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          property="onSaleTime"
          label="上架时间"
          width="200"
        ></el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listParams.offset"
          :page-sizes="[10,20,30,50]"
          :page-size="listParams.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        > </el-pagination>
      </div>
      <el-button @click="cancel('form')">返回</el-button>
    </div>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { getZoneDetail, getZoneBindGoods, modifyZone } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  data() {
    return {
      type: '',
      cropShow: false,
      loading: false,
      zoneId: undefined,
      listParams: {
        offset: 1,
        limit: 10,
        goodsName: '',
        merchantName: ''
      },
      total: undefined,
      form: {
        id: undefined,
        zoneName: '',
        zoneIcon: '',
        sortOrder: '',
        linkType: 1,
        linkTypeId: ''
      },
      bindGoods: [],
      rules: {
        zoneName: [
          { required: true, message: '请输入专区名称', trigger: 'blur' }
        ],
        zoneIcon: [
          { required: true, message: '请选择专区图标', trigger: 'blur' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    this.zoneId = this.$route.query.id
    this.form.id = this.$route.query.id
    this.getZoneDetail()
    this.getBindGoodsList()
  },
  methods: {
    getZoneDetail() {
      getZoneDetail(this.zoneId).then(data => {
        this.form = data.data
      })
    },
    getBindGoodsList() {
      getZoneBindGoods(this.zoneId, this.listParams).then(data => {
        this.bindGoods = data.data.records
        this.total = data.data.total
      })
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getBindGoodsList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getBindGoodsList()
    },
    uploadSuccess(key) {
      this.form.zoneIcon = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          modifyZone(this.form).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            // this.$router.push({ name: 'banner' })
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
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
  }
  & .goods-num {
    & p {
      margin: 5px;
    }
  }
  & .goods-name {
    width: 260px;
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/deep/ .el-form .el-input {
  width: 300px;
}
.bind-box {
  border-top: 1px solid #e5e5e5;
}
</style>

