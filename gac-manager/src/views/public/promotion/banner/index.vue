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
        <el-form-item label="banner名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.name"
            placeholder="请输入banner名称"
          > </el-input>
        </el-form-item>
        <el-form-item label="banner位置:">
          <el-select
            style="width: 195px;"
            v-model="listParams.category"
            placeholder="请选择banner位置"
          >
            <el-option
              v-for="(item,i) in categoryList"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            style="width: 195px;"
            v-model="listParams.showStatus"
            placeholder="请选择banner状态"
          >
            <el-option
              v-for="(item,i) in statusList"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加时间:">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查找</el-button>
        <el-button
          type="primary"
          v-waves
          @click="$router.push({ name:'bannerModify'})"
        >添加</el-button>
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
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="banner名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="banner位置"
      >
        <template slot-scope="{ row }">
          <span>{{ categoryList[row.category] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{ statusList[row.showStatus] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="创建时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="$router.push({ name:'bannerModify',query:{data:JSON.stringify(row)}})"
          >修改</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delBanner(row.id, $index)"
          >删除</el-button>
          <el-button
            v-if="row.showStatus === 1"
            class="auditBtn"
            size="small"
            @click="pause(row.id, 2, $index)"
          >暂停</el-button>
          <el-button
            v-if="row.showStatus === 2"
            class="auditBtn"
            size="small"
            @click="pause(row.id, 1, $index)"
          >启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>

<script>
import { getJewelryBanners, delJewelryBanners, pauseJewelryBanners } from '@/api/dm/homeSettings'
import { jewelryColumnList } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  // components: {
  //   auditDialog
  // },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        name: '',
        showStatus: undefined,
        category: undefined,
        startTime: '',
        endTime: ''
      },
      categoryList: {
        0: '全部',
        1: '首页',
        2: '去哪儿买',
        3: '寻代工',
        4: '找设计师'
      },
      statusList: {
        0: '请选择',
        1: '启用中',
        2: '已暂停'
      },
      index: undefined
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    jewelryColumnList({ offset: 1, limit: 999 }).then(data => {
      const obj = {}
      data.data.records.map(item => {
        obj[item.id] = item.columnName
      })
      this.categoryList = Object.assign({}, this.categoryList, obj)
      delete this.categoryList[1000]
    })
    // this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.listParams.limit = +this.$route.query.limit || 20
      this.listParams.name = this.$route.query.name
      this.listParams.showStatus = this.$route.query.showStatus
      this.listParams.category = this.$route.query.category
      if (this.$route.query.createTime) {
        this.createTime = JSON.parse(this.$route.query.createTime)
      }
      this.getList()
    },
    getList() {
      this.listLoading = true
      if (this.listParams.category == 0) {
        this.listParams.category = undefined
      }
      if (this.listParams.showStatus == 0) {
        this.listParams.showStatus = undefined
      }
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      getJewelryBanners(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delBanner(id, index) {
      this.$confirm('确认删除该banner？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delJewelryBanners(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    pause(id, status, index) {
      const tipText = status === 1 ? '展示' : '暂停'
      this.$confirm(`确认${tipText}该banner？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        pauseJewelryBanners(id, status).then((data) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.list[index].showStatus = status
        })
      })
    },
    handleFilter() {
      // this.getList()
      this.$router.replace({
        name: 'banner',
        query: {
          page: this.listParams.offset,
          limit: this.listParams.limit,
          name: this.listParams.name,
          showStatus: this.listParams.showStatus,
          category: this.listParams.category,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    handleSizeChange(val) {
      // this.listParams.limit = val
      // this.getList()
      this.$router.replace({
        name: 'banner',
        query: {
          page: this.listParams.offset,
          limit: val,
          name: this.listParams.name,
          showStatus: this.listParams.showStatus,
          category: this.listParams.category,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    handleCurrentChange(val) {
      // this.listParams.offset = val
      // this.getList()
      this.$router.replace({
        name: 'banner',
        query: {
          page: val,
          limit: this.listParams.limit,
          name: this.listParams.name,
          showStatus: this.listParams.showStatus,
          category: this.listParams.category,
          createTime: JSON.stringify(this.createTime)
        }
      })
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
.auditBtn {
  margin-left: 0;
}
</style>
