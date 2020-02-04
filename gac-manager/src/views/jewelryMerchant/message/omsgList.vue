
<template>
    <div class="app-container calendar-list-container">
        <h4 id="BaseInfo">订单消息：</h4>
        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="消息内容">
                <template slot-scope="{ row }">
                    <span v-if="row.isCommented === 2">{{row.buyUserName}}对{{row.orderNumber}}进行了评价</span>
                    <span v-if="row.state === 2">
                      {{row.buyUserName}}购买了
                      <template v-for="goods in row.orderGoodVOList">
                        {{goods.skuName}}，
                      </template>
                    </span>
                    <span v-else-if="row.state === 6">{{row.orderNumber}}已送达{{row.buyUserName}}手中</span>
                    <span v-else-if="row.state === 8">{{row.buyUserName}}取消了订单{{row.orderNumber}}</span>
                    <span v-else-if="row.state === 13">{{row.buyUserName}}申请退货退款，请及时处理</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="时间">
                <template slot-scope="{ row }">
                    <span>{{row.createTime}}</span>
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
    orderPage
  } from '@/api/jewelryMerchant/message'
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
        listQuery: {
          offset: 1,
          limit: 20
        },
        tableKey: 0,
        state: undefined
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
        orderPage(this.listQuery)
          .then(data => {
            this.list = data.data.records
            this.total = data.data.total
            this.listLoading = false
          }).catch(() => {
            this.listLoading = false
          })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.offset = val
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

