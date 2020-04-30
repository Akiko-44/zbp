<template>
  <div class="app-container calendar-list-container">
    <div
      class="advertise-item"
      v-for="(item, i) in advertiseList"
      :key="i"
    >
      <h4>{{ titleMap[i] }}</h4>
      <el-table
        :data="item"
        v-loading.body="listLoading"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          width="200px"
          class-name="blue"
          align="center"
          label="广告位置"
        >
          <template slot-scope="{ row }">
            <span>{{ row.position }}号广告位</span>
          </template>
        </el-table-column>
        <el-table-column
          width="300px"
          align="center"
          label="广告名称"
        >
          <template slot-scope="{ row }">
            <span>{{ row.name || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          align="center"
          label="链接类型"
        >
          <template slot-scope="{ row }">
            <span>{{ linkMap[row.linkType] || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="left"
          label="操作"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.name"
              class="auditBtn"
              size="small"
              @click="toModuleDetail(row)"
            >详情</el-button>
            <el-button
              class="auditBtn"
              size="small"
              type="primary"
              @click="modifyModule(row)"
            >编辑</el-button>
            <el-button
              class="auditBtn"
              size="small"
              type="danger"
              @click="delAdvertisement(row.id)"
              v-if="row.name"
            >清空</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAdvertisement, delAdvertisement } from '@/api/public/system'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      advertiseList: {},
      listLoading: false,
      titleMap: {
        home: '首页广告设置',
        whereBuyHome: '去哪儿买首页广告设置',
        designerHome: '设计师首页广告设置',
        manufactureHome: '寻代工首页广告设置'
      },
      linkMap: {
        1: '商品',
        2: '店铺',
        3: '内容',
        4: '自媒体主页',
        5: '外部链接'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAdvertisement().then(data => {
        this.advertiseList = data.data
        this.listLoading = false
      })
    },
    delAdvertisement(id) {
      this.$confirm('确认清空该广告？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delAdvertisement(id).then(data => {
          this.getList()
        })
      })
    },
    toModuleDetail(data) {
      this.$router.push({
        name: 'advertisementModify',
        query: { type: 'detail', data: JSON.stringify(data) }
      })
    },
    modifyModule(data) {
      this.$router.push({
        name: 'advertisementModify',
        query: { data: JSON.stringify(data) }
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
