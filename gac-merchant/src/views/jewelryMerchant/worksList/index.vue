
<template>
  <div class="calendar-list-container">

    <!-- <div class="filter-container">
      <el-button
        type="primary"
        v-waves
        @click="addGoods"
      >新增商品</el-button>
    </div> -->

    <div class="block-container filter-container pt-3">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="jewelryWorkListQueryForm"
        label-width="80px"
        class="listQueryForm"
      >
        <el-form-item label="商品名称/ID:">
          <el-input
            @keyup.enter.native="handleFilter"
            v-model.trim="listParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select
            v-model="listParams.isCheck"
            placeholder="审核状态"
          >
            <el-option
              v-for="item in auditState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态:">
          <el-select
            v-model="listParams.isOnSale"
            placeholder="上架状态"
          >
            <el-option
              v-for="item in onSaleState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="filter-btn">
          <el-button
            type="primary"
            v-waves
            class="primary-btn-sm mr-1"
            @click="handleFilter"
          >查询</el-button>
          <export-excel
            ref="exportExcel"
            excelTitleText="商品列表"
            :excelTitle="excelTitle"
            @click.native.stop="getExportList"
          ></export-excel>
          <!-- <el-button
            type="text"
            @click="resetQuery"
          >清空条件</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="block-container pt-1 pb-2">
      <h4>汇总统计</h4>
      <div class="d-flex">
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">当前总库存</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计销售数量</p>
        </div>
        <div class="statistics-item">
          <p class="pl-1">3562006</p>
          <p class="statistics-value pl-1">累计销售金额</p>
        </div>
      </div>
    </div>
    <div class="block-container table-container pt-1 pb-4">
      <div class="table-header d-flex a-center">
        <span class="goods-name">商品</span>
        <span class="price">价格</span>
        <span class="stock">总库存</span>
        <span class="status">状态</span>
        <span class="creatTime">发布时间</span>
        <span class="options">操作</span>
      </div>
      <div class="table-body">
        <div
          class="table-item font-12"
          v-for="(item,index) in list"
          :key="index"
        >
          <div class="d-flex text-gray">
            <img
              :src="item.imgUrl"
              width="80"
              height="80"
              class="mr"
              @click="$router.push({ name: 'workDetail', query: { id: item.id, type: 'jewelry' } })"
            >
            <div class="goods-container d-flex">
              <div class="goods-info">
                <p class="text-black line-h-md">{{item.goodsName}}</p>
                <p class="d-flex mb-1">
                  <span
                    class="brand"
                    v-if="item.brandName"
                  >{{item.brandName}}</span>
                  <span class="category">贵金属及合金>黄金>黄金项链</span>
                </p>
                <p class="text-light-gray">ID：{{item.id}}</p>
              </div>
              <div class="price d-flex j-center a-center">
                ￥{{item.price}}
              </div>
              <div class="stock d-flex j-center a-center">
                {{item.stockNum}}
              </div>
              <div class="status d-flex j-center a-center">
                {{saleStateMap[item.isOnSale]}}
              </div>
              <div class="creatTime d-flex j-center a-center">
                {{item.updateTime?item.updateTime:item.startTime}}
              </div>
              <div class="options d-flex flex-column j-center a-center">
                <el-button
                  v-waves
                  class="option-btn"
                  @click="onOrOff(item, index, 0)"
                  v-if="item.isCheck == 1 && item.isOnSale == 1"
                >立即上架</el-button>
                <el-button
                  v-waves
                  class="option-btn"
                  @click="onOrOff(item, index, 1)"
                  v-if="item.isCheck == 1 && item.isOnSale == 0"
                >立即下架</el-button>
                <el-button
                  v-waves
                  class="option-btn"
                  v-if="item.isOnSale !== 3"
                  @click="$router.push({ name: 'addWork', query: { id: item.id } })"
                >编辑商品</el-button>
                <el-button
                  type="text"
                  class="option-btn-text"
                  @click="handleDelete(item)"
                >删除</el-button>
              </div>
            </div>
          </div>
          <div class="goods-num d-flex j-end text-light-gray">
            <span class="ml-4">收藏 100</span>
            <span class="ml-4">评论 {{item.commentNum || '0'}}</span>
            <span class="ml-4">累计销售数量 {{item.saleCount || 0}}</span>
            <span class="ml-4">累计销售金额 ￥{{item.saleTotalPrice || 0}}</span>
          </div>
        </div>
      </div>
      <div
        v-show="!listLoading"
        class="pagination-container"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listParams.offset"
          :page-sizes="[5,10,20,30,50]"
          :page-size="listParams.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        > </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  page,
  delObj,
  onOrOff,
  auditResonJewelry
} from '@/api/jewelryMerchant/works'
import waves from '@/directive/waves' // 水波纹指令
import exportExcel from '@/components/app/exportExcel'

