
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-button @click="$router.push({name: 'addAtlas'})" type="primary" icon="edit">添加图集</el-button>
  </div>
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入标题" v-model="listQuery.title"> </el-input>
    <el-select v-model="listQuery.picNum" clearable placeholder="类别">
      <el-option
        v-for="item in status"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-cascader
	    :options="categoryArr"
	    v-model="selectedCategory"
	    @change="handleChange"
	    filterable
    	change-on-select
	    :props="{value: 'id', label: 'name'}"
	  >
	  </el-cascader>
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
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
  </div>
  
  <el-row class="row">
    <el-col class="col" :span="6" v-for="(item, index) in list" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <div :href="item. coverPic | setImg" class="image" :style="getImageStyle(item)"></div>
        <div style="padding: 14px;">
          <p>{{item.title}}</p>
          <p>上传时间:  {{item.createTime}}</p>
          <p>图集ID:  {{item.id}}</p>
          <div class="bottom clearfix">
            <el-button type="text" icon="el-icon-edit" @click="$router.push({ name: 'addAtlas', query: { id: item.id } })"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(item)"></el-button>
            <span class="nums">{{item.picNum}}张</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</div>
</template>

<script>
import {
  page,
  delObj,
  pageCount
} from '@/api/gallery/atlas'
import { category } from '@/utils/mixins/gallery'
import waves from '@/directive/waves' // 水波纹指令
import { setImg } from '@/filters'

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        title: undefined,
        picNum: null,
        categoryId: undefined,
        createTimeBegin: undefined,
    		createTimeEnd: undefined,
      },
      status: [
        { value: 1, label: '单图' },
        { value: 2, label: '多图' }
      ],
      categoryArr: [],
      selectedCategory: [],
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
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const categoryData = await category.get()
    next(vm => {
      vm.categoryArr = JSON.parse(JSON.stringify(categoryData))
    })
  },
  watch: {
    dateValue(value) {
      this.listQuery.createTimeBegin = value ? value[0] : undefined
      this.listQuery.createTimeEnd = value ? value[1] : undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data
          this.listLoading = false
        })
        pageCount(this.listQuery)
        .then(data=>{
        	this.total = data.data;
        })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    handleDelete(row) {
      this.$confirm(`确定删除当前图集？`, '提示', {
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
    getImageStyle(item) {
      return {
        backgroundImage: 'url(' + setImg(item.coverPic, { w: 500 }) + ')'
      }
    },
    handleChange(data){
    	this.listQuery.categoryId = data[data.length - 1]
    	//console.log(data)
    	//this.selectedCategory = this.selectedCategory.map(Number)
    }
  }
}
</script>

<style scoped>
.image{
  display: block;
  max-width: 100%;
  height: 280px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.row {
  margin-top: 10px;
  margin-left: -20px;
}
.col {
  margin-bottom: 20px;
  margin-left: 20px;
  max-width: 23%;
  max-height: 438px;
}
.col p {
  margin: 0;
  height: 38px;
  line-height: 19px;
  word-break: break-all;
  font-size: 14px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.nums {
  margin-top: 4px;
  float: right;
  font-size: 12px;
}
</style>

