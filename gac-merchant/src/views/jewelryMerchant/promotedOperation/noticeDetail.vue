<template>
  <div class="page-container px-4">
    <div class="noticeName">{{detail.noticeName}}</div>
    <div class="addTime">{{detail.addTime}}</div>
    <div
      class="noticeDetails"
      v-html="detail.noticeDetails"
    ></div>
    <div class="mt-3">
      <el-button
        class="plain-btn-gray-sm"
        @click="back"
      >返回</el-button>
    </div>
  </div>
</template>

<script>
import { getNotice } from '@/api/public/system'
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
      getNotice({ id: this.id }).then(data => {
        this.detail = data.data
      })
    }
  },
  methods: {

    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.noticeName {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  text-align: center;
}
.addTime {
  text-align: center;
  font-size: 14px;
  color: #333333;
  margin: 20px 0 30px;
}
.noticeDetails {
  /deep/ img {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
  /deep/ p {
    line-height: 2;
  }
}
</style>
