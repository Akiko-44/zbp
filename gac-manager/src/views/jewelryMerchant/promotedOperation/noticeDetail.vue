<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <div class="noticeName">{{detail.noticeName}}</div>
    <div class="addTime">{{detail.addTime}}</div>
    <div
      class="noticeDetails"
      v-html="detail.noticeDetails"
    ></div>
    <div class="btn">
      <el-button
        type="primary"
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

<style scoped>
.noticeName {
  text-align: center;
  font-size: 24px;
}
.addTime {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}
>>> .noticeDetails img {
  width: 500px;
  margin: 0 auto;
  display: block;
  font-size: 16px;
}
>>> .noticeDetails p {
  line-height: 2;
}
.btn {
  text-align: center;
}
</style>