export default {
  directives: {
    waves
  },
  components: {
    exportExcel
  },
  data() {
    return {
      categories: [],
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 5,
        goodsName: undefined,
        isCheck: undefined,
        isOnSale: undefined
      },
      routerParams: {},
      auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' }
      ],
      onSaleState: [
        { value: 0, label: '上架' },
        { value: 1, label: '下架' },
        { value: 3, label: '平台下架' }
      ],
      saleStateMap: {
        0: '上架',
        1: '下架',
        3: '平台下架'
      },
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过'
      },
      index: undefined,
      excelTitle: [
        {
          id: '商品ID',
          goodsName: '商品名称',
          imgUrl: '商品图片',
          price: '销售价格',
          stockNum: '总库存',
          saleCount: '累计销售数量',
          saleTotalPrice: '累计销售金额',
          startTime: '发布时间'
        }
      ],
      exportList: [],
      rules: {
        id: [
          { pattern: /^[0-9]*$/, message: '商品ID需为纯数字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    //  this.getList()
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    addGoods() {
      this.$router.push({ name: 'addWork' })
    },
    fetchData() {
      this.listParams.offset = +this.$route.query.offset || 1
      this.listParams.goodsName = this.$route.query.goodsName
      this.listParams.isCheck = this.$route.query.isCheck !== undefined ? +this.$route.query.isCheck : undefined
      this.listParams.isOnSale = this.$route.query.isOnSale !== undefined ? +this.$route.query.isOnSale : undefined
      this.getList()
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
      this.$refs['jewelryWorkListQueryForm'].validate((valid) => {
        if (valid) {
          // this.getList()
          // this.routerParams.goodsName = this.listParams.goodsName
          // this.routerParams.isCheck = this.listParams.isCheck
          // this.routerParams.isOnSale = this.listParams.isOnSale
          this.$router.replace({ name: 'worksList', query: this.listParams })
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      // this.getList()
      this.$router.replace({ name: 'worksList', query: this.listParams })
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      //    this.getList()
      this.$router.replace({ name: 'worksList', query: this.listParams })
    },
    resetQuery() {
      this.listParams.goodsName = undefined
      this.listParams.isCheck = undefined
      this.listParams.isOnSale = undefined
      this.$refs['jewelryWorkListQueryForm'].resetFields()
      this.$router.replace({ name: 'worksList' })
      // this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确认删除选中的商品？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '朕再想想',
        customClass: 'custom-confirm-sm'
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
        .catch(() => { })
    },
    onOrOff(row, index, state) {
      const text = state ? '下架' : '上架'
      this.$confirm(`确认${text}选中的商品？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '朕再想想',
        customClass: 'custom-confirm-sm'
      })
        .then(() => {
          onOrOff(row.id, state)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.list[index].isOnSale = state === 0 ? 0 : 1
            })
        })
    },
    reson(row) {
      auditResonJewelry(row.id)
        .then(data => {
          this.$alert(data.data, '未通过原因', {
            confirmButtonText: '确定'
          })
        })
    },
    getExportList() {
      const oldLimit = this.listParams.limit
      this.listParams.limit = 9999
      page(this.listParams)
        .then(data => {
          this.exportList = data.data.records
          this.$refs.exportExcel.exportList = this.exportList
          this.$refs.exportExcel.downloadFile()
          this.listParams.limit = oldLimit
        })
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 20px;
  line-height: 42px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
}
.statistics-item {
  margin-right: 20px;
  width: 220px;
  color: #333333;
  font-size: 20px;
  line-height: 50px;
  border: 1px solid #f0f3f9;
  .statistics-value {
    line-height: 34px;
    font-size: 12px;
    background: #efefef;
  }
}
.table-container {
  .table-header {
    margin-bottom: 30px;
    height: 40px;
    background: #f2f2f2;
    span {
      text-align: center;
    }
  }
  .table-item {
    margin-bottom: 20px;
    padding: 20px 20px 0 14px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(223, 236, 255, 1);
    box-shadow: -1px 2px 13px 0px rgba(224, 236, 255, 0.86);
    border-radius: 6px;
  }
  .goods-container {
    padding-left: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .goods-info {
    margin-bottom: 20px;
    width: 260px;
    .brand {
      margin-right: 10px;
      padding: 0 6px;
      line-height: 20px;
      background: rgba(61, 135, 253, 0.1);
    }
    .category {
      padding: 0 6px;
      line-height: 20px;
      background: #f2f2f2;
    }
  }
  .goods-name {
    width: 370px;
  }
  .price {
    width: 150px;
  }
  .stock {
    width: 100px;
  }
  .status {
    width: 100px;
  }
  .creatTime {
    width: 130px;
  }
  .options {
    width: 70px;
  }
  .option-btn {
    margin-left: 0;
    margin-bottom: 14px;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    border-color: #3d87fd;
    color: #3d87fd;
    background: #ffffff;
    padding: 0;
    text-align: center;
    border-radius: 4px;
  }
  .option-btn-text {
    margin-left: 0;
    margin-bottom: 10px;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 0;
    text-align: center;
    color: #3d87fd;
  }
  .goods-num {
    line-height: 44px;
  }
}
</style>
