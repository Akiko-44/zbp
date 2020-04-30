<template>
  <div class="page-container px-4">
    <div class="createTime">{{detail.createTime}}</div>
    <div
      class="stroyDetail"
      v-html="detail.stroyDetail"
    ></div>
    <div class="mt-3">
      <el-button
        type="primary"
        @click="$router.push({ name: 'updateStory', query: { id: detail.id } })"
        class="primary-btn-md"
      >编辑</el-button>
      <el-button
        class="plain-btn-gray-md"
        @click="handleDelete"
      >删除</el-button>
      <el-button
        class="plain-btn-gray-md"
        @click="back"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { storyDetail, delStory } from '@/api/jewelryMerchant/merchant'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      id: this.$route.query.id,
      detail: {}
    }
  },
  mounted() {
    if (this.id) {
      storyDetail(this.id).then(data => {
        this.detail = data.data
      })
    }
  },
  methods: {
    handleDelete() {
      this.$confirm(`确定要删除该品牌故事吗？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        customClass: 'custom-confirm-sm'
      })
        .then(() => {
          delStory(this.detail.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.back()
            })
        })
        .catch(() => { })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.createTime {
  text-align: center;
  font-size: 14px;
  color: #333333;
  margin: 10px 0;
}
.stroyDetail {
  /deep/ img {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
  /deep/ p {
    line-height: 2;
  }
}
.btn {
  text-align: center;
}
</style>
