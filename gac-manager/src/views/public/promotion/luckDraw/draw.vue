<template>
<div>
	<div class="app-container">
      <el-form
        style="padding-right: 200px;margin-top: 50px;"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
      >
      	<el-form-item
          label="活动名称:"
          prop="luckyDrawName"
        >
          <el-input
            v-model="form.luckyDrawName"
            maxlength="20"
            show-word-limit
            placeholder="请输入活动名称:"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="活动简介"
          prop="luckyDrawDesc"
        >
          <el-input
            v-model="form.luckyDrawDesc"
            type="textarea"
            maxlength="100"
            show-word-limit
            placeholder="请输入活动简介:"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="活动规则"
          prop="luckyDrawRule"
        >
	        <div style="margin-bottom: 10px;" v-for="(itemRule, index) in form.luckyDrawRuleList">
	          <el-input
	            v-model="itemRule.rule"
	            type="textarea"
	            placeholder="请输入活动规则"
	            style="width: 90%;"
	          ></el-input>
	          <el-button type="primary" v-if="index != form.luckyDrawRuleList.length-1" @click="delDrawRule(index)">-</el-button>
	          <el-button type="primary" v-else @click="addDrawRule">+</el-button>
	        </div>
        </el-form-item>
        <el-form-item label="分享图标" prop="sharePic">
	        <el-card
	          v-if="form.sharePic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.sharePic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'sharePic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.sharePic"
			      :multiple="false"
			      prefix="share"
			      @successCBK="uploadSharePicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
		    </el-form-item>
		    <el-form-item label="标题背景:" prop="titlePic">
	        <el-card
	          v-if="form.titlePic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.titlePic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'titlePic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.titlePic"
			      :multiple="false"
			      prefix="title"
			      @successCBK="uploadTitlePicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
		    </el-form-item>
		    <el-form-item label="九宫格:" prop="latticePic">
	        <el-card
	          v-if="form.latticePic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.latticePic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'latticePic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.latticePic"
			      :multiple="false"
			      prefix="lattice"
			      @successCBK="uploadLatticePicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
		    </el-form-item>
		    <el-form-item label="立即抽奖:" prop="drawingPic">
	        <el-card
	          v-if="form.drawingPic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.drawingPic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'drawingPic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.drawingPic"
			      :multiple="false"
			      prefix="drawing"
			      @successCBK="uploadDrawingPicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
		    </el-form-item>
		    <el-form-item label="标签:" prop="labelPic">
	        <el-card
	          v-if="form.labelPic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.labelPic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'labelPic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.labelPic"
			      :multiple="false"
			      prefix="label"
			      @successCBK="uploadLabelPicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
	    	</el-form-item>
	    	<el-form-item label="外边框:" prop="marginPic">
	        <el-card
	          v-if="form.marginPic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.marginPic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'marginPic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.marginPic"
			      :multiple="false"
			      prefix="margin"
			      @successCBK="uploadMarginPicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
		    </el-form-item>
		    <el-form-item label="奖品展示:" prop="prizePic">
	        <el-card
	          v-if="form.prizePic"
	          style="width:150px;"
	          :body-style="{ padding: '0px' }"
	        >
	          <img :src="form.prizePic" class="image" width="100%" />
	          <div style="padding: 0 14px;">
	            <div class="bottom clearfix">
	              <el-button
	                type="text"
	                class="button"
	                @click="deleteFormKey(form, 'prizePic')"
	                >删除</el-button
	              >
	            </div>
	          </div>
	        </el-card>
	        <ImageUpload
			      v-show="!form.prizePic"
			      :multiple="false"
			      prefix="prize"
			      @successCBK="uploadPrizePicSuccess"
			    />
	        <div class="tip">支持jpg、jpeg、png格式；大小2M以内</div>
		    </el-form-item>
	    	<el-form-item label="页面背景色:">
          <el-input
            v-model="form.backgroundPic"
            type="color"
            style="width: 100px;"
          ></el-input>
        </el-form-item>
	    <el-form-item label="活动时间" prop="timeValue" v-if="form.status != 1">
          <el-date-picker
            v-model="timeValue"
          	clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动时间" prop="endTime" v-if="form.status == 1">
          <el-date-picker
            v-model="form.startTime"
            :readonly="readonly"
            type="datetime"
            placeholder="开始时间"
          >
          </el-date-picker>
          <span style="margin: 0 10px;">至</span>
          <el-date-picker
            v-model="endTime"
            :picker-options="pickerOptions"
          	clearable
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="抽奖设置:" prop="setTimes">
          <div>基础抽奖次数：
          	<el-input
	            v-model.number="form.baseDrawTimes"
	            style="width: 100px;"
	          ></el-input>次/天
          </div>
          <div style="margin: 10px 0;">分享：
          	<el-input
	            v-model.number="form.shareAddTimes"
	            style="width: 100px;"
	          ></el-input>次可获得一次抽奖机会，每人可获得分享奖励
	          <el-input
	            v-model.number="form.validShareTimes"
	            style="width: 100px;"
	          ></el-input>次/天
          </div>
          <div>每人中奖次数设置（仅对实物奖品）：
          	<el-input
	            v-model.number="form.winningPrizeTimes"
	            style="width: 100px;"
	          ></el-input>次
          </div>
        </el-form-item>
        <el-form-item label="奖品设置" prop="setPrize">
          <el-table
		      :data="form.prizeList"
		      border
		      fit
		      highlight-current-row
		      style="width: 100%"
		    >
		    	<el-table-column width="50px" align="center" label="序号">
		        <template slot-scope="{ row }">
		          <span>{{ row.prizePosition }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column width="100px" align="center" label="奖品名称">
		        <template slot-scope="{ row }">
		          <span>{{ row.prizeName }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column width="150px" align="center" label="奖品图标">
		        <template slot-scope="{ row }">
		          <span><img :src="row.prizePic" style="width: 100px;"/></span>
		        </template>
		      </el-table-column>
		      <el-table-column width="100px" align="center" label="奖品类型">
		        <template slot-scope="{ row }">
		          <span>{{ prizeType[row.prizeType] }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column width="130px" align="center" label="奖品总数量">
		        <template slot-scope="{ row }">
		          <span>{{ row.prizeNum }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column width="130px" align="center" label="奖品消耗数量">
		        <template slot-scope="{ row }">
		          <span>{{ row.consumeNum }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column width="100px" align="center" label="中奖概率">
		        <template slot-scope="{ row }">
		          <span>{{ row.prizeProbability }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column fixed="right" align="left" label="操作">
		        <template slot-scope="{ row }">
		          <el-button
		          	type="primary"
		            size="small"
		            @click="toAudit(row)"
		            >编辑</el-button
		          >
	          </template>
		      </el-table-column>
	      </el-table>
        </el-form-item>
        <el-form-item>
        	<el-button @click="$router.push({name:'luckDraw'})"
	          >取 消</el-button
	        >
	        <el-button type="primary" :loading="loading" @click="update('form')"
	          >保 存</el-button
	        >
	      </el-form-item>
      </el-form>
	    <add-prize @successCBK="addprizeSuccess" :form="prizeObj" ref="addPrizeForm"/>
    </div>
  </div>
</template>

<script>
import {
	saveDraw,
	getObj
} from '@/api/public/luckDraw';
import ImageUpload from '@/components/Upload'
import addPrize from './component/addPrize.vue'
import waves from '@/directive/waves'; // 水波纹指令

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    addPrize
  },
  data() {
    return {
    	loading: false,
    	readonly: true,
    	form: {
    		id: undefined,
    		luckyDrawName: undefined,
    		luckyDrawDesc: undefined,
    		luckyDrawRuleList: [{rule: ''}],
    		sharePic: undefined,
    		backgroundPic: '#E74435',
    		latticePic: undefined,
    		prizePic: undefined,
    		drawingPic: undefined,
    		marginPic: undefined,
    		titlePic: undefined,
    		labelPic: undefined,
    		baseDrawTimes: undefined,
    		shareAddTimes: undefined,
    		validShareTimes: undefined,
    		winningPrizeTimes: undefined,
    		startTime: undefined,
    		status: undefined,
    		endTime: undefined,
    		prizeList: []
    	},
    	prizeObj: {
    		id: undefined,
    		prizeName: undefined,
    		prizeType: undefined,
    		prizeNum: undefined,
    		consumeNum: undefined,
    		prizeProbability: undefined,
    		prizePic: undefined,
    		prizePosition: 0
    	},
      	prizeType: {
    		'0': '实物',
    		'1': '再来一次',
    		'2': '感谢参与'
    	},
    	rules: {
	    	luckyDrawName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        luckyDrawDesc: [
          { required: true, message: '请输入活动简介', trigger: 'blur' }
        ],
        luckyDrawRule: [
          { validator: this.validateSetLuckyDrawRule, required: true, message: '请输入活动规则', trigger: 'blur' }
        ],
        sharePic: [
          { required: true, message: '请上传分享图标', trigger: 'blur' }
        ],
        backgroundPic: [
          { required: true, message: '请上传页面背景', trigger: 'blur' }
        ],
        latticePic: [
          { required: true, message: '请上传九宫格', trigger: 'blur' }
        ],
        prizePic: [
          { required: true, message: '请上传奖品展示', trigger: 'blur' }
        ],
        drawingPic: [
          { required: true, message: '请上传立即抽奖', trigger: 'blur' }
        ],
        marginPic: [
          { required: true, message: '请上传外边框', trigger: 'blur' }
        ],
        titlePic: [
          { required: true, message: '请上传标题背景', trigger: 'blur' }
        ],
        labelPic: [
          { required: true, message: '请上传标签背景', trigger: 'blur' }
        ],
        timeValue: [
        	{ validator: this.validateSetTimeV, required: true,  trigger: 'change' }
        ],
        endTime: [
        	{ validator: this.validateSetTimeE, required: true,  trigger: 'change' }
        ],
        setTimes: [
        	{ validator: this.validateSetTimes, required: true,  trigger: 'blur' }
        ],
        setPrize: [
        	{ validator: this.validateSetPrize, required: true,  trigger: 'blur' }
        ]
    	},
    	timeValue: [],
    	endTime: '',
    	pickerOptions: {}
    }
  },
  async created() {
  	for (var i = 0; i < 8; i++) {
  		this.form.prizeList.push({
  			id: undefined,
    		prizeName: undefined,
    		prizeType: undefined,
    		prizeNum: undefined,
    		consumeNum: undefined,
    		prizeProbability: undefined,
    		prizePic: undefined,
    		prizePosition: i+1
  		})
  	}
    if (this.$route.query.id) {
      const form = await getObj(this.$route.query.id).then(data => data.data)
      if(form.status == 1){
      	this.pickerOptions = {
           disabledDate(time){
              return time.getTime() < new Date().getTime()-24*60*60*1000
           }
     	}
      }
      this.timeValue = [form.startTime, form.endTime]
      this.endTime = form.endTime
      this.form = form
    }
  },
  watch: {
  	endTime(value) {
      this.form.endTime = value ? value : undefined
    },
    timeValue(value) {
      this.form.startTime = value.length ? value[0] : undefined
      this.form.endTime = value.length ? value[1] : undefined
    }
  },
  methods: {
  	validateSetTimes(rule, value, callback) {
      if (!this.form.baseDrawTimes || !this.form.shareAddTimes || !this.form.validShareTimes || !this.form.winningPrizeTimes) {
        return callback(new Error('此项不能为空'))
      }else{
      	callback()
      }
    },
    validateSetPrize(rule, value, callback){
    	this.form.prizeList.forEach((prizeItem, prizeIndex)=>{
    		for(var key in prizeItem){
    			if(prizeItem[key] == undefined || String(prizeItem[key]) == ''){
    				if(key != 'id' && key != 'consumeNum'){
    					return callback(new Error('此项不能有空值'))
    				}
    			}
    		}
    	})
    	callback()
    },
    validateSetTimeV(rule, value, callback){
    	if(!this.form.startTime || !this.form.endTime){
    		return callback(new Error('请选择时间'))
    	}
    	callback()
    },
    validateSetTimeE(rule, value, callback){
    	let n = new Date().getTime() - new Date(value).getTime()
    	if(n>=0){
    		return callback(new Error('请选择正确时间(大于当前时间)'))
    	}
    	callback()
    },
    validateSetLuckyDrawRule(rule, value, callback){
    	this.form.luckyDrawRuleList.forEach((item)=>{
    		if(!item.rule){
    			return callback(new Error('此项不能有空值'))
    		}
    	})
    	callback()
    },
    addDrawRule(){
    	this.form.luckyDrawRuleList.push({rule:''})
    },
    delDrawRule($index){
    	this.form.luckyDrawRuleList.splice($index,1)
    },
    toAudit(row){
		this.prizeObj = {
			id: row.id,
    		prizeName: row.prizeName,
    		prizeType: row.prizeType,
    		prizeNum: row.prizeNum,
    		consumeNum: row.consumeNum,
    		prizeProbability: row.prizeProbability,
    		prizePic: row.prizePic,
    		prizePosition: row.prizePosition
		}
		setTimeout(()=>{
			this.$refs.addPrizeForm.dialogFormVisible = true
		},10)
    },
    addprizeSuccess(row){
    	this.form.prizeList.splice(row.prizePosition-1, 1, row)
    	this.$refs.addPrizeForm.dialogFormVisible = false
    },
    deleteFormKey(form, key) {
    	this.form[key] = undefined
    },
    uploadSharePicSuccess(key) {
      this.form.sharePic = key[0]
    },
    uploadLatticePicSuccess(key){
    	this.form.latticePic = key[0]
    },
    uploadPrizePicSuccess(key){
    	this.form.prizePic = key[0]
    },
    uploadDrawingPicSuccess(key){
    	this.form.drawingPic = key[0]
    },
    uploadMarginPicSuccess(key){
    	this.form.marginPic = key[0]
    },
    uploadTitlePicSuccess(key){
    	this.form.titlePic = key[0]
    },
    uploadLabelPicSuccess(key){
    	this.form.labelPic = key[0]
    },
    update(formName) {
    	let self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
        	this.loading = true
        	saveDraw(self.form).then((data)=>{
        		this.loading = false
        		this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
        		setTimeout(()=>{
        			this.$router.push({name: 'luckDraw'})
        		})
        	}).catch(() => {
        		this.loading = false
        	})
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
