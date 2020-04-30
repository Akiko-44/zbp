<template>
  <div class="app-container calendar-list-container">
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      v-show="list && list.length"
    >
      <el-table-column
        width="300px"
        class-name="blue"
        align="center"
        label="推荐内容"
      >
        <template slot-scope="{ row }">
          <span>{{ row.moduleDefaultName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="模块名称"
      >
        <template slot-scope="{ row }">
          <span>{{ row.moduleName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="模块排序"
      >
        <template slot-scope="{ row }">
          <span>{{ row.sortOrder }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        align="center"
        label="最新更新时间"
      >
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
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
            @click="toModuleDetail(row.id)"
          >详情</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="modifyModule(row.id)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHomeModuleList } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      listLoading: false,
      listParams: {
        offset: 1,
        limit: 20,
        recommendation: 1
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getHomeModuleList({ moduleType: 3 }).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    toModuleDetail(id) {
      if (id === '1009') {
        this.$router.push({
          name: 'designHomepageGoods',
          query: { type: 'detail', id }
        })
      } else {
        this.$router.push({
          name: 'designHomepageDesigner',
          query: { type: 'detail', id }
        })
      }
    },
    modifyModule(id) {
      if (id === '1009') {
        this.$router.push({
          name: 'designHomepageGoods',
          query: { id }
        })
      } else {
        this.$router.push({ name: 'designHomepageDesigner', query: { id }})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.icon-img {
  width: 100px;
}
</style>
