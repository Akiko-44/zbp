<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item label="搜索:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.luckyDrawName"
            placeholder="请输入活动标题"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="活动状态:">
          <el-select
            style="width: 195px;"
            clearable
            v-model="listParams.status"
            placeholder="请选择活动状态"
          >
            <el-option
              v-for="(item, i) in statusObj"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="filter-container"></div>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="timeValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
          >查找</el-button
        >
        <el-button type="primary" v-waves @click="$router.push({ name: 'addDraw' })">添加</el-button>
        
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
  		<el-table-column width="150px" align="center" label="编号">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="活动标题">
        <template slot-scope="{ row }">
          <span>{{ row.luckyDrawName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="参与人数">
        <template slot-scope="{ row }">
          <span>{{ row.joinNum }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="新注册人数">
        <template slot-scope="{ row }">
          <span>{{ row.registerNum }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="中奖人数">
        <template slot-scope="{ row }">
          <span>{{ row.winningNum }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="抽奖次数">
        <template slot-scope="{ row }">
          <span>{{ row.drawNum }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="奖品消耗量">
        <template slot-scope="{ row }">
          <span>{{ row.prizeConsumeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="活动状态">
        <template slot-scope="{ row }">
          <span>{{ statusObj[row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.createTime || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="活动时间">
        <template slot-scope="{ row }">
          <span>{{ row.startTime || "--" }} - {{ row.endTime || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="330px" align="center" label="活动链接">
        <template slot-scope="{ row }">
          <span>{{ origin }}{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" fixed="right" align="left" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            size="small"
            type="primary"
            @click="add(row.id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="primary"
            v-if="row.status == 1"
            @click="onSetStatus(row, 2, $index)"
            >暂停</el-button
          >
          <el-button
            size="small"
            type="primary"
            v-if="row.status == 2"
            @click="onSetStatus(row, 1, $index)"
            >启用</el-button
          >
          <el-button
            size="small"
            type="warning"
            v-if="row.status == 0"
            @click="delDraw(row.id, $index)"
            >删除</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="$router.push({ name: 'rosterDraw', query: { id: row.id } })"
            >中奖名单</el-button
          >
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
import {
	drawPage,
	setStatusDraw,
	deleteDraw
} from '@/api/public/luckDraw';
import waves from '@/directive/waves'; // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
  	let origin = ''
  	if(location.origin.indexOf('gacjc.com') > -1){
  		origin = 'http://app.gacjc.com/luckDraw?src=luckDrawWeb&id='
  	}else{
  		origin = 'http://219.134.137.178:83/luckDraw?src=luckDrawWeb&id='
  	}
    return {
      list: null,
      total: null,
      listLoading: false,
      origin: origin,
      timeValue: [],
      listParams: {
        offset: 1,
        limit: 20,
        luckyDrawName: undefined,
        status: undefined,
        startTime: undefined,
        endTime: undefined
      },
      statusObj: {
      	'0':'未开始',
      	'1':'进行中',
      	'2':'已暂停',
      	'3':'已结束'
      	//'4':'已删除'
      }
    }
  },
  created() {
    this.getList()
  },
  watch: {
    timeValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      drawPage(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    add(id){
    	this.$router.push({ name: 'addDraw', query: { id: id }})
    },
    onSetStatus(row, status, $index){
    	let data = {
    		id: row.id,
    		status: status
    	}
    	setStatusDraw(data).then(()=>{
    		this.list[$index].status = status
    		this.$notify({
          title: '成功',
          message: '设置成功',
          type: 'success',
          duration: 2000
        })
    	})
    },
    delDraw(id, $index){
    	this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	      deleteDraw({id:id}).then(()=>{
	    		this.list.splice($index, 1)
	    		this.$notify({
	          title: '成功',
	          message: '删除成功',
	          type: 'success',
	          duration: 2000
	        })
	    	})
	    }).catch(() => {
	      this.$message({
	        type: 'info',
	        message: '已取消删除'
	      })         
	    })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
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
</style>
