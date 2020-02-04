
<template>
    <div class="app-container calendar-list-container">
        <h4 id="BaseInfo">系统通知：</h4>
        <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column width="200px" align="center" label="消息标题">
                <template slot-scope="{ row }">
                    <span>{{row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="消息内容">
                <template slot-scope="{ row }">
                    <span v-html="row.content"></span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="发布时间">
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
    page
  } from '@/api/designMerchant/message'
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
          limit: 20,
          title: '',
          content: ''
        },
        tableKey: 0,
        dateValue: '',
        updateValue: ''
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
        page(this.listQuery)
          .then(data => {
            this.list = data.data.records
            this.total = data.data.total
            this.list.forEach(item => {
            	item.content = item.content.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
            	item.content = item.content.replace(/<img/g, '<img width="200"')
            })
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

