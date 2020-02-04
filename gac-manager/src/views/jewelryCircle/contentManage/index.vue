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
          @click="$router.push({ name:'jccontentManageModify'})"
        >发布内容</el-button>
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
          <span @click="$router.push({ name: 'jccontentManageDetail', query: {id: row.id, isDraft: 0, from: 1, isWeMedia: true}})">{{row.title}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="150px"
        align="center"
        label="作者"
      >
        <template slot-scope="{ row }">
          <span>{{row.authorName}}</span>
        </template>
      </el-table-column> -->
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
          <span>{{row.recommendNumber}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="150px"
        align="center"
        label="绑定商品数量"
      >
        <template slot-scope="{ row }">
          <span>{{row.goodsVOS.length}}</span>
        </template>
      </el-table-column> -->
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
            <span v-if="row.pushStatus == 2 || row.pushStatus == 3"><br />{{row.pushTime}}</span>
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
        width="160px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="200px"
        fixed="right"
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
            @click="handlePush(row, $index)"
            v-if="row.contentStatus == 1 && (row.pushStatus === 0)"
          >申请推送</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="$router.push({ name:'jccontentManageModify',query:{id:row.id, isDraft: 0}})"
            v-if="row.contentStatus !== 0"
          >编辑</el-button>
          <!-- <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="handleForcedoff(row, $index)"
            v-if="row.contentStatus == 1"
          >强制下架</el-button> -->
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delContent(row.id, $index)"
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

    <push-dialog
      ref="pushDialog"
      @success="pushSuccess"
    />
  </div>
</template>

<script>
import { jewelryContentList, delJewelryContent, jewelryColumnList } from '@/api/public/jewelryRing'
import PushDialog from './pushDialog'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

export default {
  directives: {
    waves
  },
  components: {
    PushDialog
  },
  data() {
    return {
      createTime: '',
      list: null,
      total: null,
      listLoading: false,
      columnList: [],
      listParams: {
        offset: 1,
        limit: 20,
        title: '',
        authorId: Cookies.get('userId'),
        columnId: '',
        contentStatus: '',
        pushStatus: '',
        startTime: '',
        endTime: ''
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
      index: undefined
    }
  },
  created() {
    this.getColumnList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      jewelryContentList(this.listParams, 0).then(data => {
        this.list = data.data.records
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
    resetQuery() {
      this.listQuery.caseName = undefined
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
  margin-bottom: 5px;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
</style>
