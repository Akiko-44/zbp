<template>
	<AppView title="添加知识产权">
		<validator
        :rules="rules"
        :model="form"
        ref="form">
			<van-cell-group>			
				<van-field label="标题"
	                 v-model="form.name"
	                 autosize
	                 maxlength="20"
	                 required
	                 placeholder="请输入此次需要保护的专利名称" />
	      <van-field type="textarea"
	      					 label="详情"
	                 v-model="form.detail"
	                 autosize
	                 maxlength="300"
	                 rows="3"
	                 required
	                 placeholder="请输入描述信息，300字以内" />
	      <div class="tips">
	      	<p>请上传您要保护的原创作品图片，图片需要清晰</p>
	      	<p>图片格式：jpg、png、gif  图片大小：1.5M以下</p>
	      </div>
				<van-cell title="上传图片">
					<template slot="title">
						<VUpload ref="picUploader"
		                 :imgs="pics"
		                 :limit=10
		                 :props="{src: 'imgUrl'}"
		                 :width="375"
		                 :height="667">
		        </VUpload>
	       </template>
				</van-cell>
	    </van-cell-group>
	  </validator>
    <van-button :loading="submiting"
                @click="submit"
                class="primary-btn fixed-btn"
                type="primary">
      保存
    </van-button>
	</AppView>
</template>

<script>
import VUpload from '~/components/common/upload'
import Validator from '~/components/common/validator'
import { setImg } from '~/utils/qiniu'
export default {
  components: { 
  	VUpload,
  	Validator
  },
  data() {
    return {
      form: {
        name: '',
        detail: '',
        pics: ''
      },
      pics: [],
      rules: {
        name: [
          { required: true, message: '请输入此次需要保护的专利名称' }
        ],
        detail: [
          { required: true, message: '请输入描述信息，300字以内' }
        ]
      },
      submiting: false
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
  	submit() {
  		if(this.pics.length < 1) {
  			this.$toast('请上传图片')
  			return
  		}
      if (this.$refs.form.checkAll(error => this.$toast(error[0])) && this.pics.length > 0) {
      	this.submiting = true
      	let pics = []
        this.pics.forEach(item => {
	        pics.push(item.imgUrl)
	      })
        this.form.pics = pics.join(',')
        
	      this.$service('intellectualSaveOrUpdate', {
	        data: this.form
	      }).then(data => {
	        this.submiting = false
	        this.$toast({ type: 'success', message: '添加成功' })
	        this.$router.replace({ name: 'user-shop-IPR' })
	      }).catch(() => {
	        this.submiting = false
	      })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> .crop-handle {
  top: 0;
  background: rgba(0,0,0,.5)!important;
}
>>> .van-cell__value{
	flex: 2;
}
.tips{
	padding: 0 16px;
  font-size: 14px;
  line-height: 20px;
  color: #999999;
  & p:last-child{
    font-size: 12px;
  }
}
</style>