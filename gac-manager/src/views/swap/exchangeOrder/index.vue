
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="exchangeOrderListQueryForm" label-width="101px" class="listQueryForm">
		  <el-form-item label="订单编号:" prop="orderNumber">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.orderNumber"> </el-input>
		  </el-form-item>
		  <el-form-item label="换出人:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.swapoutUserName"> </el-input>
		  </el-form-item>
		  <el-form-item label="换入人:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.swapinUserName"> </el-input>
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

    <el-table-column width="110px" align="center" label="换出人">
      <template slot-scope="{ row }">
        <span>{{row.swapoutUserName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="换入人">
      <template slot-scope="{ row }">
        <span>{{row.swapinUserName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="换出商品金额">
      <template slot-scope="{ row }">
        <span>{{row.swapoutMoney}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="换入商品金额">
      <template slot-scope="{ row }">
        <span>{{row.swapinMoney}}</span>
      </template>
    </el-table-column>

    <el-table-column width="200px" align="center" label="创建时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="支付时间">
      <template slot-scope="{ row }">
        <span>{{row.payTime || '-'}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="订单状态">
      <template slot-scope="{ row }">
        <span>{{exchangeOrderState[row.state]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: 'exchangeOrderDetail', query: { id: row.orderNumber } })"
        >
          订单详情
        </el-button>

        <!--<el-button size="small" type="danger" @click="handleCancel(row)">取消订单</el-button>-->
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
  swapOrder,
  swapOrderCancel
} from '@/api/swap/order'
import waves from '@/directive/waves' // 水波纹指令
import { srcState } from '@/utils/mixins/swap'
import { exchangeOrderState } from '@/utils/mixins/order'

const getInitQuery = () => {
  return {
    orderNumber: undefined,
    swapinUserName: undefined,
    swapoutUserName: undefined,
    status: undefined,
    startTime: undefined,
    endTime: undefined,
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
      exchangeOrderState,
      srcState,
      rules: {      	
      	orderNumber: [
	        { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
	      ]
      }
    }
  },
  computed: {
    orderStatus() {
      return Object.keys(this.exchangeOrderState).map(key => {
        return { value: key, label: this.exchangeOrderState[key] }
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
      swapOrder(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
			this.$refs['exchangeOrderListQueryForm'].validate((valid) => {
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
			this.$router.replace({ name: 'exchangeOrder', query: { page: val }})
    },
    handleCancel(row) {
      this.$confirm(`确定取消当前订单？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          swapOrderCancel(row.orderNumber)
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
      this.$refs['exchangeOrderListQueryForm'].resetFields()
			this.$router.replace({ name: 'exchangeOrder' })
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

