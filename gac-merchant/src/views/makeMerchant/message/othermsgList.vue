
<template>
    <div class="app-container calendar-list-container">
        <h4 id="BaseInfo">其他通知：</h4>
        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="消息内容">
                <template slot-scope="{ row }">
                    <span>{{row.goodsName}}库存不足</span>
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
    otherPage
  } from '@/api/makeMerchant/message'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'index',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: null,
        listLoading: true,
        listParams: {
          offset: 1,
          limit: 20
        },
        tableKey: 0
      }
    },
    watch: {

    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        otherPage(this.listParams)
          .then(data => {
            this.list = data.data.records
            this.total = data.data.total
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })
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

<style lang="postcss" scoped>
    .el-collapse-item:last-child{
        margin-bottom: 0;
    }
</style>

