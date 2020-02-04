<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <!-- <div class="noticeName">{{detail.noticeName}}</div> -->
    <div class="createTime">{{detail.createTime}}</div>
    <div
      class="stroyDetail"
      v-html="detail.stroyDetail"
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
import { storyDetail } from '@/api/jewelryMerchant/merchant'
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
.createTime {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}
>>> .stroyDetail img {
  width: 500px;
  margin: 0 auto;
  display: block;
  font-size: 16px;
}
>>> .stroyDetail p {
  line-height: 2;
}
.btn {
  text-align: center;
}
</style>
