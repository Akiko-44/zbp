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
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入标题名称"
            v-model="listParams.title"
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
        <el-form-item>
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
        class-name="blue"
        align="center"
        label="标题"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'jwcontentManageDetail', query: {id: row.contentId, isDraft: 0, from: 1, isWeMedia: true}})">{{row.title}}</span>
          <i v-if="row.contentSourceType === 2">【手机】</i>
          <i v-else>【电脑】</i>
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
        class-name="blue"
        align="center"
        label="举报类型"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'jwreportDetail', query: {id: row.reportId, type: row.appealStatus == 0? 1:2 , contentId: row.contentId, title: row.title, reportedType: reportTypeMap[row.reportedType], reportStatus: row.reportStatus, appealStatus: row.appealStatus}})">{{reportTypeMap[row.reportedType]}}</span>
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
        <template slot-scope="{ row }">
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            v-if="row.appealStatus == 0 && typeof(row.appealStatus) != 'string'"
            @click="$router.push({name: 'jwaddComplaint', query: {id: row.reportId,contentId: row.contentId, title: row.title}})"
          >立即申诉</el-button>
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
import { reportTypeList, getTopicList, jewelryColumnList } from '@/api/public/jewelryRing'
import { appealList } from '@/api/jewelryMerchant/report'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      columnList: [],
      topicList: [],
      reportTypeList: [],
      reportTypeMap: [],
      listParams: {
        offset: 1,
        limit: 20,
        title: '',
        type: undefined,
        columnId: undefined,
        topicId: undefined,
        reportedTypeId: undefined,
        appealStatusId: undefined,
        contentStatusId: undefined,
        startTime: '',
        endTime: '',
        reportedType: 2
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
        3: '强制下架',
        5: '强制下架'
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
      appealList(this.listParams).then(data => {
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
          this.columnList = this.columnList.filter(function(obj) {
            return obj.value !== '1000'
          })
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
