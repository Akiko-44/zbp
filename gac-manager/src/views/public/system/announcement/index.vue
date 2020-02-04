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
        <el-form-item label="公告标题:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.noticeName"
          > </el-input>
        </el-form-item>
        <!-- <el-form-item label="公告对象:">
          <el-select
            style="width: 195px;"
            v-model="listParams.notice"
            placeholder="请选择公告对象"
          >
            <el-option
              v-for="item in noticeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
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
        <!-- <el-button type="text"
                   @click="resetQuery">清空条件</el-button> -->
        <el-button
          type="primary"
          v-waves
          @click="$router.push({ name:'announcementModify'})"
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
        width="200px"
        align="center"
        label="公告ID"
      >
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="发布时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.addTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="公告标题"
      >
        <template slot-scope="{ row }">
          <span>{{row.noticeName}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="300px"
        align="center"
        label="公告对象"
      >
        <template slot-scope="{ row }">
          <span>{{row.noticePerson}}</span>
        </template>
      </el-table-column> -->

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
            @click="$router.push({ name:'announcementDetail',query:{id:row.id}})"
          >详情</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="$router.push({ name:'announcementModify',query:{id:row.id}})"
          >修改</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delAnnouncement(row.id, $index)"
          >删除</el-button>
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

    <!-- <audit-dialog ref="auditDialog"
                  :goodsSource="goodsSource"
                  @success="auditSuccess" /> -->
  </div>
</template>

<script>
import { searchNotice, deleteNotice } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令
// import auditDialog from './auditDialog'

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
        noticeName: '',
        beginDate: '',
        endDate: ''
      },
      noticeList: [
        { value: '', label: '全部' },
        { value: '1', label: '前端用户' },
        { value: '2', label: '去哪儿买' },
        { value: '3', label: '找设计师' },
        { value: '4', label: '寻代工' }
      ],
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.beginDate = this.createTime ? this.createTime[0] : ''
      this.listParams.endDate = this.createTime ? this.createTime[1] : ''
      searchNotice(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
        this.list.map(item => {
          const noticePerson = []
          item.notice.map(subItem => {
            this.noticeList.map(noticeItem => {
              if (subItem === noticeItem.value) {
                noticePerson.push(noticeItem.label)
              }
            })
          })
          item.noticePerson = noticePerson.join('、')
        })
      })
    },
    delAnnouncement(id, index) {
      this.$confirm('确认删除该公告？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const param = { id: id }
        deleteNotice(param).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
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
      // this.$router.replace({ name: this.routerName, query: { page: val }})
    },
    resetQuery() {
      this.listQuery.caseName = undefined
      // this.$refs['workListQueryForm'].resetFields()
      this.$router.replace({ name: this.routerName })
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
.auditBtn {
  margin-left: 0;
}
</style>
