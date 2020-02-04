<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload"
        :action="uploadImg"
        :multiple="multiple"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :limit="1"
        :accept="accept"
        :auto-upload="false"
        ref="uploadSingle"
      >
      <!--<el-upload class="editor-slide-upload"
        :action="uploadUrl"
        :multiple="multiple"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :data="uploadData"
        :accept="accept"
      >-->
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <!--<el-button type="primary" @click="handleSubmit">确 定</el-button>-->
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken, domain, uploadUrl, getKey } from '@/api/qiniu'
import { uploadImg, uploadBatchApi } from '@/api/upload'
function loadImage(file, cb) {
  const _URL = window.URL || window.webkitURL
  const img = new Image()
  img.src = _URL.createObjectURL(file)
  img.onload = function() {
    cb && cb(img)
    _URL.revokeObjectURL(img.src)
  }
}

export default {
  name: 'ImageUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: String,
      default: 'pic'
    },
    checkFile: {
      type: Function,
      default: () => {}
    },
    accept: {
      type: String,
      default: 'image/gif, image/jpeg, image/png, image/jpg'
    },
    uploadUrl: {
      type: String,
      default: uploadUrl
    },
    uploadImg: {
      type: String,
      default: uploadImg
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadData: {},
      param: new FormData()
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (arr.length === 0) {
        this.$message('请上传图片')
        return
      }
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }

      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
    	this.$emit('successCBK', response.data.picUrl)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = domain + '/' + response.key
          this.listObj[objKeyArr[i]].key = response.key
          /*this.listObj[objKeyArr[i]].url = response.data.picUrl
          this.listObj[objKeyArr[i]].key = response.data.picUrl*/
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleError(err, file, fileList) {
      this.handleRemove(file)
      this.$message({
        message: err,
        showClose: true,
        type: 'error'
      })
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    onSubmit(){
    	let _self = this
    	for(let i = 0; i < _self.fileList.length; i ++ ){
    		_self.param.append('file', _self.fileList[i].raw)
    		/*lrz(this.fileList[i].raw, {quality:0.5}).then(res=>{
    			console.log(res)
    		})*/
    	}
    	this.$refs.uploadSingle.submit()
    	_self.dialogVisible = false
    	
    	uploadBatchApi(_self.param).then(res => {
    		_self.$emit('successCBK', res.data.picUrl)
    		_self.listObj = {}
	      _self.fileList = []
	      _self.param.delete('file')
	      _self.dialogVisible = false
    	}).catch(error => {
    		console.log(error)
    	})
    },
    beforeUpload(file) {
      const _self = this
      const fileName = file.uid
      this.listObj[fileName] = {}
      
      return new Promise((resolve, reject) => {
      	lrz(file,{quality: 0.5}).then(res => {
      		file = res.file
      		this.param.append('file', file)
      		loadImage(file, img => {
		      	if(file.size > 5*1024*1024){
		      		this.$message.error('图片不能超过5M')
		      		reject()
		      	}
		        // 设置上传参数
		        /*_self.uploadData = {
		          key: getKey(_self.prefix, img.width, img.height, file.type.split('/')[1]),
		          token: uptoken,
		          fname: file.name
		        }*/
		        const message = _self.checkFile(file, img)
		        if (typeof message === 'string') {
		          this.$message({
		            message,
		            showClose: true,
		            type: 'warning'
		          })
		          reject()
		        } else {
		          const result = { hasSuccess: false, uid: fileName, width: img.width, height: img.height }
		          _self.listObj[fileName] = result
		          resolve(true)
		        }
		      })
      	})
      	//图片
        /*getToken().then(uptoken => {
          loadImage(file, img => {
          	if(file.size > 5*1024*1024){
          		this.$message.error('图片不能超过5M')
          		reject()
          	}
            // 设置上传参数
            _self.uploadData = {
              key: getKey(_self.prefix, img.width, img.height, file.type.split('/')[1]),
              token: uptoken,
              fname: file.name
            }
            const message = _self.checkFile(file, img)
            if (typeof message === 'string') {
              this.$message({
                message,
                showClose: true,
                type: 'warning'
              })
              reject()
            } else {
              const result = { hasSuccess: false, uid: fileName, width: img.width, height: img.height }
              _self.listObj[fileName] = result
              resolve(true)
            }
          })
        })*/
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.img-upload{
	.flex-img{
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
	}
	.upload-img{
		margin-left: 10px;
		margin-top: 10px;
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 3px;
		width: 72px;
		height: 72px;
		text-align: center;
		font-size: 32px;
		position: relative;
		line-height: 74px;
		.smui-icon-cancel{
			position: absolute;
			top: -10px;
			left: 60px;
			font-size: 16px;
			color: #ccc;
		}
		img{
			margin: 3px;
		}
	}
	.upload-add-img{
		margin:5px 15px 5px 10px;
		background: #FFFFFF;
		border: 1px solid #DDDDDD;
		border-radius: 3px;
		width: 80px;
		height: 80px;
		text-align: center;
		font-size: 32px;
		color: #ccc;
		line-height: 62px;
	}
	.img-input{
		width:70px;
		height:70px;
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		//background: #03c
	
	}
	.img-file {
		width:70px;
		height:70px;
		opacity:0;/*设置此控件透明度为零，即完全透明*/
		filter:alpha(opacity=0);/*设置此控件透明度为零，即完全透明针对IE*/
		position:absolute;/*绝对定位，相对于 .input */
		top:0;
		right:0;
  }
}
</style>
