<template>
  <div class="app-container">
    <el-table
      :data="resultTableData"
      header-row-class-name="table-header"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="result"
        label="任务结果"
      />
      <el-table-column
        class-name="blue-column"
        align="center"
        label="合计"
      >
        <template slot-scope="{row}">
          <span @click="$router.push({ name:'taskPage',query: {result: row.result}})">{{ row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="rate"
        label="百分比"
      />
    </el-table>
  </div>
</template>

<script>
import { getStatisticsResult } from '@/api/task-manager'

export default {
  data() {
    return {
      resultTableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getStatisticsResult().then(data => {
        this.resultTableData = data.data
      })
    }
  }
}
</script>
<style>
td.blue-column {
  color: red;
}
</style>
