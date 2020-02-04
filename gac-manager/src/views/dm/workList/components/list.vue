<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="workListQueryForm"
        label-width="100px"
        class="listQueryForm"
      >
        <el-form-item
          label="商品名称:"
          v-if="goodsSource === 5 || goodsSource === 6"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.caseName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="商品ID:"
          prop="caseId"
          v-if="goodsSource === 5 || goodsSource === 6"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.caseId"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="商家名称:"
          v-if="goodsSource === 5 || goodsSource === 6"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.merchantName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="状态:"
          v-if="goodsSource === 5 || goodsSource === 6"
        >
          <el-select
            v-model="listQuery.auditState"
            clearable
            placeholder="状态"
            style="width: 195px;"
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
        <el-form-item
          label="商品类型:"
          v-if="goodsSource === 5 || goodsSource === 6"
        >
          <el-select
            v-model="listQuery.caseType"
            clearable
            placeholder="商品类型"
            style="width: 195px;"
          >
            <el-option
              v-for="item in caseType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--goodsSource：0 珠宝店特有搜索条件-->
        <el-form-item
          label="商品名称:"
          v-if="goodsSource === 0"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="jewelryParams.goodsName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="商家名称:"
          v-if="goodsSource === 0"
        >
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="jewelryParams.merchantName"
          > </el-input>
        </el-form-item>
        <el-form-item
          label="审核状态:"
          v-if="goodsSource === 0"
        >
          <el-select
            v-model="jewelryParams.isCheck"
            clearable
            placeholder="审核状态"
            style="width: 195px;"
          >
            <el-option
              v-for="item in jewelryAuditState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上架状态:"
          v-if="goodsSource === 0"
        >
          <el-select
            v-model="jewelryParams.isOnSale"
            clearable
            placeholder="上架状态"
            style="width: 195px;"
          >
            <el-option
              v-for="item in jewelrySaleState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
      v-if="goodsSource === 0"
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
        width="200px"
        align="center"
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="商家"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="品牌"
      >
        <template slot-scope="{ row }">
          <span>{{row.brandName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="商品库存"
      >
        <template slot-scope="{ row }">
          <span>{{row.stockNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="销售价格"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="所在地"
      >
        <template slot-scope="{ row }">
          <span>{{row.provinceName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="添加时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="编辑时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="审核状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditStateMap[row.isCheck]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="上架状态"
      >
        <template slot-scope="{ row }">
          <span>{{saleStateMap[row.isOnSale]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            @click="$router.push({ name: 'jewelryWorkDetail', query: { id: row.id, auditState: row.isCheck } })"
          >查看</el-button>
          <el-button
            class="auditBtn"
            v-if="row.isCheck == 0"
            size="small"
            type="primary"
            @click="audit(row, 1, $index)"
          >审核通过</el-button>
          <el-button
            class="auditBtn"
            v-if="row.isCheck == 0"
            size="small"
            type="warning"
            @click="audit(row, 2, $index)"
          >审核拒绝</el-button>
          <el-button
            class="auditBtn"
            v-if="row.isCheck == 1 && row.isOnSale == 0"
            size="small"
            @click="audit(row, 3, $index)"
          >下架</el-button>
          <el-button
            class="auditBtn"
            size="small"
            style="margin-top: 10px;"
            @click="$router.push({ name: 'jewelryComment', query: { id: row.id } })"
          >查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      v-else
    >
      <el-table-column
        width="100px"
        align="center"
        label="商品ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.caseId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="250px"
        align="center"
        label="商品名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.caseName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="商家"
      >
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="商品库存"
      >
        <template slot-scope="{ row }">
          <span>{{row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="销售价格"
      >
        <template slot-scope="{ row }">
          <span>￥{{row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditStateMap[row.auditState]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="110px"
        align="center"
        label="商品类型"
      >
        <template slot-scope="{ row }">
          <span>{{row.caseType == 1?'现货':'定制'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            @click="$router.push({ name: 'workDetail', query: { id: row.caseId } })"
          >查看</el-button>
          <el-button
            v-if="row.auditState == 0"
            size="small"
            type="primary"
            @click="audit(row, 1, $index)"
          >审核通过</el-button>
          <el-button
            v-if="row.auditState == 0"
            size="small"
            type="warning"
            @click="audit(row, 2, $index)"
          >审核拒绝</el-button>
          <el-button
            v-if="row.auditState == 3"
            size="small"
            @click="audit(row, 5, $index)"
          >下架</el-button>
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

    <audit-dialog
      ref="auditDialog"
      :goodsSource="goodsSource"
      @success="auditSuccess"
    />
  </div>
</template>

<script>
import { page, jewelryPage } from '@/api/dm/works'
import waves from '@/directive/waves' // 水波纹指令
import auditDialog from './auditDialog'

export default {
  directives: {
    waves
  },
  components: {
    auditDialog
  },
  props: {
    goodsSource: Number,
    routerName: String
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: {
        caseName: undefined,
        designerName: undefined,
        goodsSource: this.goodsSource,
        caseId: undefined,
        merchantName: undefined
      },
      // 珠宝店搜索参数
      jewelryParams: {
        offset: 1,
        limit: 20,
        goodsName: '',
        isCheck: '',
        isOnSale: '',
        merchantName: undefined
      },
      jewelryAuditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' }
      ],
      jewelrySaleState: [
        { value: 0, label: '上架' },
        { value: 1, label: '下架' },
        { value: 3, label: '平台下架' }
      ],
      auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' },
        { value: 3, label: '上架' },
        { value: 4, label: '下架' },
        { value: 5, label: '平台下架' }
      ],
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架',
        5: '平台下架'
      },
      saleStateMap: {
        0: '上架',
        1: '下架',
        3: '平台下架'
      },
      caseType: [
        { value: 1, label: '现货商品' },
        { value: 2, label: '定制商品' }
      ],
      index: undefined,
      rules: {
        caseId: [
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
  methods: {
    fetchData() {
      this.jewelryParams.offset = +this.$route.query.page || 1
      this.listParams.offset = +this.$route.query.page || 1
      this.jewelryParams.limit = +this.$route.query.size || 20
      this.listParams.limit = +this.$route.query.size || 20
      this.getList()
    },
    getList() {
      this.listLoading = true
      // 珠宝店商品列表
      if (this.goodsSource === 0) {
        // this.jewelryParams.goodsName = this.listQuery.caseName
        jewelryPage(this.jewelryParams).then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
      } else {
        page(this.listQuery, this.listParams).then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
      }
    },
    handleFilter() {
      this.$refs['workListQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      // this.listParams.limit = val
      // this.jewelryParams.limit = val
      // this.getList()
      this.$router.replace({ name: this.routerName, query: { page: this.listParams.offset, size: val }})
    },
    handleCurrentChange(val) {
      this.$router.replace({ name: this.routerName, query: { page: val, size: this.listParams.limit }})
    },
    resetQuery() {
      this.listQuery.caseName = undefined
      this.listQuery.designerName = undefined
      this.listQuery.caseId = undefined
      this.listQuery.merchantName = undefined
      this.jewelryParams.isCheck = ''
      this.jewelryParams.isOnSale = ''
      this.jewelryParams.goodsName = ''
      this.jewelryParams.merchantName = ''
      this.$refs['workListQueryForm'].resetFields()
      this.$router.replace({ name: this.routerName })
      this.getList()
    },
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.designerId = row.caseId ? row.caseId : row.id
      dialog.form.auditState = state
      dialog.form.opinion = ''
      this.index = index
    },
    auditSuccess() {
      this.getList()
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
.auditBtn {
  margin-left: 0;
}
</style>
