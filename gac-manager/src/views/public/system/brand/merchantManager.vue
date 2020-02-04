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
      <el-form-item label="品牌名称" prop="brandname">
        <label class="filter-label">{{brandName}}</label>
      </el-form-item>
      <!--logo -->
      <el-form-item label="品牌logo" prop="logo">
        <img :src="pic" />
      </el-form-item>
      <!-- 绑定商家 -->
      <el-form-item label="绑定商家" prop="merchant">
        <div>
          <!-- 头部筛选框 start -->
          <div class="filter-container"></div>
          <!-- 头部筛选框 end -->
          <el-popover placement="right" width="600px" trigger="click" v-model="ishidden">
            <div>
              <el-input placeholder="请输入内容" v-model="input" clearable style="width:300px"></el-input>
              <el-button @click="clickSearch()" type="primary">查询</el-button>
            </div>

            <el-table
              ref="multipleTable"
              :data="gridData"
              tooltip-effect="dark"
              style="width: 100%"
              highlight-current-row
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="userId" label="商家ID" width="120"></el-table-column>
              <el-table-column prop="merchantName" label="商家名称" width="200"></el-table-column>
              <el-table-column prop="merchantRealName" label="商家联系人" width="200"></el-table-column>
              <el-table-column prop="phoneNum" label="商家手机号码" width="200"></el-table-column>
            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="listParams.offset"
                :page-sizes="[5,20,30,50]"
                :page-size="listParams.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="getSelected()">保存</el-button>
              <el-button @click="ishidden = !ishidden">取消</el-button>
            </div>
            <el-button type="primary" slot="reference" @click="show()">绑定商家</el-button>
          </el-popover>
        </div>
      </el-form-item>
      <!-- 回显的商家数据 -->
      <div v-if="merchants.length > 0">
        <el-form-item>
          <el-table :data="merchants" border style="width: 664px">
            <el-table-column prop="userId" label="商家ID" width="100"></el-table-column>
            <el-table-column prop="merchantName" label="商家名称" width="200"></el-table-column>
            <el-table-column prop="merchantRealName" label="商家联系人" width="180"></el-table-column>
            <el-table-column prop="phoneNum" label="商家手机号码"></el-table-column>
          </el-table>
        </el-form-item>
      </div>
      <!-- 底部按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit()"
          >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveBrandMerchant, getMerchantInfo } from '@/api/public/brand'
import waves from '@/directive/waves' // 水波纹指令
import ImageCropper from '@/components/ImageCropper'
import { setImg } from '@/filters'
export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      brandName: this.$route.query.brandName,
      pic: this.$route.query.pic,
      brandId: this.$route.query.brandId,
      listLoading: false,
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
      dialogImageUrl: '',
      cropShow: false,
      width: 400,
      height: 400,

      disabled: false,
      ruleForm: {
        brandname: '',
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
  watch: {},
  created() {},
  methods: {
    //   提交绑定商家
    checked(row) {
      this.$nextTick(function() {
        // 首先el-table添加ref="table"引用标识
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    show() {
      console.log('点击了绑定商家')
      this.ishidden = !this.ishidden
      getMerchantInfo(this.listParams).then(data => {
        this.gridData = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.$refs.multipleTable.toggleRowSelection('')
      })
    },
    handleSelectionChange(val) {
      this.selectionMerchants = val
    },
    getSelected() {
      this.ishidden = false
      this.merchants = this.selectionMerchants
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
      var sumData = []
      this.merchants.forEach(element => {
        element.brandId = this.brandId
      })
      sumData = sumData.concat(this.merchants)
      saveBrandMerchant(sumData).then(data => {
        if (data.msg == '成功') {
          this.$router.replace({ name: 'brandmerchantList', query: { brandID: this.brandId, brandName: this.brandName, pic: this.pic }})
        }
      })
    },
    bindingMerchant() {},
    // 日期
    handleSizeChange(val) {
      console.log('1' + val)
      this.listParams.limit = val
      getMerchantInfo(this.listParams).then(data => {
        this.gridData = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.$refs.multipleTable.toggleRowSelection('')
      })
    },
    handleCurrentChange(val) {
      console.log('2' + val)
      this.listParams.offset = val
      getMerchantInfo(this.listParams).then(data => {
        this.gridData = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.$refs.multipleTable.toggleRowSelection('')
      })
    },
    clickSearch() {
      this.listParams.merchantName = this.input
      this.show()
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
