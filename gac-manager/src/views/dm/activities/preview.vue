<template>
  <div>
    <div class="block" style="borderBottom: 1px solid #000;">
      <h4>活动预览</h4>
    </div>
    <div class="block" style="paddingRight:40px">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
        <p class="title">{{ruleForm.title}}</p>
        <p v-html="ruleForm.content"></p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    getGalleryActivityById
  } from "@/api/gallery/listActivities"
  export default {
    data() {
      return {
        ruleForm: {
          title: '',
          phonePath: [],
          content: ''
        }
      }
    },
    created() {
      this.getAdd()
    },
    methods: {
      getAdd() {
        let da = this.$route.query.id
        if(!da){
          return
        }
        getGalleryActivityById(da).then(res => {
          this.ruleForm = {
            id: da,
            title: res.data.title,
            content: res.data.content,
            phonePath: [{
              name: '',
              url: res.data.phonePath
            }]
          }
        })
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
  
  .image {
    display: block;
    max-width: 100%;
    height: 280px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .title{
    text-align: center;
    font-size: 18px;
  }
</style>