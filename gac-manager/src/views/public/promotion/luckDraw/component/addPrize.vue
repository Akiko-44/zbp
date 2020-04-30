<template>
  <div>
	<el-dialog title="奖品设置" :visible.sync="dialogFormVisible">
      <el-form
        style="padding-right: 200px;margin-top: 50px;"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
      >
      	<el-form-item
          label="奖品类型"
          prop="prizeType"
        >
          <el-select
            v-model="form.prizeType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in prizeType"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      	<el-form-item
          label="奖品名称"
          prop="prizeName"
        >
          <el-input
            v-model="form.prizeName"
            maxlength="20"
            show-word-limit
            placeholder="请输入奖品名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="奖品数量"
          prop="prizeNum"
        >
          <el-input
            v-model.number="form.prizeNum"
            type="number"
            placeholder="请输入奖品数量"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="中奖概率"
          prop="prizeProbability"
        >
          <el-input
            v-model.number="form.prizeProbability"
            type="number"
            placeholder="中奖概率"
            style="width: 90%;"
          ></el-input>%
        </el-form-item>
        <el-form-item label="奖品图片" prop="prizePic">
	        <el-card
	          v-if="form.prizePic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.prizePic | setImg" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="$delete(form, 'prizePic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <el-button v-else @click="cropShow = true" type="primary"
	          >上传</el-button
	        >
	        <ImageCropper
		      ref="cropper"
		      v-model="cropShow"
		      :noCircle="true"
		      :noSquare="true"
		      :withCredentials="true"
		      imgFormat="jpg"
		      :width="100"
		      :height="100"
		      prefix="draw"
		      @crop-upload-success="uploadSuccess"
		    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内；可裁剪</div>
    	</el-form-item>
        <el-form-item
          label="序号"
        >
          {{ form.prizePosition }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="update('form')">确 定</el-button>
	  </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import waves from '@/directive/waves'; // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  props: {
    form: {
      type: Object,
      default: {
      	id: undefined,
				prizeName: undefined,
				prizeType: undefined,
				prizeNum: undefined,
				prizeProbability: undefined,
				prizePic: undefined,
				prizePosition: undefined
      }
    }
  },
  data() {
    return {
    	dialogFormVisible: false,
    	loading: false,
    	cropShow: false,
    	prizeType: [{key: 0,label:'实物'},{key:1,label:'再来一次'},{key:2,label: '感谢参与'}],
    	rules: {
    		prizeType: [
	          { required: true, message: '请选择奖品类型', trigger: 'change' }
	        ],
    		prizeName: [
	          { required: true, message: '请输入奖品名称', trigger: 'blur' }
	        ],
        prizeNum: [
          { required: true, message: '请输入奖品数量', trigger: 'blur' }
        ],
        prizeProbability: [
          { required: true, message: '请输入奖品中奖概率', trigger: 'blur' }
        ],
        prizePic: [
        	{ required: true, message: '请上传图片', trigger: 'blur' }
        ]
    	}
    }
  },
  methods: {
    uploadSuccess(key) {
      this.form.prizePic = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        	this.$emit('successCBK', this.form)
        }
      })
    }
  }
}
</script>

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
</style>
