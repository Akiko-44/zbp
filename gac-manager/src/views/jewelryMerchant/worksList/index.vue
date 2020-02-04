
<template>
  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <el-button
        type="primary"
        v-waves
        @click="addGoods"
      >新增商品</el-button>
    </div>

    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="jewelryWorkListQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item label="商品名称/ID:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model.trim="listParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select
            v-model="listParams.isCheck"
            placeholder="审核状态"
            style="width: 195px;"
          >
            <el-option
              size="size"
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
            style="width: 195px;"
          >
            <el-option
              size="size"
              v-for="item in onSaleState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          type="text"
          @click="resetQuery"
        >清空条件</el-button>
      </el-form>
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
        width="100px"
        align="center"
        label="商品ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="商品货号"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsNO}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="250px"
        align="center"
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120px"
        align="center"
        label="商品图片"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.imgUrl"
            width="100"
          />
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="剩余库存"
      >
        <template slot-scope="{ row }">
          <span>{{row.stockNum}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="销售价格"
      >
        <template slot-scope="{ row }">
          <span>{{row.price}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          {{saleStateMap[row.isOnSale]}}
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="审核状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditStateMap[row.isCheck]}}</span>
          <span
            v-if="row.isCheck === 2"
            @click="reson(row)"
            style="cursor: pointer;"
          ><i class="el-icon-warning"></i></span>
        </template>
      </el-table-column>

      <el-table-column
        width="250px"
        align="center"
        label="发布时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            plain
            type="primary"
            @click="$router.push({ name: 'workDetail', query: { id: row.id, type: 'jewelry' } })"
          >
            详情
          </el-button>
          <el-button
            v-if="row.isOnSale !== 3"
            size="small"
            type="success"
            @click="$router.push({ name: 'addWork', query: { id: row.id } })"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="onOrOff(row, $index, 0)"
            v-if="row.isCheck == 1 && row.isOnSale == 1"
          >
            上架
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="onOrOff(row, $index, 1)"
            v-if="row.isCheck == 1 && row.isOnSale == 0"
          >
            下架
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>
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
import {
  page,
  delObj,
  onOrOff,
  auditResonJewelry
} from '@/api/jewelryMerchant/works'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      categories: [],
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        goodsName: undefined,
        isCheck: undefined,
        isOnSale: undefined
      },
      //    listQuery: {
      //      caseName: undefined,
      //      designerName: undefined,
      //      goodsSource: 5,
      //      id: undefined,
      //      isDraft: 0
      //    },
      routerParams: {},
      auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' }
        /* { value: 3, label: '上架' },
        { value: 4, label: '下架' }*/
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
        /* 3: '上架',
        4: '下架'*/
      },
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
      this.$confirm(`确定删除当前商品？`, '提示', {
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
        .catch(() => { })
    },
    onOrOff(row, index, state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
</style>
