<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="designerListQueryForm"
        label-width="101px"
        class="listQueryForm"
      >
        <el-form-item label="订单编号:" prop="orderNumber">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model.trim="listQuery.orderNumber"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model.trim="listQuery.caseName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select
            v-model="listQuery.status"
            clearable
            placeholder="订单状态"
            style="width: 120px;"
          >
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否使用优惠:">
					<el-select v-model="listQuery.isCoupons" clearable placeholder="是否使用优惠" style="width: 150px;">
			      <el-option
			        v-for="item in couponsMap"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>
			  </el-form-item> -->
        <el-form-item label="下单时间:">
          <el-date-picker
            v-model="payDateValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="订单类型:">
		    <el-select v-model="listQuery.caseType" clearable placeholder="订单类型" style="width: 120px;">
		      <el-option
		        v-for="item in caseType"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item> -->
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
          >查询</el-button
        >
        <el-button type="text" @click="resetQuery">清空条件</el-button>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180px" align="center" label="订单编号">
        <template slot-scope="{ row }">
          <span
            class="table-link"
            @click="
              $router.push({
                name: 'publicOrderDetail',
                query: { id: row.orderNumber }
              })
            "
            >{{ row.orderNumber }}</span
          >
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="所属设计师">
        <template slot-scope="{ row }">
          <span>{{ row.sellUserName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="设计师手机号码">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="收货人">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="联系电话">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="收货城市">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="订单金额">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="实收金额">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="支付方式">
        <template slot-scope="{ row }">
          <span>{{ row.consigneeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="订单状态">
        <template slot-scope="{ row }">
          <span>{{ orderState[row.state] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="下单时间">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { page } from '@/api/common/order';
import waves from '@/directive/waves'; // 水波纹指令
import { orderState, payType } from '@/utils/mixins/order';

const getInitQuery = () => {
  return {
    orderNumber: undefined,
    caseName: undefined,
    status: undefined,
    orderType: 5,
    caseType: undefined,
    isCoupons: undefined
  }
};

export default {
  directives: {
    waves
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
      listQuery: getInitQuery(),
      tableKey: 0,
      payDateValue: '',
      couponsMap: [
        { value: '0', label: '已使用' },
        { value: '1', label: '未使用' }
      ],
      orderState,
      payType,
      caseType: [
        { value: 1, label: '商品销售' },
        { value: 2, label: '商品定制' }
      ],
      caseTypeMap: {
        1: '商品销售',
        2: '商品定制'
      },
      rules: {
        orderNumber: [
          {
            pattern: /^[0-9]*$/,
            message: '订单编号需为纯数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    orderStatus() {
      return Object.keys(this.orderState).map(key => {
        return {
          value: key,
          label: +key === 3 ? '设计中' : this.orderState[key]
        }
      })
    },
    src() {
      const data = Object.keys(this.srcState).map(key => {
        return { value: key, label: this.srcState[key] }
      })
      return data
    }
  },
  watch: {
    $route: 'fetchData',
    payDateValue(value) {
      this.listQuery.payStartTime = value ? value[0] : undefined
      this.listQuery.payEndTime = value ? value[1] : undefined
    }
  },
  created() {
    //  this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      page(1, this.listQuery, this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['designerListQueryForm'].validate(valid => {
        if (valid) {
          this.getList()
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
      this.$router.replace({ name: 'designerOrderList', query: { page: val }})
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.payDateValue = '';
      this.$refs['designerListQueryForm'].resetFields()
      this.$router.replace({ name: 'designerOrderList' })
      this.getList()
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
