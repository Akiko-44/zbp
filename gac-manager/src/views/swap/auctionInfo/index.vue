
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="auctionInfoListQueryForm" label-width="101px" class="listQueryForm">
		  <el-form-item label="商品编号:" prop="id">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.id"> </el-input>
		  </el-form-item>
		  <el-form-item label="商品名称:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.goodsName"> </el-input>
		  </el-form-item>
		  <el-form-item label="商家名称:">
		    <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model.trim="listQuery.userName"> </el-input>
		  </el-form-item>
		  <el-form-item label="商品状态:">
				<el-select v-model="listQuery.goodsStatus" clearable placeholder="商品状态" style="width: 195px;">
		      <el-option
		        v-for="item in goodsStatus"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>		  
		  </el-form-item>
		  <el-form-item label="商品品牌:">
				<el-select v-model="listQuery.brandName" clearable placeholder="商品品牌" style="width: 195px;">
		      <el-option
		        v-for="item in brands"
		        :key="item.id"
		        :label="item.brandName"
		        :value="item.brandName">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="商品分类:">
		  	<el-cascader
		  		style="width: 195px;"
		      :options="categories"
		      change-on-select
		      v-model="selectedCategory"
		      @change="handleChange"
		      :props="{value: 'id', label: 'name'}"
		    >
		    </el-cascader>
		  </el-form-item>
		  <el-form-item label="信息来源:">
		  	<el-select v-model="listQuery.src" clearable placeholder="信息来源" style="width: 195px;">
		      <el-option
		        v-for="item in src"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="更新时间:">
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
    <el-table-column type="expand">
      <template slot-scope="{ row }">
        <el-form label-position="left" inline class="expand-table">
          <el-form-item label="商品名称">
            <span>{{row.goodsName}}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{row.categoryName}}</span>
          </el-form-item>
          <el-form-item label="品牌">
            <span>{{row.brandName}}</span>
          </el-form-item>
          <el-form-item label="商家名称">
            <span>{{row.userName}}</span>
          </el-form-item>
          <el-form-item label="保证金">
            <span>{{row.deposit}}</span>
          </el-form-item>
          <el-form-item label="保留价">
            <span>{{row.reservePrice}}</span>
          </el-form-item>
          <el-form-item label="加价幅度">
            <span>{{row.skipPrice}}</span>
          </el-form-item>
          <!-- <el-form-item label="拍卖时间">
            <p>{{row.auctionStartTime}}</p>
            <span>至</span>
            <p>{{row.auctionEndTime}}</p>
          </el-form-item> -->
        </el-form>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="商品编号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="图片">
      <template slot-scope="{ row }">
        <img :src="row.imgUrl | setImg" style="max-width: 100%" />
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="当前价">
      <template slot-scope="{ row }">
        <span>{{row.presentPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="起拍价">
      <template slot-scope="{ row }">
        <span>{{row.upsetPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column width="160px" align="center" label="拍卖时间">
      <template slot-scope="{ row }">
        <p>{{row.auctionStartTime}}</p>
        <span>至</span>
        <p>{{row.auctionEndTime}}</p>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{goodsState[row.goodsStatus]}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: 'auctionDetail', query: { id: row.id } })"
        >
          详情
        </el-button>
        <!--<el-button
          size="small"
          type="primary"
          @click="$router.push({ name: 'auctionEdit', query: { id: row.id } })"
        >
          修改
        </el-button>-->

        <!--<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>-->
        &nbsp;
        <el-dropdown @command="handleCommand" v-if="row.goodsStatus == 1 || row.goodsStatus == 3">
          <span class="el-dropdown-link">
            审核操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="row.goodsStatus == 1 || row.goodsStatus == 3" :command="{row, state: 2}">审核通过</el-dropdown-item>
            <el-dropdown-item v-if="row.goodsStatus == 1" :command="{row, state: 3}">审核拒绝</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        &nbsp;
        <el-dropdown @command="moreHandleCommand">
          <span class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{name: 'auctionUsers', query: { id: row.id }}">报名名单</el-dropdown-item>
            <el-dropdown-item :command="{name: 'auctionPrice', query: { id: row.id }}">出价记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page,
  delObj,
  audit
} from '@/api/swap/auctionInfo'
import { page as getBrands } from '@/api/swap/brand'
import waves from '@/directive/waves' // 水波纹指令
import { goodsState, srcState, auditState, category } from '@/utils/mixins/swap'

const getInitQuery = () => {
  return {
    offset: 1,
    limit: 20,
    goodsName: undefined,
    brandName: undefined,
    categoryId: undefined,
    userName: undefined,
    goodsStatus: undefined,
    updateTimeBegin: undefined,
    updateTimeEnd: undefined,
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
      categories: [],
      selectedCategory: [],
      auditState,
      goodsState,
      srcState,
      rules: {      	
      	id: [
	        { pattern: /^[0-9]*$/, message: '商品编号需为纯数字', trigger: 'blur' }
	      ]
      }
    }
  },
  computed: {
    brands() {
      return this.$store.state.data.swapBrands.records
    },
    goodsStatus() {
      return Object.keys(this.goodsState).map(key => {
        return { value: key, label: this.goodsState[key] }
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
      this.listQuery.updateTimeBegin = value ? value[0] : undefined
      this.listQuery.updateTimeEnd = value ? value[1] : undefined
    }
  },
  created() {
//  this.getList()
		this.fetchData()
    this.getCategory()
    this.$store.dispatch('data/get', { name: 'swapBrands', service: getBrands })
  },
  methods: {
  	fetchData () {
       this.listQuery.offset = +this.$route.query.page || 1   
       this.getList()
    },
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['auctionInfoListQueryForm'].validate((valid) => {
	      if (valid) {
	        this.getList()
	      } else {
	        return false
	      }
	    })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
//    this.listQuery.offset = val
//    this.getList()
			this.$router.replace({ name: 'auctionInfo', query: { page: val }})
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
    },
    audit(row, state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          audit(row.id, state).then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            row.goodsStatus = state
          })
        })
    },
    handleCommand({ row, state }) {
      this.audit(row, state)
    },
    moreHandleCommand(route) {
      this.$router.push(route)
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = ''
      this.selectedCategory = []
      this.$refs['auctionInfoListQueryForm'].resetFields()
			this.$router.replace({ name: 'auctionInfo' })
      this.getList()
    },
    async getCategory() {
      const categories = await category.get(3)
      this.categories = categories
    },
    handleChange(data) {
      this.listQuery.categoryId = data[data.length - 1]
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
.expand-table .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 35%;
}
</style>

