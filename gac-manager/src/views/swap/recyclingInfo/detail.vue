<template>
  <div class="detail">
    <div class="actions">
      <el-button
        size="small"
        @click="$router.push({ name: 'recyclingEdit', query: { id: detail.id } })"
      >
        修改
      </el-button>

      <el-button size="small" type="danger" @click="handleDelete">删除</el-button>
      
      <el-button v-if="this.detail.status == 1 || this.detail.status == 3" size="small" type="primary" @click="audit(2)">审核通过</el-button>
      <el-button v-if="this.detail.status == 1" size="small" type="warning" @click="audit(3)">审核拒绝</el-button>
    </div>
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form ref="form" label-width="100px">
          <el-form-item label="回收标题：">
            {{detail.recycleName}}
          </el-form-item>
          <el-form-item label="信息编号：">
            {{detail.id}}
          </el-form-item>
          <el-form-item label="信息状态：">
            {{goodsState[detail.status]}}
          </el-form-item>
          <el-form-item label="回收分类：">
            {{detail.categoryName}}
          </el-form-item>
          <el-form-item label="来源：">
            {{srcState[detail.src]}}
          </el-form-item>
          <el-form-item label="发布时间：">
            {{detail.createTime}}
          </el-form-item>
          <el-form-item label="更新时间：">
            {{detail.updateTime}}
          </el-form-item>
          <el-form-item label="回收人：">
            {{detail.userName}}
          </el-form-item>
          <el-form-item label="信息图片：">
            <img v-if="detail.imgUrl" :src="detail.imgUrl | setImg" width="200px">
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="回收描述" v-html="detail.recycleDesc"></el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { delObj, audit, getObj } from '@/api/swap/recycleInfo'
import { goodsState, srcState, auditState } from '@/utils/mixins/swap'

export default {
  data() {
    return {
      goodsState, srcState, auditState,
      goodsDesc: '',
      detail: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await getObj(to.query.id)
    next(vm => {
      vm.detail = data
    })
  },
  methods: {
    handleDelete() {
      this.$confirm(`确定删除当前信息？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(this.detail.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            })
        })
    },
    audit(state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          audit(state).then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.detail.status = state
          })
        })
    }
  }
}
</script>

<style scoped>
.detail {
  margin:20px 14px;
}
.detail .el-form-item {
  margin-bottom: 5px;
}
</style>

