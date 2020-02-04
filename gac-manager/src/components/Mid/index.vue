
<template>
<div class="app-container calendar-list-container">
  <p class="noData" v-if="list.length == 0">暂无商编</p>
  <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="商户ID">
      <template slot-scope="{ row }">
        <span>{{row.userId}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="商户编号">
      <template slot-scope="{ row }">
        <span>{{row.midNum}}</span>
      </template>
    </el-table-column>
    
    <el-table-column align="center" label="更新时间">
      <template slot-scope="{ row }">
        <span>{{row.updateTime}}</span>
      </template>
    </el-table-column>

  </el-table>

</div>
</template>

<script>
import {
  page
} from '@/api/common/mid'

export default {
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page()
        .then(data => {
        	if(data.data != ""){
        		this.list = [data.data]
        	}
          	this.listLoading = false
        })
    }
  }
}
</script>

<style scoped>
.noData{
	text-align: center;
	line-height: 100px;
	font-size: 30px;
}
</style>
