<template>
  <div class="calendar-list-container">
    <div class="filter-container block-container py-3">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="jewelryWorkListQueryForm"
        label-width="81px"
        class="listQueryForm"
      >
        <el-form-item label="商品ID:">
          <el-input
            @keyup.enter.native="handleFilter"
            v-model.trim="listParams.goodsId"
          > </el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            v-model.trim="listParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="拼团状态:"
          v-if="type === 1"
        >
          <el-select
            v-model="listParams.status"
            clearable
            placeholder="拼团状态"
          >
            <el-option
              size="size"
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="促销状态:"
          v-if="type === 2"
        >
          <el-select
            v-model="listParams.status"
            clearable
            placeholder="促销状态"
          >
            <el-option
              size="size"
              v-for="item in promotionState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:200px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="filter-btn">
        <el-button
          type="primary"
          class="primary-btn-sm mr-1"
          @click="handleFilter"
        >查找</el-button>
        <export-excel
          ref="exportExcel"
          :excelTitleText="excelTitleText"
          :excelTitle="excelTitle"
          @click.native.stop="getExportList"
        ></export-excel>
      </div>
    </div>

    <div class="block-container pt-1 pb-2">
      <h4>汇总统计</h4>
      <div class="d-flex">
        <div class="statistics-item">
          <p
            class="pl-1"
            v-if="type === 1"
          >{{groupGoodsStock || 0}}</p>
          <p
            class="pl-1"
            v-else
          >{{promotionGoodsStock || 0}}</p>
          <p class="statistics-value pl-1">当前总库存</p>
        </div>
        <div class="statistics-item">
          <p
            class="pl-1"
            v-if="type === 1"
          >{{cumuGroupSaleNum || 0}}</p>
          <p
            class="pl-1"
            v-else
          >{{cumuPromotionSaleNum || 0}}</p>
          <p class="statistics-value pl-1">累计销售数量</p>
        </div>
        <div class="statistics-item">
          <p
            class="pl-1"
            v-if="type === 1"
          >{{cumuGroupSaleAmount || 0}}</p>
          <p
            class="pl-1"
            v-else
          >{{cumuPromotionSaleAmount || 0}}</p>
          <p class="statistics-value pl-1">累计销售金额</p>
        </div>
      </div>
    </div>

    <div class="block-container table-container pt-3 pb-4">
      <el-button
        class="plain-btn-gray-sm mb-2"
        @click="addGoods"
      >新增商品</el-button>
      <div class="table-header d-flex a-center">
        <span class="goods-name">商品</span>
        <span
          class="price"
          v-if="type === 1"
        >团购价</span>
        <span
          class="price"
          v-else
        >促销价</span>
        <span class="discount">折扣</span>
        <span class="stock">总库存</span>
        <span class="status">状态</span>
        <span class="creatTime">上架时间/截止时间</span>
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
              @click="$router.push({ name: 'workDetail', query: { id: item.goodsId, type: 'jewelry' } })"
            >
            <div class="goods-container d-flex">
              <div class="goods-info">
                <p class="text-black line-h-md">{{item.goodsName}}</p>
                <p class="d-flex mb-1">
                  <span
                    class="brand"
                    v-if="item.brandName"
                  >{{item.brandName}}</span>
                  <span class="category">{{item.catName}}</span>
                </p>
                <p class="text-light-gray">ID：{{item.goodsId}}</p>
              </div>
              <div
                class="price d-flex j-center a-center"
                v-if="type === 1"
              >
                ￥{{item.groupPrice}}
              </div>
              <div
                class="price d-flex j-center a-center"
                v-else
              >
                ￥{{item.promotionPrice}}
              </div>
              <div class="discount d-flex j-center a-center">
                {{item.discount}}
              </div>
              <div class="stock d-flex j-center a-center">
                {{item.goodsNum}}
              </div>
              <div class="status d-flex j-center a-center">
                {{stateMap[item.status]}}
              </div>
              <div class="creatTime d-flex flex-column j-center a-center">
                <p
                  v-if="item.startTime"
                  class="line-h-big"
                >{{item.startTime}} </p>
                <p
                  v-if="item.endTime"
                  class="line-h-big"
                >{{item.endTime}} </p>
              </div>
              <div class="options d-flex flex-column j-center a-center">
                <el-button
                  class="option-btn"
                  v-if="item.status === 1"
                  @click="$router.push({ name: 'addGroup', query: { id: item.id } })"
                >
                  编辑活动
                </el-button>
                <el-button
                  class="option-btn"
                  v-if="item.status === 0 || item.status === 2"
                  @click="$router.push({ name: 'addPromotion', query: { id: item.id } })"
                >
                  编辑活动
                </el-button>
                <el-button
                  class="option-btn"
                  @click="onOrOff(item.id)"
                  v-if="item.status === 1 || item.status === 0 || item.status === 2"
                >
                  立即下架
                </el-button>
              </div>
            </div>
          </div>
          <div class="goods-num d-flex j-end text-light-gray">
            <span class="ml-4">{{type === 1 ? '拼团': '促销'}}销售数量 {{item.saleNum || 0}}</span>
            <span class="ml-4">{{type === 1 ? '拼团': '促销'}}销售金额 ￥{{item.saleAmount || 0}}</span>
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

