<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">
    <el-form-item label="品牌标题" prop="brandName">
      <el-input v-model="form.brandName" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="sub">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { getItem, addItem} from '@/api/aggregate/brand'
export default {
	name: 'brandAdd',
  	data(){
	    return {
	      	loading: false,
	      	type:null,
			id:null,
			offset:null,
	      	form: {
		        brandName: null,
	      	},
	      	rules: {
		        brandName: [
		          {
		            required: true,
		            message: '请输入标题',
		            trigger: 'blur'
		          },
		          {
		            min: 2,
		            max: 15,
		            message: '长度在 2 到 15 个字符',
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
			this.form.brandName = data.brandName
		},
		async sub(){
			if(this.form.brandName.length>15 || this.form.brandName.length<2){
				this.$message.error('品牌字数不合适')
			}else if(this.form.brandName){
				await this.addItem({id:this.id,brandName:this.form.brandName})
				if(this.offset){
	    			this.$router.replace(`brand?offset=${this.offset}&brandName=${this.$route.query.brandName}`)
	    		}else{
	    			this.$router.replace('brand')
	    		}
				this.$message({
					message:'修改成功',
					type: 'success'
				})
			}else{
				this.$message.error('请完成需要填写的内容')
			}
		},
	}
}
</script>

