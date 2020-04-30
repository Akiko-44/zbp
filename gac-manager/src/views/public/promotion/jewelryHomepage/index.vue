<template>
  <div class="app-container calendar-list-container">
    <el-tabs
      v-model="activeName"
      @tab-click="tabClick"
      type="card"
    >
      <el-tab-pane
        label="模块设置"
        name="module"
      >
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
              <span>{{row.moduleDefaultName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="模块名称"
          >
            <template slot-scope="{ row }">
              <span>{{row.moduleName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            align="center"
            label="模块排序"
          >
            <template slot-scope="{ row }">
              <span>{{row.sortOrder}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="160px"
            align="center"
            label="最新更新时间"
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
      </el-tab-pane>
      <el-tab-pane
        label="专区设置"
        name="specialArea"
      >
        <el-table
          :data="zoneList"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
          v-show="list && list.length"
        >
          <el-table-column
            width="200px"
            class-name="blue"
            align="center"
            label="专区名称"
          >
            <template slot-scope="{ row }">
              <span>{{row.zoneName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="图标"
          >
            <template slot-scope="{ row }">
              <!-- <span>{{row.zoneIcon}}</span> -->
              <img
                :src="row.zoneIcon"
                class="icon-img"
              >
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            align="center"
            label="绑定商品数量"
          >
            <template slot-scope="{ row }">
              <span>{{row.bindNum}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            align="center"
            label="显示顺序"
          >
            <template slot-scope="{ row }">
              <span>{{row.sortOrder}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            align="center"
            label="最新更新时间"
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
                @click="$router.push({name:'jewelryHomepageZone', query: {type: 'detail',id: row.id}})"
              >详情</el-button>
              <el-button
                class="auditBtn"
                size="small"
                type="primary"
                @click="$router.push({name:'jewelryHomepageZone', query: {id: row.id}})"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getHomeModuleList, getZoneList
} from '@/api/public/system'
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
      },
      zoneList: [],
      activeName: 'module'
    }
  },
  created() {
    this.activeName = this.$route.query.tabName || 'module'
    this.getList()
    this.getZoneList()
  },
  methods: {
    getZoneList() {
      this.listLoading = true
      getZoneList().then(data => {
        this.zoneList = data.data
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      getHomeModuleList({ moduleType: 2 }).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    tabClick(tab) {
      this.$router.replace({ name: 'jewelryHomepage', query: { tabName: tab.name }})
    },
    toModuleDetail(id) {
      if (id === '1004') {
        this.$router.push({ name: 'jewelryHomepagePromotion', query: { type: 'detail', id }})
      } else if (id === '1005') {
        this.$router.push({ name: 'jewelryHomepageGoods', query: { type: 'detail', id }})
      } else if (id === '1006') {
        this.$router.push({ name: 'jewelryHomepageAssemble', query: { type: 'detail', id }})
      } else {
        this.$router.push({ name: 'jewelryHomepageBusiness', query: { type: 'detail', id }})
      }
    },
    modifyModule(id) {
      if (id === '1004') {
        this.$router.push({ name: 'jewelryHomepagePromotion', query: { id }})
      } else if (id === '1005') {
        this.$router.push({ name: 'jewelryHomepageGoods', query: { id }})
      } else if (id === '1006') {
        this.$router.push({ name: 'jewelryHomepageAssemble', query: { id }})
      } else {
        this.$router.push({ name: 'jewelryHomepageBusiness', query: { id }})
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
