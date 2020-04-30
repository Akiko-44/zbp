<template>
  <div class="block">
    <h4>Banner 设置</h4>
    <el-carousel :autoplay="false" class="banner" height="240px">
      <el-carousel-item v-for="(banner, index) in form.imgs" :key="index">
        <div class="inner">
          <img :src="banner.imgUrl | setImg" />
          <div class="actions">
            <el-button size="small" type="text" @click="handleUpdate(banner, index)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(index)">删除</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div style="float: right">
      <el-button @click="handleAdd">添加</el-button>
      &nbsp;
      <el-button type="primary" :loading="loading" @click="handleSave">保存</el-button>
    </div>

    <EditBannerDialog ref="dialog" @success="success" />
  </div>
</template>

<script>
import EditBannerDialog from './EditBannerDialog'
import { detailStore, saveBanners } from '@/api/merchant/decorationShop'

export default {
  components: {
    EditBannerDialog
  },
  props:{
  	storeId:{
  		default: 0
  	}
  },
  data() {
    return {
      index: undefined,
      loading: false,
      form:{
      	id:undefined,
				storeId: undefined,
				layoutId: undefined,
				bannerName: 'banner图',
				pixel:'300px',
				isShow:0,//0显示1不显示
				switchMode: 0,//0，1，2
				imgs:[],
				sortOrder:0
      }
    }
  },
  watch:{
  	storeId(a, b){
  		this.detailStore(this.storeId).then(data => {
				const res = data.data.layouts
	      let i = 0
	      for(i=0;i<res.length;i++){
	      	if(res[i].layoutType == 1){
	      		this.form.imgs = res[i].obj.imgs
	      		this.form.layoutId = res[i].obj.layoutId
	      		this.form.id = res[i].obj.id
	      		return null
	      	}
	      }
		  })
  	}
  },
  created(){
  	this.form.storeId = this.storeId
  	this.detailStore(this.storeId).then(data => {
			const res = data.data.layouts
      let i = 0
      for(i=0;i<res.length;i++){
      	if(res[i].layoutType == 1){
      		this.form.imgs = res[i].obj.imgs
      		this.form.layoutId = res[i].obj.layoutId
      		this.form.id = res[i].obj.id
      		return null
      	}
      }
	  })
  },
  methods: {
  	detailStore,
    handleUpdate(data, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'update'
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
      })
      this.index = index
    },
    handleAdd(row) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = 'create'
      dialog.dialogFormVisible = true
      dialog.resetForm('form')
      this.index = this.form.imgs.length
    },
    
    handleDelete(index) {
      this.form.imgs.splice(index, 1)
    },
    handleSave() {
      if (!this.form.imgs.length) {
        this.$notify({
          title: '警告',
          message: '请上传banner',
          type: 'warning'
        })
      } else {
        this.loading = true
        saveBanners(this.form)
          .then(() => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    success(data) {
      this.form.imgs.splice(this.index, 1, data)
      this.form.imgs[this.index].sortOrder = this.index
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
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.actions {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>
