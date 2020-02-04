
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
  	<el-form :inline="true" :model="listQuery" :rules="rules" ref="saleInfoListQueryForm" label-width="101px" class="listQueryForm">
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
    <el-table-column width="110px" align="left" label="图片">
      <template slot-scope="{ row }">
        <img :src="row.imgUrl | setImg" style="max-width: 100%" />
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="商品编号">
      <template slot-scope="{ row }">
        <span>{{row.id}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="商品名称">
      <template slot-scope="{ row }">
        <span>{{row.goodsName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="80px" align="center" label="商品分类">
      <template slot-scope="{ row }">
        <span>{{row.categoryName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" label="品牌">
      <template slot-scope="{ row }">
        <span>{{row.brandName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="110px" align="center" :label="type === 'sales' ? '销售价' : '期望价'">
      <template slot-scope="{ row }">
        <span>{{row.price}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="商家名称">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="状态">
      <template slot-scope="{ row }">
        <span>{{goodsState[row.goodsStatus]}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="更新时间">
      <template slot-scope="{ row }">
        <span>{{row.updateTime}}</span>
      </template>
    </el-table-column>
    
    <el-table-column fixed="right" align="left" label="操作" width="350">
      <template slot-scope="{ row, $index }">
        <el-button
          size="small"
          @click="$router.push({ name: type + 'Detail', query: { id: row.id } })"
        >
          详情
        </el-button>
        <!--<el-button
          size="small"
          type="primary"
          @click="$router.push({ name: 'infoEdit', query: { id: row.id, type } })"
        >
          修改
        </el-button>-->

        <!--<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>-->
        &nbsp;
        <el-dropdown @command="handleCommand" v-if="allowAudit(+row.goodsStatus)">
          <span class="el-dropdown-link">
            审核操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{row, state: 2, $index}">审核通过</el-dropdown-item>
            <el-dropdown-item v-if="row.goodsStatus == 1" :command="{row, state: 3, $index}">审核拒绝</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
  
  <audit-dialog ref="auditDialog" @success="auditSuccess" />
</div>
</template>

<script>
import {
  page,
  delObj,
  audit
} from '@/api/swap/goods'
import { page as getBrands } from '@/api/swap/brand'
import waves from '@/directive/waves' // 水波纹指令
import { goodsState, srcState, auditState, allowAudit, category } from '@/utils/mixins/swap'
import AuditDialog from './auditDialog'

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
  props: {
    priceLabel: String,
    // 1 可互换 2 仅销售 用于接口调用
    swapble: Number,
    type: String
  },
  directives: {
    waves
  },
  components: {
    AuditDialog
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
      allowAudit,
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
      this.listQuery.swapble = this.swapble
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    async getCategory() {
      const categories = await category.get(3)
      this.categories = categories
    },
    handleFilter() {
      this.$refs['saleInfoListQueryForm'].validate((valid) => {
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
			let routerName = this.type === 'sales' ? 'salesInfo' : 'exchangeInfo'
			this.$router.replace({ name: routerName, query: { page: val }})
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
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.id = row.id
      dialog.form.goodsStatus = state
      this.index = index
    },
    auditSuccess(form) {
      this.list[this.index].goodsStatus = form.goodsStatus
    },
    handleCommand({ row, state, $index }) {
      this.audit(row, state, $index)
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.dateValue = ''
      this.selectedCategory = []
      this.$refs['saleInfoListQueryForm'].resetFields()
      let routerName = this.type === 'sales' ? 'salesInfo' : 'exchangeInfo'
			this.$router.replace({ name: routerName })
      this.getList()
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
</style>

