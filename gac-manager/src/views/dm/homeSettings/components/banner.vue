<template>
  <div class="block">
    <h4>Banner 设置</h4>
    <el-carousel :autoplay="false"
                 class="banner"
                 height="240px"
                 v-if="banners.length">
      <el-carousel-item v-for="(banner, index) in banners"
                        :key="index">
        <div class="inner">
          <!--珠宝店banner展示-->
          <img :src="banner.pcPicture" />
          <div class="actions">
            <el-button v-if="banner.showStatus === 1"
                       size="small"
                       type="text"
                       @click="pause(banner.id, 4, index)">暂停</el-button>
            <el-button v-if="banner.showStatus === 4"
                       size="small"
                       type="text"
                       @click="pause(banner.id, 1, index)">展示</el-button>
            <el-button size="small"
                       type="text"
                       @click="handleUpdate(banner, index)">编辑</el-button>
            <el-button size="small"
                       type="text"
                       @click="handleDelete(index, banner.id)">删除</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div style="float: right">
      <el-button @click="handleAdd">添加</el-button>
      <!-- &nbsp;
      <el-button type="primary"
                 :loading="loading"
                 @click="handleSave"
                 v-if="flag !== 11">保存</el-button> -->
    </div>

    <!-- <EditBannerDialog :flag="flag"
                      ref="dialog"
                      @success="success" /> -->
    <editJewelryBanner :category="category"
                       ref="jewelryDialog"
                       @success="success" />
  </div>
</template>

<script>
// import EditBannerDialog from './EditBannerDialog'
import editJewelryBanner from './editJewelryBanner'
import {
  // getBanners,
  // saveBanners,
  getJewelryBanners,
  saveJewelryBanners,
  delJewelryBanners,
  pauseJewelryBanners } from '@/api/dm/homeSettings'

export default {
  props: {
    category: [String, Number]
  },
  components: {
    // EditBannerDialog,
    editJewelryBanner
  },
  data() {
    return {
      index: undefined,
      loading: false,
      homeBanner: [],
      jewelryBanner: [],
      banners: []
    }
  },
  created() {
    getJewelryBanners({ category: this.category }).then(data => {
      this.banners = data.data.records
    })
  },
  methods: {
    handleUpdate(data, index) {
      const dialog = this.$refs.jewelryDialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
        // dialog.form.pcUrl = dialog.form.pcPicture ? dialog.form.pcPicture : dialog.form.pcUrl
      })
      this.index = index
    },
    handleAdd(row) {
      const dialog = this.$refs.jewelryDialog
      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
      this.index = this.banners.length
    },
    handleDelete(index, id) {
      delJewelryBanners(id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.banners.splice(index, 1)
      })
    },
    success(data) {
      // 珠宝店单独添加编辑

      data.pcPicture =
        data.pcPicture.includes('http:')
          ? data.pcPicture
          : 'http://image.gacjc.com/' + data.pcPicture
      data.mobilePicture =
        data.mobilePicture.includes('http:')
          ? data.mobilePicture
          : 'http://image.gacjc.com/' + data.mobilePicture
      // data.mobilePicture = data.pcPicture
      // data.mobileUrl = data.mobileUrl
      // data.pcUrl = data.bannerUrl
      data.showStartDate += ' 00:00:00'
      data.showEndDate += ' 00:00:00'
      saveJewelryBanners(data).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.banners.splice(this.index, 1, data)
        getJewelryBanners({ category: this.category }).then(data => {
          this.banners = data.data.records
        })
      })
    },
    pause(id, status, index) {
      pauseJewelryBanners(id, status).then((data) => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.banners[index].showStatus = status
      })
    }
  }
}
</script>


<style scoped>
.block {
  margin: 20px;
  width: 959px;
  overflow: hidden;
}
.banner {
  margin-bottom: 10px;
  width: 100%;
  background: #efefef;
}
.el-carousel__item {
  height: 100%;
}
.el-carousel__item .inner {
  position: relative;
  height: 100%;
}
.el-carousel__item .inner img {
  width: 100%;
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.actions {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>
