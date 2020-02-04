<template>
  <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="editMerchantForm" label-width="130px">
    	<el-form-item label="商家ID" prop="merchantId">
		    <el-input v-model.trim="form.merchantId" placeholder="请输入商家ID" @keyup.enter.native="$event.target.blur" @blur="isExist(form.merchantId)"></el-input>
		  </el-form-item>
      <el-form-item label="商家名称">
        <el-input v-model.trim="form.merchantName" disabled></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
          <img :src="form.thumbnail | setImg" v-if="form.thumbnail" class="image" width="200px">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('editMerchantForm')">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update('editMerchantForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getJewelryMerchant } from '@/api/dm/homeSettings'

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
        merchantId: [
          { required: true, message: '请输入正确的商家ID', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  	isExist(id) {
      if (!id) return
      this.getMerchant(id)
    },
    getMerchant(id) {
      getJewelryMerchant(id).then((res) => {
      	let data = res.data
        this.form.merchantId = data.id
        this.form.merchantName = data.name
        this.form.thumbnail = data.logo
      }).catch(() => {
      	this.resetForm('editMerchantForm')
      })
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        this.form.id = undefined
        this.form.merchantId = undefined
        this.form.merchantName = undefined
        this.form.thumbnail = undefined
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.resetForm('editMerchantForm')
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
    }
  }
}
</script>

<style scoped>
	.dateInput {
		display: inline-block;
	}
</style>