import { getGroupPage, getPromotionPage, obtainGroup } from '@/api/jewelryMerchant/works'
import waves from '@/directive/waves' // 水波纹指令
import exportExcel from '@/components/app/exportExcel'

export default {
  directives: {
    waves
  },
  components: {
    exportExcel
  },
  props: ['type', 'from'],
  data() {
    return {
      categories: [],
      list: null,
      total: null,
      listLoading: true,
      createTime: [],
      listParams: {
        offset: 1,
        limit: 5,
        goodsId: '',
        goodsName: '',
        status: '',
        startTime: '',
        endTime: ''
      },
      cumuGroupSaleAmount: '',
      cumuGroupSaleNum: '',
      groupGoodsStock: '',
      cumuPromotionSaleAmount: '',
      cumuPromotionSaleNum: '',
      promotionGoodsStock: '',
      state: [
        { value: undefined, label: '全部' },
        { value: 1, label: '拼团中' },
        { value: 3, label: '已下架' },
        { value: 4, label: '已结束' }
      ],
      stateMap: {
        0: '待促销',
        1: '拼团中',
        2: '促销中',
        3: '已下架',
        4: '已结束'
      },
      promotionState: [
        { value: undefined, label: '全部' },
        { value: 0, label: '待促销' },
        { value: 2, label: '促销中' },
        { value: 3, label: '已下架' },
        { value: 4, label: '已结束' }
      ],
      index: undefined,
      excelTitleText: '',
      excelTitle: [
        {
          goodsId: '商品ID',
          goodsName: '商品名称',
          imgUrl: '商品图片',
          discount: '折扣',
          goodsNum: '总库存',
          saleNum: '拼团销售数量',
          saleAmount: '拼团销售金额',
          startTime: '上架时间',
          endTime: '截止时间'
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
    this.excelTitleText = (this.type === 1) ? '拼团列表' : '促销列表'
    if (this.type === 1) {
      this.excelTitleText = '拼团列表'
      this.excelTitle[0].groupPrice = '团购价'
    } else {
      this.excelTitleText = '促销列表'
      this.excelTitle[0].promotionPrice = '促销价'
      this.excelTitle[0].saleNum = '促销销售数量'
      this.excelTitle[0].saleAmount = '促销销售金额'
    }
  },
  mounted() {
  },
  methods: {
    addGoods() {
      if (this.type === 1) {
        this.$router.push({ name: 'addGroup' })
      } else {
        this.$router.push({ name: 'addPromotion' })
      }
    },
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      this.getList()
    },
    getList() {
      this.listLoading = true
      if (this.type === 1) {
        getGroupPage(this.listParams).then(data => {
          this.cumuGroupSaleAmount = data.data.cumuGroupSaleAmount
          this.cumuGroupSaleNum = data.data.cumuGroupSaleNum
          this.groupGoodsStock = data.data.groupGoodsStock
          this.list = data.data.groupList.records
          this.total = data.data.groupList.total
          this.listLoading = false
        })
      } else {
        getPromotionPage(this.listParams).then(data => {
          this.cumuPromotionSaleAmount = data.data.cumuPromotionSaleAmount
          this.cumuPromotionSaleNum = data.data.cumuPromotionSaleNum
          this.promotionGoodsStock = data.data.promotionGoodsStock
          this.list = data.data.promotionList.records
          this.total = data.data.promotionList.total
          this.listLoading = false
        })
      }
    },
    handleFilter() {
      this.$refs['jewelryWorkListQueryForm'].validate((valid) => {
        if (valid) {
          // this.getList()
          this.fetchData()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      //    this.listParams.offset = val
      //    this.getList()
      this.$router.replace({ name: this.from, query: { page: val }})
    },
    resetQuery() {
      this.listParams.goodsName = undefined
      this.listParams.isCheck = undefined
      this.listParams.isOnSale = undefined
      this.$refs['jewelryWorkListQueryForm'].resetFields()
      this.$router.replace({ name: this.from })
      this.getList()
    },
    onOrOff(id) {
      const text = this.type === 1 ? '拼团' : '促销'
      this.$confirm(`确定要下架该${text}活动吗？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '朕再想想',
        customClass: 'custom-confirm-sm'
      }).then(() => {
        obtainGroup(id).then(() => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.fetchData()
        })
      })
    },
    getExportList() {
      const oldLimit = this.listParams.limit
      this.listParams.limit = 9999
      if (this.type === 1) {
        getGroupPage(this.listParams).then(data => {
          this.exportList = data.data.groupList.records
          this.$refs.exportExcel.exportList = this.exportList
          this.$refs.exportExcel.downloadFile()
          this.listParams.limit = oldLimit
        })
      } else {
        getPromotionPage(this.listParams).then(data => {
          this.exportList = data.data.promotionList.records
          this.$refs.exportExcel.exportList = this.exportList
          this.$refs.exportExcel.downloadFile()
          this.listParams.limit = oldLimit
        })
      }
    }

  }
}
</script>

<style scoped lang="scss">
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
    width: 100px;
  }
  .discount {
    width: 50px;
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
