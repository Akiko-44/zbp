<template>

  <el-dialog
    title="推荐-内容"
    :visible.sync="dialogTableVisible"
  >
    <el-form
      :inline="true"
      :model="listParams"
      ref="notifyListQueryForm"
      label-width="100px"
      class="notifyListQueryForm"
    >
      <el-form-item label="标题名称:">
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 195px;"
          v-model="listParams.title"
        > </el-input>
      </el-form-item>
      <el-form-item label="栏目:">
        <el-select
          style="width: 195px;"
          v-model="listParams.columnId"
          placeholder="请选择栏目"
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
        @click="getList"
      >搜索</el-button>
    </el-form>
    <span class="tip"> 提示：单击以下选项即可选中该内容</span>
    <el-table
      :data="contentList"
      ref="enterpriseTable"
      highlight-current-row
      @current-change="tableCurrentChange"
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
        align="center"
        label="标题"
      >
        <template slot-scope="{ row }">
          <span>{{row.title}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="100px"
        align="center"
        label="类型"
      >
        <template slot-scope="{ row }">
          <span>{{row.type == 1 ? '图文' : '视频'}}</span>
        </template>
      </el-table-column> -->
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
        width="100px"
        align="center"
        label="栏目"
      >
        <template slot-scope="{ row }">
          <span>{{row.columnName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="浏览量"
      >
        <template slot-scope="{ row }">
          <span>{{row.viewNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="点赞数"
      >
        <template slot-scope="{ row }">
          <span>{{row.likeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="收藏数"
      >
        <template slot-scope="{ row }">
          <span>{{row.collectNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        class-name="blue"
        align="center"
        label="评论数"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'commentsGoods', query: {id: row.id}})">{{row.commentNumber}}</span>
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
        width="200px"
        align="center"
        label="更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updateTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, prev, pager, next"
        :total="total"
      > </el-pagination>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="selectContent"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { jewelryContentList, jewelryColumnList } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

export default {
  name: 'chooseEnterprise',
  directives: {
    waves
  },
  data() {
    return {
      dialogTableVisible: false,
      columnList: [{
        value: '',
        label: '全部'
      }],
      listParams: {
        offset: 1,
        limit: 10,
        columnId: '',
        startTime: '',
        endTime: '',
        contentStatus: 1,
        userType: Cookies.get('userType')
      },
      total: 0,
      selectedName: {},
      contentList: [],
      createTime: '',
      index: 0
    }
  },
  mounted() {

  },
  methods: {
    getList() {
      if (this.columnList.length < 2) {
        this.getColumnList()
      }
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      jewelryContentList(this.listParams, 0).then(data => {
        this.contentList = data.data.records
        this.contentList.map(item => {
          if (item.recommendType === 1) {
            item.recommendNumber = item.contentToGoodsDTOS.length
          } else if (item.recommendType === 2) {
            item.recommendNumber = item.contentToMerchantDTOS.length
          } else if (item.recommendType === 3) {
            item.recommendNumber = item.contentToExternalLinks.length
          }
        })
        this.total = data.data.total
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
    tableCurrentChange(val) {
      this.selectedName = val
      this.selectedName.index = this.index
    },
    selectContent() {
      this.dialogTableVisible = false
      this.$emit('selectContent', this.selectedName)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    }
  }
}
</script>

<style scoped>
table img {
  width: 100px;
  height: 100px;
}
.blue {
  color: #409eff;
}
</style>
