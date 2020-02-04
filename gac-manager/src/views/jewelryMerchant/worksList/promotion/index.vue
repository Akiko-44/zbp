<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="jewelryWorkListQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item label="商品ID:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model.trim="listParams.goodsId"
          > </el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
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
            style="width: 195px;"
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
            style="width: 195px;"
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
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          v-waves
          @click="addGoods"
        >新增商品</el-button>
        <!-- <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button> -->
      </el-form>
    </div>

    <div class="filter-container statistics">
      <div>汇总统计</div>
      <template v-if="type === 1">
        <el-row style="margin-top:10px;">
          <el-col :span="8">
            <div class="grid-content">当前拼团总库存：<span class="color-red">{{groupGoodsStock}}</span></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">累计拼团销售数量：<span class="color-red">{{cumuGroupSaleNum}}</span></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">累计拼团销售金额：<span class="color-red">{{cumuGroupSaleAmount}}</span></div>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row style="margin-top:10px;">
          <el-col :span="8">
            <div class="grid-content">当前促销总库存：<span class="color-red">{{promotionGoodsStock}}</span></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">累计促销数量：<span class="color-red">{{cumuPromotionSaleNum}}</span></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">累计促销金额：<span class="color-red">{{cumuPromotionSaleAmount}}</span></div>
          </el-col>
        </el-row>
      </template>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="80px"
        align="center"
        label="活动ID"
        prop="id"
      >
      </el-table-column>

      <el-table-column
        width="80px"
        align="center"
        label="商品ID"
        prop="goodsId"
      >
      </el-table-column>

      <el-table-column
        width="250px"
        align="center"
        label="商品名称"
        prop="goodsName"
      >
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="所属品牌"
      >
        <template slot-scope="{ row }">
          <span>{{row.brandName || '-'}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="商品分类"
      >
        <template slot-scope="{ row }">
          <span>{{row.catName || '-'}}</span>
        </template>
      </el-table-column>

      <template v-if="type === 1">
        <el-table-column
          width="120px"
          align="center"
          label="拼团总库存(件)"
          prop="goodsNum"
        >
        </el-table-column>

        <el-table-column
          width="100px"
          align="center"
          label="团购价(元)"
        >
          <template slot-scope="{ row }">
            <span>{{row.groupPrice}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="80px"
          align="center"
          label="折扣"
          prop="discount"
        >
        </el-table-column>

        <el-table-column
          width="130px"
          align="center"
          label="拼团销售数量"
          prop="saleNum"
        >
        </el-table-column>

        <el-table-column
          width="130px"
          align="center"
          label="拼团销售金额"
        >
          <template slot-scope="{ row }">
            <span>{{row.saleAmount}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="100px"
          align="center"
          label="拼团状态"
        >
          <template slot-scope="{ row }">
            <span>{{stateMap[row.status]}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="截止时间"
          prop="endTime"
        >
        </el-table-column>
      </template>

      <template v-else>
        <el-table-column
          width="120px"
          align="center"
          label="促销库存(件)"
          prop="goodsNum"
        >
        </el-table-column>

        <el-table-column
          width="100px"
          align="center"
          label="促销价(元)"
        >
          <template slot-scope="{ row }">
            <span>{{row.promotionPrice}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="130px"
          align="center"
          label="促销销售数量"
          prop="saleNum"
        >
        </el-table-column>

        <el-table-column
          width="130px"
          align="center"
          label="促销销售金额"
        >
          <template slot-scope="{ row }">
            <span>{{row.saleAmount}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="100px"
          align="center"
          label="促销状态"
        >
          <template slot-scope="{ row }">
            <span>{{stateMap[row.status]}}</span>
          </template>
        </el-table-column>

        <el-table-column
          width="180px"
          align="center"
          label="促销时间"
        >
          <template slot-scope="{ row }">
            <span>{{`${row.startTime} 至 ${row.endTime}`}}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
        width="200"
      >
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="success"
            v-if="row.status === 1"
            @click="$router.push({ name: 'addGroup', query: { id: row.id } })"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="success"
            v-if="row.status === 0 || row.status === 2"
            @click="$router.push({ name: 'addPromotion', query: { id: row.id } })"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="onOrOff(row.id)"
            v-if="row.status === 1 || row.status === 0 || row.status === 2"
          >
            下架
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
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

  </div>
</template>

<script>

import { getGroupPage, getPromotionPage, obtainGroup } from '@/api/jewelryMerchant/works'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
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
        limit: 20,
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
      this.$confirm(`是否确认下架该商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
    }
  }
}
</script>

<style scoped lang="scss">
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.statistics {
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.color-red {
  color: red;
}
</style>
