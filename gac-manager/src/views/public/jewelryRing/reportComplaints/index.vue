<template>
  <div class="app-container calendar-list-container">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="tabHandleClick"
    >
      <el-tab-pane
        label="举报列表"
        name="reportList"
      ></el-tab-pane>
      <el-tab-pane
        label="申诉列表"
        name="complaintsList"
      ></el-tab-pane>
    </el-tabs>
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="100px"
        class="notifyListQueryForm"
      >
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入标题名称"
            v-model="listParams.title"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入手机号"
            v-model="listParams.mobilePhone"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listParams.type"
            placeholder="请选择类型"
            clearable
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listParams.columnId"
            placeholder="请选择栏目"
            clearable
          >
            <el-option
              v-for="item in columnList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 150px;"
            v-model="listParams.topicId"
            placeholder="请选择话题"
            clearable
          >
            <el-option
              v-for="item in topicList"
              :key="item.id"
              :label="item.topicName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listParams.authorTypeId"
            placeholder="作者类型"
            clearable
          >
            <el-option
              v-for="item in authorTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listParams.reportedTypeId"
            placeholder="举报类型"
            clearable
          >
            <el-option
              v-for="item in reportTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="activeName == 'reportList'">
          <el-select
            style="width: 120px;"
            v-model="listParams.reportStatusId"
            placeholder="举报状态"
            clearable
          >
            <el-option
              v-for="item in reportStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 120px;"
            v-model="listParams.appealStatusId"
            placeholder="申诉状态"
            clearable
          >
            <el-option
              v-for="item in appealStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="activeName == 'reportList'">
          <el-select
            style="width: 120px;"
            v-model="listParams.contentStatusId"
            placeholder="内容状态"
            clearable
          >
            <el-option
              v-for="item in contentStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
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
        label="编号"
      >
      </el-table-column>
      <el-table-column
        width="300px"
        class-name="blue"
        align="center"
        label="标题"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'contentManageDetail', query: {id: row.contentId, isDraft: 0, from: 0}})">{{row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        align="center"
        label="类型"
      >
        <template slot-scope="{ row }">
          <span>{{row.type == 1 ? '图文' : '视频'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="栏目"
      >
        <template slot-scope="{ row }">
          <span>{{row.columnName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        align="center"
        label="话题"
      >
        <template slot-scope="{ row }">
          <span>{{row.topicName?row.topicName:'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="50px"
        align="center"
        label="标签"
      >
        <template slot-scope="{ row }">
          <span>{{row.labelName?row.labelName:'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="浏览量"
      >
        <template slot-scope="{ row }">
          <span>{{row.viewNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="点赞数"
      >
        <template slot-scope="{ row }">
          <span>{{row.likeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="收藏数"
      >
        <template slot-scope="{ row }">
          <span>{{row.collectNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="评论数"
      >
        <template slot-scope="{ row }">
          <!-- <span @click="$router.push({ name: 'commentsGoods', query: {id: row.id}})">{{row.commentNumber}}</span> -->
          <span>{{row.commentNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="推荐数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.recommendCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="推荐类型"
      >
        <template slot-scope="{ row }">
          <span>{{recommendTypeMap[row.recommendType]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="作者"
      >
        <template slot-scope="{ row }">
          <span>{{row.authorName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="作者类型"
      >
        <template slot-scope="{ row }">
          <span>{{authorTypeMap[row.authorType]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="手机号"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        class-name="blue"
        label="被举报次数"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'reportDetail', query: {id: row.reportId, type: reportOrComplaint, title: row.title, reportedType: reportTypeMap[row.reportedType], reportStatus: row.reportStatus, appealStatus: row.appealStatus}})">{{row.reportedCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="举报类型"
      >
        <template slot-scope="{ row }">
          <span>{{reportTypeMap[row.reportedType]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="举报状态"
        v-if="activeName == 'reportList'"
      >
        <template slot-scope="{ row }">
          <span>{{reportStatusMap[row.reportStatus]}}</span>
          <el-tooltip
            :content="row.reportFail"
            placement="bottom"
            effect="light"
            v-if="row.reportStatus === 3"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="申诉状态"
      >
        <template slot-scope="{ row }">
          <span v-if="typeof(row.appealStatus) != 'string'">{{appealStatusMap[row.appealStatus]}}</span>
          <span v-else>/</span>
          <el-tooltip
            :content="row.appealFail"
            placement="bottom"
            effect="light"
            v-if="row.appealStatus === 3"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="内容状态"
        v-if="activeName == 'reportList'"
      >
        <template slot-scope="{ row }">
          <span>{{contentStatusMap[row.contentStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
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
            @click="handleAuditReport(row, $index)"
            v-if="activeName == 'reportList' && row.reportStatus == 1"
          >审核</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="handleAuditComplaint(row, $index)"
            v-if="activeName == 'complaintsList' && row.reportStatus == 2 && row.appealStatus == 1"
          >审核</el-button>
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
    <audit-report-dialog
      ref="auditReportDialog"
      @success="auditReportSuccess"
    />
    <audit-complaint-dialog
      ref="auditComplaintDialog"
      @success="auditComplaintSuccess"
    />
  </div>
</template>

<script>
import { getTopicList, jewelryColumnList, reportTypeList, reportList } from '@/api/public/jewelryRing'
import AuditReportDialog from './auditReportDialog'
import AuditComplaintDialog from './auditComplaintDialog'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    AuditReportDialog,
    AuditComplaintDialog
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      activeName: 'reportList',
      reportOrComplaint: 1,
      columnList: [],
      topicList: [],
      reportTypeList: [],
      reportTypeMap: [],
      listParams: {
        offset: 1,
        limit: 20,
        title: undefined,
        mobilePhone: undefined,
        type: undefined,
        columnId: undefined,
        topicId: undefined,
        authorTypeId: undefined,
        reportedTypeId: undefined,
        reportStatusId: undefined,
        appealStatusId: undefined,
        contentStatusId: undefined,
        startTime: undefined,
        endTime: undefined
      },
      typeList: [
        { value: '1', label: '图文' },
        { value: '2', label: '视频' }
      ],
      contentStatusList: [
        { value: '0', label: '待审核' },
        { value: '1', label: '审核通过' },
        { value: '2', label: '审核不通过' },
        { value: '3', label: '强制下架' }
      ],
      contentStatusMap: {
        0: '待审核',
        1: '审核通过',
        2: '审核不通过',
        3: '强制下架'
      },
      authorTypeList: [
        { value: '1', label: '个人' },
        { value: '2', label: '商家' },
        { value: '3', label: '运营' },
        { value: '4', label: '自媒体' }
      ],
      authorTypeMap: {
        1: '个人',
        2: '商家',
        3: '运营',
        4: '自媒体'
      },
      reportStatusList: [
        { value: '1', label: '待审核' },
        { value: '2', label: '举报成功' },
        { value: '3', label: '举报失败' }
      ],
      reportStatusMap: {
        1: '待审核',
        2: '举报成功',
        3: '举报失败'
      },
      appealStatusList: [
        { value: '0', label: '待申诉' },
        { value: '1', label: '申诉中' },
        { value: '2', label: '申诉成功' },
        { value: '3', label: '申诉失败' }
      ],
      appealStatusMap: {
        0: '待申诉',
        1: '申诉中',
        2: '申诉成功',
        3: '申诉失败'
      },
      recommendTypeMap: {
        1: '商品',
        2: '店铺',
        3: '外链'
      },
      index: undefined
    }
  },
  created() {
    this.listParams.authorId = this.$route.query.authorId
    this.getColumnList()
    this.getTopicList()
    this.getReportTypeList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      reportList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getColumnList() {
      jewelryColumnList().then(data => {
        data.data.records.map(item => {
          this.columnList.push({
            value: item.id,
            label: item.columnName
          })
          /* this.columnList = this.columnList.filter(function(obj) {
            return obj.value !== '1000'
          }) */
        })
      })
    },
    getTopicList() {
      getTopicList(0).then(data => {
        this.topicList = data.data.page.records
      })
    },
    getReportTypeList() {
      const self = this
      reportTypeList({
        offset: 1,
        limit: 200
      }, 0).then(data => {
        this.reportTypeList = data.data.records
        self.reportTypeMap = self.convert(self.reportTypeList)
      })
    },
    convert(array) {
      const result = {}
      for (let index = 0; index < array.length; index++) {
        result[array[index].id] = array[index].name
      }
      return result
    },
    tabHandleClick(tab, event) {
      if (this.activeName === 'reportList') {
        this.reportOrComplaint = 1
      } else {
        this.reportOrComplaint = 2
      }
      this.getList()
    },
    auditReportSuccess(form) {
      this.getList()
    },
    handleAuditReport(row, $index) {
      this.auditReport(row, $index)
    },
    auditReport(row, index) {
      const dialog = this.$refs.auditReportDialog
      dialog.dialogFormVisible = true
      dialog.reportId = row.reportId
      dialog.reportedType = this.reportTypeMap[row.reportedType]
      dialog.title = row.title
      this.index = index
    },
    auditComplaintSuccess(form) {
      this.getList()
    },
    handleAuditComplaint(row, $index) {
      this.auditComplaint(row, $index)
    },
    auditComplaint(row, index) {
      const dialog = this.$refs.auditComplaintDialog
      dialog.dialogFormVisible = true
      dialog.reportId = row.reportId
      dialog.title = row.title
      dialog.reportedType = this.reportTypeMap[row.reportedType]
      this.index = index
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
.auditBtn {
  margin-left: 0;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
/deep/ .el-tabs__header {
  z-index: 0;
}
</style>
