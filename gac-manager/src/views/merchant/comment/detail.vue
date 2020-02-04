<template>
  <div class="app-container calendar-list-container">
    <p><span style="color: #e5c6a1">{{form.userName}}</span>于<span>{{form.createTime}}</span>对<span style="color: #e5c6a1">{{form.sellName}}</span>发表评论</p>
    <p v-if="form.gallerys && form.gallerys.length">
      <img v-for="item in form.gallerys" :src="item.imgUrl | setImg">
    </p>
    
    <p>{{form.content}}</p>
    
    <p v-if="form.replayCommentList &&　form.replayCommentList.length">
      <h2>商家回复：</h2>
      <p v-for="item in form.replayCommentList" :key="item.id">{{item.reply}}</p>
    </p>
    <template v-if="form.replayCommentList &&　form.replayCommentList.length == 0">
      <el-button type="primary" @click="dialogFormVisible = true">回复</el-button>
    </template>
    <el-dialog title="回复评论" :visible.sync="dialogFormVisible">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
		    <el-form-item label="内容" prop="reply">
		      <el-input v-model="ruleForm.reply"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="replyContent('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
import { getObjDetail, addReply } from '@/api/dm/comment'
import { setImg } from '@/filters'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      ruleForm: {
      	reply: '', 
      	commentId: this.$route.query.id,
				userType:0,
				userId:''
      },
      rules:{
      	reply:[
	      	{ required: true, message: '请输入回复内容', trigger: 'blur' }
	      ]
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObjDetail(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
        vm.ruleForm.userId = form.userId
      }, 10)
    })
  },
  methods: {
  	replyContent(formName){
      this.$refs[formName].validate((valid) => {
	      if (valid) {
	        addReply(this.ruleForm)
		        .then(data => {
		          this.dialogFormVisible= false
		          this.$notify({
	              title: '成功',
	              message: '回复成功',
	              type: 'success',
	              duration: 2000
	            })
		          this.$router.push({
                name: 'commentList'
              })
		        })
	      } else {
	      	this.dialogFormVisible= false
	        //console.log('error submit!!');
	        return false;
	      }
	    })
  	}
  }
}
</script>

