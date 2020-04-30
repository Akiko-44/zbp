<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="notifyListQueryForm"
        label-width="80px"
        class="notifyListQueryForm"
      >
        <el-form-item label="广告名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            v-model="listParams.name"
            placeholder="请输入广告名称"
          > </el-input>
        </el-form-item>
        <el-form-item label="广告位置:">
          <el-select
            style="width: 160px;"
            v-model="listParams.location"
            placeholder="请选择广告位置"
            clearable
          >
            <el-option
              v-for="(item,i) in locationList"
              :key="item"
              :label="item"
              :value="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接类型:">
          <el-select
            style="width: 160px;"
            v-model="listParams.linkType"
            placeholder="请选择链接类型"
            clearable
          >
            <el-option
              v-for="(value,key) in linkTypeMap"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            style="width: 160px;"
            v-model="listParams.isUsed"
            placeholder="请选择广告状态"
            @change="isUsedChange"
            clearable
          >
            <el-option
              v-for="(item, i) in isUsedList"
              :key="i"
              :label="item.val"
              :value="item.id"
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
          @click="$router.push({ name:'jewelryCircleAdvModify'})"
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
        label="广告名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="广告位置"
      >
        <template slot-scope="{ row }">
          <span>{{ locationList[row.location] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="链接类型"
      >
        <template slot-scope="{ row }">
          <span>{{ linkTypeMap[row.linkType] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="状态"
      >
        <template slot-scope="{ row }">
          <span>{{ row.usedStatus?'启用中':'已暂停' }}</span>
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
            @click="$router.push({ name:'jewelryCircleAdvModify',query:{id:row.id}})"
          >修改</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="warning"
            @click="delAdvertising(row.id, $index)"
          >删除</el-button>
          <el-button
            v-if="row.usedStatus"
            class="auditBtn"
            size="small"
            @click="pause(row.id, 1, $index)"
          >暂停</el-button>
          <el-button
            v-if="!row.usedStatus"
            class="auditBtn"
            size="small"
            @click="pause(row.id, 0, $index)"
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
import { listAdvertising, delAdvertising, useOrStopAdvertising } from '@/api/dm/homeSettings'
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
        isUsed: undefined,
        location: undefined,
        linkType: undefined,
        startTime: undefined,
        endTime: undefined
      },
      locationList: {},
      isUsedList: [{
        id: 0,
        val: '已暂停'
      }, {
        id: 1,
        val: '已启用'
      }],
      linkTypeMap: {
        1: '商品',
        2: '店铺',
        3: '内容',
        4: '自媒体主页',
        5: '外部链接'
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
      this.locationList = Object.assign({}, this.locationList, obj)
      delete this.locationList[1000]
    })
    // this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.listParams.limit = +this.$route.query.limit || 20
      this.listParams.name = this.$route.query.name
      this.listParams.isUsed = this.$route.query.isUsed
      this.listParams.location = this.$route.query.location
      this.listParams.linkType = this.$route.query.linkType
      if (this.$route.query.createTime) {
        this.createTime = JSON.parse(this.$route.query.createTime)
      }
      this.getList()
    },
    getList() {
      this.listLoading = true
      if (this.listParams.location == 0) {
        this.listParams.location = undefined
      }
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''
      listAdvertising(this.listParams).then(data => {
        this.list = data.data.records
        this.total = data.data.total
        this.listLoading = false
      })
    },
    delAdvertising(id, index) {
      this.$confirm('确认删除该广告？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delAdvertising(id).then(data => {
          this.getList()
        }).catch(() => { })
      })
    },
    pause(id, isUsed, index) {
      const tipText = isUsed === 0 ? '展示' : '暂停'
      const used = isUsed === 0 ? 1 : 0
      this.$confirm(`确认${tipText}该广告？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        useOrStopAdvertising(id, used).then((data) => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.list[index].usedStatus = used
          // this.getList()
        })
      })
    },
    isUsedChange() {
      this.$forceUpdate()
    },
    handleFilter() {
      // this.getList()
      this.$router.replace({
        name: 'jewelryCircleAdv',
        query: {
          page: this.listParams.offset,
          limit: this.listParams.limit,
          name: this.listParams.name,
          isUsed: this.listParams.isUsed,
          location: this.listParams.location,
          linkType: this.listParams.linkType,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    handleSizeChange(val) {
      // this.listParams.limit = val
      // this.getList()
      this.$router.replace({
        name: 'jewelryCircleAdv',
        query: {
          page: this.listParams.offset,
          limit: val,
          name: this.listParams.name,
          isUsed: this.listParams.isUsed,
          location: this.listParams.location,
          linkType: this.listParams.linkType,
          createTime: JSON.stringify(this.createTime)
        }
      })
    },
    handleCurrentChange(val) {
      // this.listParams.offset = val
      // this.getList()
      this.$router.replace({
        name: 'jewelryCircleAdv',
        query: {
          page: val,
          limit: this.listParams.limit,
          name: this.listParams.name,
          isUsed: this.listParams.isUsed,
          location: this.listParams.location,
          linkType: this.listParams.linkType,
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
