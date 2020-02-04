<template>
  <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="editJewelryform" label-width="130px">
    	<el-form-item label="商品ID" prop="goodsId">
		    <el-input v-model.trim="form.goodsId" placeholder="输入商品ID" @keyup.enter.native="$event.target.blur" @blur="isExist(form.goodsId)"></el-input>
		  </el-form-item>
		  <el-form-item label="商品名称">
        <el-input v-model.trim="form.goodsName" disabled></el-input>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model.trim="form.merchantName" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品缩略图">
          <img :src="form.thumbnail | setImg" v-if="form.thumbnail" class="image" width="200px">
      </el-form-item>
      <el-form-item label="设置排序" prop="sortNumber">
      	<el-input type="number" maxlength="2" v-model.number="form.sortNumber"></el-input>
        <!--<el-input placeholder="数字1-100" v-model.trim="form.sortNumber"></el-input>-->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('editJewelryform')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('editJewelryform')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getJewelryGoods } from '@/api/dm/homeSettings'

export default {
  data() {
    return {
      prefix: 'thumbnail',
      width: 235,
      height: 155,
      cropShow: false,
      loading: false,
      dialogFormVisible: false,
      formTitle: '',
      form: {
      	id: undefined,
        goodsId: undefined,
        goodsName: undefined,
        merchantName: undefined,
        thumbnail: undefined,
        sortNumber: undefined,
      },
      rules: {
        goodsId: [
          { required: true, message: '请输入正确的商品ID', trigger: 'blur' }
        ],
        sortNumber: [
        	{ required: true, message: '请设置排序', trigger: 'blur' },
        	{ validator: this.checkPriority, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  	isExist(id) {
      if (!id) return
      this.getGood(id)
    },
    getGood(id) {
      getJewelryGoods(id).then((res) => {
      	let data = res.data
        this.form.goodsId = data.id
        this.form.goodsName = data.goodsName
        this.form.merchantName = data.merchantName
        this.form.thumbnail = data.imgUrl
      }).catch(() => {
      	this.resetForm('editJewelryform')
      })
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
        this.form.goodsId = undefined
        this.form.goodsName = undefined
        this.form.merchantName = undefined
        this.form.thumbnail = undefined
        this.form.sortNumber = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('editJewelryform')
    },
    // 提交成功
    success() {
      this.loading = false
      this.$emit('success', JSON.parse(JSON.stringify(this.form)))
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.success()
        } else {
          return false
        }
      })
    },
    checkPriority (rule, value, callback) {
	    if (!value) {
	      return callback(new Error('请输入排列顺序'))
	    }
	    if (!Number.isInteger(value) || value < 0 || value > 100) {
	      callback(new Error('排列顺序需为0-100之间的正整数'))
	    } else {
	      callback();
	    }
	  }
  }
}
</script>

<style scoped>
	.dateInput {
		display: inline-block;
	}
</style>

