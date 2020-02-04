
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="auctionOrderListQueryForm" label-width="101px" class="listQueryForm">
		  <el-form-item label="订单编号:" prop="orderNumber">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.orderNumber"> </el-input>
		  </el-form-item>
		  <el-form-item label="卖家:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.sellName"> </el-input>
		  </el-form-item>
		  <el-form-item label="买家:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.buyName"> </el-input>
		  </el-form-item>
		  <el-form-item label="订单状态:">
		  	<el-select v-model="listQuery.status" clearable placeholder="订单状态">
		      <el-option
		        v-for="item in orderStatus"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="来源:">
		  	<el-select v-model="listQuery.src" clearable placeholder="来源">
		      <el-option
		        v-for="item in src"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="创建时间:">
		  	<el-date-picker
		      v-model="dateValue"
		      value-format="yyyy-MM-dd HH:mm:ss"
		      type="datetimerange"
		      :picker-options="pickerOptions"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      align="right"
		    >
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="支付时间:">
		  	<el-date-picker
		      v-model="payDateValue"
		      value-format="yyyy-MM-dd HH:mm:ss"
		      type="datetimerange"
		      :picker-options="pickerOptions"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      align="right"
		    >
		    </el-date-picker>
		  </el-form-item>
	    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
	    <el-button type="text" @click="resetQuery">清空条件</el-button>
	  </el-form>
  </div>

  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column width="180px" align="center" label="订单编号">
      <template slot-scope="{ row }">
        <span>{{row.orderNumber}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="竞拍价">
      <template slot-scope="{ row }">
        <span>{{row.dealPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="保证金">
      <template slot-scope="{ row }">
        <span>{{row.deposit}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="订单金额">
      <template slot-scope="{ row }">
        <span>{{row.payMoney}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="支付方式">
      <template slot-scope="{ row }">
        <span>{{payType[row.payType]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="买家">
      <template slot-scope="{ row }">
        <span>{{row.buyUserName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="卖家">
      <template slot-scope="{ row }">
        <span>{{row.sellUserName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="170px" align="center" label="创建时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="170px" align="center" label="支付时间">
      <template slot-scope="{ row }">
        <span>{{row.payTime}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="订单状态">
      <template slot-scope="{ row }">
        <span>{{orderState[row.state]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作" width="300px">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: 'auctionOrderDetail', query: { id: row.orderNumber } })"
        >
          订单详情
        </el-button>

        <el-button v-if="allowCancelOrder(row.state)" size="small" type="danger" @click="handleCancel(row)">取消订单</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page,
  orderCancel
} from '@/api/swap/order'
import waves from '@/directive/waves' // 水波纹指令
import { srcState } from '@/utils/mixins/swap'
import { orderState, allowCancelOrder, payType } from '@/utils/mixins/order'

const getInitQuery = () => {
  return {
    orderType: 3,
    orderNumber: undefined,
    buyName: undefined,
    sellName: undefined,
    status: undefined,
    startTime: undefined,
    endTime: undefined,
    payStartTime: undefined,
    payEndTime: undefined,
    src: undefined
  }
}

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
      dateValue: '',
      payDateValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      allowCancelOrder,
      orderState,
      srcState,
      payType,
      rules: {      	
      	orderNumber: [
	        { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
	      ]
      }
    }
  },
  computed: {
    orderStatus() {
      return Object.keys(this.orderState).map(key => {
        return { value: key, label: this.orderState[key] }
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
  	'$route': 'fetchData',
    dateValue(value) {
      this.listQuery.startTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
    },
    payDateValue(value) {
      this.listQuery.payStartTime = value ? value[0] : undefined
      this.listQuery.payEndTime = value ? value[1] : undefined
    }
  },
  created() {
  	this.fetchData()
//  this.getList()
  },
  methods: {
  	fetchData () {
       this.listParams.offset = +this.$route.query.page || 1   
       this.getList()
    },
    getList() {
      this.listLoading = true
      page(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['auctionOrderListQueryForm'].validate((valid) => {
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
			this.$router.replace({ name: 'auctionOrder', query: { page: val }})
    },
    handleCancel(row) {
      this.$confirm(`确定取消当前订单？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          orderCancel(row.orderNumber)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '取消成功',
                type: 'success',
                duration: 2000
              })
              row.state = 8
            })
        })
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = ''
      this.payDateValue = ''
      this.$refs['auctionOrderListQueryForm'].resetFields()
			this.$router.replace({ name: 'auctionOrder' })
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
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

