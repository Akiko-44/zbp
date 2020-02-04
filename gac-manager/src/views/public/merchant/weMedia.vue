<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="weMediaListForm"
        label-width="100px"
        class="weMediaListForm"
      >
        <el-form-item
          label="作者名称:"
          prop="name"
        >
          <el-input
            class="search-input"
            placeholder="请输入作者名称"
            :maxlength="20"
            @keyup.enter.native="handleFilter"
            v-model="listParams.name"
          > </el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            v-model="listParams.status"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              label="全部"
              :value="undefined"
            >
            </el-option>
            <el-option
              v-for="(value, key) in statusList"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="dateValue"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          v-waves
          @click="handleFilter"
        >查询</el-button>
        <el-button
          class="fr"
          type="primary"
          icon="el-icon-search"
          v-waves
          @click="$router.push({name:'addWeMedia'})"
        >创建账号</el-button>
      </el-form>
    </div>

    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="50"
      >
      </el-table-column>

      <el-table-column
        align="center"
        property="name"
        label="作者名称"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="作者logo"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.userLogo"
            width="100"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="登录账号"
        property="username"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="内容数"
        class-name="blue"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'contentManage', query: {authorId: row.id}})">{{row.jewelryContentNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="粉丝数"
        class-name="blue"
      >
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: 'weMediaFans', query: {authorId: row.id, authorName: row.name}})">{{row.jewelryContentFansNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="获赞与收藏"
        property="jewelryContentLikeAndCollectNumber"
      >
      </el-table-column>

      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{statusList[row.status]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="创建时间"
        property="crtTime"
      >
      </el-table-column>

      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="{ row, $index}">
          <el-button
            size="small"
            @click="$router.push({ name: 'addWeMedia', query: { id: row.id } })"
          >编辑</el-button>
          <el-button
            size="small"
            @click="changeStatus(row.id, 0, $index, row.name)"
            v-if="row.status == 1"
          >冻结</el-button>
          <el-button
            size="small"
            @click="changeStatus(row.id, 1, $index)"
            v-if="row.status == 0"
          >解冻</el-button>
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
import { weMediaList, weMediaChangeStatus } from '@/api/public/merchant'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      dialogLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        name: undefined,
        status: undefined,
        startTime: undefined,
        endTime: undefined
      },
      tableKey: 0,
      dateValue: '',
      statusList: {
        0: '冻结',
        1: '解冻'
      },
      joinState: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
  },
  watch: {
    dateValue(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      weMediaList(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    changeStatus(id, status, index, name) {
      let confirmText = ''
      if (status === 0) {
        confirmText = '冻结【' + name + '】后，该账号将不能继续发布内容，确定冻结么？'
      } else {
        confirmText = '确定解冻该账号？'
      }
      this.$confirm(confirmText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          weMediaChangeStatus(id, status)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.list[index].status = status === 0 ? 0 : 1
            })
        })
      /*  weMediaChangeStatus(id, status).then(data => {
         this.
       }) */
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
</style>

