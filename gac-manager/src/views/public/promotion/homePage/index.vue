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
        <template slot-scope="{ row, $index }">
          <el-button
            class="auditBtn"
            size="small"
            @click="toDetail(row.id)"
          >详情</el-button>
          <el-button
            class="auditBtn"
            size="small"
            type="primary"
            @click="edit(row.id)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-tabs
      v-model="activeName"
      @tab-click="tabClick"
      type="card"
    >
      <el-tab-pane
        label="模块设置"
        name="module"
      >

        <el-button
          class="auditBtn"
          size="small"
          @click="$router.push({name: 'homePageGoods', query: {type: 'detail'}})"
        >商品详情</el-button>
        <el-button
          class="auditBtn"
          size="small"
          @click="$router.push({name: 'homePageGoods'})"
        >商品编辑</el-button>
        <el-button
          class="auditBtn"
          size="small"
          @click="$router.push({name: 'homePageAssemble'})"
        >拼团商品编辑</el-button>
        <el-button
          class="auditBtn"
          size="small"
          @click="$router.push({name: 'homePagePromotion'})"
        >促销商品编辑</el-button>
        <el-button
          class="auditBtn"
          size="small"
          @click="$router.push({name: 'homePageBusiness', query: {type: 'detail'}})"
        >商家详情</el-button>
        <el-button
          class="auditBtn"
          size="small"
          @click="$router.push({name: 'homePageBusiness'})"
        >商家编辑</el-button>
      </el-tab-pane>
      <el-tab-pane
        label="广告设置"
        name="poster"
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
            label="广告位置"
          >
            <template slot-scope="{ row }">
              <span>{{row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150px"
            align="center"
            label="广告名称"
          >
            <template slot-scope="{ row }">
              <span>{{row.authorName || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="80px"
            align="center"
            label="链接类型"
          >
            <template slot-scope="{ row }">
              <span>{{row.columnName || '--'}}</span>
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
                @click="$router.push({name:'homePageAdvertisement', query: {type: 'detail',id: row.id}})"
              >详情</el-button>
              <el-button
                class="auditBtn"
                size="small"
                type="primary"
                @click="$router.push({name:'homePageAdvertisement', query: {id: row.id}})"
              >编辑</el-button>
              <el-button
                class="auditBtn"
                size="small"
                type="danger"
                @click="delRecommend(row.id, $index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import {
  getHomeModuleList
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
        moduleType: 1
      },
      activeName: 'module'
    }
  },
  created() {
    this.activeName = this.$route.query.tabName || 'module'
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getHomeModuleList(this.listParams).then(data => {
        this.list = data.data
        this.listLoading = false
      })
    },
    tabClick(tab) {
      this.$router.replace({ name: 'homePage', query: { tabName: tab.name }})
    },
    delRecommend(id, index) {
    },
    toDetail(id) {
      if (id == '1000') {
        this.$router.push({ name: 'homePageAssemble', query: { id: id, type: 'detail' }})
      } else if (id == '1001') {
        this.$router.push({ name: 'homePageGoods', query: { id: id, type: 'detail' }})
      } else if (id == '1002') {
        this.$router.push({ name: 'homePageContent', query: { id: id, type: 'detail' }})
      } else if (id == '1003') {
        this.$router.push({ name: 'homePageBusiness', query: { id: id, type: 'detail' }})
      } else if (id == '1017') {
        this.$router.push({ name: 'homePagePromoteGoods', query: { id: id, type: 'detail' }})
      }
    },
    edit(id) {
      if (id == '1000') {
        this.$router.push({ name: 'homePageAssemble', query: { id: id }})
      } else if (id == '1001') {
        this.$router.push({ name: 'homePageGoods', query: { id: id }})
      } else if (id == '1002') {
        this.$router.push({ name: 'homePageContent', query: { id: id }})
      } else if (id == '1003') {
        this.$router.push({ name: 'homePageBusiness', query: { id: id }})
      } else if (id == '1017') {
        this.$router.push({ name: 'homePagePromoteGoods', query: { id: id }})
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
