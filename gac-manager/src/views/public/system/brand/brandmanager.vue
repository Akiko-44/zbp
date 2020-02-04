<template>
  <div class="app-container calendar-list-container">

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 品牌 -->
      <el-form-item
        label="品牌名称"
        prop="brandname"
      >
        <el-input
          :disabled="merchants.length != 0 && this.brandID != '0'"
          v-model="ruleForm.brandname"
          style="width:400px"
        ></el-input>
      </el-form-item>
      <!--logo -->
      <el-form-item
        label="品牌logo"
        prop="logo"
      >
        <el-row
          class="row"
          v-if="dialogImageUrl"
        >
          <el-col
            class="col"
            :span="6"
          >
            <el-card :body-style="{ padding: '0px' }">
              <a
                target="_blank"
                :href="dialogImageUrl | setImg"
                class="image"
                :style="getImageStyle(dialogImageUrl)"
              ></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    :disabled="merchants.length != 0 && this.brandID != '0'"
                    @click="dialogImageUrl = '' "
                  >删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-button
          type="primary"
          v-if="!dialogImageUrl"
          @click="cropShow = true;"
          size="small"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="width"
          :height="height"
          prefix="craftLogo"
          @crop-upload-success="craftLogoUploadSuccess"
        />
        <div>数量：1张；格式：jpg、jpeg、png、gif；大小：2M以内；尺寸：800*800；</div>
      </el-form-item>
      <!-- 绑定商家 -->
      <el-form-item
        label="绑定商家"
        prop="merchant"
        v-if='brandID != 0'
      >
        <div>
          <!-- 头部筛选框 start -->

          <el-button
            type="primary"
            slot="reference"
            @click="show()"
          >绑定商家</el-button>
        </div>
      </el-form-item>
      <!-- 回显的商家数据 -->
      <div v-if="merchants.length > 0">
        <el-form-item>
          <el-table
            :data="merchants"
            border
            style="width: 664px"
          >
            <el-table-column
              prop="userId"
              label="商家ID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="merchantName"
              label="商家名称"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="merchantRealName"
              label="商家联系人"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="phoneNum"
              label="商家手机号码"
            ></el-table-column>
          </el-table>
        </el-form-item>
      </div>
      <!-- 底部按钮 -->
      <el-form-item>
        <el-button
          type="normal"
          @click="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          @click="onSubmit()"
          :disabled="dialogImageUrl == '' || ruleForm.brandname == ''"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBrand, getMerchantInfo, selectMerchantPage } from '@/api/public/brand'
import waves from '@/directive/waves' // 水波纹指令
import ImageCropper from '@/components/ImageCropper'
import { setImg } from '@/filters'
export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      brandID: this.$route.query.brandID,
      pic: this.$route.query.pic,
      brandName: this.$route.query.brandName,
      total: null,
      listLoading: false,
      input: '',
      // 绑定的商家信息列表
      selectionMerchants: [],
      total: null,
      listParams: {
        offset: 1,
        limit: 5,
        merchantName: undefined,
        bindTime: '2019-10-10'
      },
      ishidden: false,
      merchants: [],
      gridData: [],
      //   logo
      dialogImageUrl: this.$route.query.pic,
      cropShow: false,
      width: 400,
      height: 400,

      disabled: false,
      ruleForm: {
        brandname: this.$route.query.brandName,
        logo: '',
        merchant: ''
      },
      rules: {
        brandname: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        logo: [{ required: true, message: '请选择logo', trigger: 'change' }]
      }
    }
  },

  created() {
    this.getMerchantList()
  },
  methods: {
    //   提交绑定商家

    show(params) {
      this.$router.push({ name: 'merchantChangeList', query: { brandID: this.brandID, brandName: this.brandName, pic: this.pic }})
    },
    onTableSelect(rows, row) {
      this.selectionMerchants = this.selectionMerchants
      const selected = rows.length && rows.indexOf(row) !== -1
      if (selected) {
        this.selectionMerchants = this.selectionMerchants.concat(rows)
      } else {
        console.log(206, this.selectionMerchants)
        console.log(213, row.userId)
        this.selectionMerchants.splice(this.selectionMerchants.findIndex(item => item.userId === row.userId), 1)
      }
      console.log(203, this.selectionMerchants)
    },
    allTableSelect(rows) {
      console.log(219, rows)
    },
    getSelected() {
      this.ishidden = false
      this.merchants = this.unique(this.selectionMerchants)
    },
    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].userId == arr[j].userId) {
            // 第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    //   上传logo
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    craftLogoUploadSuccess(key) {
      this.dialogImageUrl = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    //   提交数据
    onSubmit() {
      this.ruleForm.logo = this.dialogImageUrl

      var sumData = []
      sumData = sumData.concat(this.merchants)
      var id = this.brandID == 0 ? null : this.brandID

      var params = {
        brandName: this.ruleForm.brandname,
        pic: this.ruleForm.logo,
        sortOrder: '1',
        brandMerchantDTOS: sumData,
        id: id
      }

      addBrand(params).then(data => {
        if (data.msg == '成功') {
          this.$router.replace({ name: 'brand' })
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    // 分页
    handleSizeChange(val) {
      this.listParams.limit = val
      var select = this.selectionMerchants
      getMerchantInfo(this.listParams).then(data => {
        this.gridData = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.$nextTick(() => {
          var arr = this.gridData
          var i = 0
          var result = arr.some(item => {
            select.forEach(element => {
              if (item.merchantName == element.merchantName) {
                this.$refs.multipleTable.toggleRowSelection(this.gridData[i], true)
                this.selectionMerchants.push(item)
              }
            })
            i++
          })
        })
      })
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      var select = this.selectionMerchants
      getMerchantInfo(this.listParams).then(data => {
        this.gridData = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.$nextTick(() => {
          var arr = this.gridData
          var i = 0
          var result = arr.some(item => {
            select.forEach(element => {
              if (item.merchantName == element.merchantName) {
                this.$refs.multipleTable.toggleRowSelection(this.gridData[i], true)
                this.selectionMerchants.push(item)
              }
            })
            i++
          })
        })
      })
    },
    clickSearch() {
      this.listParams.merchantName = this.input
      console.log(207, this.listParams.merchantName)
      this.show(this.listParams)
    },
    getMerchantList() {
      var merchantlistParams = {
        offset: 1,
        limit: 1000,
        merchantName: undefined,
        userId: undefined

      }
      selectMerchantPage(this.brandID, merchantlistParams)
        .then(data => {
          this.merchants = data.data.records
        }).catch(() => {
          this.listLoading = false
        })
    }
  }

}
</script>

<style scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
