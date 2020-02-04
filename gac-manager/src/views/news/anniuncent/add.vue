<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">

    <el-form-item label="公告标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
     <el-form-item label="内容摘要" prop="summary">
      <el-input
        type="textarea" :autosize="{ minRows: 3, maxRows: 5}"
        v-model="form.summary"
         placeholder="请输入内容摘要"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="缩略图" prop="path">
      <el-card v-if="form.path" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.path | setImg" class="image">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.path = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.path"
        :multiple="false"
        prefix="news"
        @successCBK="uploadSuccess"
      />
    </el-form-item>
    <el-form-item label="正文内容" prop="content">
      <Tinymce :height="500" ref="editor" v-model="form.content"></Tinymce>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="sub">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import ImageUpload from '@/components/Upload'
import Tinymce from '@/components/Tinymce'
import { getItem, addItem} from '@/api/news/anniuncent'
export default {
	name: 'acticleAdd',
	components:{
	    ImageUpload,
	    Tinymce
	},
  	data(){
	    return {
	      	loading: false,
	      	type:null,
			id:null,
			offset:null,
	      	form: {
		        title: null,
		        path: null,
		        summary: null,
		        content: null,
	      	},
	      	rules: {
		        title: [
		          {
		            required: true,
		            message: '请输入标题',
		            trigger: 'blur'
		          },
		          {
		            min: 2,
		            max: 30,
		            message: '长度在 2 到 30 个字符',
		            trigger: 'blur'
		          }
		        ],
		        summary: [
		          {
		            required: true,
		            message: '请填写内容摘要',
		            trigger: 'blur'
		          }
		        ],
		        path: [
		          {
		            required: true,
		            message: '请上传缩略图',
		            trigger: 'blur'
		          }
		        ],
		        content: [
		          {
		            required: true,
		            message: '请填写正文内容',
		            trigger: 'blur'
		          }
		        ],
	      	},
	        editStatus: true
	    }
 	},
  	created() {
		this.type = this.$route.query.type
		if(this.type){
			this.id = this.$route.query.id
			this.offset = this.$route.query.offset
			this.init()
		}
	},
	methods:{
		getItem,
		addItem,
		async init(){
			let { data } = await this.getItem({id:this.id})
			this.form.title = data.title
			this.form.path = data.path
			this.form.summary = data.summary
			this.form.content = data.content
		},
		async sub(){
			if(this.form.title.length>15){
				this.$message.error('标题过长')
			}else if(this.form.title && this.form.content && this.form.path && this.form.summary){
				await this.addItem({id:this.id,title:this.form.title,content:this.form.content,summary:this.form.summary,path:this.form.path})
				if(this.offset){
	    			this.$router.replace(`anniuncent?offset=${this.offset}&title=${this.$route.query.title}`)
	    		}else{
	    			this.$router.replace('anniuncent')
	    		}
				this.$message({
					message:'修改成功',
					type: 'success'
				})
			}else{
				this.$message.error('请完成需要填写的内容')
			}
		},
		uploadSuccess(imgs) {
	      this.form.path = imgs[imgs.length - 1]
	    },
	}
  
}
</script>

<style scoped>
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
</style>

