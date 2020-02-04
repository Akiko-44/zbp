
<template>
<div class="app-container calendar-list-container">
  <!--<div class="filter-container">
    <el-button @click="showDialog" type="primary" icon="edit">设置规则</el-button>
  </div>-->
    <!-- 订单类型：1珠宝店,2互换销售订单,3拍卖订单, 5设计室, 6制造间, 7图文管 -->
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入内容" v-model="listQuery.userName"> </el-input>
    <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="150px" align="left" label="评论人">
      <template slot-scope="{ row }">
        <span>{{row.userName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column width="150px" align="left" label="商品">
      <template slot-scope="{ row }">
        <span>{{row.targetName}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="评论内容">
      <template slot-scope="{ row }">
        <span>{{row.content}}</span>
      </template>
    </el-table-column>

      <!--<el-table-column width="180px" align="left" label="评论对象">
          <template slot-scope="{ row }">
              <span>{{row.sellUserName}}</span>
          </template>
      </el-table-column>-->

    <el-table-column width="180px" align="left" label="评论时间">
      <template slot-scope="{ row }">
        <span>{{row.createTime}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="操作" width="150px">
      <template slot-scope="{ row, $index }">
          <el-button
              size="small"
              @click="$router.push({ name: 'commentDetail', query: { id: row.id } })"
          >
              查看
          </el-button>
        <!--<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>-->
      </template>
    </el-table-column>

  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

  <el-dialog title="设置规则" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="过滤词汇" prop="keyword">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入过滤词汇，使用；分隔，如：关键词1；关键词2；" v-model="form.keyword"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  pageList,
  delObj,
  getRegular,
  setRegular
} from '@/api/dm/comment'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

// 缓存过滤内容关键字
let keyword

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
        merchantId:Cookies.get('merchantId'),
        userName: undefined
      },
      tableKey: 0,
      dialogFormVisible: false,
      form: {
        keyword: ''
      },
      rules: {
        keyword: [
          {
            required: true,
            message: '请输入过滤词汇',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      pageList(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
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
      this.$confirm(`确定删除当前文章的这条评论？`, '提示', {
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
    /*async showDialog() {
      if (keyword === undefined) {
        keyword = await getRegular().then(data => data.data.keyword)
      }
      this.form.keyword = keyword
      this.dialogFormVisible = true
    },*/
    cancel(formName) {
      this.dialogFormVisible = false
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          setRegular(this.form).then(() => {
            this.dialogFormVisible = false
            // 更新缓存
            keyword = this.form.keyword
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
