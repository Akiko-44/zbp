<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
        :rules="rules"
        ref="workListQueryForm"
        label-width="100px"
        class="listQueryForm"
      >
        <el-form-item label="商品ID:" prop="caseId">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.caseId"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="设计师名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listQuery.userName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品状态:">
          <el-select
            v-model="listQuery.auditState"
            clearable
            placeholder="请选择商品状态"
            style="width: 195px;"
          >
            <el-option
              v-for="item in auditState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间:">
          <el-date-picker
            v-model="createTime"
            @change="handleFilter"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>

        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
          >查找</el-button
        >
        <el-button type="text" @click="resetQuery">清空条件</el-button>
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
      <el-table-column width="100px" align="center" label="商品ID">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" label="商品名称">
        <template slot-scope="{ row }">
          <span
            class="table-link"
            @click="
              $router.push({
                name: 'publicDesignDetail',
                query: { data: JSON.stringify(row), type: '0' }
              })
            "
            >{{ row.caseName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="商品图片">
        <template slot-scope="{ row }">
          <img :src="row.imageUrl" alt="" width="100" />
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="所属设计师">
        <template slot-scope="{ row }">
          <span>{{ row.merchantName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="联系人">
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="手机号码">
        <template slot-scope="{ row }">
          <span>{{ row.mobilePhone }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="所在城市">
        <template slot-scope="{ row }">
          <span>{{ row.cityName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="商品价格">
        <template slot-scope="{ row }">
          <span>￥{{ row.mobilePhone }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="100px" align="center" label="库存">
        <template slot-scope="{ row }">
          <span>{{ row.mobilePhone }}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="100px" align="center" label="累计销售数量">
        <template slot-scope="{ row }">
          <span>{{ row.sellingNum || "0" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="累计销售金额">
        <template slot-scope="{ row }">
          <span>￥{{ row.saleAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="评论数量">
        <template slot-scope="{ row }">
          <span>{{ row.commentNumber || "0" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="商品状态">
        <template slot-scope="{ row }">
          <span>{{ auditStateMap[row.auditState] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="发布时间">
        <template slot-scope="{ row }">
          <span>￥{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="left" label="操作">
        <template slot-scope="{ row, $index }">
          <!-- <el-button
            size="small"
            @click="
              $router.push({ name: 'workDetail', query: { id: row.caseId } })
            "
            >查看</el-button
          > -->
          <el-button
            v-if="row.auditState == 0"
            size="small"
            type="primary"
            @click="audit(row, 1, $index)"
            >审核通过</el-button
          >
          <el-button
            v-if="row.auditState == 0"
            size="small"
            type="warning"
            @click="audit(row, 2, $index)"
            >审核拒绝</el-button
          >
          <el-button
            v-if="row.auditState == 3"
            size="small"
            @click="audit(row, 5, $index)"
            >下架</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <audit-dialog ref="auditDialog" :goodsSource="5" @success="auditSuccess" />
  </div>
</template>

<script>
import { customMadeWork } from '@/api/public/dm';
import waves from '@/directive/waves'; // 水波纹指令
import auditDialog from './auditDialog';

export default {
  directives: {
    waves
  },
  components: {
    auditDialog
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        caseId: undefined,
        userName: undefined,
        startTime: '',
        endTime: '',
        auditState: undefined
      },
      createTime: '',
      auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' },
        { value: 3, label: '上架' },
        { value: 4, label: '下架' },
        { value: 5, label: '强制下架' }
      ],
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架',
        5: '强制下架'
      },
      index: undefined,
      rules: {
        caseId: [
          { pattern: /^[0-9]*$/, message: '商品ID需为纯数字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: 'fetchData',
    createTime(value) {
      this.listQuery.startTime = value ? value[0] : undefined
      this.listQuery.endTime = value ? value[1] : undefined
    }
  },
  created() {
    //  this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listQuery.offset = +this.$route.query.page || 1
      this.listQuery.limit = +this.$route.query.size || 20
      this.getList()
    },
    getList() {
      this.listLoading = true
      customMadeWork(this.listQuery, this.listQuery).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.$refs['workListQueryForm'].validate(valid => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.$router.replace({
        name: 'publicDesignWork',
        query: { page: this.listQuery.offset, size: val }
      })
    },
    handleCurrentChange(val) {
      this.$router.replace({
        name: 'publicDesignWork',
        query: { page: val, size: this.listQuery.limit }
      })
    },
    resetQuery() {
      this.listQuery.userName = undefined
      this.listQuery.caseId = undefined
      this.listQuery.auditState = undefined
      this.createTime = '';
      this.$refs['workListQueryForm'].resetFields()
      this.$router.replace({ name: 'publicDesignWork' })
      this.getList()
    },
    audit(row, state, index) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.caseId = row.id
      dialog.form.isCheckSale = state
      dialog.form.type = 0
      dialog.form.checkDesc = '';
      this.index = index
    },
    auditSuccess() {
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
.table-link {
  color: rgb(64, 158, 255);
  cursor: pointer;
}
</style>
