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
        <el-form-item label="主题搜索:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.name"
            placeholder="请输入搜索关键字"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="显示终端:">
          <el-select
            style="width: 195px;"
            v-model="listParams.backgroundType"
            placeholder="请选择显示终端"
          >
            <el-option
              v-for="(item, i) in backgroundTypeList"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
          >查找</el-button
        >
        <el-button type="primary" v-waves @click="dialogFormVisible = true"
          >添加</el-button
        >
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
      <!-- <el-table-column type="index" width="50" align="center" label="序号">
      </!-->
      -->
      <el-table-column width="300px" align="center" label="主题名称">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="显示终端">
        <template slot-scope="{ row }">
          <span>{{ backgroundTypeList[row.backgroundType] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ statusList[row.backgroundStatus] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="最后更新时间">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="left" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            @click="toDetail(row.id, row.backgroundType)"
            >编辑</el-button
          >
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            v-if="row.backgroundStatus === 2"
            @click="show(row.id, 1, $index)"
            >启用</el-button
          >
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            v-if="row.backgroundStatus === 1"
            @click="show(row.id, 2, $index)"
            >关闭</el-button
          >
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delTheme(row.id, row.backgroundStatus, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="addForm">
        <el-form-item label="主题显示终端" label-width="100px">
          <el-select
            style="width: 195px;"
            v-model="addForm.backgroundType"
            placeholder="请选择显示终端"
          >
            <el-option
              v-for="(item, i) in addBackgroundList"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAddPage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllBackground,
  deleteBackground,
  changeBackgroundShow
} from '@/api/public/system';
import waves from '@/directive/waves'; // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        name: '',
        backgroundType: undefined
      },
      dialogFormVisible: false,
      addForm: {
        backgroundType: '1'
      },
      backgroundTypeList: {
        0: '全部',
        1: 'PC-首页',
        2: 'PC-登录页',
        3: 'PC-注册页',
        4: 'APP-首页',
        5: 'APP-个人中心'
      },
      addBackgroundList: {
        1: 'PC-首页',
        2: 'PC-登录页',
        3: 'PC-注册页',
        4: 'APP-首页',
        5: 'APP-个人中心'
      },
      statusList: {
        0: '请选择',
        1: '展示',
        2: '关闭'
      },
      index: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.listParams.backgroundType == 0) {
        this.listParams.backgroundType = undefined
      }
      getAllBackground(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delTheme(id, status, index) {
      const tip =
        status === 1 ? '当前主题已开启，确定删除吗？' : '确定删除此主题？';
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteBackground(id)
          .then(data => {
            this.list.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          })
          .catch(() => {})
      })
    },
    show(id, status, index) {
      changeBackgroundShow(id, status)
        .then(data => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(() => {})
    },
    toAddPage() {
      if (this.addForm.backgroundType == 1) {
        this.$router.push({ name: 'PCHome' })
      } else if (this.addForm.backgroundType == 2) {
        this.$router.push({ name: 'PCLogin' })
      } else if (this.addForm.backgroundType == 3) {
        this.$router.push({ name: 'PCRegister' })
      } else if (this.addForm.backgroundType == 4) {
        this.$router.push({ name: 'APPHome' })
      } else if (this.addForm.backgroundType == 5) {
        this.$router.push({ name: 'APPMine' })
      }
    },
    toDetail(id, status) {
      if (status === 1) {
        this.$router.push({ name: 'PCHome', query: { id }})
      } else if (status === 2) {
        this.$router.push({ name: 'PCLogin', query: { id }})
      } else if (status === 3) {
        this.$router.push({ name: 'PCRegister', query: { id }})
      } else if (status === 4) {
        this.$router.push({ name: 'APPHome', query: { id }})
      } else if (status === 5) {
        this.$router.push({ name: 'APPMine', query: { id }})
      }
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
