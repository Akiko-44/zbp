<template>
<div>
	<el-dialog
      title="物流跟踪信息"
      :visible.sync="dialogExpressVisible"
    >
      <p>物流公司：{{ data.expressCompany }}</p>
      <p>物流单号：{{ data.expressNum }}</p>
	  <el-table
        :data="data.expressRespondDate"
        border
      >
        <el-table-column
          align="center"
          label="时间"
          width="200px"
        >
          <template slot-scope="{ row }">
            <span>{{row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="{ row }">
            <span>{{row.context}}</span>
          </template>
        </el-table-column>
      </el-table>
   </el-dialog>
</div>
</template>

<script>
import waves from '@/directive/waves'; // 水波纹指令

export default {
  directives: {
    waves
  },
  props: {
  	data: {
  		type: Object,
  		default: {}
  	}
  },
  data() {
    return {
      dialogExpressVisible: false
    }
  }
}    
</script>

<style>
</style>