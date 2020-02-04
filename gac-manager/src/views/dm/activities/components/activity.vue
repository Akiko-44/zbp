<template>
  <div class="block">
    <!-- 类型：2珠宝店, 3设计室, 4制造间 , 5互换订单-->
    <el-button type="primary"
               class="add-activity"
               style="width:100px;"                 
               @click="add()">添加活动</el-button>
    <el-search-table-pagination ref="el-search-table"
                                url="/admin/gallery/activity/adminPage"
                                :columns="columns"
                                :formOptions="formOptions"
                                :params="listParams"
                                page-index-key="offset"
                                page-size-key="limit"
                                list-field="data.records">
      <el-table-column slot="append" label="操作">
        <template slot-scope="{row}">
          <el-button type="text"
                     size="small"
                     v-if="row.stickState===1"
                     @click="btnStick(row)">取消置顶</el-button>
          <el-button type="text"
                     size="small"
                     v-else
                     @click="btnStick(row)">置顶</el-button>
          <el-button type="text"
                     size="small"
                     v-if="row.putawayState===1"
                     @click="updatePuta(row)">下架</el-button>
          <el-button type="text"
                     size="small"
                     v-else
                     @click="updatePuta(row)">上架</el-button>
          <el-button type="text"
                     size="small"
                     @click="edit(row)">编辑</el-button>
          <el-button type="text"
                     size="small"
                     @click="delData(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-search-table-pagination>
  </div>
</template>

<script>
import {
  updateStickstate,
  delActivityById,
  activityPutWayState
} from '@/api/dm/activities'
export default {
  props: {
    supType: [String, Number],
    routerName: [String, Number]
  },
  data() {
    return {
      listParams: {
        supType: this.supType
      },
      formOptions: {
        inline: true,
        showResetBtn: true,
        forms: [
          { prop: 'title', label: '活动名称' }
        ],
        resetBtnCallback: () => {
          this.$refs['el-search-table'].params.title = ''
          this.searchHandler()
        }
      },
      columns: [
        { prop: 'title', label: '活动名称', width: 180 },
        { prop: 'creationTime', label: '创建时间', width: 180 },
        { prop: 'updateTime', label: '修改时间' },
        { prop: 'putawayState', label: '状态', width: 180,
          render: row => {
            const { putawayState } = row
            return putawayState === 1 ? '上架' : '下架'
          }
        },
        { prop: 'rate', label: '点击率' }
      ]
    }
  },
  methods: {
  	add(){
  		this.$router.push({name: this.routerName})
  	},
  	edit(row){
  		this.$router.push({ name: this.routerName, query: { id: row.id }})
  	},
    updatePuta(row) {
      const data = {
        id: Number(row.id),
        putawayState: row.putawayState
      }
      activityPutWayState(data).then(res => {
        this.searchHandler(false)
      }).catch(res => {})
    },
    delData(row) {
      this.$confirm('<h3>是否删除该活动?</h3>', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        center: true
      }).then(() => {
        delActivityById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.searchHandler(false)
        })
      }).catch(() => {})
    },
    btnStick(row) {
      const data = {
        id: row.id,
        stickState: row.stickState
      }
      if (row.putawayState === 1) {
        // stickState 1置顶 0不置顶
        if (row.stickState === 1) {
          this.$confirm('<h3>是否取消置顶该活动?</h3>', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            center: true
          }).then(() => {
            updateStickstate(data).then(res => {
              this.$message({
                type: 'success',
                message: '取消置顶成功!'
              })
              this.searchHandler(false)
            })
          }).catch((err) => { 
            this.$message({
              message: err.msg,
              type: 'warning'
            })
          })
        } else {
          this.$confirm('<h3>是否置顶该活动?</h3>', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            center: true
          }).then(() => {
            updateStickstate(data).then(res => {
              this.zhiDing = true
              this.$message({
                type: 'success',
                message: '置顶成功!'
              })
              this.searchHandler(false)
            })
          }).catch((err) => { 
            this.$message({
              message: err.msg,
              type: 'warning'
            })
          })          
        }
      } else {
        this.$message({
          message: '未上架活动不能置顶，请先上架哟!',
          type: 'warning'
        })
      }
    },
    searchHandler(resetPageIndex = true) {
      this.$refs['el-search-table'].searchHandler(resetPageIndex)
    }
  }
}
</script>
<style scoped lang="scss">
.block {
  padding: 20px 0 10px 20px;
  width: 100%;
  overflow: hidden;
  .add-activity {
    margin-bottom: 20px;
  }
}
</style>
