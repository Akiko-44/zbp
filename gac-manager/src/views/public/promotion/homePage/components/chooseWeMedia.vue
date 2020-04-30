<template>

  <el-dialog
    title="推荐-自媒体"
    :visible.sync="dialogTableVisible"
  >
    <el-input
      style="width: 195px;"
      placeholder="请输入作者"
      v-model="listParams.name"
    > </el-input>
    <el-button
      type="primary"
      class="btn"
      v-waves
      @click="getList"
    >查询</el-button>
    <span class="tip"> 提示：单击以下选项即可选中该作者</span>
    <el-table
      :data="weMediaList"
      ref="enterpriseTable"
      highlight-current-row
      @current-change="tableCurrentChange"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column
        align="center"
        property="name"
        width="100"
        label="作者名称"
      ></el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="作者logo"
      >
        <template slot-scope="{ row }">
          <img
            v-if="row.userLogo"
            :src="row.userLogo | setImg"
            class="avatar"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="username"
        label="登录账号"
      ></el-table-column>
      <el-table-column
        align="center"
        property="jewelryContentNumber"
        label="内容数"
      ></el-table-column>
      <el-table-column
        align="center"
        property="jewelryContentFansNumber"
        label="粉丝数"
      ></el-table-column>
      <el-table-column
        align="center"
        property="jewelryContentLikeAndCollectNumber"
        label="获赞与收藏"
      ></el-table-column>
      <el-table-column
        align="center"
        property="crtTime"
        label="创建时间"
      ></el-table-column>
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
        @click="selectWeMedia"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { weMediaList } from '@/api/public/merchant'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'chooseEnterprise',
  directives: {
    waves
  },
  data() {
    return {
      dialogTableVisible: false,
      listParams: {
        offset: 1,
        limit: 5,
        name: ''
      },
      total: 0,
      selectedName: {},
      weMediaList: []
    }
  },
  methods: {
    getList() {
      weMediaList(this.listParams).then(data => {
        this.weMediaList = data.data.records
        this.total = data.data.total
      })
    },
    tableCurrentChange(val) {
      this.selectedName = val
    },
    selectWeMedia() {
      this.dialogTableVisible = false
      this.$emit('selectWeMedia', this.selectedName)
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
  width: 50px;
  height: 50px;
}
</style>
