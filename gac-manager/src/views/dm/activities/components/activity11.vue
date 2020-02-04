<template>
  <div>
    <!--<div class="block" style="borderBottom: 1px solid #000;">
			<h4>活动列表</h4>
    </div>-->
    <!-- 类型：2珠宝店, 3设计室, 4制造间 , 5互换订单-->
    <div class="block">
      <el-row>
        <el-input placeholder="输入活动名称"
                  v-model="listQuery.title"
                  clearable
                  style="width: 200px"></el-input>
        <el-button type="primary"
                   style="width:100px;marginLeft:10px"
                   @click="btnGetData">查询</el-button>
        <el-button type="primary"
                   style="width:100px;"
                   @click="$router.push({name: 'designAddActive'})">添加活动</el-button>
      </el-row>

      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="title"
                         label="活动名称"
                         width="180"></el-table-column>
        <el-table-column prop="creationTime"
                         label="创建时间"
                         width="180"></el-table-column>
        <el-table-column prop="updateTime"
                         label="修改时间"></el-table-column>
        <el-table-column prop="rate"
                         label="状态">
          <template slot-scope="{row}">
            <span v-if="row.putawayState===1">上架</span>
            <span v-else>下架</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate"
                         label="点击率"></el-table-column>
        <el-table-column label="操作">
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
                       @click="$router.push({ name: 'designAddActive', query: { id: row.id }})">编辑</el-button>
            <el-button type="text"
                       size="small"
                       @click="delData(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination background
                       layout="prev, pager, next"
                       :page-size="listQuery.limit"
                       :total="allPages"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  page,
  allPage,
  updateStickstate,
  delActivityById,
  activityPutWayState
} from '@/api/dm/activities'
export default {
  props: {
    supType: [String, Number]
  },
  data() {
    return {
      tableData: [],
      listQuery: {
        offset: 1,
        limit: 5,
        title: undefined,
        supType: this.supType
      },
      zhiDing: false,
      allPages: 0
    }
  },
  created() {
    this.getPage()
  },
  methods: {
    getPage() {
      page(this.listQuery).then(data => {
        this.tableData = data.data.records
        this.allPages = data.data.total
      })
    },
    getAllpage() {
      this.getAge()
      allPage({
        title: this.listQuery.title,
        supType: this.supType
      }).then(data => {
        this.$nextTick(_ => {
          this.allPages = data.data
        })
      })
    },
    updatePuta(row) {
      const data = {
        id: Number(row.id),
        putawayState: row.putawayState
      }
      activityPutWayState(data)
        .then(res => {
          this.getPage()
        })
        .catch(res => {
          console.log(res, '操作失败')
        })
    },
    handleSizeChange(val) {
      // pageSize 改变时会触发
    },
    handleCurrentChange(val) {
      // currentPage 改变时会触发 显示当前页
      this.listQuery.offset = val
      this.getPage()
    },
    btnGetData() {
      this.getPage()
    },
    delData(row) {
      this.$confirm('<h3>是否删除该活动?</h3>', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          delActivityById(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPage()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    btnStick(row) {
      const data = {
        id: row.id,
        stickState: row.stickState
      }
      if (row.putawayState === 0) {
        if (!this.zhiDing && row.stickState == 1) {
          updateStickstate(data).then(res => {
            this.zhiDing = true
            this.$message({
              type: 'success',
              message: '取消置顶!'
            })
            this.getPage()
          })
        } else {
          if (this.zhiDing && row.stickState == 0) {
            this.$message({
              message: '已经有信息置顶, 请先取消已置顶的',
              type: 'warning'
            })
          } else if (this.zhiDing && row.stickState === 1) {
            updateStickstate(data).then(res => {
              this.zhiDing = false
              this.$message({
                type: 'success',
                message: '取消置顶!'
              })
              this.getPage()
            })
          } else {
            this.$confirm('<h3>是否置顶该活动?</h3>', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              center: true
            }).then(() => {
              updateStickstate(data)
                .then(res => {
                  this.zhiDing = true
                  this.$message({
                    type: 'success',
                    message: '置顶成功!'
                  })
                  this.getPage()
                })
                .catch(res => {
                  console.log(res)
                })
            }).catch(() => { })
          }
        }
      } else {
        this.$message({
          message: '未上架活动不能置顶，请先上架哟!',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped>
.block {
  padding: 20px 0 10px 20px;
  width: 100%;
  overflow: hidden;
}
</style>