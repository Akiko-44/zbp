<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
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
        <el-form-item prop="mobilePhone">
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
            style="width: 150px;"
            v-model="listParams.contentOwnerType"
            placeholder="作者类型"
            clearable
          >
            <el-option
              v-for="(value, key) in contentOwnerTypeMap"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            style="width: 150px;"
            v-model="listParams.contentStatus"
            placeholder="请选择内容状态"
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
          <el-select
            style="width: 150px;"
            v-model="listParams.pushStatus"
            placeholder="请选择推送状态"
            clearable
          >
            <el-option
              v-for="item in pushStatusList"
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
            v-model="listParams.isTop"
            placeholder="是否置顶"
            clearable
          >
            <el-option
              v-for="(value, key) in isTopMap"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
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
        >搜索</el-button>
        <!-- <el-button type="text"
                   @click="resetQuery">清空条件</el-button> -->
        <el-button
          class="fr"
          type="primary"
          v-waves
          @click="$router.push({ name:'contentManageModify'})"
        >发布内容</el-button>
      </el-form>
    </div>

    <el-table
      :key="0"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      max-height="530"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        label="排序"
      >
      </el-table-column>
      <el-table-column
        width="300px"
        class-name="blue"
        align="center"
        label="标题"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'contentManageDetail', query: {id: row.id, isDraft: 0, from: 1}})">{{row.title}}
            <img
              src="../../../../assets/image/mobile.png"
              width="20"
              style="vertical-align: text-bottom;"
              v-if="row.contentSourceType === 2"
            />
            <img
              src="../../../../assets/image/PC.png"
              width="20"
              style="vertical-align: text-bottom;"
              v-else
            />
          </span>
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
        width="80px"
        class-name="blue"
        align="center"
        label="标签"
      >
        <template slot-scope="{ row, $index }">
          <span @click="modifyLabel(row, $index )">{{row.labelName || '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="话题"
      >
        <template slot-scope="{ row }">
          <span>{{row.topicName?row.topicName:'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="浏览量"
      >
        <template slot-scope="{ row }">
          <span>{{row.viewNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="点赞数"
      >
        <template slot-scope="{ row }">
          <span>{{row.likeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="收藏数"
      >
        <template slot-scope="{ row }">
          <span>{{row.collectNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60px"
        class-name="blue"
        align="center"
        label="评论数"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'commentsGoods', query: {id: row.id, title: row.title}})">{{row.commentNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60px"
        align="center"
        label="推荐数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.recommendNumber?row.recommendNumber:0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="推荐类型"
      >
        <template slot-scope="{ row }">
          <span>{{recommendTypeMap[row.recommendType]?recommendTypeMap[row.recommendType]:'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
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
          <span>{{contentOwnerTypeMap[row.contentOwnerType]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="手机号"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="内容状态"
      >
        <template slot-scope="{ row }">
          <span>{{contentStatusMap[row.contentStatus]}}

            <el-popover
              placement="bottom"
              width="200"
              trigger="hover"
              :content="row.contentReviewDesc"
            >
              <i
                class="el-icon-warning"
                slot="reference"
                v-if="row.contentStatus == 2 || row.contentStatus == 3"
              ></i>
            </el-popover>
          </span>

        </template>
      </el-table-column>
      <el-table-column
        width="130px"
        align="center"
        label="推送状态"
      >
        <template slot-scope="{ row }">
          <span>{{pushStatusMap[row.pushStatus]}}
            <span v-if="row.pushStatus == 2 || row.pushStatus == 3">{{row.pushTime}}</span>
            <el-popover
              placement="bottom"
              width="200"
              trigger="hover"
              :content="row.pushReviewDesc"
            >
              <i
                class="el-icon-warning"
                slot="reference"
                v-if="row.pushStatus == 4"
              ></i>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="是否置顶"
      >
        <template slot-scope="{ row }">
          <span>{{row.isTop === 1 ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime ? row.updateTime: row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="100px"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <!-- <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="$router.push({ name:'associatedGoods',query:{id:row.id}})"
          >绑定商品</el-button> -->
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="handleTop(row, $index, 1)"
            v-if="row.isTop === 1"
          >取消置顶</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="handleTop(row, $index, 2)"
            v-if="row.isTop === 2 && topCount < 2"
          >置顶</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="handlePush(row, $index)"
            v-if="row.contentStatus == 1 && row.pushStatus === 0 && userParentId == row.authorParentId"
          >申请推送</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="$router.push({ name:'contentManageModify',query:{id:row.id, isDraft: 0}})"
            v-if="row.contentStatus !== 0 && userParentId == row.authorParentId && row.contentSourceType === 1"
          >编辑</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="handleForcedoff(row, $index)"
            v-if="row.contentStatus == 1"
          >强制下架</el-button>
          <!-- <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delContent(row.id, $index)"
          >删除</el-button> -->
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

    <label-dialog
      ref="labelDialog"
      :labelId="labelId"
      @success="modifyLabelSuccess"
    />
    <forcedoff-dialog
      ref="forcedoffDialog"
      @success="forcedoffSuccess"
    />
    <push-dialog
      ref="pushDialog"
      @success="pushSuccess"
    />
  </div>
</template>

<script>
import { jewelryContentList, delJewelryContent, jewelryColumnList, getTopicList, stickJewelryContent } from '@/api/public/jewelryRing'
import LabelDialog from './labelDialog'
import ForcedoffDialog from './forcedoffDialog'
import PushDialog from './pushDialog'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

export default {
  directives: {
    waves
  },
  components: {
    LabelDialog,
    ForcedoffDialog,
    PushDialog
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      columnList: [],
      topicList: [],
      authorId: Cookies.get('userId'),
      userParentId: Cookies.get('userParentId'),
      labelId: '',
      topCount: '', // 目前置顶数量
      listParams: {
        offset: 1,
        limit: 20,
        title: '',
        mobilePhone: '',
        authorId: '',
        type: '',
        columnId: '',
        topicId: '',
        contentOwnerType: '',
        userType: Cookies.get('userType'),
        isTop: '',
        contentStatus: '',
        pushStatus: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        mobilePhone: [
          {
            required: true,
            pattern: /^[0-9]*$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      typeList: [
        { value: '1', label: '图文' },
        { value: '2', label: '视频' }
      ],
      contentStatusList: [
        { value: '0', label: '待审核' },
        { value: '1', label: '审核通过' },
        { value: '2', label: '审核不通过' },
        { value: '3', label: '强制下架' },
        { value: '5', label: '已删除' }
      ],
      contentStatusMap: {
        0: '待审核',
        1: '审核通过',
        2: '审核不通过',
        3: '强制下架',
        4: '草稿',
        5: '已删除'
      },
      pushStatusList: [
        { value: '0', label: '未推送' },
        { value: '1', label: '待审核' },
        { value: '2', label: '已推送(全平台)' },
        { value: '3', label: '已推送(粉丝)' },
        { value: '4', label: '拒绝推送' }
      ],
      pushStatusMap: {
        0: '未推送',
        1: '待审核',
        2: '已推送(全平台)',
        3: '已推送(粉丝)',
        4: '拒绝推送'
      },
      recommendTypeMap: {
        1: '商品',
        2: '店铺',
        3: '外链'
      },
      contentOwnerTypeMap: {
        1: '个人',
        2: '商家',
        3: '运营',
        4: '自媒体'
      },
      isTopMap: {
        1: '是',
        2: '否'
      },
      index: undefined
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.listParams.authorId = this.$route.query.authorId
    this.getColumnList()
    this.getTopicList()
    // this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.listParams.limit = +this.$route.query.limit || 20
      this.listParams.title = this.$route.query.title
      this.listParams.mobilePhone = this.$route.query.mobilePhone
      this.listParams.authorId = this.$route.query.authorId
      this.listParams.type = this.$route.query.type
      this.listParams.columnId = this.$route.query.columnId
      this.listParams.topicId = this.$route.query.topicId
      this.listParams.contentOwnerType = this.$route.query.contentOwnerType
      this.listParams.contentStatus = this.$route.query.contentStatus
      this.listParams.topicId = this.$route.query.topicId
      this.listParams.isTop = this.$route.query.isTop
      this.listParams.pushStatus = this.$route.query.pushStatus
      if (this.$route.query.createTime) {
        this.createTime = JSON.parse(this.$route.query.createTime)
      }
      this.getList()
    },
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''

      jewelryContentList(this.listParams, 0).then(data => {
        this.list = data.data.records
        if (this.list && this.list.length) {
          this.topCount = this.list[0].topCount
        }
        this.list.map(item => {
          if (item.recommendType === 1) {
            item.recommendNumber = item.contentToGoodsDTOS.length
          } else if (item.recommendType === 2) {
            item.recommendNumber = item.contentToMerchantDTOS.length
          } else if (item.recommendType === 3) {
            item.recommendNumber = item.contentToExternalLinks.length
          }
        })
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getTopicList() {
      getTopicList(0).then(data => {
        this.topicList = data.data.page.records
      })
    },
    getColumnList() {
      jewelryColumnList().then(data => {
        data.data.records.map(item => {
          this.columnList.push({
            value: item.id,
            label: item.columnName
          })
          this.columnList = this.columnList.filter(function (obj) {
            return obj.value !== '1000'
          })
        })
      })
    },
    handleTop(row, index, status) {
      const msg = status === 1 ? '取消置顶' : '置顶'
      const changeStatus = status === 1 ? 2 : 1
      this.$confirm(`确认${msg}该内容？`, `标题：${row.topicName}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        stickJewelryContent(row.id, changeStatus).then(data => {
          this.getList()
        }).catch(() => { })
      })
    },
    delContent(id, index) {
      this.$confirm('确认删除该内容？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delJewelryContent(id).then(data => {
          this.list.splice(index, 1)
        }).catch(() => { })
      })
    },
    modifyLabelSuccess() {
      this.getList()
    },
    modifyLabel(row, index) {
      if (row.contentStatus !== 1) {
        this.$notify({
          title: '警告',
          message: '未审核通过内容不允许修改标签',
          type: 'warning',
          duration: 2000
        })
        return
      }
      const dialog = this.$refs.labelDialog
      dialog.dialogFormVisible = true
      dialog.form.id = row.id
      dialog.form.labelId = row.labelId
      dialog.title = row.title
      dialog.authorName = row.authorName
      this.index = index
    },
    forcedoffSuccess(form) {
      this.getList()
    },
    handleForcedoff(row, $index) {
      this.forcedoff(row, $index)
    },
    forcedoff(row, index) {
      const dialog = this.$refs.forcedoffDialog
      dialog.dialogFormVisible = true
      dialog.form.id = row.id
      this.index = index
    },
    pushSuccess(form) {
      this.getList()
    },
    handlePush(row, $index) {
      this.push(row, $index)
    },
    push(row, index) {
      const dialog = this.$refs.pushDialog
      dialog.dialogFormVisible = true
      dialog.form.id = row.id
      this.index = index
    },
    handleFilter() {
      // this.getList()
      this.$router.replace({
        name: 'contentManager',
        query: {
          page: this.listParams.offset,
          limit: this.listParams.limit,
          title: this.listParams.title,
          mobilePhone: this.listParams.mobilePhone,
          authorId: this.listParams.authorId,
          type: this.listParams.type,
          columnId: this.listParams.columnId,
          topicId: this.listParams.topicId,
          contentOwnerType: this.listParams.contentOwnerType,
          isTop: this.listParams.isTop,
          contentStatus: this.listParams.contentStatus,
          pushStatus: this.listParams.pushStatus,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    handleSizeChange(val) {
      // this.listParams.limit = val
      // this.getList()
      this.$router.replace({
        name: 'contentManager',
        query: {
          page: this.listParams.offset,
          limit: val,
          title: this.listParams.title,
          mobilePhone: this.listParams.mobilePhone,
          authorId: this.listParams.authorId,
          type: this.listParams.type,
          columnId: this.listParams.columnId,
          topicId: this.listParams.topicId,
          contentOwnerType: this.listParams.contentOwnerType,
          isTop: this.listParams.isTop,
          contentStatus: this.listParams.contentStatus,
          pushStatus: this.listParams.pushStatus,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    handleCurrentChange(val) {
      // this.listParams.offset = val
      // this.getList()
      this.$router.replace({
        name: 'contentManager',
        query: {
          page: val,
          limit: this.listParams.limit,
          title: this.listParams.title,
          mobilePhone: this.listParams.mobilePhone,
          authorId: this.listParams.authorId,
          type: this.listParams.type,
          columnId: this.listParams.columnId,
          topicId: this.listParams.topicId,
          contentOwnerType: this.listParams.contentOwnerType,
          isTop: this.listParams.isTop,
          contentStatus: this.listParams.contentStatus,
          pushStatus: this.listParams.pushStatus,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    resetQuery() {
      this.$router.replace({ name: this.routerName })
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
  margin-bottom: 5px;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
</style>
