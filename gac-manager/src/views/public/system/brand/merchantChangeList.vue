
<template>
  <div class="app-container calendar-list-container">
    
    <div class="filter-container">
     
      <el-input @keyup.enter.native="handleFilter"
      placeholder="请输入商户ID"
                style="width: 195px;"
                v-model="listParams.userId"> </el-input>
      
      <el-input @keyup.enter.native="handleFilter"
                placeholder="请输入商户名称"
                style="width: 195px;"
                v-model="listParams.merchantName"> </el-input>
   
      <el-button type="primary"
                 icon="el-icon-search"
                 v-waves
                 @click="handleFilter">查询</el-button>
    </div>

    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">

      <el-table-column width="110px"
                       align="center"
                       label="商户ID">
        <template slot-scope="{ row }">
          <span>{{row.userId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="商家名称">
        <template slot-scope="{ row }">
          <span>{{row.merchantName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px"
                       align="center"
                       label="商家联系人"
                       class-name="content">
        <template slot-scope="{ row }">
          <span>{{row.merchantRealName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px"
                       align="center"
                       label="商家手机号">
        <template slot-scope="{ row }">
          <span>{{row.phoneNum}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="left"
                       label="操作">
        <template slot-scope="{ row, $index }">
          <el-button size="small"
                     type="primary"
                     @click="brind(row,!row.isBinding)"
                     v-if="row.isBinding">绑定</el-button>
          <el-button size="small"
                     type="warning"
                     @click="brind(row,!row.isBinding)"
                     v-else>解绑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { brandBindingMerchant, delBrandMerchant, getMerchantInfo } from '@/api/public/brand'
const getInitQuery = () => {
  return {

  }
}

export default {
  directives: {
    waves
  },
  components: {

  },
  data() {
    return {
      brandID: this.$route.query.brandID,
      brandName: this.$route.query.brandName,
      pic: this.$route.query.pic,
      result: false,
      list: [],
      total: null,
      listLoading: true,
      listParams: {
        offset: 1,
        limit: 20,
        merchantName: undefined,
        userId: undefined,
        brandId: this.$route.query.brandID
      },
      listQuery: getInitQuery(),
      tableKey: 0
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getMerchantInfo(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getMerchantList() {
      getMerchantInfo(this.listParams).then(data => {
        this.$nextTick(() => {
          var arr = data.data.records
          this.result = arr.some(item => {
            this.list.forEach(element => {
              if (item.userId == element.userId) {
                return false
              } else {
                return true
              }
            })
          })
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
    },
    handleFilterAdd(id) {
      id == '0' ? id = this.$route.query.brandID : id = id
      console.log(id)
      this.$router.push({ name: 'merchantManager', query: { brandId: id, brandName: this.$route.query.brandName, pic: this.$route.query.pic }})
    },
    // 绑定
    brind(row, type) {
      console.log(row)
      /**
        品牌id brandId
        品牌名称 brandName
        品牌图片 brandPic
        商家id userId
        商家名称 merchantName
        商家电话 phoneNum
        商家真实名称 merchantRealName
        0绑定1未绑定 bindingType
       */
      type = type == true ? 1 : 0
      var params = {
        brandName: this.brandName,
        brandId: this.brandID,
        brandPic: this.pic,
        userId: row.userId,
        merchantName: row.merchantName,
        phoneNum: row.phoneNum,
        merchantRealName: row.merchantRealName,
        bindingType: type
      }
      console.log(203, params)

      brandBindingMerchant(params).then(data => {
        if (data.msg == '成功') {
          this.getList()
        }
      })
    },
    // 删除
    delMerchant(id) {
      this.$confirm(`确定删除当前商家？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBrandMerchant(id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
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
/deep/ .content img {
  width: 100%;
}
</style>